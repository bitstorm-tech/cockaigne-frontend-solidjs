import { mergeProps } from "solid-js";
import Select from "~/components/ui/Select";

export default function CategorySelect(props: {
  label: string;
  categories: Map<string, string>;
  onSelect: (value: number) => void;
  value?: number;
  disabled?: boolean;
}) {
  props = mergeProps({ disabled: false }, props);
  return (
    <Select
      label={props.label}
      options={props.categories}
      value={props.value?.toString() || ""}
      onSelect={(value) => props.onSelect(+value)}
      disabled={props.disabled}
    />
  );
}
