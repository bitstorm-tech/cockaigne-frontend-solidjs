import { mergeProps, Show } from "solid-js";

export default function RatingStars(props: {
  stars?: number;
  id?: string;
  showLabel?: boolean;
  disabled?: boolean;
  onStarsSelect?: (value: number) => void;
}) {
  props = mergeProps(
    {
      stars: 1,
      id: Math.random().toString(),
      showLabel: true,
      disabled: false,
      onStarsSelect: (value: number) => {}
    },
    props
  );
  const name = "rating-" + props.id;

  return (
    <>
      <Show when={props.showLabel}>
        <label class="label">
          <span class="label-text text-xs">Bewertung</span>
        </label>
      </Show>
      <div class="rating gap-2">
        <input
          type="radio"
          name={name}
          class="mask mask-star-2"
          disabled={props.disabled}
          checked={props.stars === 1}
          onClick={() => props.onStarsSelect!(1)}
          value={1}
        />
        <input
          type="radio"
          name={name}
          class="mask mask-star-2"
          disabled={props.disabled}
          checked={props.stars === 2}
          onClick={() => props.onStarsSelect!(2)}
          value={2}
        />
        <input
          type="radio"
          name={name}
          class="mask mask-star-2"
          disabled={props.disabled}
          checked={props.stars === 3}
          onClick={() => props.onStarsSelect!(3)}
          value={3}
        />
        <input
          type="radio"
          name={name}
          class="mask mask-star-2"
          disabled={props.disabled}
          checked={props.stars === 4}
          onClick={() => props.onStarsSelect!(4)}
          value={4}
        />
        <input
          type="radio"
          name={name}
          class="mask mask-star-2"
          disabled={props.disabled}
          checked={props.stars === 5}
          onClick={() => props.onStarsSelect!(5)}
          value={5}
        />
      </div>
    </>
  );
}
