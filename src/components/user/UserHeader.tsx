import { For } from "solid-js";
import LocationIcon from "~/components/ui/icons/LocationIcon";
import DealsBadge from "~/components/user/DealsBadge";
import FavoriteDealerBadge from "~/components/user/FavoriteDealerBadge";
import HotsBadge from "~/components/user/HotsBadge";
import ProfilePicture from "~/components/user/ProfilePicture";

export default function UserHeader(props: {
  username: string;
  address: string[];
  imageUrl: string;
  favoriteDealers: number;
  hotDeals: number;
  deals: number;
}) {
  return (
    <div class="flex justify-between text-[#dbdce6]">
      <div class="flex w-full justify-between">
        <div class="m-4 flex flex-col gap-4 pt-2">
          <div class="flex justify-between fill-current text-[#69828c]">
            <DealsBadge number={props.deals} />
            <HotsBadge number={props.hotDeals} />
            <FavoriteDealerBadge number={props.favoriteDealers} />
          </div>
          <span class="text-2xl">{props.username}</span>
          <span class="flex flex-col gap-2 text-sm">
            <b>Dein Standort</b>
            <span class="flex gap-1">
              <LocationIcon size={1.5} />
              <div class="flex flex-col text-xs">
                <For each={props.address}>{(addressItem) => <i>{addressItem}</i>}</For>
              </div>
            </span>
          </span>
        </div>
        <div class="-mt-6 mr-14 flex flex-col">
          <div class="h-24 w-24">
            <ProfilePicture imageUrl={props.imageUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
