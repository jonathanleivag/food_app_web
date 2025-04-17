"use client";
import {
  initialValueProductForm,
  ModalNewProductDashboardProps,
  Product,
  ProductOpenIA,
} from "@/type";
import { FC, useRef, useState } from "react";
import { Formik } from "formik";
import { validationFormProduct } from "@/validation.schema";
import {
  deleteCloudinaryImage,
  uploadCloudinaryImage,
} from "@/utils/cloudinary.util";
import { fetchData } from "@/utils/fetchData.util";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  addProduct,
  addTotalPages,
  editProduct,
  setHasNextPage,
} from "@/feature/product.slice";
import { analyzeImage } from "@/utils/openIA.util";
import ModalLayoutComponent from "@/components/layouts/modal.layout";
import ErrorSharedComponent from "@/components/shared/error.shared.component";

const ModalFormProductDashboard: FC<ModalNewProductDashboardProps> = ({
  setIsModalOpen,
  product = null,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | string[]>("");
  const dispatchApp = useAppDispatch();
  const meta = useAppSelector((state) => state.product.meta);
  const products = useAppSelector((state) => state.product.products);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formInitial: initialValueProductForm = {
    id: product?.id || "",
    name: product?.name || "",
    price: product?.price || 0,
    calories: product?.calories || 0,
    description: product?.description || "",
    category: product?.category || "",
    preparationTime: product?.preparationTime || 0,
    image: product?.imageUrl || "",
    ingredients: product?.ingredients || [],
    baseIngredients: product?.baseIngredients || [],
    extraIngredients: product?.extraIngredients || [],
  };
  const [initialValue, setInitialValue] =
    useState<initialValueProductForm>(formInitial);

  const handleOnSubmit = async (values: initialValueProductForm) => {
    setIsSubmitting(true);

    let file: File | boolean | undefined = true;

    if (product === null) {
      file = fileInputRef.current?.files?.[0];
    } else {
      file = fileInputRef.current?.files?.[0] || true;
    }

    try {
      if (file) {
        const {
          name,
          price,
          description,
          category,
          calories,
          ingredients,
          baseIngredients,
          extraIngredients,
          preparationTime,
          image,
        } = values;

        let imageUrl = image;

        if (product !== null && image !== product.imageUrl) {
          imageUrl = await uploadCloudinaryImage(file as File);
          if (product.imageUrl.includes("cloudinary")) {
            await deleteCloudinaryImage(product.imageUrl);
          }
        }

        if (product === null) {
          imageUrl = await uploadCloudinaryImage(file as File);
        }

        const data = await fetchData<Product>(
          product === null ? "/product" : `/product/${product.id}`,
          {
            name,
            price,
            description,
            category,
            calories,
            imageUrl,
            ingredients,
            baseIngredients,
            extraIngredients,
            preparationTime,
          },
          product === null ? "POST" : "PATCH",
          localStorage.getItem("token") || ""
        );

        if (data.message !== undefined) {
          setError(data.message);
          if (product === null) {
            await deleteCloudinaryImage(imageUrl);
          }
          modalRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          setError("");
          setInitialValue(formInitial);
          setIsModalOpen(false);
          if (product === null) {
            handleAddProduct(data);
          } else {
            dispatchApp(editProduct(data));
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setError("An error occurred while submitting the form");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddProduct = (newProduct: Product): void => {
    if (!meta.hasNextPage) {
      if (products.length <= meta.limit - 1) {
        dispatchApp(addProduct(newProduct));
      } else {
        dispatchApp(addTotalPages());
        dispatchApp(setHasNextPage(true));
      }
    }
  };

  return (
    <ModalLayoutComponent modalRef={modalRef}>
      <>
        <ErrorSharedComponent error={error} />
        <div className="flex justify-between items-center mb-4 w-full">
          <h2 className="text-2xl font-bold text-secondary-800">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-secondary-500 hover:text-secondary-700"
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
        <Formik
          initialValues={initialValue}
          validationSchema={validationFormProduct}
          onSubmit={handleOnSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
            touched,
          }) => {
            const handleImageChange = (
              e: React.ChangeEvent<HTMLInputElement>
            ) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setFieldValue("image", reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            };
            const addField = (
              field: "ingredients" | "baseIngredients" | "extraIngredients"
            ) => {
              if (field === "extraIngredients") {
                setFieldValue(field, [
                  ...values[field],
                  { name: "", price: 0 },
                ]);
              } else {
                setFieldValue(field, [...values[field], ""]);
              }
            };
            const removeField = (
              field: "ingredients" | "baseIngredients" | "extraIngredients",
              index: number
            ) => {
              const updated = [...values[field]];
              updated.splice(index, 1);
              setFieldValue(field, updated);
            };
            const completeIa = async () => {
              let img = "";
              try {
                setIsSubmitting(true);
                const file = fileInputRef.current?.files?.[0];
                if (file) {
                  const imageUrl = await uploadCloudinaryImage(file);
                  img = imageUrl;
                  const data: ProductOpenIA = await analyzeImage(imageUrl);
                  setFieldValue("name", data.name || "");
                  setFieldValue("price", data.product_price || 0);
                  setFieldValue("description", data.description || "");
                  setFieldValue("category", data.category || "");
                  setFieldValue("calories", data.calories || 0);
                  setFieldValue("preparationTime", data.preparation_time || 0);
                  setFieldValue("ingredients", data.ingredients || []);
                  setFieldValue("baseIngredients", data.base_ingredients || []);
                  setFieldValue(
                    "extraIngredients",
                    data.extra_ingredients || []
                  );
                  await deleteCloudinaryImage(imageUrl);
                  setIsSubmitting(false);
                }
              } catch (error) {
                if (error instanceof Error) {
                  setError("An error occurred while submitting the form");
                  modalRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                  await deleteCloudinaryImage(img);
                  setIsSubmitting(false);
                }
              }
            };
            return (
              <form onSubmit={handleSubmit}>
                <div className="my-5">
                  <label className="block text-secondary-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className="w-full border border-secondary-200 rounded-lg p-2"
                    placeholder="Enter product name"
                  />
                  {errors.name && touched.name && (
                    <div className="bg-red-500 text-white rounded-lg w-[11rem] text-center text-sm mt-1">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="my-5">
                  <label className="block text-secondary-700 mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    className="w-full border border-secondary-200 rounded-lg p-2"
                    placeholder="Enter price"
                  />
                  {errors.price && touched.price && (
                    <div className="bg-red-500 text-white rounded-lg w-[12rem] text-center text-sm mt-1">
                      {errors.price}
                    </div>
                  )}
                </div>
                <div className="my-5">
                  <label className="block text-secondary-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    className="w-full border border-secondary-200 rounded-lg p-2"
                    rows={4}
                    placeholder="Enter product description"
                  />
                  {errors.description && touched.description && (
                    <div className="bg-red-500 text-white rounded-lg w-[10rem] text-center text-sm mt-1">
                      {errors.description}
                    </div>
                  )}
                </div>
                <div className="my-5">
                  <label className="block text-secondary-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.category}
                    className="w-full border border-secondary-200 rounded-lg p-2"
                    placeholder="Enter category"
                  />
                  {errors.category && touched.category && (
                    <div className="bg-red-500 text-white rounded-lg w-[10rem] text-center text-sm mt-1">
                      {errors.category}
                    </div>
                  )}
                </div>
                <div className="my-5">
                  <label className="block text-secondary-700 mb-2">
                    Calories
                  </label>
                  <input
                    type="number"
                    name="calories"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.calories}
                    className="w-full border border-secondary-200 rounded-lg p-2"
                    placeholder="Enter category"
                  />
                  {errors.calories && touched.calories && (
                    <div className="bg-red-500 text-white rounded-lg w-[10rem] text-center text-sm mt-1">
                      {errors.calories}
                    </div>
                  )}
                </div>
                <div className="my-5">
                  <label className="block text-secondary-700 mb-2">
                    Product Image
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-40 border-2 border-dashed border-secondary-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 transition-colors"
                  >
                    {values.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={values.image}
                        alt="Preview"
                        className="h-full w-full object-contain rounded-lg"
                      />
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-secondary-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-secondary-500 mt-2">
                          Click to upload image
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  {values.image !== "" && product === null && (
                    <button
                      type="button"
                      onClick={() => completeIa()}
                      disabled={isSubmitting}
                      className="mt-2 text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                            />
                          </svg>
                          Complete with AI
                        </>
                      )}
                    </button>
                  )}
                  {errors.image && touched.image && (
                    <div className="bg-red-500 text-white rounded-lg w-[10rem] text-center text-sm mt-1">
                      {errors.image}
                    </div>
                  )}
                </div>
                <div className="my-5">
                  <label className="block text-secondary-700 mb-2">
                    Preparation Time (minutes)
                  </label>
                  <input
                    type="number"
                    name="preparationTime"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.preparationTime}
                    className="w-full border border-secondary-200 rounded-lg p-2"
                    placeholder="Enter preparation time"
                  />
                  {errors.preparationTime && touched.preparationTime && (
                    <div className="bg-red-500 text-white rounded-lg w-[12rem] text-center text-sm mt-1">
                      {errors.preparationTime}
                    </div>
                  )}
                </div>
                <div className="my-5">
                  <label className="block text-secondary-700 mb-2">
                    Ingredients
                  </label>
                  {values.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) =>
                          setFieldValue(`ingredients[${index}]`, e.target.value)
                        }
                        className="w-full border border-secondary-200 rounded-lg p-2"
                        placeholder={`Ingredient ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeField("ingredients", index)}
                        className="text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addField("ingredients")}
                    className="text-primary-500 hover:text-primary-600 text-sm"
                  >
                    + Add Ingredient
                  </button>
                  {errors.ingredients && touched.ingredients && (
                    <div className="bg-red-500 text-white rounded-lg w-[15rem] text-center text-sm mt-1">
                      {errors.ingredients}
                    </div>
                  )}
                </div>
                <div className="my-5">
                  <label className="block text-secondary-700 mb-2">
                    Base Ingredients
                  </label>
                  {values.baseIngredients.map((baseIngredient, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={baseIngredient}
                        onChange={(e) =>
                          setFieldValue(
                            `baseIngredients[${index}]`,
                            e.target.value
                          )
                        }
                        className="w-full border border-secondary-200 rounded-lg p-2"
                        placeholder={`Base Ingredient ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeField("baseIngredients", index)}
                        className="text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addField("baseIngredients")}
                    className="text-primary-500 hover:text-primary-600 text-sm"
                  >
                    + Add Base Ingredient
                  </button>
                  {errors.baseIngredients && touched.baseIngredients && (
                    <div className="bg-red-500 text-white rounded-lg w-[18rem] text-center text-sm mt-1">
                      {errors.baseIngredients}
                    </div>
                  )}
                </div>
                <div className="my-5">
                  <label className="block text-secondary-700 mb-2">
                    Extra Ingredients
                  </label>
                  {values.extraIngredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={ingredient.name}
                        onChange={(e) =>
                          setFieldValue(
                            `extraIngredients[${index}].name`,
                            e.target.value
                          )
                        }
                        className="w-2/3 border border-secondary-200 rounded-lg p-2"
                        placeholder={`Extra Ingredient ${index + 1}`}
                      />
                      <input
                        type="number"
                        value={ingredient.price || ""}
                        onChange={(e) =>
                          setFieldValue(
                            `extraIngredients[${index}].price`,
                            e.target.value === "" ? "" : Number(e.target.value)
                          )
                        }
                        className="w-1/3 border border-secondary-200 rounded-lg p-2"
                        placeholder="Price"
                      />
                      <button
                        type="button"
                        onClick={() => removeField("extraIngredients", index)}
                        className="text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addField("extraIngredients")}
                    className="text-primary-500 hover:text-primary-600 text-sm"
                  >
                    + Add Extra Ingredient
                  </button>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-secondary-700 hover:bg-secondary-50 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </>
                    ) : product === null ? (
                      "Save Product"
                    ) : (
                      "Update Product"
                    )}
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </>
    </ModalLayoutComponent>
  );
};

export default ModalFormProductDashboard;
