"use client";
import DashboardLayout from "@/components/dashboard/dashboardLayout";
import CardTotalPriceComponent from "@/components/dashboard/home/cardTotalPrice.dashboard.component";
import TableComponent from "@/components/dashboard/home/table/table.dashboard.component";
import { withAuth } from "@/hoc/withAuth";
import { useDataFetch } from "@/hooks/useDataFetch.hook";
import { Card } from "@/type";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { initial } from "@/feature/dashboard.slice";

const DashboardPage = () => {
  const [data, loading] = useDataFetch<Card[]>("/cart/active/completed");
  const carts = useAppSelector((state) => state.dashboard.carts);
  const dispatchApp = useAppDispatch();

  useEffect(() => {
    if (!loading) {
      dispatchApp(initial(data));
    }
    return () => {};
  }, [data, dispatchApp, loading]);

  return (
    <DashboardLayout selected="Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <CardTotalPriceComponent
            total={carts.reduce((acc, card) => acc + card.total, 0)}
          />
        </div>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-secondary-200">
            <h2 className="text-lg font-medium text-secondary-900">
              Recent Orders
            </h2>
          </div>
          <div className="overflow-x-auto">
            {carts.map((cart) => (
              <TableComponent key={cart.id} cart={cart} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(DashboardPage);
