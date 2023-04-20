import { JSXElement, Show } from "solid-js";

export default function Toast(props: { show: boolean; children: JSXElement }) {
  return (
    <Show when={props.show}>
      <div class="toast-center toast-bottom toast mb-16 w-screen">
        <div class="alert">
          <span>{props.children}</span>
        </div>
      </div>
    </Show>
  );
}
