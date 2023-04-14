import { For } from "solid-js";

export default function Test() {
  return (
    <div class="h-full overflow-scroll">
      <For each={Array(30)}>{() => <div class="my-4 bg-green-700 p-2">Test</div>}</For>
      <div class="my-4 bg-red-600 p-2">ENDE</div>
    </div>
  );
}
