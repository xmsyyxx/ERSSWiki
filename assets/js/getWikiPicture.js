const cardPlaceHolderImage =
  "https://wikioss.xhemj.work/static/ersswiki-no-image-card.png/normal.webp";

export default function getWikiPicture(WikiData = {}) {
  const originHeadImage = WikiData.img; // 匹配原始头图
  const rawWikiText = WikiData.text;
  const contentImage = rawWikiText.match(/<WImg ?src="(.*?)"(.*?)><\/WImg>/i)
    ? rawWikiText.match(/<WImg ?src="(.*?)"(.*?)><\/WImg>/i)[1]
    : ""; // 匹配文章中出现的插图

  const cardImage =
    originHeadImage || contentImage
      ? (originHeadImage || contentImage) + "/twitter_card.webp"
      : cardPlaceHolderImage;

  // 因为生成 twitter card 图片需要时间，，刷新缓存
  const image = new Image();
  image.src = cardImage;

  return cardImage;
}
