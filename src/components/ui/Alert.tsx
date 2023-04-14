import { JSXElement, mergeProps, Show } from "solid-js";
import Button from "~/components/ui/Button";
import WarningIcon from "~/components/ui/icons/WarningIcon";

export default function Alert(props: { show: boolean; children: JSXElement; warning?: boolean; onConfirm: () => void }) {
  props = mergeProps({ warning: true }, props);

  function confirm() {
    props.onConfirm();
  }

  return (
    <Show when={props.show}>
      <div class="transition:blur toast z-10 mb-14 w-screen">
        <div class="alert" classList={{ "alert-warning": props.warning }}>
          <div class="flex w-full">
            <div>
              <WarningIcon size={2} />
            </div>
            <p>{props.children}</p>
          </div>
          <Button onClick={confirm} small warning={props.warning}>
            OK
          </Button>
        </div>
      </div>
    </Show>
  );
}
