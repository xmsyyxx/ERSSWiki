const path = require("path");
const wikiData = require("./content/wiki.json");

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
      { rel: "icon", type: "image/x-icon", href: "/64x64.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
      },
    ],
  },

  target: "static",

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["./assets/css/global.css"],

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
    publicPath: "https://s-sh-1943-wiki.oss.dogecdn.com/public",
    // analyze: true,
    babelrc: true,
    extractCSS: true,
    optimization: {
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
      splitChunks: {
        automaticNameDelimiter: "-",
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 50000,
        maxSize: 50000,
        minChunks: 1,
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(css|vue)$/,
            chunks: "all",
            enforce: true,
          },
          vendor: {
            name: "vendor",
            minChunks: 2,
            test: /[\\/]node_modules[\\/]|[\\/]gamedata[\\/]|[\\/]renderer[\\/]/,
            filename: "[contenthash:8].chunk.js",
            priority: -50,
          },
        },
      },
    },
    extend(config, ctx) {
      config.resolve.alias["@ant-design/icons/lib/dist$"] = path.resolve(
        __dirname,
        "./plugins/antd-icon.js"
      ); // 引入需要的
      config.resolve.alias["@"] = path.resolve(__dirname, "../plugins");
    },
  },

  generate: {
    fallback: "404.html",
    routes: wikiData,
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
};
