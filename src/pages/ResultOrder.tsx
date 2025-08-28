import { useResultOrderStore } from "../store/ResultOrderStore";

export const ResultOrder = () => {
  const { resultOrderData } = useResultOrderStore();

  if (!resultOrderData) {
    return (
      <div className="p-6 text-center text-gray-400">
        <p>Belum ada data order. Silakan submit form terlebih dahulu.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📋 Result Order</h1>

      {/* Customer Info */}
      <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Customer Info</h2>
        <p>
          <strong>Customer:</strong> {resultOrderData.customer}
        </p>
        <p>
          <strong>Address:</strong> {resultOrderData.address}
        </p>
        <p>
          <strong>Order Name:</strong> {resultOrderData.orderName}
        </p>
        <p>
          <strong>Product:</strong> {resultOrderData.product}
        </p>
        <p>
          <strong>Segment:</strong> {resultOrderData.segment}
        </p>
        <p>
          <strong>Date:</strong> {resultOrderData.date}
        </p>
        <p>
          <strong>SPK Date:</strong> {resultOrderData.spkDate}
        </p>
        <p>
          <strong>Due Payment:</strong> {resultOrderData.duePayment}
        </p>
        <p>
          <strong>Priority:</strong> {resultOrderData.priority ? "Yes" : "No"}
        </p>
      </div>

      {/* Variants */}
      <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Product Variants</h2>
        {resultOrderData.variants.length > 0 ? (
          <ul className="list-disc pl-5">
            {resultOrderData.variants.map((variant, idx) => (
              <li key={idx}>
                {variant.variant} - Price: {variant.price}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No variants provided</p>
        )}
      </div>

      {/* Shipping */}
      <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Shipping</h2>
        <p>
          <strong>Category:</strong> {resultOrderData.shipping.category}
        </p>
        <p>
          <strong>Weight:</strong> {resultOrderData.shipping.weight} kg
        </p>
        <p>
          <strong>Price:</strong> Rp {resultOrderData.shipping.price}
        </p>
      </div>

      {/* Additions */}
      <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Additions</h2>
        {resultOrderData.additions.length > 0 ? (
          <ul className="list-disc pl-5">
            {resultOrderData.additions.map((add, idx) => (
              <li key={idx}>
                {add.category} - {add.description} - Rp {add.price}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No additions</p>
        )}
      </div>

      {/* Deductions */}
      <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Deductions</h2>
        {resultOrderData.deductions.length > 0 ? (
          <ul className="list-disc pl-5">
            {resultOrderData.deductions.map((ded, idx) => (
              <li key={idx}>
                {ded.category} - {ded.description} - Rp {ded.price}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No deductions</p>
        )}
      </div>

      {/* Payment */}
      <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Payment</h2>
        <p>
          <strong>Wallet:</strong> Rp {resultOrderData.wallet}
        </p>
        <p>
          <strong>Payment Amount:</strong> Rp {resultOrderData.paymentAmount}
        </p>
        <p>
          <strong>Payment Date:</strong> {resultOrderData.paymentDate}
        </p>
        {resultOrderData.attachment && (
          <p>
            <strong>Attachment:</strong> {resultOrderData.attachment.name}
          </p>
        )}
      </div>

      {/* Design */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Design</h2>
        <p>
          <strong>Note:</strong> {resultOrderData.designNote}
        </p>
        {resultOrderData.designFile && (
          <p>
            <strong>Design File:</strong> {resultOrderData.designFile.name}
          </p>
        )}
      </div>
    </div>
  );
};
