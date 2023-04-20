import { createEffect, createResource, createSignal, For, Show, Suspense } from "solid-js";
import RatingListEntry from "~/components/dealer/rating/RatingListEntry";
import RatingModal, { setShowRatingModal } from "~/components/dealer/rating/RatingModal";
import Button from "~/components/ui/Button";
import EmptyContent from "~/components/ui/EmptyContent";
import LoadingSpinner from "~/components/ui/icons/LoadingSpinner";
import sessionStore from "~/lib/stores/session-store";
import { DealerRatingInsert } from "~/lib/supabase/public-types";
import ratingService from "~/lib/supabase/rating-service";

export default function RatingList(props: { id: string }) {
  const [showRatingButton, setShowRatingButton] = createSignal(false);
  const [averageRating, setAverageRating] = createSignal(0);
  const [ratings, { mutate }] = createResource(async () => await ratingService.getRatings(props.id), { initialValue: [] });

  createEffect(() => {
    setShowRatingButton(!sessionStore.isDealer && !ratings()?.some((rating) => rating.user_id === sessionStore.userId));
    const sum = ratings()
      .map((r) => r.stars!)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    setAverageRating(sum / ratings().length);
  });

  async function saveRating(text: string, stars: number) {
    const rating: DealerRatingInsert = {
      dealer_id: props.id,
      user_id: sessionStore.userId || "",
      rating_text: text,
      stars: stars
    };

    const newRating = await ratingService.saveRating(rating);
    if (newRating) {
      mutate((old) => [newRating, ...old]);
    }
    setShowRatingButton(false);
  }

  const loading = (
    <span class="m-auto mt-10">
      <LoadingSpinner /> Lade Bewertungen ...
    </span>
  );

  return (
    <Suspense fallback={loading}>
      <Show when={showRatingButton()}>
        <div class="grid grid-cols-1 p-2">
          <Button onClick={() => setShowRatingModal(true)}>Schreibe eine Bewertung</Button>
        </div>
      </Show>
      <div class="flex flex-col gap-3">
        <Show when={sessionStore.isDealer && ratings()?.length === 0}>
          <EmptyContent>Leider hat dich noch niemand bewertet :(</EmptyContent>
        </Show>
        <Show when={!sessionStore.isDealer && ratings()?.length === 0}>
          <EmptyContent>Sei der erste der eine Bewertung schreibt!</EmptyContent>
        </Show>
        <Show when={ratings() && ratings()!.length > 0}>
          <span class="m-2">Durchschnitt: {averageRating()}</span>
        </Show>
      </div>
      {/*<Show when={newRating()}>*/}
      {/*  <RatingListEntry rating={newRating()!} />*/}
      {/*</Show>*/}
      <For each={ratings()}>{(rating) => <RatingListEntry rating={rating} />}</For>
      <RatingModal onRatingCreate={saveRating} />
    </Suspense>
  );
}
