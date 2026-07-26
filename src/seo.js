export const SITE_URL = "https://borneoai.org";
export const SITE_NAME = "BorneoAI";
export const DEFAULT_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

export const routeMetadata = {
  "/": {
    navLabel: "About",
    title: "BorneoAI | Practical AI Learning & Adoption in Borneo",
    description:
      "BorneoAI is a practitioner-led collective helping people and businesses in Sarawak, Sabah and wider Borneo learn, adopt and share practical AI.",
    canonical: `${SITE_URL}/`,
    image: {
      url: `${SITE_URL}/images/home-workshop.jpg`,
      width: 1536,
      height: 1024,
      alt: "BorneoAI practitioners mapping a practical workflow together in Borneo",
    },
  },
  "/learn": {
    navLabel: "Learn",
    title: "Learn Practical AI in Sarawak & Sabah | BorneoAI",
    description:
      "Build practical AI skills through real work. Explore BorneoAI's founding learning pathway for professionals, owners, educators and creators in Borneo.",
    canonical: `${SITE_URL}/learn`,
    image: {
      url: `${SITE_URL}/images/upskilling-workshop.jpg`,
      width: 1672,
      height: 941,
      alt: "Adult learners developing practical AI skills in a BorneoAI session",
    },
  },
  "/business": {
    navLabel: "For Business",
    title: "Responsible AI Adoption for Borneo Businesses | BorneoAI",
    description:
      "Explore responsible AI adoption for businesses in Sarawak, Sabah and wider Borneo, from readiness assessment to a practical first use case.",
    canonical: `${SITE_URL}/business`,
    image: {
      url: `${SITE_URL}/images/business-clinic.jpg`,
      width: 1672,
      height: 941,
      alt: "Business leaders exploring responsible AI adoption with BorneoAI",
    },
  },
  "/community": {
    navLabel: "Community",
    title: "Borneo AI Community & Practical Workflows | BorneoAI",
    description:
      "Join Borneo's AI practitioner community, contribute useful workflows and help build a local, responsible playbook for practical AI.",
    canonical: `${SITE_URL}/community`,
    image: {
      url: `${SITE_URL}/images/community-gathering.jpg`,
      width: 1672,
      height: 941,
      alt: "BorneoAI community members sharing practical AI knowledge together",
    },
  },
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  alternateName: "Borneo AI",
  description: routeMetadata["/"].description,
  inLanguage: "en",
};

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Borneo AI",
  url: `${SITE_URL}/`,
  description:
    "A practitioner-led collective helping people and organisations across Borneo build useful, responsible AI capability.",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Sarawak" },
    { "@type": "AdministrativeArea", name: "Sabah" },
    { "@type": "Place", name: "Borneo" },
  ],
  foundingLocation: [
    { "@type": "Place", name: "Sarawak, Malaysia" },
    { "@type": "Place", name: "Sabah, Malaysia" },
  ],
  knowsAbout: [
    "Artificial intelligence literacy",
    "Responsible AI adoption",
    "AI-supported business workflows",
    "Professional upskilling",
  ],
};

function imageObject(metadata) {
  return {
    "@type": "ImageObject",
    "@id": `${metadata.canonical}#primaryimage`,
    url: metadata.image.url,
    contentUrl: metadata.image.url,
    width: metadata.image.width,
    height: metadata.image.height,
    caption: metadata.image.alt,
  };
}
function breadcrumb(path, name) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${path}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "BorneoAI",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${SITE_URL}${path}`,
      },
    ],
  };
}

export function getStructuredData(path) {
  const metadata = routeMetadata[path] || routeMetadata["/"];
  const basePage = {
    "@type": path === "/community" || path === "/learn" ? "CollectionPage" : "WebPage",
    "@id": `${metadata.canonical}#webpage`,
    url: metadata.canonical,
    name: metadata.title,
    description: metadata.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    primaryImageOfPage: { "@id": `${metadata.canonical}#primaryimage` },
    inLanguage: "en",
  };

  const graph = [website, organization, imageObject(metadata), basePage];

  if (path !== "/") {
    graph.push(breadcrumb(path, metadata.navLabel));
  }

  if (path === "/learn") {
    graph.push({
      "@type": "ItemList",
      "@id": `${SITE_URL}/learn#learning-pathway`,
      name: "BorneoAI practical AI learning pathway",
      numberOfItems: 4,
      itemListElement: ["AI Ready", "AI Productive", "AI Practitioner", "AI Leader"].map(
        (name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          url: `${SITE_URL}/learn#curriculum`,
        }),
      ),
    });
  }

  if (path === "/community") {
    graph.push({
      "@type": "ItemList",
      "@id": `${SITE_URL}/community#initiatives`,
      name: "BorneoAI founding community initiatives",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "100 Useful AI Workflows for Borneo",
          url: `${SITE_URL}/community#playbook`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "First founding gathering",
          url: `${SITE_URL}/community`,
        },
      ],
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, String(value)));
  return element;
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, String(value)));
  return element;
}

export function applySeoMetadata(path) {
  const metadata = routeMetadata[path] || routeMetadata["/"];
  const isKnownRoute = Boolean(routeMetadata[path]);
  const robots = isKnownRoute ? DEFAULT_ROBOTS : "noindex, nofollow";

  document.title = metadata.title;
  upsertMeta('meta[name="description"]', { name: "description", content: metadata.description });
  upsertMeta('meta[name="robots"]', { name: "robots", content: robots });
  upsertMeta('meta[name="application-name"]', { name: "application-name", content: SITE_NAME });

  upsertLink('link[rel="canonical"]', { rel: "canonical", href: metadata.canonical });
  upsertLink('link[rel="alternate"][hreflang="en"]', {
    rel: "alternate",
    hreflang: "en",
    href: metadata.canonical,
  });
  upsertLink('link[rel="alternate"][hreflang="x-default"]', {
    rel: "alternate",
    hreflang: "x-default",
    href: metadata.canonical,
  });

  const openGraph = {
    "og:type": "website",
    "og:site_name": SITE_NAME,
    "og:locale": "en_MY",
    "og:title": metadata.title,
    "og:description": metadata.description,
    "og:url": metadata.canonical,
    "og:image": metadata.image.url,
    "og:image:secure_url": metadata.image.url,
    "og:image:width": metadata.image.width,
    "og:image:height": metadata.image.height,
    "og:image:alt": metadata.image.alt,
  };
  Object.entries(openGraph).forEach(([property, content]) => {
    upsertMeta(`meta[property="${property}"]`, { property, content });
  });

  const twitter = {
    "twitter:card": "summary_large_image",
    "twitter:title": metadata.title,
    "twitter:description": metadata.description,
    "twitter:image": metadata.image.url,
    "twitter:image:alt": metadata.image.alt,
  };
  Object.entries(twitter).forEach(([name, content]) => {
    upsertMeta(`meta[name="${name}"]`, { name, content });
  });

  let structuredData = document.head.querySelector("#structured-data");
  if (!structuredData) {
    structuredData = document.createElement("script");
    structuredData.id = "structured-data";
    structuredData.type = "application/ld+json";
    document.head.appendChild(structuredData);
  }
  structuredData.textContent = JSON.stringify(getStructuredData(path)).replace(/</g, "\\u003c");
}
