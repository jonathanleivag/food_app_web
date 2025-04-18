import { FC } from "react";

const LoadingSharedComponent: FC = () => {
  return (
    <div className="fixed inset-0 bg-primary-500/90 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
        <p className="mt-4 text-white text-xl font-semibold">Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingSharedComponent;
