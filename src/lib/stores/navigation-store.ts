import { createSignal } from "solid-js";

export type Page = "home" | "top" | "map" | "dealOverview";

export const [currentPage, setCurrentPage] = createSignal<Page>("home");
export const [menuOpen, setMenuOpen] = createSignal(false);
