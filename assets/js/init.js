/**
 * 网站域名
 */
export const siteUrl = "https://www.erssbk.com";

/**
 * 图片处理后缀
 */
export const imageSuffix = {
  normal_webp: "/normal.webp",
  normal_jpg: "/normal.jpg",
  thumb_webp: "/thumb.webp",
  thumb_jpg: "/thumb.jpg",
  twitter_card_webp: "/twitter_card.webp",
  twitter_card_jpg: "/twitter_card.jpg",
};

/**
 * Twitter Card 占位图片
 */
export const cardPlaceHolderImage =
  "https://wikioss.xhemj.work/static/ersswiki-no-image-card.png";

/**
 * 懒加载占位图片
 */
export const lazyPlaceHolderImage =
  "https://p1.meituan.net/csc/a2b6160e960cb4cb5bd267ba4285508c5305.png";

/**
 * 加载 Javascript
 */
export function loadJs(src, opt) {
  return new Promise(function (resolve) {
    const script = document.createElement("script");
    const head = document.getElementsByTagName("head")[0];
    script.type = "text/javascript";
    script.src = src;
    if (opt) {
      for (const key in opt) {
        script[key] = opt[key];
      }
    }
    if (script.addEventListener) {
      script.addEventListener("load", resolve, false);
    } else if (script.attachEvent) {
      script.attachEvent("onreadystatechange", () => {
        const target = window.event.srcElement;
        if (target.readyState === "loaded") resolve();
      });
    }
    head.appendChild(script);
  });
}

/**
 * 加载 CSS
 */
export const loadCss = (src) => {
  return new Promise(function (resolve) {
    const link = document.createElement("link");
    const head = document.getElementsByTagName("head")[0];
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = src;
    link.onload = resolve;
    head.appendChild(link);
  });
};

/**
 * 是否支持 Webp
 */
export function isSupportWebp() {
  try {
    return (
      document
        .createElement("canvas")
        .toDataURL("image/webp", 0.5)
        .indexOf("data:image/webp") === 0
    );
  } catch {
    return false;
  }
}

/**
 * 随机数
 */
export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 判断设备是否宽度小于500
 */
export function isMobile() {
  return window.innerWidth < 500;
}

/**
 * 微信分享
 */
export function wxShare(config) {
  window.wx.config({
    debug: false,
    appId: "wxa2cf8095609c9146",
    jsApiList: [
      "checkJsApi",
      "updateAppMessageShareData",
      "updateTimelineShareData",
    ],
  });
  const { title, desc, imgUrl } = config;
  const shareConfig = {
    imgUrl,
    desc,
    title,
    link: window.location.href,
    success: function () {
      console.log("成功了！");
    },
    cancel: function () {
      console.log("取消");
    },
  };
  window.wx.ready(function () {
    window.wx.updateAppMessageShareData(shareConfig);
    window.wx.updateTimelineShareData(shareConfig);
  });
}
