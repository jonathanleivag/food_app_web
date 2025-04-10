"use client";
import DashboardLayout from "@/components/dashboard/dashboardLayout";
import { withAuth } from "@/hoc/withAuth";
import { FC } from "react";

const Customers: FC = () => {
  return (
    <DashboardLayout selected="Customers">
      <div>
        <h1>Customers</h1>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(Customers);
