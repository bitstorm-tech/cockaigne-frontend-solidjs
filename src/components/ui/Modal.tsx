import { createEffect, JSXElement, Show } from "solid-js";
import CrossIcon from "~/components/ui/icons/CrossIcon";

export default function Modal(props: {
  show: boolean;
  children: JSXElement;
  onClose: () => void;
  buttons?: JSXElement;
  onShow?: () => void;
}) {
  createEffect(() => {
    if (props.show && props.onShow) {
      props.onShow();
    }
  });

  return (
    <div class="modal backdrop-blur-sm" classList={{ "modal-open": props.show }}>
      <div class="modal-box">
        <button class="btn-primary btn-sm btn-circle btn absolute right-2 top-2 z-20" onClick={props.onClose}>
          <CrossIcon size={1.3} />
        </button>
        {props.children}
        <Show when={props.buttons}>
          <div class="modal-action">{props.buttons}</div>
        </Show>
      </div>
    </div>
  );
}
