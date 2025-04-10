"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSharedComponent from "@/components/shared/loading.shared.component";

export function withPublic<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const PublicComponent = (props: P) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token");
      console.log("🚀 ~ useEffect ~ token:", token);

      if (token) {
        router.replace("/dashboard");
      } else {
        setIsLoading(false);
      }
    }, [router]);

    if (isLoading) {
      return <LoadingSharedComponent />;
    }

    return <WrappedComponent {...props} />;
  };

  PublicComponent.displayName = `withPublic(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return PublicComponent;
}
