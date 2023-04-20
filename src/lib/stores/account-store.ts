import { createStore } from "solid-js/store";
import accountService from "~/lib/supabase/account-service";
import { Account } from "~/lib/supabase/public-types";
import storageService from "~/lib/supabase/storage-service";

export const [account, setAccount] = createStore<Partial<Account>>({
  username: "",
  dealer: false
});

export async function loadAccount() {
  const acc = await accountService.getAccount();

  if (acc) {
    acc.profileImageUrl = await storageService.getProfileImage();
    setAccount(acc);
  }
}
