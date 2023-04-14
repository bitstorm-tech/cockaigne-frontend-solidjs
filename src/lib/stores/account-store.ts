import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import accountService from "~/lib/supabase/account-service";
import storageService from "~/lib/supabase/storage-service";

export type PartialAccount = {
  username: string;
  profileImageUrl: string;
};

const initialState: PartialAccount = {
  username: "Anonymous",
  profileImageUrl: "/images/anonym-profile.png"
};

export const [accountStore, setAccountStore] = createStore<PartialAccount>(initialState);
export const [username, setUsername] = createSignal(initialState.username);
export const [profileImageUrl, setProfileImageUrl] = createSignal(initialState.profileImageUrl);

export async function loadAccountStore() {
  const acc = await accountService.getAccount();
  if (acc) {
    setProfileImageUrl(await storageService.getProfileImage());
    setUsername(acc.username);
  } else {
    clearAccountStore();
  }
}

export function clearAccountStore() {
  setUsername(initialState.username);
  setProfileImageUrl(initialState.profileImageUrl);
}
