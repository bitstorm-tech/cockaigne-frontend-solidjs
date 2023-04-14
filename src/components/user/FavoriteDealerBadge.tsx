import StarIcon from "~/components/ui/icons/StarIcon";

export default function FavoriteDealerBadge(props: { number: number }) {
  return (
    <span class="badge gap-2 border border-[#2c363a] bg-transparent text-[#69828c]">
      <StarIcon size={0.8} />
      {props.number}
    </span>
  );
}
