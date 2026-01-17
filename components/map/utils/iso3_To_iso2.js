import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

countries.registerLocale(en);

export const iso3ToIso2 = (iso3) => {
  if (!iso3) return "UN";

  const code = iso3.toString().trim().toUpperCase();
  const iso2 = countries.alpha3ToAlpha2(code);

  return iso2 || "UN";
};
