import { centerOfGermany, type Position, toPostGisPoint } from "~/lib/geo/geo.types";
import { getUserId } from "~/lib/supabase/auth-service";
import { getLocationFromAddress } from "~/lib/supabase/location-service";
import type { Account, AccountInsert, AccountUpdate } from "./public-types";
import { supabase, translateError } from "./supabase-client";

export const EMPTY_ACCOUNT: Account = {
  age: 0,
  city: "",
  default_category: 0,
  email: "",
  gender: "",
  house_number: "",
  id: "",
  is_dealer: false,
  location: undefined,
  phone: "",
  search_radius: 0,
  street: "",
  tax_id: "",
  use_current_location: false,
  username: "",
  zip: 0
};

export async function getDefaultCategory(): Promise<number> {
  const userId = await getUserId();

  if (!userId) return -1;

  const { data, error } = await supabase.from("accounts").select("default_category").eq("id", userId).single();

  if (error) {
    console.error("Can't get default category:", error.message);
    return -1;
  }

  return data.default_category || -1;
}

export async function getAccount(): Promise<Account | undefined> {
  const userId = await getUserId();

  if (!userId) return;

  const { data, error } = await supabase.from("accounts").select().eq("id", userId).single();

  if (error) {
    console.error("Can't get account:", error.message);
    return;
  }

  return data;
}

export async function updateAccount(update: AccountUpdate): Promise<string | undefined> {
  console.log("Update account:", update);
  const id = await getUserId();

  if (!id) {
    console.error("Can't update account -> unknown user id");
    return;
  }

  const { error } = await supabase.from("accounts").update(update).eq("id", id);

  if (error) {
    console.error("Can't update account:", error.message);
    if (error.code === "23505") {
      return "Benutzername bereits vergeben";
    }
    return "Da ist leider etwas schief gegangen :(";
  }
}

export async function saveAccount(account: AccountInsert): Promise<string | undefined> {
  let position: Position = centerOfGermany;

  if (account.is_dealer) {
    const _position = await getLocationFromAddress(account.street!, account.house_number!, account.city!, account.zip + "");

    if (!_position) {
      return "Adresse ist ungültig";
    }

    position = _position;
  }

  let payload = {
    isDealer: account.is_dealer,
    defaultCategory: account.default_category,
    street: account.street,
    houseNumber: account.house_number,
    city: account.city,
    zip: account.zip,
    phone: account.phone,
    username: account.username,
    email: account.email,
    age: account.age,
    gender: account.gender,
    taxId: account.tax_id,
    location: toPostGisPoint(position)
  };

  const { error } = await supabase.auth.signUp({
    email: account.email,
    password: account.password,
    options: {
      data: payload
    }
  });

  if (error) {
    return translateError(error);
  }
}

export async function getUsername(userId?: string): Promise<string> {
  userId = userId ? userId : await getUserId();

  if (!userId) {
    return "";
  }

  const { data, error } = await supabase.from("accounts").select("username").eq("id", userId).single();

  if (error) {
    console.error("Can't get username:", error.message);
    return "";
  }

  return data.username;
}
