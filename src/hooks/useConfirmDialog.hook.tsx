"use client";
import { ConfirmOptions } from "@/type";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState, useCallback } from "react";

const useConfirmDialog = () => {
  const [promise, setPromise] = useState<{
    resolve: (val: boolean) => void;
    reject: () => void;
  } | null>(null);

  const [options, setOptions] = useState<ConfirmOptions>({
    title: "",
    description: "",
    confirmText: "Aceptar",
    cancelText: "Cancelar",
  });

  const [open, setOpen] = useState(false);

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts);
    setOpen(true);
    return new Promise((resolve) => {
      setPromise({ resolve, reject: () => resolve(false) });
    });
  }, []);

  const handleConfirm = () => {
    setOpen(false);
    promise?.resolve(true);
  };

  const handleCancel = () => {
    setOpen(false);
    promise?.resolve(false);
  };

  const Dialog = (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <AlertDialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-100 text-secondary-800 rounded-xl shadow-xl w-full max-w-md p-6">
          <AlertDialog.Title className="text-lg font-semibold mb-2">
            {options.title}
          </AlertDialog.Title>
          <AlertDialog.Description className="text-sm text-color-secondary-500 mb-4">
            {options.description}
          </AlertDialog.Description>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-md border border-secondary-300 text-secondary-700 hover:bg-secondary-100"
            >
              {options.cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600"
            >
              {options.confirmText}
            </button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );

  return { confirm, ConfirmDialog: Dialog };
};

export default useConfirmDialog;
