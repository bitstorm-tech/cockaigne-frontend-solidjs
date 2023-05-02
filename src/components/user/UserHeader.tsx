import { createEffect, createResource, createSignal, For, Suspense } from "solid-js";
import LocationIcon from "~/components/ui/icons/LocationIcon";
import DealsBadge from "~/components/user/DealsBadge";
import FavoriteDealerBadge from "~/components/user/FavoriteDealerBadge";
import HotsBadge from "~/components/user/HotsBadge";
import ProfileImage from "~/components/user/ProfileImage";
import { location } from "~/lib/stores/location-store";
import { getUsername } from "~/lib/supabase/account-service";
import { getCurrentAddress } from "~/lib/supabase/location-service";

export default function UserHeader() {
  const [username] = createResource(() => getUsername());
  const [address, setAddress] = createSignal<string[]>([]);
  // const [username, setUsername] = createSignal("");

  createEffect(async () => setAddress(await getCurrentAddress(location())));
  // createEffect(async () => setUsername(await getUsername()));

  return (
    <div class="flex justify-between text-[#dbdce6]">
      <div class="flex w-full justify-between">
        <div class="m-4 flex flex-col gap-4 pt-2">
          <Suspense>
            <div class="flex gap-1.5 fill-current text-[#69828c]">
              <DealsBadge number={1} />
              <HotsBadge number={2} />
              <FavoriteDealerBadge number={3} />
            </div>
            <span class="text-2xl">{username()}</span>
            <span class="flex flex-col gap-2 text-sm">
              <b>Dein Standort</b>
              <span class="flex gap-1">
                <LocationIcon size={1.5} />
                <div class="flex flex-col text-xs">
                  <For each={address()}>{(addressItem) => <i>{addressItem}</i>}</For>
                </div>
              </span>
            </span>
          </Suspense>
        </div>
        <div class="-mt-6 mr-14 flex flex-col">
          <div class="h-24 w-24">
            <ProfileImage />
          </div>
        </div>
      </div>
    </div>
  );
}
