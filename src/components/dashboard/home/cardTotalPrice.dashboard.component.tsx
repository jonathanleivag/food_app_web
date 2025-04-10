import { FC } from "react";

const CardTotalPriceComponent: FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <div className="flex-1">
          <h3 className="text-secondary-500 text-sm font-medium">
            Total Sales
          </h3>
          <p className="text-2xl font-semibold text-secondary-900">$24,780</p>
        </div>
        <div className="bg-primary-100 p-3 rounded-full">
          <svg
            className="w-6 h-6 text-primary-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <div className="mt-2">
        <span className="text-accent-success text-sm font-medium">+12.5%</span>
        <span className="text-secondary-500 text-sm ml-2">from last month</span>
      </div>
    </div>
  );
};

export default CardTotalPriceComponent;
