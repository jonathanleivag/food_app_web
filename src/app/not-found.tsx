"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSharedComponent from "@/components/shared/loading.shared.component";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return <LoadingSharedComponent />;
}
