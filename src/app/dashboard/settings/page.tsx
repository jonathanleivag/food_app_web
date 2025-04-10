"use client";
import DashboardLayout from "@/components/dashboard/dashboardLayout";
import { withAuth } from "@/hoc/withAuth";
import { FC } from "react";

const Settings: FC = () => {
  return (
    <DashboardLayout selected="Settings">
      <div>
        <h1>Settings</h1>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(Settings);
