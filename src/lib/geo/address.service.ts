import type { Position } from "./geo.types";

export interface Address {
  street: string;
  houseNumber: string;
  city: string;
  postcode: number;
  country: string;
}

export async function getAddress(position: Position): Promise<Address | undefined> {
  const { longitude, latitude } = position;
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  const response = await fetch(url);

  if (response.ok) {
    const address = await response.json();
    if (!address) {
      return;
    }

    const { road, house_number, city, postcode, country } = address.address;

    return {
      street: road || "",
      houseNumber: house_number || "",
      city: city || "",
      postcode: postcode || "",
      country: country || ""
    };
  }
}

export async function getLocationFromAddress(address: Address | string): Promise<Position | undefined> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}`;
  const response = await fetch(url);

  if (response.ok) {
    const addresses = await response.json();
    if (addresses.length === 0) {
      return;
    }

    return {
      latitude: +addresses[0].lat,
      longitude: +addresses[0].lon
    };
  }
}

export function addressToString(address: Address): string {
  return address
    ? `${address.street} ${address.houseNumber}, ${address.postcode} ${address.city}, ${address.country}`
    : "Keine Adresse";
}

export function addressToShortString(address: Address | undefined): string[] {
  return address ? [`${address.street} ${address.houseNumber}`, `${address.postcode} ${address.city}`] : ["Keine Adresse"];
}
