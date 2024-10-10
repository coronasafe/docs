import { themes as prismThemes } from "prism-react-renderer";
import type { Config, PluginConfig } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "OHC Docs",
  tagline: "Building open source healthcare goodness.",
  favicon: "favicon.ico",

  url: "https://docs.ohc.network",
  baseUrl: "/",

  organizationName: "Open Healthcare Network",
  projectName: "docs",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/ohcnetwork/docs/tree/master/",
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/ohcnetwork/docs/tree/master/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        language: ["en"],
      },
    ],
    '@docusaurus/theme-mermaid'
  ] satisfies PluginConfig[],

  markdown: {
    mermaid: true,
  },

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "",
      logo: {
        alt: "OHC",
        srcDark: "img/logo/svg/light_full.svg",
        src: "img/logo/svg/color_full.svg",
      },
      items: [
        { to: "/docs/care", label: "Care", position: "left" },
        { to: "/docs/ayushma/", label: "Ayushma", position: "left" },
        { to: "/docs/leaderboard/", label: "Leaderboard", position: "left" },
        { to: "/docs/devops/", label: "DevOps", position: "left" },
        { to: "/blog", label: "Blog", position: "left" },
        { to: "/docs/contributing", label: "Contribute", position: "left" },
        {
          href: 'https://github.com/ohcnetwork/docs',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      // style: 'dark',
      logo: {
        alt: "Open Healthcare Network Logo",
        src: "img/logo/svg/color_logo.svg",
        srcDark: "img/logo/svg/light_logo.svg",
        href: "https://ohc.network",
        width: 60,
        height: 50,
      },
      copyright: `Made with Docusaurus and ♡`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
