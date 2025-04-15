"use client";
import { CardDashboardProps } from "@/type";
import { formatChileanPesos } from "@/utils/formatChileanPesos.util";
import Image from "next/image";
import { FC } from "react";

const CardDashboard: FC<CardDashboardProps> = ({ product }) => {
  return (
    <div className="bg-background-light rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={1000}
          height={1000}
          objectFit="cover"
          className="w-full h-full object-cover rounded-b-lg"
        />
        {!product.isAvailable && (
          <div className="absolute top-2 right-2 bg-accent-error text-white px-2 py-1 rounded">
            Not Available
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-semibold text-secondary-800">
            {product.name}
          </h2>
          <span className="text-lg font-bold text-primary-600">
            {formatChileanPesos(product.price)}
          </span>
        </div>

        <p className="text-secondary-600 mb-3">{product.description}</p>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm bg-primary-50 text-primary-800 px-2 py-1 rounded">
            {product.preparationTime} mins
          </span>
          <span className="text-sm bg-primary-50 text-primary-800 px-2 py-1 rounded">
            {product.calories} cal
          </span>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 rounded">
            Edit
          </button>
          <button className="flex-1 border border-secondary-300 hover:bg-secondary-50 text-secondary-700 py-2 rounded">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDashboard;
