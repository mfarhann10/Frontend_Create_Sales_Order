import { Package } from "lucide-react";
import type { FormData } from "../pages/SalesOrderForm";

type ProductDetailProps = {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const ProductDetail = ({formData, setFormData}: ProductDetailProps) => {
    return(
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
                    value={formData.materialDetail.category}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      materialDetail: { ...prev.materialDetail, category: e.target.value }
                    }))}
                  />
                  <input
                    type="text"
                    placeholder="Material"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.materialDetail.material}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      materialDetail: { ...prev.materialDetail, material: e.target.value }
                    }))}
                  />
                  <input
                    type="text"
                    placeholder="Input Color"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.materialDetail.inputColor}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      materialDetail: { ...prev.materialDetail, inputColor: e.target.value }
                    }))}
                  />
                  <input
                    type="text"
                    placeholder="Expandable Input"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.materialDetail.expandableInput}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      materialDetail: { ...prev.materialDetail, expandableInput: e.target.value }
                    }))}
                  />
                </div>
              </div>

              {/* Product Note */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Note</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.productNote}
                  onChange={(e) => setFormData(prev => ({ ...prev, productNote: e.target.value }))}
                />
              </div>

              {/* Printing Detail */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Printing Detail</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Category"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.printingDetail.category}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      printingDetail: { ...prev.printingDetail, category: e.target.value }
                    }))}
                  />
                  <input
                    type="text"
                    placeholder="Material"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.printingDetail.material}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      printingDetail: { ...prev.printingDetail, material: e.target.value }
                    }))}
                  />
                  <input
                    type="text"
                    placeholder="Input Color"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.printingDetail.inputColor}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      printingDetail: { ...prev.printingDetail, inputColor: e.target.value }
                    }))}
                  />
                  <input
                    type="text"
                    placeholder="Expandable Input"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.printingDetail.expandableInput}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      printingDetail: { ...prev.printingDetail, expandableInput: e.target.value }
                    }))}
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
                    value={formData.embroideryDetail.category}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      embroideryDetail: { ...prev.embroideryDetail, category: e.target.value }
                    }))}
                  />
                  <input
                    type="text"
                    placeholder="Material"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.embroideryDetail.material}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      embroideryDetail: { ...prev.embroideryDetail, material: e.target.value }
                    }))}
                  />
                  <input
                    type="text"
                    placeholder="Input Color"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.embroideryDetail.inputColor}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      embroideryDetail: { ...prev.embroideryDetail, inputColor: e.target.value }
                    }))}
                  />
                  <input
                    type="text"
                    placeholder="Expandable Input"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.embroideryDetail.expandableInput}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      embroideryDetail: { ...prev.embroideryDetail, expandableInput: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </div>
    )
}