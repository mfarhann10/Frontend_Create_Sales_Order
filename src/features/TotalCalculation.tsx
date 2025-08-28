import { Calculator, Minus, Plus } from "lucide-react";
import type { Addition, Deduction, FormData } from "../pages/SalesOrderForm";
import { useCallback } from "react";

type TotalCalculation = {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const TotalCalculation = ({formData, setFormData}: TotalCalculation) =>{
    const calculateTotalQuantity = useCallback(() => {
        return formData.variants.reduce((total, variant) => {
          return total + Object.values(variant.sizes).reduce((sum, qty) => sum + qty, 0);
        }, 0);
      }, [formData.variants]);

    const addAddition = () => {
    const newAddition: Addition = {
      id: Date.now().toString(),
      category: '',
      description: '',
      price: 0
    };
    setFormData(prev => ({
      ...prev,
      additions: [...prev.additions, newAddition]
    }));
  };

    const removeAddition = (id: string) => {
    setFormData(prev => ({
      ...prev,
      additions: prev.additions.filter(add => add.id !== id)
    }));
  };

  const addDeduction = () => {
    const newDeduction: Deduction = {
      id: Date.now().toString(),
      category: '',
      description: '',
      price: 0
    };
    setFormData(prev => ({
      ...prev,
      deductions: [...prev.deductions, newDeduction]
    }));
  };

  const removeDeduction = (id: string) => {
    setFormData(prev => ({
      ...prev,
      deductions: prev.deductions.filter(ded => ded.id !== id)
    }));
  };

  const calculateTotalAmount = useCallback(() => {
      const productTotal = formData.variants.reduce((total, variant) => {
        const variantQty = Object.values(variant.sizes).reduce((sum, qty) => sum + qty, 0);
        return total + (variantQty * variant.price);
      }, 0);
  
      const additionsTotal = formData.additions.reduce((sum, add) => sum + add.price, 0);
      const deductionsTotal = formData.deductions.reduce((sum, ded) => sum + ded.price, 0);
      
      return productTotal + formData.shipping.price + additionsTotal - deductionsTotal;
    }, [formData.variants, formData.shipping.price, formData.additions, formData.deductions]);
    return(
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900">Total Calculation</h2>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Total Product (pcs)</span>
                    <div className="text-lg font-semibold text-gray-900">{calculateTotalQuantity()}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Total Product Amount</span>
                    <div className="text-lg font-semibold text-gray-900">
                      Rp {formData.variants.reduce((total, variant) => {
                        const variantQty = Object.values(variant.sizes).reduce((sum, qty) => sum + qty, 0);
                        return total + (variantQty * variant.price);
                      }, 0).toLocaleString('id-ID')}
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
                      value={formData.shipping.category}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        shipping: { ...prev.shipping, price: Number(e.target.value) }
                      }))}
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
                      onClick={addAddition}
                    >
                      <Plus className="h-4 w-4 inline mr-1" />
                      Add
                    </button>
                  </div>
                  {formData.additions.map((addition) => (
                    <div key={addition.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-2">
                      <input
                        type="text"
                        placeholder="Category"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={addition.category}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          additions: prev.additions.map(add =>
                            add.id === addition.id ? { ...add, category: e.target.value } : add
                          )
                        }))}
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={addition.description}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          additions: prev.additions.map(add =>
                            add.id === addition.id ? { ...add, description: e.target.value } : add
                          )
                        }))}
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={addition.price}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          additions: prev.additions.map(add =>
                            add.id === addition.id ? { ...add, price: Number(e.target.value) } : add
                          )
                        }))}
                      />
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => removeAddition(addition.id)}
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
                      onClick={addDeduction}
                    >
                      <Plus className="h-4 w-4 inline mr-1" />
                      Add
                    </button>
                  </div>
                  {formData.deductions.map((deduction) => (
                    <div key={deduction.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-2">
                      <input
                        type="text"
                        placeholder="Category"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={deduction.category}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          deductions: prev.deductions.map(ded =>
                            ded.id === deduction.id ? { ...ded, category: e.target.value } : ded
                          )
                        }))}
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={deduction.description}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          deductions: prev.deductions.map(ded =>
                            ded.id === deduction.id ? { ...ded, description: e.target.value } : ded
                          )
                        }))}
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={deduction.price}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          deductions: prev.deductions.map(ded =>
                            ded.id === deduction.id ? { ...ded, price: Number(e.target.value) } : ded
                          )
                        }))}
                      />
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => removeDeduction(deduction.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Total Bill */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-right">
                    <span className="text-lg font-medium text-gray-700">Total Bill: </span>
                    <span className="text-xl font-bold text-gray-900">
                      Rp {calculateTotalAmount().toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
    )
}