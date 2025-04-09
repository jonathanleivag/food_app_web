"use client";
import { withAuth } from "@/hoc/withAuth";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-secondary-500 text-sm font-medium">
                Total Sales
              </h3>
              <p className="text-2xl font-semibold text-secondary-900">
                $24,780
              </p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-accent-success text-sm font-medium">
              +12.5%
            </span>
            <span className="text-secondary-500 text-sm ml-2">
              from last month
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-secondary-200">
          <h2 className="text-lg font-medium text-secondary-900">
            Recent Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                  #12345
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                  John Doe
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-accent-success text-white">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                  $150.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default withAuth(DashboardPage);
