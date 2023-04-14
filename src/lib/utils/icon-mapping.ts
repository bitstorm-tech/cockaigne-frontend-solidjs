const iconRootPath = "/icons/";

const icons = [
  "1_elektronik_technik.png",
  "2_unterhaltung_gaming.png",
  "3_lebensmittel_haushalt.png",
  "4_fashion_schmuck_lifestyle.png",
  "5_beauty_wellnes_gesundheit.png",
  "6_family_kids.png",
  "7_home_living.png",
  "8_baumarkt_garten.png",
  "9_auto_fahrrad_motorrad.png",
  "10_gastronomie_bars_cafes.png",
  "11_kultur_freizeit.png",
  "12_sport_outdoor.png",
  "13_reisen_hotels_uebernachtungen.png",
  "14_dienstleistungen_finanzen.png",
  "15_floristik.png",
  "16_sonstiges.png"
];

export function getIconPathById(id: number): string {
  return iconRootPath + icons.find((icon) => icon.startsWith(id + "_"));
}
