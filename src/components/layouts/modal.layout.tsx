import { ModalLayoutComponentProps } from "@/type";
import { FC, useEffect } from "react";

const ModalLayoutComponent: FC<ModalLayoutComponentProps> = ({
  modalRef,
  children,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {children}
      </div>
    </div>
  );
};

export default ModalLayoutComponent;
