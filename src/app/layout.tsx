import type { Metadata } from "next";
import "./globals.css";

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
        <main>{children}</main>
      </body>
    </html>
  );
}
