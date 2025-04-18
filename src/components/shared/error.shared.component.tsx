import { ErrorSharedComponentProps } from "@/type";
import { FC } from "react";

const ErrorSharedComponent: FC<ErrorSharedComponentProps> = ({ error }) => {
  return (
    <>
      {error !== "" && (
        <span className="w-full max-w-md text-center text-white bg-accent-error p-1 my-5 rounded-lg">
          {error}
        </span>
      )}
    </>
  );
};

export default ErrorSharedComponent;
