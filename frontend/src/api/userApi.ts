import useCreateAsync from "../hooks/useCreateAsync.ts";
import type { UserType } from "../types/UserType.ts";
import type { CredentialsType } from "../types/CredentialsType.ts";
import useUpdateAsync from "../hooks/useUpdateAsync.ts";
import useDeleteAsync from "../hooks/useDeleteAsync.ts";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "";
const API_AUTH_URL = `${API_BASE_URL}/api/v1/user`;

export function useRegisterUserApi() {
  const { data, isLoading, isError, post } = useCreateAsync();

  async function registerUser(body: UserType) {
    await post(`${API_AUTH_URL}/register`, body);
  }

  return { data, isLoading, isError, registerUser };
}

export function useLoginUserApi() {
  const { data, isLoading, isError, post } = useCreateAsync();

  async function loginUser(credentials: CredentialsType) {
    return await post(`${API_AUTH_URL}/login`, credentials);
  }

  return { data, isLoading, isError, loginUser };
}

export function useGetUserApi() {
  const { data, isLoading, isError, post } = useCreateAsync<UserType>();

  async function getUser(userId: number) {
    await post(`${API_AUTH_URL}/${userId}`);
  }

  return { data, isLoading, isError, getUser };
}

export function useUpdateUserApi() {
  const { data, isLoading, isError, put } = useUpdateAsync();

  async function updateUser(body: UserType) {
    await put(`${API_AUTH_URL}/${body.id}`, body);
  }

  return { data, isLoading, isError, updateUser };
}

export function useDeleteUserApi() {
  const { data, isLoading, isError, remove } = useDeleteAsync();

  async function deleteUser(userId: number) {
    await remove(`${API_AUTH_URL}/${userId}`);
  }

  return { data, isLoading, isError, deleteUser };
}
