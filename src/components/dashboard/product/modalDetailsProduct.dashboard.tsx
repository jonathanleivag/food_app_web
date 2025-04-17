import ModalLayoutComponent from "@/components/layouts/modal.layout";
import { ModalDetailsProductDashboardComponentProps, Product } from "@/type";
import { FC, useRef, useState } from "react";
import Image from "next/image";
import { formatChileanPesos } from "@/utils/formatChileanPesos.util";
import { fetchData } from "@/utils/fetchData.util";
import { useAppDispatch } from "@/app/hooks";
import { editProduct } from "@/feature/product.slice";
import ErrorSharedComponent from "@/components/shared/error.shared.component";

const ModalDetailsProductDashboardComponent: FC<
  ModalDetailsProductDashboardComponentProps
> = ({ setIsModalOpen, product }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | string[]>("");
  const dispatchApp = useAppDispatch();

  const handlerDisableProduct = async () => {
    try {
      const data = await fetchData<Product>(
        `/product/${product.id}`,
        {
          name: product.name,
          price: product.price,
          description: product.description,
          category: product.category,
          calories: product.calories,
          imageUrl: product.imageUrl,
          ingredients: product.ingredients,
          baseIngredients: product.baseIngredients,
          extraIngredients: product.extraIngredients,
          preparationTime: product.preparationTime,
          isAvailable: !product.isAvailable,
        },
        product === null ? "POST" : "PATCH",
        localStorage.getItem("token") || ""
      );
      if (data.message !== undefined) {
        setError(data.message);
        modalRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError("");
        setIsModalOpen(false);
        dispatchApp(editProduct(data));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        throw new Error(error.message);
      }
      throw new Error("Error desconocido");
    }
  };

  return (
    <ModalLayoutComponent modalRef={modalRef}>
      <>
        <ErrorSharedComponent error={error} />
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold text-secondary-800">
              Details Product {product.name}
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-secondary-500 hover:text-secondary-700 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-secondary-700 mb-2">
                  Description
                </h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-secondary-700 mb-2">
                  Base Ingredients
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.baseIngredients.map((ingredient, index) => (
                    <div key={index} className="bg-gray-50 p-2 rounded-md">
                      <p className="text-sm">{ingredient}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-secondary-700 mb-2">
                  Product Information
                </h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="font-medium">Name:</span>
                    <span>{product.name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Price:</span>
                    <span>{formatChileanPesos(product.price)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Category:</span>
                    <span>{product.category}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Calories:</span>
                    <span>{product.calories}</span>
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-secondary-700 mb-2">
                  Ingredients
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="bg-gray-50 p-2 rounded-md">
                      <p className="text-sm">{ingredient}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-secondary-700 mb-2">
                  Extra Ingredients
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.extraIngredients?.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex justify-between bg-gray-50 p-2 rounded-md"
                    >
                      <p className="text-sm">{ingredient.name}</p>
                      <p className="text-sm text-secondary-600">
                        ${ingredient.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row justify-end items-center gap-2">
            <button
              onClick={handlerDisableProduct}
              className={`px-4 py-2  text-white rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
                !product.isAvailable
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {product.isAvailable ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              {product.isAvailable ? "Disable Product" : "Enable Product"}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Close
            </button>
          </div>
        </div>
      </>
    </ModalLayoutComponent>
  );
};

export default ModalDetailsProductDashboardComponent;
