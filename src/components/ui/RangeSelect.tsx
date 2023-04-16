import { mergeProps } from "solid-js";

export default function RangeSelect(props: {
  label: string;
  min: number;
  max: number;
  step: number;
  id?: string;
  value?: number;
  onChange?: (value: number) => void;
}) {
  props = mergeProps(
    {
      id: props.label.toLowerCase(),
      onChange: () => {}
    },
    props
  );

  return (
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text text-xs">{props.label}</span>
      </label>
      <input
        id={props.id}
        class="range"
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onInput={(e) => props.onChange!(+e.target.value)}
      />
    </div>
  );
}
