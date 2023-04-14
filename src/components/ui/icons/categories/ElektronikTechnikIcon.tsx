import { mergeProps } from "solid-js";

export default function ElektronikTechnikIcon(props: { size?: number }) {
  props = mergeProps({ size: 1.5 }, props);
  const style = `height: ${props.size}rem; width: ${props.size}rem`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 141.73228 141.73228" fill="currentColor" style={style}>
      <path d="m115.628 96.457 8.918 8.379a.205.205 0 0 1 .014.082H17.17a.189.189 0 0 1 .01-.073l8.92-8.388h89.527m.27-3H25.834a2.378 2.378 0 0 0-1.635.67l-9.073 8.532c-1.878 1.764-.794 5.259 1.632 5.259h108.217c2.425 0 3.509-3.495 1.632-5.259l-9.077-8.532a2.366 2.366 0 0 0-1.632-.67Zm-2.189-56.734v52.571H27.803V36.723h85.905m.165-3H27.638a2.835 2.835 0 0 0-2.835 2.834V89.46a2.835 2.835 0 0 0 2.835 2.835h86.235a2.835 2.835 0 0 0 2.835-2.835V36.557a2.835 2.835 0 0 0-2.835-2.834Z" />
    </svg>
  );
}
