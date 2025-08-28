import { CreditCard, Upload } from "lucide-react";
import { useCallback } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import type { FormData } from "../pages/SalesOrderForm";

export const Payment = () => {
  const { control } = useFormContext<FormData>();

  const wallets = ["Cash", "Bank Transfer", "Credit Card", "E-Wallet"];

  //get data
  const variants = useWatch({ control, name: "variants" });
  const additions = useWatch({ control, name: "additions" });
  const deductions = useWatch({ control, name: "deductions" });
  const shipping = useWatch({ control, name: "shipping" });
  const paymentAmount = useWatch({ control, name: "paymentAmount" });

  const calculateTotalAmount = useCallback(() => {
    const productTotal = (variants ?? []).reduce((total, variant) => {
      const variantQty = Object.values(variant.sizes ?? {}).reduce(
        (sum, qty) => sum + (qty || 0),
        0
      );
      return total + variantQty * (variant.price || 0);
    }, 0);

    const additionsTotal = (additions ?? []).reduce(
      (sum, add) => sum + (add.price || 0),
      0
    );
    const deductionsTotal = (deductions ?? []).reduce(
      (sum, ded) => sum + (ded.price || 0),
      0
    );

    return (
      productTotal + (shipping?.price || 0) + additionsTotal - deductionsTotal
    );
  }, [variants, additions, deductions, shipping]);

  const remainingPayment = calculateTotalAmount() - (paymentAmount || 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <CreditCard className="h-5 w-5 text-yellow-600" />
        <h2 className="text-lg font-semibold text-gray-900">Payment</h2>
      </div>

      {/* Wallet, Payment Amount, Payment Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Controller
          name="wallet"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wallet
              </label>
              <select
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Wallet</option>
                {wallets.map((wallet) => (
                  <option key={wallet} value={wallet}>
                    {wallet}
                  </option>
                ))}
              </select>
            </div>
          )}
        />

        <Controller
          name="paymentAmount"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Amount
              </label>
              <input
                type="number"
                {...field}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        />

        <Controller
          name="paymentDate"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Date
              </label>
              <input
                type="date"
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        />
      </div>

      {/* Remaining Payment */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="font-medium text-yellow-800">
            Remaining Payment:
          </span>
          <span className="text-lg font-bold text-yellow-900">
            Rp {remainingPayment.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      {/* Attachment */}
      <Controller
        name="attachment"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachment
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                className="hidden"
                id="payment-attachment"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) field.onChange(file);
                }}
              />
              <label htmlFor="payment-attachment" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  {field.value
                    ? (field.value as File).name
                    : "Click to upload or drag and drop"}
                </p>
              </label>
            </div>
          </div>
        )}
      />
    </div>
  );
};
