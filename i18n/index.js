import { i18n } from "./i18n";

const langs = {
  zh: 0,
  en: 1,
};
const locales = Object.keys(langs);
const defaultLocale = "zh";
const translateSring = {};

for (const key in i18n) {
  const value = i18n[key];
  for (let i in locales) {
    const locale = locales[i];
    if (!translateSring[locale]) {
      translateSring[locale] = {};
    }
    translateSring[locale][key] = value[i];
  }
}

export { langs, locales, defaultLocale, translateSring };
