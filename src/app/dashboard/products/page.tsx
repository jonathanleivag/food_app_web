"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import DashboardLayout from "@/components/dashboard/dashboardLayout";
import CardDashboard from "@/components/dashboard/product/card.dashboard";
import ModalFormProductDashboard from "@/components/dashboard/product/modalFormProduct.dashboard";
import { initial, setMeta } from "@/feature/product.slice";
import { withAuth } from "@/hoc/withAuth";
import { useDataFetch } from "@/hooks/useDataFetch.hook";
import { PaginateProduct } from "@/type";
import { FC, useEffect, useState } from "react";

const Products: FC = () => {
  const products = useAppSelector((state) => state.product.products);
  const meta = useAppSelector((state) => state.product.meta);
  const [page, setPage] = useState<number>(meta.page);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatchApp = useAppDispatch();
  const [data, loading] = useDataFetch<PaginateProduct>(
    "/product/admin",
    true,
    page,
    meta.limit
  );

  useEffect(() => {
    if (!loading) {
      dispatchApp(initial(data.data));
      dispatchApp(setMeta(data.meta));
    }
  }, [data.data, data.meta, dispatchApp, loading]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <DashboardLayout selected="Products">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-secondary-800">Products</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg"
          >
            Add New Product
          </button>
        </div>

        {isModalOpen && (
          <ModalFormProductDashboard setIsModalOpen={setIsModalOpen} />
        )}

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 bg-secondary-50 rounded-lg">
            <h2 className="text-xl font-semibold text-secondary-700 mb-2">
              No products available
            </h2>
            <p className="text-secondary-500 text-center">
              Start by adding your first product using the Add New Product
              button above
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <CardDashboard key={product.id} product={product} />
              ))}
            </div>

            {data.meta && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={!meta.hasPrevPage}
                  className={`px-4 py-2 rounded ${
                    meta.hasPrevPage
                      ? "bg-primary-500 hover:bg-primary-600 text-white cursor-pointer"
                      : "bg-secondary-200 text-secondary-500 cursor-not-allowed"
                  }`}
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded flex items-center justify-center ${
                          pageNum === page
                            ? "bg-primary-500 text-white"
                            : "bg-secondary-50 hover:bg-secondary-100 text-secondary-700"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={!meta.hasNextPage}
                  className={`px-4 py-2 rounded ${
                    data.meta.hasNextPage
                      ? "bg-primary-500 hover:bg-primary-600 text-white cursor-pointer"
                      : "bg-secondary-200 text-secondary-500 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default withAuth(Products);
