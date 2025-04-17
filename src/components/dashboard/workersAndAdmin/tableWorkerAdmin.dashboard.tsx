"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import DashboardLayout from "@/components/dashboard/dashboardLayout";
import ModalWorkersAndAdminDashboard from "@/components/dashboard/workersAndAdmin/modalWorkersAndAdmin.dashboard";
import ModalLayoutComponent from "@/components/layouts/modal.layout";
import ErrorSharedComponent from "@/components/shared/error.shared.component";
import {
  initialAdmins,
  initialWorkers,
  removeAdmins,
  removeWorkers,
} from "@/feature/user.slice";
import useConfirmDialog from "@/hooks/useConfirmDialog.hook";
import { useDataFetch } from "@/hooks/useDataFetch.hook";
import { User, WorkersAndAdminProps } from "@/type";
import { fetchData } from "@/utils/fetchData.util";
import { FC, useEffect, useRef, useState } from "react";

const WorkersAndAdmin: FC<WorkersAndAdminProps> = ({ type }) => {
  const [data, loading] = useDataFetch<User[]>(
    `/user/${type}`,
    false,
    0,
    0,
    true
  );
  const workers = useAppSelector((state) => state.user.workers);
  const admins = useAppSelector((state) => state.user.admins);
  const dispatchApp = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | string[]>("");
  const { confirm, ConfirmDialog } = useConfirmDialog();

  useEffect(() => {
    if (!loading) {
      if (type === "admin") {
        dispatchApp(initialAdmins(data));
      } else {
        dispatchApp(initialWorkers(data));
      }
    }
    return () => {};
  }, [data, dispatchApp, loading, type]);

  const handlerDelete = async (id: string) => {
    const accepted = await confirm({
      title: "Delete user?",
      description:
        "This can't be undone. You are about to permanently delete something",
      confirmText: "Yes, delete",
      cancelText: "Cancel",
    });

    if (!accepted) return;

    try {
      const data = await fetchData<User>(
        `/user/${id}`,
        {},
        "DELETE",
        localStorage.getItem("token") || ""
      );

      if (data.message === undefined) {
        if (type === "admin") {
          dispatchApp(removeAdmins(data));
        } else {
          dispatchApp(removeWorkers(data));
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <DashboardLayout selected={type === "admin" ? "Admin" : "Workers"}>
      {ConfirmDialog}
      <ErrorSharedComponent error={error} />
      <>
        {isModalOpen && (
          <ModalLayoutComponent modalRef={modalRef}>
            <ModalWorkersAndAdminDashboard
              type={type}
              setIsModalOpen={setIsModalOpen}
            />
          </ModalLayoutComponent>
        )}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-secondary-800">
              {type.toUpperCase()}
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Add New {type === "admin" ? "Admin" : "Worker"}
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
                {type === "admin"
                  ? admins.map((admin) => (
                      <tr key={admin.email} className="hover:bg-secondary-50">
                        <td className="px-6 py-4 text-sm text-secondary-800">
                          {admin.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-secondary-800">
                          {admin.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-secondary-800">
                          {admin.role}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => handlerDelete(admin.id)}
                            className="text-accent-error hover:text-red-700 cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  : workers.map((worker) => (
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
                          <button
                            onClick={() => handlerDelete(worker.id)}
                            className="text-accent-error hover:text-red-700 cursor-pointer"
                          >
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

export default WorkersAndAdmin;
