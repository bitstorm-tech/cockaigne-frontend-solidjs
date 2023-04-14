import { JSXElement } from "solid-js";

export default function DealListContainer(props: { children: JSXElement }) {
  return <div class="flex flex-col gap-1">{props.children}</div>;
}
