import useCreateAsync from "../hooks/useCreateAsync.ts";
import type {AccountType} from "../types/AccountType.ts";
import useGetAsync from "../hooks/useGetAsync.ts";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.tsx";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "";
const API_AUTH_URL = `${API_BASE_URL}/api/v1/account`;

export function useAddAccountApi() {
    const { data, isLoading, isError, post } = useCreateAsync();

    async function addAccount({ accountName, accountType, balance }: AccountType) {
        await post(`${API_AUTH_URL}`, { accountName, accountType, balance });
    }

    return { data, isLoading, isError, addAccount };
}

export function useGetAllAccountsForUserApi() {
    const { currentUser } = useContext(AuthContext);
    const {data, isLoading, isError, fetch} = useGetAsync();

    async function fetchAllAccountsForUserApi() {
        return await fetch(`${API_AUTH_URL}/user/${currentUser?.id}`);
    }

    return { data, isLoading, isError, fetchAllAccountsForUserApi };
}