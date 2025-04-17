"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import DashboardLayout from "@/components/dashboard/dashboardLayout";
import { initialUsers } from "@/feature/user.slice";
import { withAuth } from "@/hoc/withAuth";
import { useDataFetch } from "@/hooks/useDataFetch.hook";
import { User } from "@/type";
import { FC, useEffect } from "react";

const Users: FC = () => {
  const [data, loading] = useDataFetch<User[]>("/user/user", false, 0, 0, true);
  const users = useAppSelector((state) => state.user.users);
  const dispatchApp = useAppDispatch();

  useEffect(() => {
    if (!loading) {
      dispatchApp(initialUsers(data));
    }
    return () => {};
  }, [data, dispatchApp, loading]);

  return (
    <DashboardLayout selected="Users">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-secondary-800">Users</h1>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-secondary-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-secondary-900">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-500">
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-500">
                      {user.role}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(Users);
