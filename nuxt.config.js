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
    link: [{ rel: "icon", type: "image/x-icon", href: "/64x64.png" }],
  },

  target: "server",

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["ant-design-vue/dist/antd.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/antd-ui"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/google-fonts",
    "@nuxtjs/eslint-module",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxt/content"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // analyze: true,
    babelrc: true,
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(css|vue)$/,
            chunks: "all",
            enforce: true,
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
    routes: ["/wiki/厦门市音乐学校", "/wiki/跑面"],
  },

  content: {
    markdown: {
      // https://github.com/remarkjs/remark-external-links#options
      remarkExternalLinks: {
        target: "_blank",
        rel: "nofollow",
      },
    },
  },

  googleFonts: {
    display: "swap",
    useStylesheet: true,
    families: {
      Poppins: {
        wght: [400, 700],
      },
    },
  },
};
