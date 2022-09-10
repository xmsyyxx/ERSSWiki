/**
 * 获取百科简介
 * @param {any} WikiData Nuxt Content Body
 * @returns 百科简介
 */
export default function getWikiDescription(WikiData = {}) {
  const rawWikiText = WikiData.text
    ? String(WikiData.text)
        .replace(/[#]{1,6} ?(.*?)(\n|\r)/g, "") // 去除标题
        .replace(/\[\^\d+?\]/g, "") // 去除上标脚注
        .replace(/---/g, "") // 去除分隔线
        .replace(/\n/g, "") // 去除换行符
        .replace(/<WImg(.*?)><\/WImg>/g, "") // 去除图片
        .replace(/<WikiVideo(.*?)><\/WikiVideo>/g, "") // 去除视频
        .replace(/\[(.*?)\]\((.*?)\)/g, "$1") // 去除链接
        .replace(/<(.*?)>/g, "") // 去除html标签
        .replace(/ ?TODO ?/g, "") // 去除TODO
    : "";
  const originDescription = WikiData.introduction
    ? String(WikiData.introduction).replace(/\n/g, "").replace(/ /g, "")
    : "";
  const description = originDescription || rawWikiText || "";
  return description.length > 100
    ? description.substring(0, 100) + "..."
    : description;
}