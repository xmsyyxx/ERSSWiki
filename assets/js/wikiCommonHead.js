import getWikiDescription from "./getWikiDescription";
import getWikiPicture from "./getWikiPicture";
import { cardPlaceHolderImage, imageSuffix } from "./init";

const baseUrl = "https://baike.xmsyyxx.com";
const cardImage = (self) =>
  (getWikiPicture(self.WikiData) || cardPlaceHolderImage) +
  imageSuffix.twitter_card_webp;

export default function wikiCommonHead(self) {
  const description = getWikiDescription(self.WikiData);
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
        content: cardImage(self),
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
        content: cardImage(self),
      },
      {
        hid: "twitter:image:alt",
        name: "twitter:image:alt",
        content: metaTitle,
      },
    ],
  };
}
