import { createResource, createSignal, For, Suspense } from "solid-js";
import Button from "~/components/ui/Button";
import Checkbox from "~/components/ui/Checkbox";
import Modal from "~/components/ui/Modal";
import RangeSelect from "~/components/ui/RangeSelect";
import categoryService from "~/lib/supabase/category-service";

export const [showDealFilterModal, setShowDealFilterModal] = createSignal(false);

export default function DealFilterModal() {
  const [searchRadius, setSearchRadius] = createSignal(0);
  const [categories] = createResource(categoryService.getCategories);
  const button = <Button onClick={() => setShowDealFilterModal(false)}>Übernehmen</Button>;

  return (
    <Modal show={showDealFilterModal()} buttons={button} onClose={() => setShowDealFilterModal(false)}>
      <div class="m-2 flex max-h-[60vh] flex-col">
        <div class="flex flex-col gap-3">
          <RangeSelect
            label="Suche im Umkreis von {searchRadius} m"
            min={500}
            max={15000}
            step={500}
            value={searchRadius()}
            onChange={(value) => setSearchRadius(value)}
          />
          {/*<Button small on:click={toggleAllCategories}>Alle Filter aktivieren / deaktivieren</Button>*/}
        </div>
        <hr class="my-4" />
        <div class="flex flex-col gap-x-4 overflow-auto">
          <Suspense>
            <For each={categories()}>{(category) => <Checkbox label={category.name} onChange={() => {}} checked={true} />}</For>
          </Suspense>
        </div>
      </div>
    </Modal>
  );
}
