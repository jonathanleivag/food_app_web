"use client";
import { FC, useState } from "react";
import { Formik } from "formik";
import { Login as LoginType, LoginFormikValues } from "@/type";
import { loginValidation } from "@/validation.schema";
import { fetchData } from "@/utils/fetchData.util";
import { withPublic } from "@/hoc/withPublic";
import { useRouter } from "next/navigation";

const Login: FC = () => {
  const router = useRouter();
  const initialValues: LoginFormikValues = {
    email: "",
    password: "",
  };
  const [error, setError] = useState<string | string[]>("");

  const handlerSubmit = async (value: LoginFormikValues) => {
    try {
      const { email, password } = value;
      const data = await fetchData<LoginType>(
        "/auth/login/admin",
        {
          email,
          password,
        },
        "POST"
      );

      if (data.message !== undefined) {
        setError(data.message);
      } else {
        setError("");
        localStorage.setItem("token", data.token!);
        router.replace("/dashboard");
      }
    } catch (error) {
      console.error("🚀 ~ handlerSubmit ~ error:", error);
      setError("Error al iniciar sesión");
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-background-cream">
      {error !== "" && (
        <span className="w-full max-w-md text-center text-white bg-accent-error p-1 my-5 rounded-lg">
          {error}
        </span>
      )}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary-500">Food App</h2>
          <p className="text-secondary-500 mt-2">
            Inicie sesión para continuar
          </p>
        </div>

        <Formik
          onSubmit={handlerSubmit}
          initialValues={initialValues}
          validationSchema={loginValidation}
          className="space-y-6"
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <>
              <div className="my-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-secondary-700"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-secondary-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 mb-2"
                  placeholder="email@email.cl"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <span className="w-full text-white bg-accent-error p-1 my-5 rounded-lg">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="my-5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-secondary-700"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-secondary-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 mb-2"
                  placeholder="Ingrese su contraseña"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <span className="w-full text-white bg-accent-error p-1 my-5 rounded-lg">
                    {errors.password}
                  </span>
                )}
              </div>

              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Ingresar
              </button>
            </>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default withPublic(Login);
