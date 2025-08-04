import { useState } from "react";
import axios from "axios";

export default function useUpdateAsync<T>(initialUrl: string = ""): {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  put: (url?: string, body?: T) => Promise<T>;
} {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const put = async (url: string = initialUrl, body?: T): Promise<T> => {
    setLoading(true);
    setError(false);

    try {
      const response = await axios.put<T>(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
      setLoading(false);
      return response.data;
    } catch {
      setError(true);
      setLoading(false);
      throw new Error("Failed to update data");
    }
  };

  return { data, isLoading, isError, put };
}
