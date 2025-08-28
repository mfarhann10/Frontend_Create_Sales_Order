import { CreditCard, Upload } from "lucide-react";
import type { FormData } from "../pages/SalesOrderForm";
import { useCallback } from "react";

type PaypmentProps = {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const Payment = ({formData, setFormData}: PaypmentProps) => {
    const wallets = ['Cash', 'Bank Transfer', 'Credit Card', 'E-Wallet'];
    const handleFileUpload = (file: File, type: 'attachment' | 'designFile') => {
    setFormData(prev => ({
      ...prev,
      [type]: file
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

  const remainingPayment = calculateTotalAmount() - formData.paymentAmount;
    return(
        <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-yellow-600" />
                <h2 className="text-lg font-semibold text-gray-900">Payment</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Wallet</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.wallet}
                    onChange={(e) => setFormData(prev => ({ ...prev, wallet: e.target.value }))}
                  >
                    <option value="">Select Wallet</option>
                    {wallets.map(wallet => (
                      <option key={wallet} value={wallet}>{wallet}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.paymentAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, paymentAmount: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.paymentDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, paymentDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-yellow-800">Remaining Payment:</span>
                  <span className="text-lg font-bold text-yellow-900">
                    Rp {remainingPayment.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attachment</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    id="payment-attachment"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'attachment')}
                  />
                  <label htmlFor="payment-attachment" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      {formData.attachment ? formData.attachment.name : 'Click to upload or drag and drop'}
                    </p>
                  </label>
                </div>
              </div>
            </div>
    )
}