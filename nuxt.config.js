const path = require("path");

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
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "https://wikioss.xhemj.work/static/logo/64x64.png",
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

  target: "static",

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "./assets/css/global.css",
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
  modules: ["@nuxt/content", "@nuxtjs/markdownit"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: "https://wikioss.xhemj.work/public",
    // analyze: true,
    babelrc: true,
    extractCSS: true,
    postcss: {
      plugins: {
        "postcss-url": {},
        "postcss-nested": {},
        "postcss-responsive-type": {},
        "postcss-hexrgba": {},
      },
      preset: {
        autoprefixer: {
          grid: true,
        },
      },
    },
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

  loading: {
    color: "#5755d9",
  },
};
