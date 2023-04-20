import { Match, mergeProps, Switch } from "solid-js";

export default function RatingIcon(props: { outline?: boolean; size?: number }) {
  props = mergeProps({ outline: true, size: 1.5 }, props);
  const style = `height: ${props.size}rem; width: ${props.size}rem`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 141.732 141.732" fill="currentColor" style={style}>
      <Switch>
        <Match when={props.outline}>
          <path
            fill="none"
            stroke="#3a4145"
            stroke-miterlimit="10"
            stroke-width="2"
            d="m116.937 47.468 5.724 11.6a.811.811 0 0 0 .611.443l12.8 1.86a.811.811 0 0 1 .45 1.384l-9.262 9.029a.811.811 0 0 0-.234.718l2.187 12.749a.811.811 0 0 1-1.177.855l-11.45-6.02a.811.811 0 0 0-.754 0l-11.45 6.02a.811.811 0 0 1-1.177-.855l2.187-12.749a.811.811 0 0 0-.233-.718l-9.263-9.029a.811.811 0 0 1 .45-1.384l12.8-1.86a.811.811 0 0 0 .611-.444l5.725-11.599a.811.811 0 0 1 1.455 0Zm-45.023 0 5.725 11.6a.811.811 0 0 0 .61.443l12.801 1.86a.811.811 0 0 1 .45 1.384l-9.263 9.029a.811.811 0 0 0-.233.718L84.19 85.25a.811.811 0 0 1-1.177.855l-11.449-6.02a.811.811 0 0 0-.755 0l-11.449 6.02a.811.811 0 0 1-1.177-.855l2.186-12.749a.811.811 0 0 0-.233-.718l-9.263-9.029a.811.811 0 0 1 .45-1.384l12.8-1.86a.811.811 0 0 0 .612-.443l5.724-11.6a.811.811 0 0 1 1.455 0Zm-45.022 0 5.724 11.6a.811.811 0 0 0 .611.443l12.8 1.86a.811.811 0 0 1 .45 1.384l-9.262 9.029a.811.811 0 0 0-.234.718l2.187 12.749a.811.811 0 0 1-1.177.855l-11.45-6.02a.811.811 0 0 0-.754 0l-11.45 6.02a.811.811 0 0 1-1.177-.855l2.187-12.749a.811.811 0 0 0-.233-.718L5.85 62.755a.811.811 0 0 1 .45-1.384l12.8-1.86a.811.811 0 0 0 .611-.444l5.725-11.599a.811.811 0 0 1 1.455 0Z"
          />
        </Match>
        <Match when={!props.outline}>
          <path d="m116.937 47.468 5.724 11.6a.811.811 0 0 0 .611.443l12.8 1.86a.811.811 0 0 1 .45 1.384l-9.262 9.029a.811.811 0 0 0-.234.718l2.187 12.749a.811.811 0 0 1-1.177.855l-11.45-6.02a.811.811 0 0 0-.754 0l-11.45 6.02a.811.811 0 0 1-1.177-.855l2.187-12.749a.811.811 0 0 0-.233-.718l-9.263-9.029a.811.811 0 0 1 .45-1.384l12.8-1.86a.811.811 0 0 0 .611-.444l5.725-11.599a.811.811 0 0 1 1.455 0Zm-45.023 0 5.725 11.6a.811.811 0 0 0 .61.443l12.801 1.86a.811.811 0 0 1 .45 1.384l-9.263 9.029a.811.811 0 0 0-.233.718L84.19 85.25a.811.811 0 0 1-1.177.855l-11.449-6.02a.811.811 0 0 0-.755 0l-11.449 6.02a.811.811 0 0 1-1.177-.855l2.186-12.749a.811.811 0 0 0-.233-.718l-9.263-9.029a.811.811 0 0 1 .45-1.384l12.8-1.86a.811.811 0 0 0 .612-.443l5.724-11.6a.811.811 0 0 1 1.455 0Zm-45.022 0 5.724 11.6a.811.811 0 0 0 .611.443l12.8 1.86a.811.811 0 0 1 .45 1.384l-9.262 9.029a.811.811 0 0 0-.234.718l2.187 12.749a.811.811 0 0 1-1.177.855l-11.45-6.02a.811.811 0 0 0-.754 0l-11.45 6.02a.811.811 0 0 1-1.177-.855l2.187-12.749a.811.811 0 0 0-.233-.718L5.85 62.755a.811.811 0 0 1 .45-1.384l12.8-1.86a.811.811 0 0 0 .611-.444l5.725-11.599a.811.811 0 0 1 1.455 0Z" />
        </Match>
      </Switch>
    </svg>
  );
}