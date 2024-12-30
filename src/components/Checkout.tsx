import React, { useState } from 'react';
import { useCart } from '../app/contexts/CartContext';

export interface CheckoutProps {
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
}

const Checkout: React.FC<CheckoutProps> = ({ items, totalAmount }) => {
  const { checkout, isCheckingOut } = useCart();
  const [checkoutDetails, setCheckoutDetails] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'credit_card'
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCheckoutDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await checkout(checkoutDetails);
    if (result.success) {
      setOrderPlaced(true);
      setOrderId(result.orderId || null);
    } else {
      alert('Checkout failed. Please try again.');
    }
  };

  if (orderPlaced) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold mb-4 text-green-600">Thank you for your order!</h2>
          <p className="text-xl mb-4">Your order has been placed successfully.</p>
          {orderId && <p className="text-lg font-semibold">Order ID: {orderId}</p>}
          <p className="mt-8 text-gray-600">You will receive a confirmation email shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={checkoutDetails.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={checkoutDetails.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="address" className="block mb-1">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={checkoutDetails.address}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="paymentMethod" className="block mb-1">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={checkoutDetails.paymentMethod}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option disabled selected>Select Payment Method</option>
            <option value="cash_on_delivery">Cash on Delivery</option>
            <option disabled>Comming Soon...</option>
          
          </select>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          {items.map(item => (
            <div key={item.id} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t">
            <strong>Total: ${totalAmount.toFixed(2)}</strong>
          </div>
        </div>
        <button
          type="submit"
          disabled={isCheckingOut}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
        >
          {isCheckingOut ? 'Processing...' : 'Place Order'}
        </button>
      </form>
      <div className="mt-4 text-sm text-gray-600">
        <p>More payment options coming soon!</p>
      </div>
    </div>
  );
};

export default Checkout;