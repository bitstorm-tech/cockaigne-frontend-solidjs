import { mergeProps } from "solid-js";

export default function Input(props: {
  id?: string;
  label: string;
  textCenter?: boolean;
  letterSpacing?: boolean;
  type?: string;
  placeholder?: string;
  value?: string;
  min?: number;
  disabled?: boolean;
  maxlength?: string;
  onEnter?: () => void;
  onChange?: (value: string) => void;
}) {
  props = mergeProps(
    {
      id: props.label + Math.random().toString(),
      textCenter: false,
      letterSpacing: false,
      type: "text",
      placeholder: "",
      value: "",
      min: -1,
      disabled: false,
      maxlength: "",
      onEnter: () => {},
      onChange: (value: string) => {}
    },
    props
  );

  function onKeyPress(event: KeyboardEvent) {
    if (event.code === "Enter") {
      props.onEnter!();
    }
  }

  return (
    <div class="form-control">
      <label class="label" for={props.id}>
        <span class="label-text text-xs">{props.label}</span>
      </label>
      <input
        class="input-bordered input focus:border-primary focus:outline-none"
        classList={{ "text-center": props.textCenter, "tracking-[0.5rem]": props.letterSpacing }}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value || ""}
        min={props.min}
        disabled={props.disabled}
        maxlength={props.maxlength}
        onInput={(event) => props.onChange!(event.target.value)}
        onKeyPress={onKeyPress}
      />
    </div>
  );
}
