import type { CategoryType } from "../types/CategoryType.ts";
import useGetAsync from "../hooks/useGetAsync.ts";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "";
const API_AUTH_URL = `${API_BASE_URL}/api/v1/category`;

export function useGetAllCategoriesForUserApi() {
  const { data, isLoading, isError, fetch } = useGetAsync<CategoryType[]>();

  async function fetchAllCategoriesForUserApi(userId: number) {
    return await fetch(`${API_AUTH_URL}/all/${userId}`);
  }

  return { data, isLoading, isError, fetchAllCategoriesForUserApi };
}
