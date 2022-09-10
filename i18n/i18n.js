const MAIN = "MAIN_";

// 采用将翻译放在一起来减少打包体积
export const i18n = {
  /**
   * "中文",
   * "English"
   */
  [MAIN + "ERSSWIKI"]: ["耳斯百科", "ERSSWIKI"],
  [MAIN + "DEVELOPMENT"]: ["开发版", "Development"],

  /* WikiSearch, WikiPCSearch */
  [MAIN + "SEARCH_ITEM"]: ["搜索词条", "Search Entries"],

  /* WikiPcDetailList */
  [MAIN + "BASIC_INFORMATION"]: ["基本信息", "Information"],

  /* WikiPcStatus */
  [MAIN + "BASIC_STATISTICS"]: ["词条统计", "Statistics"],
  [MAIN + "STATISTICS_CREATE"]: ["创建时间", "Create"],
  [MAIN + "STATISTICS_UPDATE"]: ["更新时间", "Update"],
  /* WikiPicture */
  [MAIN + "LARGER_IMAGE_TIPS"]: [
    "（点击可查看大图）",
    "(Click to view larger image)",
  ],
};
