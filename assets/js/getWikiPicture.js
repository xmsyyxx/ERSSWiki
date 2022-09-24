export default function getWikiPicture(WikiData = {}) {
  const originHeadImage = WikiData.img; // 匹配原始头图
  const rawWikiText = WikiData.text;
  const contentImage = rawWikiText.match(/<WImg ?src="(.*?)"(.*?)><\/WImg>/i)
    ? rawWikiText.match(/<WImg ?src="(.*?)"(.*?)><\/WImg>/i)[1]
    : ""; // 匹配文章中出现的插图

  const cardImage = originHeadImage || contentImage || "";

  return cardImage;
}
