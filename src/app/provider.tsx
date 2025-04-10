"use client";
import { FC } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { ChildrenProps } from "@/type";

const ProviderComponent: FC<ChildrenProps> = ({ children }) => {
  return <Provider store={store}> {children} </Provider>;
};

export default ProviderComponent;
