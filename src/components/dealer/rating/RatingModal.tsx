import { createSignal } from "solid-js";
import RatingStars from "~/components/dealer/rating/RatingStars";
import Button from "~/components/ui/Button";
import Modal from "~/components/ui/Modal";
import Textarea from "~/components/ui/Textarea";

export const [showRatingModal, setShowRatingModal] = createSignal(false);

export default function RatingModal(props: { onRatingCreate: (text: string, stars: number) => void }) {
  const [ratingText, setRatingText] = createSignal("");
  const [stars, setStars] = createSignal(1);

  const buttons = (
    <>
      <Button
        onClick={() => {
          props.onRatingCreate(ratingText(), stars());
          setShowRatingModal(false);
        }}
      >
        Bewerten
      </Button>
      <Button onClick={() => setShowRatingModal(false)}>Abbrechen</Button>
    </>
  );

  return (
    <Modal show={showRatingModal()} buttons={buttons} onClose={() => setShowRatingModal(false)}>
      <div class="flex flex-col gap-3">
        <RatingStars onStarsSelect={setStars} />
        <Textarea label="Bewertungstext" onChange={(text) => setRatingText(text)} />
      </div>
    </Modal>
  );
}
