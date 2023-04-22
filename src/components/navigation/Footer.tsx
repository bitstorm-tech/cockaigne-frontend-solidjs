import { A } from "solid-start";
import DealsOverviewIcon from "~/components/ui/icons/DealsOverviewIcon";
import HomeIcon from "~/components/ui/icons/HomeIcon";
import MapIcon from "~/components/ui/icons/MapIcon";
import TopIcon from "~/components/ui/icons/TopIcon";
import { currentPage } from "~/lib/stores/navigation-store";
import sessionStore from "~/lib/stores/session-store";

export default function Footer() {
  return (
    <footer class="btm-nav btm-nav-sm h-12 border-t-[0.01rem] border-t-[#556368] text-[#69828c]">
      {sessionStore.isDealer ? (
        <>
          <A href="/" activeClass="">
            <HomeIcon outline={currentPage() !== "home"} />
          </A>
          <A href="/deals/overview" activeClass="">
            <DealsOverviewIcon outline={currentPage() !== "dealOverview"} />
          </A>
        </>
      ) : (
        <>
          <A href="/" activeClass="">
            <HomeIcon outline={currentPage() !== "home"} />
          </A>
          <A href="/top" activeClass="">
            <TopIcon outline={currentPage() !== "top"} />
          </A>
          <A href="/map" activeClass="">
            <MapIcon outline={currentPage() !== "map"} />
          </A>
        </>
      )}
    </footer>
  );
}
