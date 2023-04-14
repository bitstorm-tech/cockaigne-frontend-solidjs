import { mergeProps } from "solid-js";

export default function TrashIcon(props: { active?: boolean; size?: number }) {
  const _props = mergeProps({ active: false, size: 1.5 }, props);
  const style = `height: ${_props.size}rem; width: ${_props.size}rem`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={style}>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
