import { Package } from "lucide-react";
import { type UseFormRegister } from "react-hook-form";
import type { FormData } from "../pages/SalesOrderForm";

type ProductDetailProps = {
  register: UseFormRegister<FormData>;
};

export const ProductDetail = ({ register }: ProductDetailProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Package className="h-5 w-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">Product Detail</h2>
      </div>

      {/* Material Detail */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Material Detail</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Category"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("materialDetail.category", {
              required: "Material Detail Category must be filled on",
            })}
          />

          <input
            type="text"
            placeholder="Material"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("materialDetail.material", {
              required: "Material Detail Material must be filled on",
            })}
          />

          <input
            type="text"
            placeholder="Input Color"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("materialDetail.inputColor", {
              required: "Material Detail Input Color must be filled on",
            })}
          />

          <input
            type="text"
            placeholder="Expandable Input"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("materialDetail.expandableInput")}
          />
        </div>
      </div>

      {/* Printing Detail */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Printing Detail</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Category"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("printingDetail.category", {
              required: "Printing Detail Category must be filled on",
            })}
          />

          <input
            type="text"
            placeholder="Material"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("printingDetail.material", {
              required: "Printing Detail Material must be filled on",
            })}
          />

          <input
            type="text"
            placeholder="Input Color"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("printingDetail.inputColor", {
              required: "Material Detail Category must be filled on",
            })}
          />
          <input
            type="text"
            placeholder="Expandable Input"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("printingDetail.expandableInput")}
          />
        </div>
      </div>

      {/* Embroidery Detail */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Embroidery Detail</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Category"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("embroideryDetail.category", {
              required: "Embroidery Detail Category must be filled on",
            })}
          />

          <input
            type="text"
            placeholder="Material"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("embroideryDetail.material", {
              required: "Embroidery Detail Category must be filled on",
            })}
          />

          <input
            type="text"
            placeholder="Input Color"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("embroideryDetail.inputColor", {
              required: "Embroidery Detail Input Color must be filled on",
            })}
          />

          <input
            type="text"
            placeholder="Expandable Input"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("embroideryDetail.expandableInput")}
          />
        </div>
      </div>

      {/* Product Note */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Note
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("productNote", {
            required: "Product Note must be filled on",
          })}
        />
      </div>
    </div>
  );
};