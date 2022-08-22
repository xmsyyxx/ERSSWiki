export default async function sitemapRoutes() {
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
}
