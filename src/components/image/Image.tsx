import { mergeProps, Show } from "solid-js";
import TrashIcon from "~/components/ui/icons/TrashIcon";

export default function Image(props: {
  url: string;
  showDelete?: boolean;
  fixedHeight?: boolean;
  smallHeight?: boolean;
  onZoom?: () => void;
  onDelete?: () => void;
}) {
  props = mergeProps({ fixedHeight: true, smallHeight: false, showDelete: false }, props);

  function onDelete(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    props.onDelete!();
  }

  return (
    <div class="relative" onClick={props.onZoom}>
      <Show when={props.showDelete}>
        <button class="absolute cursor-pointer p-1 text-red-600" onClick={onDelete}>
          <TrashIcon />
        </button>
      </Show>
      <img
        loading="lazy"
        class="object-cover"
        classList={{ "h-60": props.fixedHeight, "h-36": props.smallHeight }}
        src={props.url}
        alt="Deal or dealer image"
      />
    </div>
  );
}
