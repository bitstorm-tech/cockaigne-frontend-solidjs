import { munichPosition, type Position, toPostGisPoint } from "~/lib/geo/geo.types";
import authService from "~/lib/supabase/auth-service";
import type { Account, AccountUpdate } from "./public-types";
import { supabase, translateError } from "./supabase-client";

export type RegistrationData = {
  password: string;
  isDealer: boolean;
  defaultCategory: number;
  street: string;
  houseNumber: string;
  city: string;
  zip: string;
  phone: string;
  username: string;
  email: string;
  age: string;
  gender: string;
  taxId: string;
};

async function getDefaultCategory(): Promise<number> {
  const { data, error } = await supabase.from("accounts").select("default_category").single();

  if (error) {
    console.error("Can't get default category:", error);
    return -1;
  }

  return data.default_category || -1;
}

async function getAccount(): Promise<Account | undefined> {
  const userId = await authService.getUserId();

  if (!userId) return;

  const { data, error } = await supabase.from("accounts").select().eq("id", userId).single();

  if (error) {
    console.error("Can't get account:", error);
    return;
  }

  return data;
}

async function updateAccount(update: AccountUpdate): Promise<string | undefined> {
  console.log("Update account:", update);
  const id = await authService.getUserId();

  if (!id) {
    console.log("Can't update account -> unknown user id");
    return;
  }

  const { error } = await supabase.from("accounts").update(update).eq("id", id);

  if (error) {
    console.log("Can't update account:", error);
    if (error.code === "23505") {
      return "Benutzername bereits vergeben";
    }
  }
}

async function getLocation(street: string, houseNumber: string, city: string, zip: string): Promise<Position | null> {
  const query = `format=json&street=${houseNumber} ${street}&city=${city}&postalcode=${zip}`;
  const response = await fetch(`https://nominatim.openstreetmap.org/search?${query}`);
  const geoInformation = await response.json();

  if (geoInformation.length === 0) {
    console.error("Can't find location for address:", street, houseNumber, zip, city);
    return null;
  }

  return {
    latitude: geoInformation[0].lat,
    longitude: geoInformation[0].lon
  };
}

async function register(registrationData: RegistrationData): Promise<string | undefined> {
  let position: Position = munichPosition;

  if (registrationData.isDealer) {
    const _position = await getLocation(registrationData.street, registrationData.houseNumber, registrationData.city, registrationData.zip);

    if (!_position) {
      return "Adresse ist ungültig";
    }

    position = _position;
  }

  let payload = {
    isDealer: registrationData.isDealer,
    defaultCategory: registrationData.defaultCategory,
    street: registrationData.street,
    houseNumber: registrationData.houseNumber,
    city: registrationData.city,
    zip: registrationData.zip,
    phone: registrationData.phone,
    username: registrationData.username,
    email: registrationData.email,
    age: registrationData.age,
    gender: registrationData.gender,
    taxId: registrationData.taxId,
    location: toPostGisPoint(position)
  };

  const { error } = await supabase.auth.signUp({
    email: registrationData.email,
    password: registrationData.password,
    options: {
      data: payload
    }
  });

  if (error) {
    return translateError(error);
  }
}

async function getUsername(): Promise<string> {
  const userId = await authService.getUserId();

  if (!userId) {
    return "Anonymous";
  }

  const { data, error } = await supabase.from("accounts").select("username").eq("id", userId).single();

  if (error) {
    console.log("Can't get username:", error);
    return "Anonymous";
  }

  return data.username;
}

export default {
  getAccount,
  getDefaultCategory,
  getUsername,
  updateAccount,
  register
};
