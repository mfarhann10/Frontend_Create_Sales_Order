import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DesignUpload } from "../features/DesignUpload";
import { OrderData } from "../features/OderData";
import { Payment } from "../features/Payment";
import { ProductDetail } from "../features/ProductDetail";
import { ProductVariant } from "../features/ProductVariant";
import { TotalCalculation } from "../features/TotalCalculation";
import { useResultOrderStore } from "../store/ResultOrderStore";

export interface ProductVariant {
  id: string;
  variant: string;
  subVariant: string;
  price: number;
  sizes: {
    [key: string]: number; // size -> quantity
  };
}

export interface Addition {
  id: string;
  category: string;
  description: string;
  price: number;
}

export interface Deduction {
  id: string;
  category: string;
  description: string;
  price: number;
}

export interface FormData {
  // Order Data
  customer: string;
  address: string;
  orderName: string;
  product: string;
  segment: string;
  date: string;
  duePayment: string;
  spkDate: string;
  priority: boolean;

  // Product Details
  materialDetail: {
    category: string;
    material: string;
    inputColor: string;
    expandableInput: string;
  };
  productNote: string;
  printingDetail: {
    category: string;
    material: string;
    inputColor: string;
    expandableInput: string;
  };
  embroideryDetail: {
    category: string;
    material: string;
    inputColor: string;
    expandableInput: string;
  };

  // Product Variants
  variants: ProductVariant[];

  // Shipping
  shipping: {
    category: string;
    weight: number;
    price: number;
  };

  // Additions and Deductions
  additions: Addition[];
  deductions: Deduction[];

  // Payment
  wallet: number;
  paymentAmount: number;
  paymentDate: string;
  attachment: File | null;

  // Design
  designFile: File | null;
  designNote: string;
}

export const SalesOrderForm = () => {
  const navigate = useNavigate();
  const { setResultOrderData } = useResultOrderStore();
  const methods = useForm<FormData>({
    defaultValues: {
      customer: "",
      address: "",
      orderName: "",
      product: "",
      segment: "",
      date: "",
      duePayment: "",
      spkDate: "",
      priority: false,
      materialDetail: {
        category: "",
        material: "",
        inputColor: "",
        expandableInput: "",
      },
      productNote: "",
      printingDetail: {
        category: "",
        material: "",
        inputColor: "",
        expandableInput: "",
      },
      embroideryDetail: {
        category: "",
        material: "",
        inputColor: "",
        expandableInput: "",
      },
      variants: [
        {
          id: "1",
          variant: "",
          subVariant: "",
          price: 0,
          sizes: {},
        },
      ],
      shipping: {
        category: "",
        weight: 0,
        price: 0,
      },
      additions: [],
      deductions: [],
      wallet: 0,
      paymentAmount: 0,
      paymentDate: "",
      attachment: null,
      designFile: null,
      designNote: "",
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
    setResultOrderData(data);
    methods.reset();

    navigate("/result");
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Create Sales Order
            </h1>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <div className="p-6 space-y-8">
                {/* Order Data Section */}
                <OrderData />

                {/* Product Detail Section */}
                <ProductDetail />

                {/* Product Variant Section */}
                <ProductVariant />

                {/* Total Calculation Section */}
                <TotalCalculation />

                {/* Payment */}
                <Payment />

                {/* Design */}
                <DesignUpload />

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Submit Order
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
