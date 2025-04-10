"use client";
import DashboardLayout from "@/components/dashboard/dashboardLayout";
import { withAuth } from "@/hoc/withAuth";
import { FC } from "react";

const Users: FC = () => {
  return (
    <DashboardLayout selected="Users">
      <div>
        <h1>Users</h1>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(Users);
