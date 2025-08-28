import { Minus, Package, Plus } from "lucide-react";
import type { FormData, ProductVariant as ProductVariantInterface } from "../pages/SalesOrderForm";

type ProductVariantProps = {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}


export const ProductVariant = ({formData, setFormData}: ProductVariantProps) =>{
  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];
  const addVariant = () => {
    const newVariant: ProductVariantInterface = {
      id: Date.now().toString(),
      variant: '',
      subVariant: '',
      price: 0,
      sizes: {}
    };
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, newVariant]
    }));
  };

  const removeVariant = (variantId: string) => {
    if (formData.variants.length > 1) {
      setFormData(prev => ({
        ...prev,
        variants: prev.variants.filter(variant => variant.id !== variantId)
      }));
    }
  };

  const handleVariantChange = (variantId: string, field: keyof ProductVariantInterface, value: any) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map(variant =>
        variant.id === variantId ? { ...variant, [field]: value } : variant
      )
    }));
  };

  const handleSizeQuantityChange = (variantId: string, size: string, quantity: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map(variant =>
        variant.id === variantId
          ? { ...variant, sizes: { ...variant.sizes, [size]: quantity } }
          : variant
      )
    }));
  };
  return(
    <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-purple-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Product Variant</h2>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={addVariant}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Variant
                </button>
              </div>

              {formData.variants.map((variant, index) => (
                <div key={variant.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Variant {index + 1}</h3>
                    {formData.variants.length > 1 && (
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => removeVariant(variant.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={variant.variant}
                        onChange={(e) => handleVariantChange(variant.id, 'variant', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Variant</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={variant.subVariant}
                        onChange={(e) => handleVariantChange(variant.id, 'subVariant', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={variant.price}
                        onChange={(e) => handleVariantChange(variant.id, 'price', Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size & Quantity</label>
                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
                      {sizes.map(size => (
                        <div key={size} className="text-center">
                          <label className="block text-xs font-medium text-gray-600 mb-1">{size}</label>
                          <input
                            type="number"
                            min="0"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={variant.sizes[size] || 0}
                            onChange={(e) => handleSizeQuantityChange(variant.id, size, Number(e.target.value))}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
  )
}