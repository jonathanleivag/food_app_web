"use client";
import { Card, OrdersDashboardProps } from "@/type";
import { FC, useState } from "react";
import CountdownTimerComponent from "./countdownTimer.component";
import { formatChileanPesos } from "@/utils/formatChileanPesos.util";
import { fetchData } from "@/utils/fetchData.util";
import { useAppDispatch } from "@/app/hooks";
import { removeOrder } from "@/feature/order.slice";

const OrdersDashboardComponent: FC<OrdersDashboardProps> = ({ orders }) => {
  const [, setError] = useState<string | string[]>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [showVerification, setShowVerification] = useState<string>("");
  const dispatchApp = useAppDispatch();

  const maxMinute = (cart: Card): number => {
    const arrayMinutes = cart.items.map((item) => item.product.preparationTime);
    return Math.max(...arrayMinutes);
  };

  // TODO aquí va alerta
  const handleVerifyDelivery = async (cart: Card) => {
    if (verificationCode.length !== 4) {
      setError("Please enter a 4-digit code");
      return;
    }
    try {
      const data = await fetchData<Card>(
        "/cart/withdraw/user",
        {
          cartId: cart.id,
          code: verificationCode.toString(),
        },
        "POST",
        localStorage.getItem("token")!
      );

      if (data.message === undefined) {
        setShowVerification("");
        setVerificationCode("");
        dispatchApp(removeOrder(cart));
      }

      if (data.message !== undefined) {
        setError(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al verificar el código:", error.message);
        setError(error.message);
      }
    }
  };

  // TODO aquí va alerta
  const handleDelivery = async (cart: Card) => {
    setShowVerification(cart.id);
    try {
      const data = await fetchData<Card>(
        "/cart/delivered",
        {
          cartId: cart.id,
        },
        "POST"
      );

      if (data.message === undefined) {
        setShowVerification(cart.id);
        setVerificationCode("");
      }

      if (data.message !== undefined) {
        setError(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al marcar como entregado:", error.message);
        setError(error.message);
      }
    }
  };

  return (
    <div className="p-6 bg-[var(--color-background-light)]">
      <h1 className="text-3xl font-bold text-[var(--color-secondary-800)] mb-6">
        Active Orders
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg border border-[var(--color-secondary-200)]">
            <span className="text-2xl text-[var(--color-secondary-600)] mb-2">
              No active orders
            </span>
            <p className="text-[var(--color-secondary-500)]">
              New orders will appear here
            </p>
          </div>
        )}
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-[var(--color-secondary-200)]"
          >
            <div className="bg-[var(--color-primary-500)] p-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold">
                  Order #{order.id.slice(-6)}
                </span>
                <span className="text-white">
                  {new Date(order.orderDate).toLocaleTimeString("es-CL", {
                    hour12: false,
                    timeZone: "America/Santiago",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item._id} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--color-secondary-700)]">
                        {item.quantity}x {item.product.name}
                      </span>
                      <div className="flex flex-col items-end">
                        <span className="text-[var(--color-secondary-600)]">
                          {formatChileanPesos(item.price)}
                        </span>
                        {item.extra > 0 && (
                          <span className="text-xs text-[var(--color-accent-info)]">
                            (Extra: {formatChileanPesos(item.extra)})
                          </span>
                        )}
                      </div>
                    </div>
                    {item.ingredients && item.ingredients.length > 0 && (
                      <div className="text-sm text-[var(--color-secondary-500)] pl-4">
                        <span className="italic">Base: </span>
                        {item.ingredients.join(", ")}
                      </div>
                    )}
                    {item.extraIngredients &&
                      item.extraIngredients.length > 0 && (
                        <div className="text-sm text-[var(--color-secondary-500)] pl-4">
                          <span className="italic">Extra: </span>
                          {item.extraIngredients.join(", ")}
                        </div>
                      )}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--color-secondary-200)]">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[var(--color-secondary-800)]">
                    Total:
                  </span>
                  <span className="text-[var(--color-primary-700)] font-bold">
                    {formatChileanPesos(order.total)}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <div
                  className={`text-center p-2 rounded-full w-auto font-bold ${
                    (order.remainingTime || 0) > 300
                      ? "bg-[var(--color-accent-success)] text-white"
                      : (order.remainingTime || 0) > 120
                      ? "bg-[var(--color-accent-warning)] text-[var(--color-secondary-800)]"
                      : "bg-[var(--color-accent-error)] text-white"
                  }`}
                >
                  <CountdownTimerComponent
                    preparationMinutes={maxMinute(order)}
                    orderDate={order.orderDate}
                    currentDate={new Date().toString()}
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                {showVerification === order.id ? (
                  <div className="w-full space-y-2">
                    <input
                      type="text"
                      maxLength={4}
                      value={verificationCode}
                      onChange={(e) =>
                        setVerificationCode(
                          e.target.value.replace(/\D/g, "").slice(0, 4)
                        )
                      }
                      placeholder="Enter 4-digit code"
                      className="w-full px-4 py-2 border border-[var(--color-secondary-300)] rounded-md text-center text-lg tracking-wider"
                    />
                    <button
                      onClick={() => handleVerifyDelivery(order)}
                      className="w-full py-2 px-4 bg-[var(--color-accent-success)] hover:opacity-90 text-white font-semibold rounded-md transition-colors duration-200"
                    >
                      Verify Delivery
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDelivery(order)}
                    className="w-full py-2 px-4 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white font-semibold rounded-md transition-colors duration-200"
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersDashboardComponent;
