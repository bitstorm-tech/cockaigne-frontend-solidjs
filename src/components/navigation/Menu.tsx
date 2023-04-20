import { A, useNavigate } from "solid-start";
import LegalFooter from "~/components/navigation/LegalFooter";
import GearIcon from "~/components/ui/icons/GearIcon";
import LoginIcon from "~/components/ui/icons/LoginIcon";
import LogoutIcon from "~/components/ui/icons/LogoutIcon";
import NewsIcon from "~/components/ui/icons/NewsIcon";
import RegistrationIcon from "~/components/ui/icons/RegistrationIcon";
import authService from "~/lib/supabase/auth-service";

export default function Menu({ isLoggendIn = false }) {
  const navigate = useNavigate();

  async function logout() {
    await authService.logout();
    navigate("/");
  }

  return (
    <div class="z-50 flex flex-col gap-8 bg-base-300 p-4">
      {isLoggendIn ? (
        <>
          <A href="/settings" class="flex h-8 items-center gap-3">
            <GearIcon />
            Einstellungen
          </A>
          <A href="/changelog" class="flex h-8 items-center gap-3">
            <NewsIcon />
            Was gibt es Neues?
          </A>
          <button onClick={logout} class="flex h-8 cursor-pointer items-center gap-3">
            <LogoutIcon />
            Logout
          </button>
        </>
      ) : (
        <>
          <A href="/login" class="flex h-8 items-center gap-3">
            <LoginIcon />
            Login
          </A>
          <A href="/registration" class="flex h-8 items-center gap-3">
            <RegistrationIcon />
            Registrieren
          </A>
        </>
      )}
      <div class="mt-8">
        <LegalFooter />
      </div>
    </div>
  );
}
