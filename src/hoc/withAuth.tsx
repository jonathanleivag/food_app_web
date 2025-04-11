"use client";

import { ComponentType, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSharedComponent from "@/components/shared/loading.shared.component";
import { fetchData } from "@/utils/fetchData.util";
import { JSONWebTokenRevalidate } from "@/type";

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const ProtectedComponent = (props: P) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchToken = async (token: string) => {
        try {
          const data = await fetchData<JSONWebTokenRevalidate>(
            `/auth/revalidate?token=${token}`
          );
          if (data.message === undefined) {
            localStorage.setItem("token", data.token);
          } else {
            localStorage.removeItem("token");
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
        setIsLoading(false);
      }
    }, [router]);

    if (isLoading) {
      return <LoadingSharedComponent />;
    }

    return <WrappedComponent {...props} />;
  };

  ProtectedComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ProtectedComponent;
}
