"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSharedComponent from "@/components/shared/loading.shared.component";
import { fetchData } from "@/utils/fetchData.util";
import { JSONWebTokenRevalidate } from "@/type";
import { useAppDispatch } from "./hooks";
import { initial, setRole } from "@/feature/user.slice";

export default function NotFound() {
  const router = useRouter();
  const dispatchApp = useAppDispatch();

  useEffect(() => {
    const fetchToken = async (token: string) => {
      try {
        const data = await fetchData<JSONWebTokenRevalidate>(
          `/auth/revalidate?token=${token}`
        );
        if (data.message === undefined) {
          localStorage.setItem("token", data.token);
          dispatchApp(initial(data.user!.name!));
          dispatchApp(setRole(data.user!.role!));

          if (data.user!.role === "WORKER") {
            router.replace("/dashboard/orders");
          } else {
            router.replace("/dashboard");
          }
        } else {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          router.replace("/login");
        }
      }
    };

    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    } else {
      fetchToken(token);
    }
  }, [dispatchApp, router]);

  return <LoadingSharedComponent />;
}
