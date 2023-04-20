import { mergeProps } from "solid-js";

export default function PlusIcon(props: { size?: number }) {
  props = mergeProps({ size: 1.5 }, props);
  const style = `height: ${props.size}rem; width: ${props.size}rem`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style={style}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}
