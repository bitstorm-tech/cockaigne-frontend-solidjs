import { createSignal, For, onMount, Show } from "solid-js";

export default function ButtonGroup(props: {
  label?: string;
  value?: string;
  disabled?: boolean;
  options: Record<string, string>;
  onChange: (value: string) => void;
}) {
  const [activeButton, setActiveButton] = createSignal("");
  onMount(() => props.value && setActiveButton(props.value));

  function clickHandler(value: string) {
    setActiveButton(value);
    props.onChange(value);
  }

  return (
    <div class="form-control">
      <Show when={props.label}>
        <label class="label">
          <span class="label-text text-xs">{props.label}</span>
        </label>
      </Show>
      <div class="btn-group">
        <For each={Object.keys(props.options)}>
          {(key) => (
            <button
              class="btn-outline btn-sm btn grow"
              classList={{ "btn-active": activeButton() === key }}
              onClick={() => clickHandler(key)}
              disabled={props.disabled}
            >
              {props.options[key]}
            </button>
          )}
        </For>
      </div>
    </div>
  );
}
