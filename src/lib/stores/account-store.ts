import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { getAccount } from "~/lib/supabase/account-service";
import { Account } from "~/lib/supabase/public-types";
import { getProfileImage } from "~/lib/supabase/storage-service";

export type AccountStore = Partial<
  Pick<Account, "username" | "email" | "street" | "house_number" | "city" | "zip" | "tax_id" | "phone" | "default_category">
>;

export const [account, setAccount] = createStore<AccountStore>({
  username: "",
  email: ""
});

export const [profileImageUrl, setProfileImageUrl] = createSignal("");

export async function loadAccount() {
  const acc = await getAccount();

  if (!acc) {
    return;
  }

  setAccount({
    username: acc.username,
    email: acc.email,
    street: acc.street,
    house_number: acc.house_number,
    city: acc.city,
    zip: acc.zip,
    tax_id: acc.tax_id,
    phone: acc.phone,
    default_category: acc.default_category
  });

  setProfileImageUrl(await getProfileImage(acc.id, acc.is_dealer));
}
