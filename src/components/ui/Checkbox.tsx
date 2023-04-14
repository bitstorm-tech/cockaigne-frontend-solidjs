import { mergeProps } from "solid-js";

export default function Checkbox(props: { label: string; id?: string; disabled?: boolean; onChange?: (value: boolean) => void }) {
  props = mergeProps(
    {
      id: props.label.toLowerCase(),
      disabled: false,
      onChange: () => {}
    },
    props
  );

  return (
    <div class="inline-flex">
      <label class="label cursor-pointer gap-2 px-0">
        <input
          id={props.id}
          class="checkbox"
          type="checkbox"
          onChange={(e) => props.onChange!!(e.target.checked)}
          disabled={props.disabled}
        />
        <span class="label-text">{props.label}</span>
      </label>
    </div>
  );
}
