export default function getWikiPicture(WikiData = {}) {
  const originHeadImage =
    typeof WikiData.img === "string" ? WikiData.img : WikiData.img?.url || null; // 匹配原始头图
  const rawWikiText = WikiData.text;
  const contentImage =
    rawWikiText && rawWikiText.match(/<WImg ?src="(.*?)"(.*?)><\/WImg>/i)
      ? rawWikiText.match(/<WImg ?src="(.*?)"(.*?)><\/WImg>/i)[1]
      : ""; // 匹配文章中出现的插图

  const cardImage = originHeadImage || contentImage || "";

  return cardImage;
}
