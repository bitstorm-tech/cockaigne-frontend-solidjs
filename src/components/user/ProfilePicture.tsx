import { mergeProps } from "solid-js";

export default function ProfilePicture(props: { imageUrl: string; size?: number }) {
  const _props = mergeProps({ size: 6 }, props);
  const style = `width: ${_props.size}rem; height: ${_props.size}rem`;

  return (
    <div class="avatar cursor-pointer">
      <div class="rounded-full ring-2 ring-[#556368]" style={style}>
        <img loading="lazy" src={_props.imageUrl} alt="Profile" />
      </div>
    </div>
  );
}
