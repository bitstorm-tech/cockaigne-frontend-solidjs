import { mergeProps } from "solid-js";

export default function Textarea(props: {
  label: string;
  id?: string;
  lines?: number;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  resize?: boolean;
  onChange?: (value: string) => void;
  onEnter?: () => void;
}) {
  props = mergeProps(
    {
      id: props.label?.toLowerCase(),
      value: "",
      resize: true,
      onChange: () => {},
      onEnter: () => {}
    },
    props
  );

  function handleKeyPress(event: KeyboardEvent) {
    if (event.code === "Enter") {
      props.onEnter!();
    }
  }

  return (
    <div class="form-control">
      <label class="label">
        <span class="label-text text-xs">{props.label}</span>
      </label>
      <textarea
        class="textarea-bordered textarea focus:border-primary focus:outline-none"
        classList={{ "resize-none": !props.resize }}
        id={props.id}
        rows={props.lines}
        placeholder={props.placeholder}
        disabled={props.disabled}
        onInput={(e) => props.onChange!(e.target.value)}
        onKeyPress={handleKeyPress}
        value={props.value}
      />
    </div>
  );
}
