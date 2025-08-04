import { useState } from "react";
import axios from "axios";

/**
 * Fetches data from API.
 * @param initialUrl - The API endpoint URL
 * @returns Object containing data, loading state, error state, and fetch function
 */
export default function useGetAsync<T>(initialUrl: string = ""): {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  fetch: (url?: string) => Promise<T>;
} {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const fetch = async (url: string = initialUrl): Promise<T> => {
    setLoading(true);
    setError(false);

    try {
      const response = await axios.get<T>(url);
      setData(response.data);
      setLoading(false);
      return response.data;
    } catch {
      setError(true);
      setLoading(false);
      throw new Error("Failed to fetch data");
    }
  };

  return { data, isLoading, isError, fetch };
}
