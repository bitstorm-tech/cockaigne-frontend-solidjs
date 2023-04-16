import { mergeProps } from "solid-js";

export default function FilterIcon(props: { size?: number }) {
  props = mergeProps({ size: 1.5 }, props);
  const style = `height: ${props.size}rem; width: ${props.size}rem`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 141.732 141.732" fill="currentColor" style={style}>
      <path d="M70.908 20.47q25.276.001 50.553-.009a3.931 3.931 0 0 1 3.314 1.206c1.118 1.33 1.041 3.04-.296 4.676-3.438 4.208-6.907 8.392-10.364 12.586Q100.242 55.76 86.35 72.577a4.226 4.226 0 0 0-1.01 2.925c.022 10.042-.048 20.085.013 30.126a4.84 4.84 0 0 1-3.033 4.97c-6.837 3.271-13.601 6.697-20.404 10.04-3.221 1.582-5.538.119-5.54-3.493q-.015-20.868.012-41.736a4.031 4.031 0 0 0-.97-2.788Q36.598 49.872 17.84 27.072a10.292 10.292 0 0 1-1.28-1.781 3.27 3.27 0 0 1 2.62-4.787 14.897 14.897 0 0 1 1.616-.032q25.056-.002 50.112-.001Z" />
    </svg>
  );
}
