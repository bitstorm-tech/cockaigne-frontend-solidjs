import { mergeProps, Show } from "solid-js";

export default function Button(props: {
  loading?: boolean;
  warning?: boolean;
  small?: boolean;
  circle?: boolean;
  error?: boolean;
  disabled?: boolean;
  children?: string;
  onClick?: () => void;
}) {
  const _props = mergeProps(
    {
      loading: false,
      warning: false,
      small: false,
      circle: false,
      error: false,
      disabled: false,
      children: "",
      onClick: () => {}
    },
    props
  );

  return (
    <button
      disabled={_props.disabled}
      class="btn"
      classList={{
        loading: _props.loading,
        "btn-primary": !_props.warning,
        "btn-warning": _props.warning,
        "text-gray-200": _props.warning,
        "btn-sm": _props.small,
        "btn-circle": _props.circle,
        "btn-error": _props.error
      }}
      onClick={_props.onClick}
    >
      <Show when={!_props.loading}>{_props.children}</Show>
    </button>
  );
}
