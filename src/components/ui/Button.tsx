import { JSXElement, mergeProps, Show } from "solid-js";

export default function Button(props: {
  loading?: boolean;
  warning?: boolean;
  small?: boolean;
  circle?: boolean;
  error?: boolean;
  disabled?: boolean;
  children?: JSXElement;
  onClick?: () => void;
}) {
  props = mergeProps(
    {
      loading: false,
      warning: false,
      small: false,
      circle: false,
      error: false,
      disabled: false,
      onClick: () => {}
    },
    props
  );

  return (
    <button
      disabled={props.disabled}
      class="btn"
      classList={{
        loading: props.loading,
        "btn-primary": !props.warning,
        "btn-warning": props.warning,
        "text-gray-200": props.warning,
        "btn-sm": props.small,
        "btn-circle": props.circle,
        "btn-error": props.error
      }}
      onClick={props.onClick}
    >
      <Show when={!props.loading}>{props.children}</Show>
    </button>
  );
}
