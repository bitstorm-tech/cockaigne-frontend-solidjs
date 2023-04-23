import { For, mergeProps } from "solid-js";

export default function Select(props: {
  label: string;
  options: Map<string, string>;
  selected?: string;
  disabled?: boolean;
  onSelect?: (value: string) => void;
}) {
  props = mergeProps(
    {
      disabled: false,
      onSelect: () => {}
    },
    props
  );

  return (
    <div class="form-control">
      <label class="label">
        <span class="label-text text-xs">{props.label}</span>
      </label>
      <select
        class="text-md select-bordered select focus:border-primary focus:outline-none"
        // value={props.value}
        value="2"
        onChange={(e) => props.onSelect!(e.currentTarget.value)}
        disabled={props.disabled}
      >
        <For each={[...props.options.keys()]}>
          {(key) => (
            <option value={key} selected={key === props.selected}>
              {props.options.get(key)}
            </option>
          )}
        </For>
      </select>
    </div>
  );
}
