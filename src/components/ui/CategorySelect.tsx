import { mergeProps } from "solid-js";
import Select from "~/components/ui/Select";

export default function CategorySelect(props: {
  label: string;
  categories: Map<string, string>;
  onSelect: (value: string) => void;
  disabled?: boolean;
}) {
  props = mergeProps({ disabled: false }, props);
  return <Select label={props.label} options={props.categories} onSelect={props.onSelect} disabled={props.disabled} />;
}
