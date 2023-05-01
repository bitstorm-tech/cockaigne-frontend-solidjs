import { createEffect, createSignal, For, onCleanup, onMount } from "solid-js";
import Button from "~/components/ui/Button";
import Textarea from "~/components/ui/Textarea";
import { Position } from "~/lib/geo/geo.types";

export type SearchResult = {
  location: Position;
  address: string;
};

type NominatimSearchResult = {
  lat: number;
  lon: number;
  display_name: string;
};

export default function AddressSearch(props: {
  address?: string;
  disabled?: boolean;
  onAddressSelected: (result: SearchResult) => void;
}) {
  const [searchText, setSearchText] = createSignal("");
  const [searchResult, setSearchResult] = createSignal<NominatimSearchResult[]>([]);

  onMount(() => document.body.addEventListener("click", closeSearchResult));
  onCleanup(() => document.body.removeEventListener("click", closeSearchResult));

  createEffect(() => setSearchText(props.address || ""));

  async function search() {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${searchText()}`;
    const response = await fetch(url);
    if (response.ok) {
      const addresses = await response.json();
      if (addresses.length === 0) {
        return;
      }

      if (addresses.length === 1) {
        selectSearchResult(addresses[0]);
        return;
      }

      setSearchResult(addresses);
    }
  }

  function closeSearchResult() {
    setSearchResult([]);
  }

  function selectSearchResult(searchResult: NominatimSearchResult) {
    const location: Position = {
      latitude: searchResult.lat,
      longitude: searchResult.lon
    };

    props.onAddressSelected({ location, address: searchResult.display_name });
  }

  return (
    <>
      <Textarea
        label="Adresse"
        value={searchText()}
        onEnter={search}
        onChange={setSearchText}
        disabled={props.disabled}
        resize={false}
        lines={2}
      />
      <ul
        class="dropdown-content textarea-bordered textarea absolute z-10 mr-8 mt-8 max-h-[70%] overflow-auto bg-primary p-4"
        classList={{ invisible: searchResult().length < 2 }}
      >
        <For each={searchResult()}>
          {(result, index) => (
            <>
              <li class="cursor-pointer hover:bg-base-100" onClick={() => selectSearchResult(result)}>
                {result.display_name}
              </li>
              {index() < searchResult().length - 1 && <div class="divider"></div>}
            </>
          )}
        </For>
      </ul>
      <Button onClick={search} disabled={props.disabled}>
        Suchen
      </Button>
    </>
  );
}
