import { useState } from "react";
import axios from "axios";

export default function useCreateAsync<T>(initialUrl: string = ""): {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  post: (url?: string, body?: T) => Promise<T>;
} {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const post = async (url: string = initialUrl, body?: T): Promise<T> => {
    setLoading(true);
    setError(false);

    try {
      const response = await axios.post<T>(url, body, {
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
      throw new Error("Failed to create data");
    }
  };

  return { data, isLoading, isError, post };
}
