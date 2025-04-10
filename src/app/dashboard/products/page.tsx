"use client";
import DashboardLayout from "@/components/dashboard/dashboardLayout";
import { withAuth } from "@/hoc/withAuth";
import { FC } from "react";

const Products: FC = () => {
  return (
    <DashboardLayout selected="Products">
      <div>
        <h1>Products</h1>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(Products);
