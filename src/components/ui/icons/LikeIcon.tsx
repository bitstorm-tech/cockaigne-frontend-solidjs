import { mergeProps } from "solid-js";

export default function LikeIcon(props: { size?: number; dislike?: boolean }) {
  props = mergeProps({ size: 1.5, dislike: false }, props);
  const rotation = props.dislike ? 180 : 0;
  const style = `height: ${props.size}rem; width: ${props.size}rem`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style={style}>
      <path
        transform={`rotate(${rotation} 12 12)`}
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
      />
    </svg>
  );
}
