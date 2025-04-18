import type { Metadata } from "next";
import "./globals.css";
import ProviderComponent from "./provider";

export const metadata: Metadata = {
  title: "Login Food App Web",
  description: "Food App Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-primary-900">
        <ProviderComponent>
          <main>{children}</main>
        </ProviderComponent>
      </body>
    </html>
  );
}
