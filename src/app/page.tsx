"use client";
import { withAuth } from "@/hoc/withAuth";
import { FC } from "react";

const Page: FC = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-background-cream">
      <h1>home</h1>
    </section>
  );
};

export default withAuth(Page);
