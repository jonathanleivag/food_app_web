"use client";
import DashboardLayout from "@/components/dashboard/dashboardLayout";
import OrdersDashboardComponent from "@/components/dashboard/orders/orders.dashboard.component";
import { withAuth } from "@/hoc/withAuth";
import { useDataFetch } from "@/hooks/useDataFetch.hook";
import { Card } from "@/type";
import { FC, useEffect, useState } from "react";
import Pusher from "pusher-js";
import { getENV } from "@/config/env.config";
import { ENV } from "@/enum";

const Orders: FC = () => {
  const [newCart, setNewCart] = useState<Card>({} as Card);

  const [carts, loading] = useDataFetch<Card[]>(
    "/cart/completed/user",
    false,
    0,
    0,
    true,
    newCart,
    []
  );

  useEffect(() => {
    const pusher = new Pusher(getENV(ENV.KEY_PUSHER), {
      cluster: getENV(ENV.CLUSTER_PUSHER),
    });
    const channel = pusher.subscribe("completeCart");
    channel.bind("complete-cart", (data: Card) => {
      console.log("🚀 ~ channel.bind ~ data:", data);
      setNewCart(data);
    });
    return () => {
      pusher.unsubscribe("completeCart");
    };
  }, [newCart]);

  return (
    <DashboardLayout selected="Orders">
      {!loading && <OrdersDashboardComponent orders={carts} />}
    </DashboardLayout>
  );
};

export default withAuth(Orders);
