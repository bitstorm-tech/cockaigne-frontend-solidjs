import { getUserId } from "~/lib/supabase/auth-service";
import type { Category } from "./public-types";
import { supabase } from "./supabase-client";

export async function getCategories(): Promise<Category[]> {
  const { data } = await supabase.from("categories").select();

  if (!data) {
    return [];
  }

  return data;
}

export async function getSelectedCategories(): Promise<number[]> {
  const { data } = await supabase.from("selected_categories").select("category_id");

  if (!data) {
    return [];
  }
  return data.map((selectedCategory) => selectedCategory.category_id);
}

export async function upddateSelcetedCateogry(newCategoryIds: number[]) {
  const userId = await getUserId();

  if (!userId) {
    return;
  }

  await supabase.from("selected_categories").delete().eq("user_id", userId);

  const inserts = newCategoryIds.map((categoryId) => {
    return { user_id: userId, category_id: categoryId };
  });

  await supabase.from("selected_categories").insert(inserts);
}
