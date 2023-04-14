import { mergeProps } from "solid-js";

export default function DealsOverviewIcon(props: { outline?: boolean; size?: number }) {
  props = mergeProps({ outline: true, size: 1.5 }, props);
  const style = `height: ${props.size}rem; width: ${props.size}rem`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 141.732 141.732" fill="currentColor" stroke="currentColor" style={style}>
      <rect width="86.133" height="100.267" x="33.437" y="24.068" fill="none" stroke-miterlimit="10" stroke-width="6" rx="10.933" />
      <path d="M47.704 72.601h57.6v7.2h-57.6zm0 14h57.6v7.2h-57.6zm0 14h57.6v7.2h-57.6zm-.476-56.227h5.904a11.528 11.528 0 0 1 3.045.306 5.353 5.353 0 0 1 2.412 1.473 7.002 7.002 0 0 1 1.528 2.592 11.827 11.827 0 0 1 .524 3.782 10.519 10.519 0 0 1-.491 3.405 7.042 7.042 0 0 1-1.714 2.826 5.676 5.676 0 0 1-2.27 1.277 9.774 9.774 0 0 1-2.86.339h-6.078Zm3.23 2.707v10.597h2.412a8.773 8.773 0 0 0 1.954-.153 2.987 2.987 0 0 0 1.304-.665 3.394 3.394 0 0 0 .846-1.545 10.452 10.452 0 0 0 .327-2.93 9.57 9.57 0 0 0-.327-2.849 3.667 3.667 0 0 0-.917-1.55 3.074 3.074 0 0 0-1.495-.752 14.632 14.632 0 0 0-2.652-.153ZM63.38 60.374v-16h11.864v2.707H66.61v3.547h8.032v2.696H66.61v4.354h8.938v2.696Zm29.336 0h-3.514l-1.397-3.634H81.41l-1.32 3.634h-3.428l6.232-16h3.416Zm-5.947-6.33-2.205-5.937-2.161 5.937Zm7.748 6.33V44.505h3.23v13.173h8.033v2.696Z" />
    </svg>
  );
}
