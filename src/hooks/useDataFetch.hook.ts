import { useEffect, useState, useCallback } from "react";
import { useDataFetchResponse } from "../type";
import { getENV } from "../config/env.config";
import { ENV } from "../enum";

interface PaginatedResponse<T> {
  data: T[];
  total?: number;
  page?: number;
  limit?: number;
}

export const useDataFetch = <T>(
  router: string,
  pagination: boolean = false,
  page: number = 1,
  limit: number = 5,
  token: boolean = false,
  update: unknown = "",
  typeDataInitial: T = [] as T
): useDataFetchResponse<T> => {
  const [data, setData] = useState<T>(typeDataInitial);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const fetchData = useCallback(async (): Promise<void> => {
    try {
      const uri = pagination
        ? `${getENV(ENV.API_URL)}${router}?page=${page}&limit=${limit}`
        : `${getENV(ENV.API_URL)}${router}`;

      const tokenAuth = localStorage.getItem("token");

      if (token && tokenAuth === null) {
        throw new Error("Token not found");
      }

      const response = await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && {
            Authorization: `Bearer ${tokenAuth as string | ""}`,
          }),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData: T = await response.json();

      if (pagination && isPaginatedResponse<T>(jsonData)) {
        setIsLastPage(jsonData.data.length < limit);
      }

      setData(jsonData);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, router, page, limit, token, update]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return [data, isLoading && !isLastPage, error];
};

function isPaginatedResponse<T>(
  response: unknown
): response is PaginatedResponse<T> {
  return (
    typeof response === "object" &&
    response !== null &&
    "data" in response &&
    Array.isArray((response as PaginatedResponse<T>).data)
  );
}
