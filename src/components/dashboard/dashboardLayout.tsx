"use client";

import { DashboardLayoutProps } from "@/type";
import { FC, useState } from "react";

const DashboardLayout: FC<DashboardLayoutProps> = ({ children, selected }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: "📊" },
    { label: "Orders", href: "/dashboard/orders", icon: "📦" },
    { label: "Products", href: "/dashboard/products", icon: "🍽️" },
    { label: "Customers", href: "/dashboard/customers", icon: "👥" },
    { label: "Users", href: "/dashboard/users", icon: "🙎‍♂️" },
    { label: "Settings", href: "/dashboard/settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen flex">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-secondary-900/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-64 bg-primary-500 transform transition-transform duration-200
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="h-16 flex items-center justify-center border-b border-primary-600">
          <h1 className="text-white text-xl font-bold">Food App</h1>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center px-6 py-3 text-white transition-colors
                ${
                  selected.toLocaleLowerCase() === item.label.toLowerCase()
                    ? "bg-primary-600 border-l-4 border-white"
                    : "hover:bg-primary-600"
                }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-secondary-200 flex items-center px-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden text-secondary-500 hover:text-secondary-700"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="ml-auto flex items-center space-x-4">
            <button className="text-secondary-500 hover:text-secondary-700">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button className="flex items-center text-secondary-500 hover:text-secondary-700">
              <div className="h-8 w-8 rounded-full bg-primary-200 flex items-center justify-center">
                <span className="text-primary-700">JD</span>
              </div>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-background-cream p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
