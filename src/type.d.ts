import { ReactNode } from "react";
export interface LoginFormikValues {
  email: string;
  password: string;
}

export type METHOD = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface Res {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}

export interface Login extends Res {
  user?: User;
  token?: string;
}

export interface DashboardLayoutProps {
  children: ReactNode;
  selected:
    | "Dashboard"
    | "Orders"
    | "Products"
    | "Customers"
    | "Users"
    | "Settings";
}
