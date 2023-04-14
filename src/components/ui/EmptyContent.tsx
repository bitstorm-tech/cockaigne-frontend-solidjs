import { JSXElement } from "solid-js";

export default function EmptyContent(props: { children: JSXElement }) {
  return <span class="mx-4 mt-16 grid grid-cols-1 place-items-center text-center text-gray-200 text-opacity-30">{props.children}</span>;
}
