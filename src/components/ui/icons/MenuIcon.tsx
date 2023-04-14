import { mergeProps } from "solid-js";

export default function MenuIcon(props: { size?: number }) {
  props = mergeProps({ size: 1.5 }, props);
  const style = `height: ${props.size}rem; width: ${props.size}rem`;

  return (
    <svg viewBox="0 0 28.35 28.35" fill="currentColor" style={style}>
      <path d="M20.75,1.54c3.34,0,6.06,2.72,6.06,6.06v13.15c0,3.34-2.72,6.06-6.06,6.06H7.6c-3.34,0-6.06-2.72-6.06-6.06 V7.6c0-3.34,2.72-6.06,6.06-6.06H20.75 M20.75,0.54H7.6c-3.9,0-7.06,3.16-7.06,7.06v13.15c0,3.9,3.16,7.06,7.06,7.06h13.15 c3.9,0,7.06-3.16,7.06-7.06V7.6C27.8,3.7,24.64,0.54,20.75,0.54L20.75,0.54z" />
      <circle cx="18.45" cy="9.85" r="2.03" />
      <circle cx="18.45" cy="18.5" r="2.03" />
      <circle cx="9.9" cy="18.5" r="2.03" />
      <circle cx="9.9" cy="9.85" r="2.03" />
    </svg>
  );
}
