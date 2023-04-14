import { mergeProps } from "solid-js";

export default function SonstigesIcon(props: { size?: number }) {
  props = mergeProps({ size: 1.5 }, props);
  const style = `height: ${props.size}rem; width: ${props.size}rem`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 141.732 141.732" fill="currentColor" style={style}>
      <circle cx="70.866" cy="70.866" r="56.693" />
      <path d="M40.44 67.6a3.267 3.267 0 1 1-3.267 3.266A3.27 3.27 0 0 1 40.44 67.6m0-3a6.267 6.267 0 1 0 6.267 6.267A6.267 6.267 0 0 0 40.44 64.6Zm31.837 3a3.267 3.267 0 1 1-3.266 3.266 3.27 3.27 0 0 1 3.266-3.267m0-3a6.267 6.267 0 1 0 6.267 6.267 6.267 6.267 0 0 0-6.267-6.267Zm29.015 3.001a3.267 3.267 0 1 1-3.266 3.266 3.27 3.27 0 0 1 3.266-3.267m0-3a6.267 6.267 0 1 0 6.267 6.267 6.267 6.267 0 0 0-6.267-6.267Z" />
    </svg>
  );
}
