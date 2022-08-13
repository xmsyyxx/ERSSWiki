const webpack = require("webpack");
const version = require("./package.json").version;
const dayjs = require("dayjs");
require("dayjs/locale/zh-cn");
dayjs.locale("zh-cn");
const time = dayjs().format("YYYY-M-D HH:mm:ss");

const createSitemapRoutes = async () => {
  let routes = [];
  let posts = [];
  const { $content } = require("@nuxt/content");
  if (posts === null || posts.length === 0)
    posts = await $content("wiki").fetch();
  for (const post of posts) {
    routes.push({
      url: "/",
      changefreq: "daily",
      priority: 1,
      lastmod: new Date().toISOString(),
    });
    routes.push({
      url: `/item/${post.slug}`,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: post.updatedAt,
    });
    routes.push({
      url: "/sitemap",
      changefreq: "daily",
      priority: 0.5,
      lastmod: new Date().toISOString(),
    });
  }
  return routes;
};

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "耳斯百科",
    htmlAttrs: {
      lang: "zh",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "耳斯百科" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "https://baike.xmsyyxx.com/favicon.ico",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Poppins:wght@300;400;500;700&display=swap",
      },
    ],
    script: [
      {
        src: "https://wikioss.xhemj.work/js/wiki.js",
        "data-website-id": "8f7c6463-9ca3-48a1-b82b-55bef7bd0cc9",
        "data-cache": "true",
        "data-host-url": "https://a.xhemj.work",
      },
    ],
  },

  // Deployment Targets: https://nuxtjs.org/docs/features/deployment-targets/
  target: "static",

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "./assets/css/global.css",
    "./assets/css/variables.css",
    // "github-markdown-css/github-markdown.css",
    "./assets/css/custom.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxt/content", "@nuxtjs/markdownit", "@nuxtjs/sitemap"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: "https://wikioss.xhemj.work/public",
    // analyze: true,
    extractCSS: true,
    // profile: true,
    plugins: [
      new webpack.BannerPlugin(
        [
          "ERSS WIKI",
          `(c) 2021-${new Date().getFullYear()} Xhemj`,
          `Build: ${time}`,
          `Version: ${version}`,
          "====",
          "o(〃＾▽＾〃)o",
        ].join("\n")
      ),
    ],
  },

  generate: {
    fallback: "404.html",
    async routes() {
      const { $content } = require("@nuxt/content");
      const files = await $content({ deep: true })
        .only(["slug", "alias"])
        .fetch();
      const pathPerfix = ["/wiki", "/item"];
      let routes = [];
      files.forEach((file) => {
        for (let path of pathPerfix) {
          routes.push(`${path}/${file.slug}`);
          if (file.alias) {
            for (let alias of file.alias) {
              routes.push(`${path}${alias}`);
            }
          }
        }
      });
      return routes;
    },
  },

  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    use: [
      "markdown-it-div",
      // "markdown-it-highlightjs",
      "markdown-it-mark",
      "markdown-it-deflist",
    ],
    runtime: true, // Support `$md()`
  },

  content: {
    // Disable for security reason on CodeSandBox
    liveEdit: false,
  },

  loading: {
    color: "#5755d9",
  },

  sitemap: {
    hostname: "https://baike.xmsyyxx.com",
    routes: createSitemapRoutes,
  },
};
