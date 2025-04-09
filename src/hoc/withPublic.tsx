"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function withPublic<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const PublicComponent = (props: P) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (token) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    }, [router]);

    if (isLoading) {
      return <div>Cargando...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  PublicComponent.displayName = `withPublic(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return PublicComponent;
}
