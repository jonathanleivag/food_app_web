"use client";
import { useAppSelector } from "@/app/hooks";
import { DashboardLayoutProps } from "@/type";
import { FC, useState } from "react";

const DashboardLayout: FC<DashboardLayoutProps> = ({ children, selected }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const name = useAppSelector((state) => state.user.name);

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: "📊" },
    { label: "Orders", href: "/dashboard/orders", icon: "📦" },
    { label: "Products", href: "/dashboard/products", icon: "🍽️" },
    { label: "Customers", href: "/dashboard/customers", icon: "👥" },
    { label: "Users", href: "/dashboard/users", icon: "🙎‍♂️" },
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
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center text-secondary-500 hover:text-secondary-700"
              >
                <div className="h-8 w-8 rounded-full bg-primary-200 flex items-center justify-center">
                  <span className="text-primary-700">
                    {name[0].toUpperCase()}
                  </span>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
