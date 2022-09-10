import getWikiDescription from "./getWikiDescription";

const description = getWikiDescription(self.WikiData);
const baseUrl = "https://baike.xmsyyxx.com";
const cardPlaceHolderImage =
  "https://wikioss.xhemj.work/static/ersswiki-no-image-card.png/normal.webp";

export default function wikiCommonHead(self) {
  const metaTitle = self.WikiData.title + " - 耳斯百科";
  return {
    title: metaTitle,
    link: [
      {
        rel: "canonical",
        href: `${baseUrl}/item/${self.slug}`,
      },
      {
        rel: "alternate",
        media: "only screen and (max-width: 500px)",
        href: `${baseUrl}/wiki/${self.slug}`,
      },
    ],
    meta: [
      {
        hid: "description",
        name: "description",
        content: description,
      },
      // Open Graph
      {
        hid: "og:type",
        property: "og:type",
        content: "article",
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "耳斯百科",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: `${baseUrl}/item/${self.slug}`,
      },
      {
        hid: "og:title",
        property: "og:title",
        content: metaTitle,
      },
      {
        hid: "og:description",
        property: "og:description",
        content: description,
      },
      {
        hid: "og:image",
        property: "og:image",
        content: self.WikiData.img
          ? String(self.WikiData.img) + "/twitter_card.webp"
          : cardPlaceHolderImage,
      },
      {
        hid: "og:image:alt",
        property: "og:image:alt",
        content: metaTitle,
      },
      // Twitter Card
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        hid: "twitter:site",
        name: "twitter:site",
        content: "@xhemj",
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: metaTitle,
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: description,
      },
      {
        hid: "twitter:image:src",
        name: "twitter:image:src",
        content: self.WikiData.img
          ? String(self.WikiData.img) + "/twitter_card.webp"
          : cardPlaceHolderImage,
      },
      {
        hid: "twitter:image:alt",
        name: "twitter:image:alt",
        content: metaTitle,
      },
    ],
  };
}
