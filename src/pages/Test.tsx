import React, { useState, useCallback } from 'react';
import { Calendar, Upload, Plus, Minus, FileText, User, Package, CreditCard, Truck, Calculator } from 'lucide-react';

// Types
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

interface ProductVariant {
  id: string;
  variant: string;
  subVariant: string;
  price: number;
  sizes: {
    [key: string]: number; // size -> quantity
  };
}

interface Addition {
  id: string;
  category: string;
  description: string;
  price: number;
}

interface Deduction {
  id: string;
  category: string;
  description: string;
  price: number;
}

interface FormData {
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
  wallet: string;
  paymentAmount: number;
  paymentDate: string;
  attachment: File | null;
  
  // Design
  designFile: File | null;
  designNote: string;
}

export const Test: React.FC = () => {
  // Mock data
  const customers: Customer[] = [
    { id: '1', name: 'PT ABC Corporation', address: 'Jl. Sudirman No. 123, Jakarta' },
    { id: '2', name: 'CV XYZ Trading', address: 'Jl. Gatot Subroto No. 456, Bandung' },
    { id: '3', name: 'UD Maju Jaya', address: 'Jl. Ahmad Yani No. 789, Surabaya' }
  ];

  const products: Product[] = [
    { id: '1', name: 'T-Shirt Premium', category: 'Apparel' },
    { id: '2', name: 'Polo Shirt', category: 'Apparel' },
    { id: '3', name: 'Hoodie', category: 'Apparel' }
  ];

  const segments = ['Corporate', 'Retail', 'Wholesale', 'Online'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];
  const wallets = ['Cash', 'Bank Transfer', 'Credit Card', 'E-Wallet'];

  // Initial form state
  const [formData, setFormData] = useState<FormData>({
    customer: '',
    address: '',
    orderName: '',
    product: '',
    segment: '',
    date: '',
    duePayment: '',
    spkDate: '',
    priority: false,
    materialDetail: {
      category: '',
      material: '',
      inputColor: '',
      expandableInput: ''
    },
    productNote: '',
    printingDetail: {
      category: '',
      material: '',
      inputColor: '',
      expandableInput: ''
    },
    embroideryDetail: {
      category: '',
      material: '',
      inputColor: '',
      expandableInput: ''
    },
    variants: [{
      id: '1',
      variant: '',
      subVariant: '',
      price: 0,
      sizes: {}
    }],
    shipping: {
      category: '',
      weight: 0,
      price: 0
    },
    additions: [],
    deductions: [],
    wallet: '',
    paymentAmount: 0,
    paymentDate: '',
    attachment: null,
    designFile: null,
    designNote: ''
  });

  // Calculations
  const calculateTotalQuantity = useCallback(() => {
    return formData.variants.reduce((total, variant) => {
      return total + Object.values(variant.sizes).reduce((sum, qty) => sum + qty, 0);
    }, 0);
  }, [formData.variants]);

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

  // Event handlers
  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    setFormData(prev => ({
      ...prev,
      customer: customerId,
      address: customer ? customer.address : ''
    }));
  };

  const handleVariantChange = (variantId: string, field: keyof ProductVariant, value: any) => {
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

  const addVariant = () => {
    const newVariant: ProductVariant = {
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

  const handleFileUpload = (file: File, type: 'attachment' | 'designFile') => {
    setFormData(prev => ({
      ...prev,
      [type]: file
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Sales Order Form</h1>
          </div>

          <div className="p-6 space-y-8">
            {/* Order Data Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Order Data</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.customer}
                    onChange={(e) => handleCustomerChange(e.target.value)}
                  >
                    <option value="">Select Customer</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    value={formData.address}
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.orderName}
                    onChange={(e) => setFormData(prev => ({ ...prev, orderName: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.product}
                    onChange={(e) => setFormData(prev => ({ ...prev, product: e.target.value }))}
                  >
                    <option value="">Select Product</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Segment</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.segment}
                    onChange={(e) => setFormData(prev => ({ ...prev, segment: e.target.value }))}
                  >
                    <option value="">Select Segment</option>
                    {segments.map(segment => (
                      <option key={segment} value={segment}>{segment}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Payment</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.duePayment}
                    onChange={(e) => setFormData(prev => ({ ...prev, duePayment: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SPK Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.spkDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, spkDate: e.target.value }))}
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-gray-700">Priority</label>
                  <button
                    type="button"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.priority ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, priority: !prev.priority }))}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.priority ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Detail Section */}
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

            {/* Product Variant Section */}
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

            {/* Total Calculation Section */}
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

            {/* Payment Section */}
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

            {/* Design Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-pink-600" />
                <h2 className="text-lg font-semibold text-gray-900">Design</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Design File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    id="design-file"
                    accept="image/*,.pdf,.ai,.psd"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'designFile')}
                  />
                  <label htmlFor="design-file" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      {formData.designFile ? formData.designFile.name : 'Upload design file (Image, PDF, AI, PSD)'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Drag and drop or click to browse
                    </p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Design Note</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add design specifications, requirements, or notes..."
                  value={formData.designNote}
                  onChange={(e) => setFormData(prev => ({ ...prev, designNote: e.target.value }))}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save as Draft
              </button>
              <button
                type="button"
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};