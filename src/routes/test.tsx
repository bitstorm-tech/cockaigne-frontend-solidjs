import { For } from "solid-js";

export const TestContent = (
  <div class="h-full overflow-scroll">
    <For each={Array(30)}>{() => <div class="my-1 bg-green-700 p-4">Test</div>}</For>
    <div class="my-1 bg-red-600 p-4">ENDE</div>
  </div>
);

export default function Test() {
  return <>{TestContent}</>;
}
