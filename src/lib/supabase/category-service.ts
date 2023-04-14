import authService from "~/lib/supabase/auth-service";
import type { Category } from "./public-types";
import { supabase } from "./supabase-client";

async function getCategories(): Promise<Category[]> {
  const { data } = await supabase.from("categories").select();

  if (!data) {
    return [];
  }

  return data;
}

async function getSelectedCategories(): Promise<number[]> {
  const { data } = await supabase.from("selected_categories").select("category_id");

  if (!data) {
    return [];
  }
  return data.map((selectedCategory) => selectedCategory.category_id);
}

async function upddateSelcetedCateogry(newCategoryIds: number[]) {
  const userId = await authService.getUserId();

  if (!userId) {
    return;
  }

  await supabase.from("selected_categories").delete().eq("user_id", userId);

  const inserts = newCategoryIds.map((categoryId) => {
    return { user_id: userId, category_id: categoryId };
  });

  await supabase.from("selected_categories").insert(inserts);
}

export default {
  getCategories,
  getSelectedCategories,
  upddateSelcetedCateogry
};
