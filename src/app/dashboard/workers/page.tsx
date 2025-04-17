"use client";
import WorkersAndAdmin from "@/components/dashboard/workersAndAdmin/tableWorkerAdmin.dashboard";
import { withAuth } from "@/hoc/withAuth";
import { FC } from "react";

const Workers: FC = () => {
  return <WorkersAndAdmin type="worker" />;
};

export default withAuth(Workers);
