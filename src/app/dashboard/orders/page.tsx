"use client";
import DashboardLayout from "@/components/dashboard/dashboardLayout";
import OrdersDashboardComponent from "@/components/dashboard/orders/orders.dashboard.component";
import { withAuth } from "@/hoc/withAuth";
import { useDataFetch } from "@/hooks/useDataFetch.hook";
import { Card } from "@/type";
import { FC } from "react";

const Orders: FC = () => {
  const [carts, loading] = useDataFetch<Card[]>(
    "/cart/completed/user",
    false,
    0,
    0,
    true,
    "",
    []
  );
  return (
    <DashboardLayout selected="Orders">
      {!loading && <OrdersDashboardComponent orders={carts} />}
    </DashboardLayout>
  );
};

export default withAuth(Orders);
