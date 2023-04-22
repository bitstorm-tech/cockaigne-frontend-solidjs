import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import { createStore } from "solid-js/store";
import Image from "~/components/image/Image";
import Button from "~/components/ui/Button";
import ButtonGroup from "~/components/ui/ButtonGroup";
import CategorySelect from "~/components/ui/CategorySelect";
import Checkbox from "~/components/ui/Checkbox";
import ImagePicker from "~/components/ui/ImagePicker";
import Input from "~/components/ui/Input";
import Textarea from "~/components/ui/Textarea";
import authService from "~/lib/supabase/auth-service";
import dealService from "~/lib/supabase/deal-service";
import { DealUpsert } from "~/lib/supabase/public-types";
import storageService from "~/lib/supabase/storage-service";
import dateTimeUtils, { getDateAsIsoString, getDateTimeAsIsoString } from "~/lib/utils/date-time.utils";

const runtimes = {
  "24": "1 Tag",
  "48": "2 Tage",
  "72": "3 Tage"
};

export default function EditDeal() {
  const params = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = createStore<DealUpsert>(dealService.newDeal());
  const [disabled, setDisabled] = createSignal(false);
  const [disabledSave, setDisabledSave] = createSignal(false);
  const [individuallyTime, setIndividuallyTime] = createSignal(false);
  const [individualEndDate, setIndividualEndDate] = createSignal("");
  const [imagePreviewsUrls, setImagePreviewsUrls] = createSignal<string[]>([]);
  const [startDealImmediately, setStartDealImmediately] = createSignal(false);
  const [createTemplate, setCreateTemplate] = createSignal(false);
  const images: File[] = [];
  const costs = () => 4.99 * getDurationInDays();

  onMount(async () => {
    setDeal(params.id ? (await dealService.getDeal(params.id)) || dealService.newDeal() : dealService.newDeal());
    setIndividuallyTime(deal.duration > 72);
    setImagePreviewsUrls(deal.imageUrls || []);
    setIndividualEndDate(
      deal.id ? getDateAsIsoString(new Date(deal.start), +deal.duration * 60) : getDateAsIsoString(new Date(), 25 * 60)
    );
  });

  createEffect(() => {
    if (deal.start > individualEndDate()) {
      setIndividualEndDate(getDateAsIsoString(new Date(deal.start), 25 * 60));
    }
  });

  function handleStartImmediately(value: boolean) {
    setStartDealImmediately(value);
    if (value) {
      setDeal("start", getDateTimeAsIsoString(new Date()));
    }
  }

  function imageSelected(image: File, imagePreviewUrl: string) {
    images.push(image);
    setImagePreviewsUrls((old) => [...old, imagePreviewUrl]);
  }

  function deleteImage(index: number) {
    images.splice(index, 1);
    setImagePreviewsUrls((old) => {
      old.splice(index, 1);
      return [...old];
    });
  }

  async function save() {
    if (deal.template) {
      setDeal({ template: false, id: "" });
    }

    setDeal("duration", getDurationInDays() * 24);
    setDeal("start", dateTimeUtils.formatDateWithTimeZone(deal.start));

    const dealerId = await authService.getUserId();
    if (dealerId) {
      setDeal("dealer_id", dealerId);
    }

    const dealId = await dealService.upsertDeal(deal, createTemplate());

    if (!dealId) {
      return;
    }

    await storageService.saveDealImages(images, dealId);

    navigate("/");
  }

  function getDurationInDays(): number {
    if (individuallyTime()) {
      const startDate = deal.start.split("T")[0];
      const startTimestamp = Date.parse(startDate);
      const endTimestamp = Date.parse(individualEndDate());
      return (endTimestamp - startTimestamp) / (60 * 60 * 1000) / 24;
    }

    return +deal.duration / 24;
  }

  return (
    <div class="flex flex-col gap-4 p-4">
      <Input label={"Titel"} value={deal.title} onChange={(value) => setDeal("title", value)} disabled={disabled()} />
      <Textarea
        label="Beschreibung"
        value={deal.description}
        onChange={(value) => setDeal("description", value)}
        disabled={disabled()}
      />
      <CategorySelect
        value={deal.category_id}
        disabled={disabled()}
        onSelect={(categoryId) => setDeal("category_id", categoryId)}
      />
      <ImagePicker
        onImageSelected={imageSelected}
        buttonText={`Bild hinzufügen (${imagePreviewsUrls().length} / 3)`}
        disabled={imagePreviewsUrls().length >= 3}
        hidePreview={true}
      />
      <div class="grid grid-cols-3 gap-2">
        <For each={imagePreviewsUrls()}>
          {(imagePreviewUrl, index) => (
            <Image url={imagePreviewUrl} showDelete={true} fixedHeight={false} onDelete={() => deleteImage(index())} />
          )}
        </For>
      </div>
      <div class="flex gap-4">
        <Checkbox
          label="Individuelle Laufzeit"
          checked={individuallyTime()}
          onChange={setIndividuallyTime}
          disabled={disabled()}
        />
        <Checkbox
          label="Sofort starten"
          checked={startDealImmediately()}
          onChange={handleStartImmediately}
          disabled={disabled()}
        />
      </div>
      {startDealImmediately() ? (
        <p class="py-7">Dein Deal startet sofort wenn du auf "Erstellen" klickst!</p>
      ) : (
        <Input
          type="datetime-local"
          label="Start"
          value={deal.start}
          min={getDateAsIsoString(new Date()) + "T00:00"}
          onChange={(value) => setDeal("start", value)}
          disabled={disabled() || startDealImmediately()}
        />
      )}
      {individuallyTime() ? (
        <Input
          type="date"
          label="Ende"
          min={individualEndDate()}
          value={individualEndDate()}
          onChange={setIndividualEndDate}
          disabled={disabled()}
        />
      ) : (
        <div class="py-2">
          <ButtonGroup
            label="Laufzeit"
            options={runtimes}
            value={deal.duration.toString()}
            onChange={(value) => setDeal({ duration: +value })}
            disabled={disabled()}
          />
        </div>
      )}
      <div class="grid grid-cols-2 pt-10">
        <div>
          <p class="text-lg font-bold">Kosten: {costs().toFixed(2)} €</p>
          <p class="pt-4 text-xs">{`${getDurationInDays()} Tag(e) a 4,99 € pro Tag`}</p>
        </div>
        <div class="flex flex-col gap-3">
          <Button warning onClick={save} disabled={disabledSave() || disabled()}>
            {deal.id && !deal.template ? "Speichern" : "Erstellen"}
          </Button>
          <Show when={deal.id}>
            <Button error>Löschen</Button>
          </Show>
          <Button small onClick={() => navigate("/")}>
            Abbrechen
          </Button>
          <Show when={!deal.template}>
            <div class="flex justify-center">
              <Checkbox
                label="Zusätzlich als Vorlage speichern"
                checked={createTemplate()}
                onChange={setCreateTemplate}
                disabled={disabled()}
              />
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}
