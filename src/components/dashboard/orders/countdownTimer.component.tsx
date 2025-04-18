"use client";
import { CountdownTimerProps } from "@/type";
import { FC, useEffect, useState } from "react";

const CountdownTimerComponent: FC<CountdownTimerProps> = ({
  orderDate,
  currentDate,
  preparationMinutes,
}) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const orderTime = new Date(orderDate).getTime();
    const now = new Date(currentDate).getTime();
    const deliveryTime = orderTime + preparationMinutes * 60 * 1000;
    return Math.max(deliveryTime - now, 0);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div>
      {timeLeft > 0 ? <p>{formatTime(timeLeft)}</p> : <p>Tiempo terminado</p>}
    </div>
  );
};

export default CountdownTimerComponent;
