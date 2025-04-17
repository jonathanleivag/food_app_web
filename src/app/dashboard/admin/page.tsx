"use client";
import WorkersAndAdmin from "@/components/dashboard/workersAndAdmin/tableWorkerAdmin.dashboard";
import { withAuth } from "@/hoc/withAuth";
import { FC } from "react";

const Admin: FC = () => {
  return <WorkersAndAdmin type="admin" />;
};

export default withAuth(Admin);
