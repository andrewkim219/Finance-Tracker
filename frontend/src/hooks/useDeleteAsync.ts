import { useState } from "react";
import axios from "axios";

export default function useDeleteAsync<T>(initialUrl: string = ""): {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  remove: (url?: string) => Promise<T>;
} {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const remove = async (url: string = initialUrl): Promise<T> => {
    setLoading(true);
    setError(false);

    try {
      const response = await axios.delete<T>(url);
      setData(response.data);
      setLoading(false);
      return response.data;
    } catch {
      setError(true);
      setLoading(false);
      throw new Error("Failed to delete data");
    }
  };

  return { data, isLoading, isError, remove };
}
