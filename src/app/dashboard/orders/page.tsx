"use client";
import DashboardLayout from "@/components/dashboard/dashboardLayout";
import { withAuth } from "@/hoc/withAuth";
import { FC } from "react";

const Orders: FC = () => {
  return (
    <DashboardLayout selected="Orders">
      <div>
        <h1>Orders</h1>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(Orders);
