import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { App, intentConfig, routeMetadata } from "./App.jsx";

describe("BorneoAI routes and navigation", () => {
  beforeEach(() => window.history.replaceState({}, "", "/"));

  it("defines distinct metadata for every public route", () => {
    expect(Object.keys(routeMetadata)).toEqual(["/", "/learn", "/business", "/community"]);
    expect(new Set(Object.values(routeMetadata).map((route) => route.title)).size).toBe(4);
  });

  it("shows the current route and updates page metadata", () => {
    window.history.replaceState({}, "", "/business");
    render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: /move from ai interest/i })).toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: "Primary navigation" })).getByRole("link", { name: "For Business" })).toHaveAttribute("aria-current", "page");
    expect(document.title).toBe(routeMetadata["/business"].title);
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      routeMetadata["/business"].description,
    );
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      routeMetadata["/business"].canonical,
    );
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      "content",
      routeMetadata["/business"].canonical,
    );
    expect(document.querySelector('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    const structuredData = JSON.parse(document.querySelector("#structured-data").textContent);
    expect(structuredData["@graph"]).toEqual(
      expect.arrayContaining([expect.objectContaining({ "@type": "Organization" })]),
    );
  });

  it("navigates without reloading and marks the new route active", async () => {
    const user = userEvent.setup();
    render(<App />);

    const primaryNav = screen.getByRole("navigation", { name: "Primary navigation" });
    await user.click(within(primaryNav).getByRole("link", { name: "Learn" }));
    expect(screen.getByRole("heading", { level: 1, name: /become ai‑savvy/i })).toBeInTheDocument();
    expect(within(primaryNav).getByRole("link", { name: "Learn" })).toHaveAttribute("aria-current", "page");
  });

  it("marks unknown SPA fallback URLs as noindex", () => {
    window.history.replaceState({}, "", "/not-a-public-page");
    render(<App />);

    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
  });
});

describe("contextual interest dialog", () => {
  it("opens the intended gathering flow from its contextual CTA", async () => {
    window.history.replaceState({}, "", "/community");
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /register gathering interest/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: intentConfig.gathering.title })).toBeInTheDocument();
    expect(screen.getByLabelText("Community gatherings")).toBeChecked();
    expect(screen.getByText(/submissions are not yet connected or transmitted/i)).toBeInTheDocument();
  });

  it("requires identity, an interest and the contact acknowledgement", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getAllByRole("button", { name: /join the collective/i })[0]);
    await user.click(screen.getByRole("button", { name: /join the founding list/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(/review the highlighted fields/i);
    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Choose at least one area of interest.")).toBeInTheDocument();
  });

  it("completes the mock locally and focuses an announced success state", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getAllByRole("button", { name: /join the collective/i })[0]);
    await user.type(screen.getByLabelText("Your name"), "Amina");
    await user.type(screen.getByLabelText("Email address"), "amina@example.com");
    await user.click(screen.getByLabelText("Learning programmes"));
    await user.click(screen.getByLabelText(/i understand these details/i));
    await user.click(screen.getByRole("button", { name: /join the founding list/i }));

    const successHeading = await screen.findByRole("heading", { name: /your interest is ready/i });
    await waitFor(() => expect(successHeading).toHaveFocus());
    expect(screen.getByRole("status")).toHaveTextContent(/details were not sent or stored/i);
  });

  it("shows a recoverable mock error", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getAllByRole("button", { name: /join the collective/i })[0]);
    await user.type(screen.getByLabelText("Your name"), "Error Test");
    await user.type(screen.getByLabelText("Email address"), "error@example.com");
    await user.click(screen.getByLabelText("Learning programmes"));
    await user.click(screen.getByLabelText(/i understand these details/i));
    await user.click(screen.getByRole("button", { name: /join the founding list/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/could not complete this demo/i);
    expect(screen.getByRole("button", { name: /join the founding list/i })).toBeEnabled();
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<App />);
    const trigger = screen.getAllByRole("button", { name: /join the collective/i })[0];
    trigger.focus();
    await user.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });
});

describe("responsive navigation behavior", () => {
  it("opens, closes with Escape, and returns focus to the menu control", async () => {
    const user = userEvent.setup();
    render(<App />);
    const menu = screen.getByRole("button", { name: "Open navigation" });

    await user.click(menu);
    expect(screen.getByRole("button", { name: "Close navigation" })).toHaveAttribute("aria-expanded", "true");
    expect(document.body).toHaveClass("menu-open");
    await user.keyboard("{Escape}");
    const reopenedControl = screen.getByRole("button", { name: "Open navigation" });
    expect(reopenedControl).toHaveFocus();
    expect(document.body).not.toHaveClass("menu-open");
  });
});
