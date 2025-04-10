"use client";
import DashboardLayout from "@/components/dashboard/dashboardLayout";
import CardTotalPriceComponent from "@/components/dashboard/home/cardTotalPrice.component";
import TableComponent from "@/components/dashboard/home/table/table.component";
import { withAuth } from "@/hoc/withAuth";

const DashboardPage = () => {
  return (
    <DashboardLayout selected="Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardTotalPriceComponent />
        </div>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-secondary-200">
            <h2 className="text-lg font-medium text-secondary-900">
              Recent Orders
            </h2>
          </div>
          <div className="overflow-x-auto">
            <TableComponent />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(DashboardPage);
