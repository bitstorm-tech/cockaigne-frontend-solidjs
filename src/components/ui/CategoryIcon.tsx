import AutoFahrradMotorradIcon from "~/components/ui/icons/categories/AutoFahrradMotorradIcon";
import BaumarktGartenIcon from "~/components/ui/icons/categories/BaumarktGartenIcon";
import BeautyWellnessGesundheitIcon from "~/components/ui/icons/categories/BeautyWellnessGesundheitIcon";
import DienstleistungenFinanzenIcon from "~/components/ui/icons/categories/DienstleistungenFinanzenIcon";
import ElektronikTechnikIcon from "~/components/ui/icons/categories/ElektronikTechnikIcon";
import FamilyKidsIcon from "~/components/ui/icons/categories/FamilyKidsIcon";
import FashionSchmuckLifestyleIcon from "~/components/ui/icons/categories/FashionSchmuckLifestyleIcon";
import FloristikIcon from "~/components/ui/icons/categories/FloristikIcon";
import GastronomieBarsCafesIcon from "~/components/ui/icons/categories/GastronomieBarsCafesIcon";
import HomeLivingIcon from "~/components/ui/icons/categories/HomeLivingIcon";
import KulturFreizeitIcon from "~/components/ui/icons/categories/KulturFreizeitIcon";
import LebensmittelHaushaltIcon from "~/components/ui/icons/categories/LebensmittelHaushaltIcon";
import ReisenHotelsUebernachtungenIcon from "~/components/ui/icons/categories/ReisenHotelsUebernachtungenIcon";
import SonstigesIcon from "~/components/ui/icons/categories/SonstigesIcon";
import SportOutdoorIcon from "~/components/ui/icons/categories/SportOutdoorIcon";
import UnterhaltungGamingIcon from "~/components/ui/icons/categories/UnterhaltungGamingIcon";
import CrossIcon from "~/components/ui/icons/CrossIcon";

const ICON_SIZE = 2.8;

export const Categories = {
  0: {
    icon: () => <CrossIcon size={ICON_SIZE} />,
    color: "fuchsia"
  },
  1: {
    // Elektronik & Technik
    icon: () => <ElektronikTechnikIcon size={ICON_SIZE} />,
    color: "#6898af"
  },
  2: {
    // Unterhaltung & Gaming
    icon: () => <UnterhaltungGamingIcon size={ICON_SIZE} />,
    color: "#4774b2"
  },
  3: {
    // Lebensmittel & Haushalt
    icon: () => <LebensmittelHaushaltIcon size={ICON_SIZE} />,
    color: "#86b200"
  },
  4: {
    // Fashion & Schmuck & Lifestyle
    icon: () => <FashionSchmuckLifestyleIcon size={ICON_SIZE} />,
    color: "#b3396a"
  },
  5: {
    // Beauty & Wellness & Gesundheit
    icon: () => <BeautyWellnessGesundheitIcon size={ICON_SIZE} />,
    color: "#9059b3"
  },
  6: {
    // Family & Kids
    icon: () => <FamilyKidsIcon size={ICON_SIZE} />,
    color: "#02b0b2"
  },
  7: {
    // Home & Living
    icon: () => <HomeLivingIcon size={ICON_SIZE} />,
    color: "#b2aba0"
  },
  8: {
    // Baumarkt & Garten
    icon: () => <BaumarktGartenIcon size={ICON_SIZE} />,
    color: "#b28d4b"
  },
  9: {
    // Auto & Fahrrad & Motorrad
    icon: () => <AutoFahrradMotorradIcon size={ICON_SIZE} />,
    color: "#5c5e66"
  },
  10: {
    // Gastronomie & Bars & Cafes
    icon: () => <GastronomieBarsCafesIcon size={ICON_SIZE} />,
    color: "#b35a37"
  },
  11: {
    // Kultur & Freizeit
    icon: () => <KulturFreizeitIcon size={ICON_SIZE} />,
    color: "#b3b100"
  },
  12: {
    // Sport & Outdoor
    icon: () => <SportOutdoorIcon size={ICON_SIZE} />,
    color: "#b22929"
  },
  13: {
    // Reisen & Hotels & Übernachtungen
    icon: () => <ReisenHotelsUebernachtungenIcon size={ICON_SIZE} />,
    color: "#3d484b"
  },
  14: {
    // Dienstleistungen & Finanzen
    icon: () => <DienstleistungenFinanzenIcon size={ICON_SIZE} />,
    color: "#465c8e"
  },
  15: {
    // Floristik
    icon: () => <FloristikIcon size={ICON_SIZE} />,
    color: "#60b262"
  },
  16: {
    // Sonstiges
    icon: () => <SonstigesIcon size={ICON_SIZE} />,
    color: "#b3b3b3"
  }
};

export default function CategoryIcon(props: { categoryId: number }) {
  // @ts-ignore
  const category = Categories[props.categoryId];
  const Icon = () => category.icon;

  return (
    <div class="m-2 rounded" style={`background: ${category.color}`}>
      <Icon />
    </div>
  );
}
