"use client";
import DashboardLayout from "@/components/dashboard/dashboardLayout";
import OrdersDashboardComponent from "@/components/dashboard/orders/orders.dashboard.component";
import { withAuth } from "@/hoc/withAuth";
import { useDataFetch } from "@/hooks/useDataFetch.hook";
import { Card } from "@/type";
import { FC, useEffect } from "react";
import Pusher from "pusher-js";
import { getENV } from "@/config/env.config";
import { ENV } from "@/enum";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addOrder, initial } from "@/feature/order.slice";

const Orders: FC = () => {
  const [data, loading] = useDataFetch<Card[]>(
    "/cart/completed/user",
    false,
    0,
    0,
    true
  );
  const carts = useAppSelector((state) => state.order.carts);
  const dispatchApp = useAppDispatch();

  useEffect(() => {
    if (!loading) {
      dispatchApp(initial(data));
    }
    return () => {};
  }, [data, dispatchApp, loading]);

  useEffect(() => {
    const pusher = new Pusher(getENV(ENV.KEY_PUSHER), {
      cluster: getENV(ENV.CLUSTER_PUSHER),
    });
    const channel = pusher.subscribe("completeCart");
    channel.bind("complete-cart", (data: Card) => {
      dispatchApp(addOrder(data));
    });
    return () => {
      pusher.unsubscribe("completeCart");
    };
  }, [dispatchApp]);

  return (
    <DashboardLayout selected="Orders">
      {!loading && <OrdersDashboardComponent orders={carts} />}
    </DashboardLayout>
  );
};

export default withAuth(Orders);
