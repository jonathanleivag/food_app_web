import type { ENV } from "../enum";

export const getENV = (env: ENV): string => {
  switch (env) {
    case "NEXT_PUBLIC_API_URL":
      if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is not defined");
      }
      return process.env.NEXT_PUBLIC_API_URL;
    case "NEXT_PUBLIC_KEY_PUSHER":
      if (!process.env.NEXT_PUBLIC_KEY_PUSHER) {
        throw new Error("NEXT_PUBLIC_KEY_PUSHER is not defined");
      }
      return process.env.NEXT_PUBLIC_KEY_PUSHER;
    case "NEXT_PUBLIC_CLUSTER_PUSHER":
      if (!process.env.NEXT_PUBLIC_CLUSTER_PUSHER) {
        throw new Error("NEXT_PUBLIC_CLUSTER_PUSHER is not defined");
      }
      return process.env.NEXT_PUBLIC_CLUSTER_PUSHER;

    case "CLOUDINARY_NAME":
      if (!process.env.CLOUDINARY_NAME) {
        throw new Error("NEXT_PUBLIC_CLOUDINARY_NAME is not defined");
      }
      return process.env.CLOUDINARY_NAME;
    case "CLOUDINARY_API_KEY":
      if (!process.env.CLOUDINARY_API_KEY) {
        throw new Error("NEXT_PUBLIC_CLOUDINARY_API_KEY is not defined");
      }
      return process.env.CLOUDINARY_API_KEY;
    case "CLOUDINARY_API_SECRET":
      if (!process.env.CLOUDINARY_API_SECRET) {
        throw new Error("NEXT_PUBLIC_CLOUDINARY_API_SECRET is not defined");
      }
      return process.env.CLOUDINARY_API_SECRET;

    case "OPENAI_API_KEY":
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY is not defined");
      }
      return process.env.OPENAI_API_KEY;
    case "OPEN_IA_MODEL":
      if (!process.env.OPEN_IA_MODEL) {
        throw new Error("OPEN_IA_MODEL is not defined");
      }
      return process.env.OPEN_IA_MODEL;
    default:
      return "";
  }
};
