const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "";
const API_AUTH_URL = `${API_BASE_URL}/api/v1/transaction`;

import useCreateAsync from "../hooks/useCreateAsync.ts";
import type { TransactionType } from "../types/TransactionType.ts";
import useGetAsync from "../hooks/useGetAsync.ts";

export function useGetAllTransactionsForUserApi() {
  const { data, isLoading, isError, fetch } = useGetAsync<TransactionType[]>();

  async function fetchAllTransactionsForUserApi(userId: number) {
    return await fetch(`${API_AUTH_URL}/user/${userId}`);
  }

  return { data, isLoading, isError, fetchAllTransactionsForUserApi };
}

export function useAddTransactionApi() {
  const { data, isLoading, isError, post } = useCreateAsync<TransactionType>();

  async function addTransaction(transaction: TransactionType) {
    await post(`${API_AUTH_URL}/add`, transaction);
  }

  return { data, isLoading, isError, addTransaction };
}
