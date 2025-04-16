"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import DashboardLayout from "@/components/dashboard/dashboardLayout";
import ModalWorkersDashboard from "@/components/dashboard/workers/modalWorkers.dashboard";
import ModalLayoutComponent from "@/components/layouts/modal.layout";
import { initialWorkers } from "@/feature/user.slice";
import { withAuth } from "@/hoc/withAuth";
import { useDataFetch } from "@/hooks/useDataFetch.hook";
import { User } from "@/type";
import { FC, useEffect, useRef, useState } from "react";

const Workers: FC = () => {
  const [data, loading] = useDataFetch<User[]>(
    "/user/worker",
    false,
    0,
    0,
    true
  );
  const workers = useAppSelector((state) => state.user.workers);
  const dispatchApp = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading) {
      dispatchApp(initialWorkers(data));
    }
    return () => {};
  }, [data, dispatchApp, loading]);

  return (
    <DashboardLayout selected="Workers">
      <>
        {isModalOpen && (
          <ModalLayoutComponent modalRef={modalRef}>
            <ModalWorkersDashboard setIsModalOpen={setIsModalOpen} />
          </ModalLayoutComponent>
        )}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-secondary-800">
              Workers
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Add New Worker
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-secondary-700">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-secondary-700">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-secondary-700">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-secondary-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {workers.map((worker) => (
                  <tr key={worker.email} className="hover:bg-secondary-50">
                    <td className="px-6 py-4 text-sm text-secondary-800">
                      {worker.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary-800">
                      {worker.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary-800">
                      {worker.role}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-primary-500 hover:text-primary-700 mr-3 cursor-pointer">
                        Edit
                      </button>
                      <button className="text-accent-error hover:text-red-700 cursor-pointer">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </DashboardLayout>
  );
};

export default withAuth(Workers);
