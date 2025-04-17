import { useAppDispatch } from "@/app/hooks";
import ErrorSharedComponent from "@/components/shared/error.shared.component";
import { addWorkers } from "@/feature/user.slice";
import {
  initialValuesFormRegisterWorker,
  ModalDashboardProps,
  User,
} from "@/type";
import { fetchData } from "@/utils/fetchData.util";
import { removeAccentsAndSymbols } from "@/utils/formatText.util";
import { validationFormWorker } from "@/validation.schema";
import { Formik } from "formik";
import { FC, useState } from "react";

const ModalWorkersDashboard: FC<ModalDashboardProps> = ({ setIsModalOpen }) => {
  const initialValues: initialValuesFormRegisterWorker = {
    firstName: "",
    firstLastName: "",
    secondLastName: "",
  };
  const dispatchApp = useAppDispatch();
  const [error, setError] = useState<string | string[]>("");

  // TODO: Aquí va alerta
  const handlerOnSubmit = async (value: initialValuesFormRegisterWorker) => {
    try {
      const data = await fetchData<User>(
        "/auth/register",
        {
          name: `${value.firstName} ${value.firstLastName} ${value.secondLastName}`.trim(),
          password: `${removeAccentsAndSymbols(
            value.firstName[0].toUpperCase()
          )}${removeAccentsAndSymbols(
            value.firstLastName.toLowerCase()
          )}${removeAccentsAndSymbols(
            value.secondLastName.toLowerCase()
          )}`.trim(),
          email: `${removeAccentsAndSymbols(
            value.firstName.toLowerCase()
          )}.${removeAccentsAndSymbols(
            value.firstLastName.toLowerCase()
          )}.${removeAccentsAndSymbols(
            value.secondLastName.toLowerCase()
          )}@foodapp.cl`.trim(),
          role: "WORKER",
        },
        "POST",
        localStorage.getItem("token") || ""
      );

      if (data.message === undefined) {
        dispatchApp(addWorkers(data));
        setIsModalOpen(false);
      } else {
        setError(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setError(error.message);
      }
    }
  };

  return (
    <>
      <ErrorSharedComponent error={error} />
      <div className="w-full flex flex-row justify-between">
        <h2 className="text-2xl font-semibold text-secondary-800 mb-6">
          Add New Worker
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

      <Formik
        initialValues={initialValues}
        onSubmit={handlerOnSubmit}
        validationSchema={validationFormWorker}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-secondary-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                placeholder="First Name"
                className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
              />
              {errors.firstName && touched.firstName && (
                <div className="bg-red-500 text-white rounded-lg w-[11rem] text-center text-sm mt-1">
                  {errors.firstName}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-secondary-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="firstLastName"
                name="firstLastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstLastName}
                placeholder="First Last Name"
                className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
              />
              {errors.firstLastName && touched.firstLastName && (
                <div className="bg-red-500 text-white rounded-lg w-[12rem] text-center text-sm mt-1">
                  {errors.firstLastName}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-secondary-700 mb-1"
              >
                Second Last Name
              </label>
              <input
                type="text"
                id="secondLastName"
                name="secondLastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.secondLastName}
                placeholder="Second Last Name"
                className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
              />
              {errors.secondLastName && touched.secondLastName && (
                <div className="bg-red-500 text-white rounded-lg w-[16rem] text-center text-sm mt-1">
                  {errors.secondLastName}
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-secondary-600 bg-secondary-100 hover:bg-secondary-200 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="px-4 py-2 text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors cursor-pointer"
              >
                Save Worker
              </button>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default ModalWorkersDashboard;
