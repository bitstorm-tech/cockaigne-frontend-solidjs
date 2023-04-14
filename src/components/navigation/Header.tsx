import { createSignal, Show } from "solid-js";
import { A } from "solid-start";
import MemberStatus from "~/components/navigation/MemberStatus";
import Menu from "~/components/navigation/Menu";
import CrossIcon from "~/components/ui/icons/CrossIcon";
import MenuIcon from "~/components/ui/icons/MenuIcon";
import sessionStore from "~/lib/stores/session-store";

export default function Header() {
  const [showMenu, setShowMenu] = createSignal(false);

  function toggleMenu() {
    setShowMenu(!showMenu());
  }

  return (
    <>
      <nav class="flex items-center border-b-[0.01rem] border-[#556368] px-4 py-2 md:px-52">
        <div class="flex w-full justify-between text-xl">
          <div class="flex items-end gap-6">
            <A href="/">
              <img loading="lazy" class="h-7" src="/images/logo.svg" alt="Bildmarke" />
            </A>
            <MemberStatus />
          </div>
          <div class="z-20 flex cursor-pointer text-[#69828c]">
            {showMenu() ? (
              <button onClick={toggleMenu}>
                <CrossIcon size={1.85} />
              </button>
            ) : (
              <button onClick={toggleMenu}>
                <MenuIcon size={1.85} />
              </button>
            )}
          </div>
        </div>
      </nav>
      <Show when={showMenu()}>
        <div class="absolute z-50 w-screen border-b-[0.01rem] border-[#556368]" onClick={toggleMenu}>
          <Menu isLoggendIn={!!sessionStore.userId} />
        </div>
      </Show>
    </>
  );
}
