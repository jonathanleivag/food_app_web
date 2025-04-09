import type { ENV } from "../enum";

export const getENV = (env: ENV): string => {
  switch (env) {
    case "NEXT_PUBLIC_API_URL":
      if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is not defined");
      }
      return process.env.NEXT_PUBLIC_API_URL;
    default:
      return "";
  }
};
