import { Calculator, Minus, Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { FormData } from "../pages/SalesOrderForm";

export const TotalCalculation = () => {
  const { control, register, watch } = useFormContext<FormData>();

  const {
    fields: additionFields,
    append: appendAddition,
    remove: removeAddition,
  } = useFieldArray({ control, name: "additions" });

  const {
    fields: deductionFields,
    append: appendDeduction,
    remove: removeDeduction,
  } = useFieldArray({ control, name: "deductions" });

  const variants = watch("variants");
  const additions = watch("additions");
  const deductions = watch("deductions");
  const shipping = watch("shipping");

  const calculateTotalQuantity = () => {
    return variants.reduce((total, variant) => {
      return (
        total +
        Object.values(variant.sizes || {}).reduce(
          (sum, qty) => sum + (qty || 0),
          0
        )
      );
    }, 0);
  };

  const calculateProductTotal = () => {
    return variants.reduce((total, variant) => {
      const qty = Object.values(variant.sizes || {}).reduce(
        (sum, val) => sum + (val || 0),
        0
      );
      return total + qty * (variant.price || 0);
    }, 0);
  };

  const calculateTotalAmount = () => {
    const additionsTotal = additions.reduce(
      (sum, add) => sum + (add.price || 0),
      0
    );
    const deductionsTotal = deductions.reduce(
      (sum, ded) => sum + (ded.price || 0),
      0
    );

    return (
      calculateProductTotal() +
      (shipping?.price || 0) +
      additionsTotal -
      deductionsTotal
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Calculator className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Total Calculation
        </h2>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-sm font-medium text-gray-600">
              Total Product (pcs)
            </span>
            <div className="text-lg font-semibold text-gray-900">
              {calculateTotalQuantity()}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">
              Total Product Amount
            </span>
            <div className="text-lg font-semibold text-gray-900">
              Rp {calculateProductTotal().toLocaleString("id-ID")}
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-medium text-gray-900 mb-3">Shipping</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Category"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("shipping.category")}
            />
            <input
              type="number"
              placeholder="Price"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("shipping.price", {
                setValueAs: (v) => (v === "" ? 0 : Number(v)),
              })}
            />
          </div>
        </div>

        {/* Additions */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Addition</h3>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={() =>
                appendAddition({
                  id: Date.now().toString(),
                  category: "",
                  description: "",
                  price: 0,
                })
              }
            >
              <Plus className="h-4 w-4 inline mr-1" /> Add
            </button>
          </div>
          {additionFields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-2"
            >
              <input
                type="text"
                placeholder="Category"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register(`additions.${index}.category`)}
              />
              <input
                type="text"
                placeholder="Description"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register(`additions.${index}.description`)}
              />
              <input
                type="number"
                placeholder="Price"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register(`additions.${index}.price`, {
                  valueAsNumber: true,
                })}
              />
              <button
                type="button"
                className="text-red-600 hover:text-red-800"
                onClick={() => removeAddition(index)}
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Deductions */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Deduction</h3>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={() =>
                appendDeduction({
                  id: Date.now().toString(),
                  category: "",
                  description: "",
                  price: 0,
                })
              }
            >
              <Plus className="h-4 w-4 inline mr-1" /> Add
            </button>
          </div>
          {deductionFields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-2"
            >
              <input
                type="text"
                placeholder="Category"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register(`deductions.${index}.category`)}
              />
              <input
                type="text"
                placeholder="Description"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register(`deductions.${index}.description`)}
              />
              <input
                type="number"
                placeholder="Price"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register(`deductions.${index}.price`, {
                  valueAsNumber: true,
                })}
              />
              <button
                type="button"
                className="text-red-600 hover:text-red-800"
                onClick={() => removeDeduction(index)}
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Total Bill */}
        <div className="border-t border-gray-200 pt-4">
          <div className="text-right">
            <span className="text-lg font-medium text-gray-700">
              Total Bill:{" "}
            </span>
            <span className="text-xl font-bold text-gray-900">
              Rp {calculateTotalAmount().toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
