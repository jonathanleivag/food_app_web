"use client";

import { ComponentType, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSharedComponent from "@/components/shared/loading.shared.component";

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const ProtectedComponent = (props: P) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login");
      } else {
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
