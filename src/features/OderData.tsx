import { User } from "lucide-react";
import { Controller, type Control, type UseFormRegister, type UseFormSetValue } from "react-hook-form";
import type { FormData } from "../pages/SalesOrderForm";

  interface Customer {
  id: string;
  name: string;
  address: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
}

type OrderDataProps = {
    register: UseFormRegister<FormData>
    setValue: UseFormSetValue<FormData>;
    control: Control<FormData>
}

export const OrderData = ({ register, setValue, control}: OrderDataProps) => {
    const customers: Customer[] = [
    { id: '1', name: 'PT ABC Corporation', address: 'Jl. Sudirman No. 123, Jakarta' },
    { id: '2', name: 'CV XYZ Trading', address: 'Jl. Gatot Subroto No. 456, Bandung' },
    { id: '3', name: 'UD Maju Jaya', address: 'Jl. Ahmad Yani No. 789, Surabaya' }
  ];

  const segments = ['Corporate', 'Retail', 'Wholesale', 'Online'];

    const handleCustomerChange = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    setValue("customer", customerId);
    setValue("address", customer ? customer.address : "");
  };

  const products: Product[] = [
    { id: '1', name: 'T-Shirt Premium', category: 'Apparel' },
    { id: '2', name: 'Polo Shirt', category: 'Apparel' },
    { id: '3', name: 'Hoodie', category: 'Apparel' }
  ];

    return(
        <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Order Data</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                  <Controller
                    name="customer"
                    control={control}
                    rules={{ required: "Customer must be selected" }}
                    render={({field}) => (
                      <select
                        id="customer"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e); // update react-hook-form
                          handleCustomerChange(e.target.value); // update address otomatis
                        }}
                      >
                        <option value="">Select Customer</option>
                        {customers.map(customer => (
                          <option key={customer.id} value={customer.name}>{customer.name}</option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    /* onChange={watch("customer")} */
                    {...register("address", {
                      required: "Address must be filled on"
                    })}
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("orderName", {
                      required: "Order Name must ber filled on"
                    })}
                    /* onChange={(e) => setValue(prev => ({ ...prev, orderName: e.target.value }))} */
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                  <Controller
                    name="product"
                    control={control}
                    rules={{ required: "Product must be selected" }}
                    render={({field}) => (
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="">Select Product</option>
                        {products.map(product => (
                          <option key={product.id} value={product.name}>{product.name}</option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Segment</label>
                  <Controller
                    name="segment"
                    control={control}
                    rules={{ required: "Segment must be selected" }}
                    render={({field}) => (
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="">Select Segment</option>
                        {segments.map(segment => (
                          <option key={segment} value={segment}>{segment}</option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("date", {
                      required: "Date must be filled on"
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Payment</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("duePayment", {
                      required: "Due Payment must be required"
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SPK Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("spkDate", {
                      required: "SPK Date must be required"
                    })}
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-gray-700">Priority</label>
                  <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <button
                        type="button"
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          field.value ? "bg-blue-600" : "bg-gray-200"
                        }`}
                        onClick={() => field.onChange(!field.value)}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            field.value ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    )}
                  />
                </div>
              </div>
            </div>
    )
}