function formatText(text) {
  return String(text)
    .replace(/[#]{1,6} ?(.*?)(\n|\r)/g, "") // 去除标题
    .replace(/\[\^\d+?\]/g, "") // 去除上标脚注
    .replace(/---/g, "") // 去除分隔线
    .replace(/\n/g, "") // 去除换行符
    .replace(/\[\d+?\]/g, "") // 去除下标脚注
    .replace(/ /g, "") // 去除空格
    .replace(/<WImg(.*?)><\/WImg>/g, "") // 去除图片
    .replace(/<WikiVideo(.*?)><\/WikiVideo>/g, "") // 去除视频
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1") // 去除链接
    .replace(/<(.*?)>/g, "") // 去除html标签
    .replace(/ ?TODO ?/g, ""); // 去除TODO
}

/**
 * 获取百科简介
 * @param {any} WikiData Nuxt Content Body
 * @returns 百科简介
 */
export default function getWikiDescription(WikiData = {}) {
  const rawWikiText = WikiData.text ? formatText(WikiData.text) : "";
  const originDescription = WikiData.introduction
    ? formatText(WikiData.introduction)
    : "";
  let description = originDescription + rawWikiText || "";
  if (String(description).startsWith(WikiData.title)) {
    description = description.replace(new RegExp(`(${WikiData.title})，?`), "");
  }
  return description.length > 200
    ? description.substring(0, 200) + "..."
    : description;
}
