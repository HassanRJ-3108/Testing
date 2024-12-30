import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/app/contexts/CartContext';
import { Product } from '@/types/types';

interface CartItemWithQuantity extends Product {
  quantity: number;
}

interface CartProps {
  items: CartItemWithQuantity[];
  onCheckout: () => void; 
}

const Cart: React.FC<CartProps> = ({ items, onCheckout }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const subtotal = items
    .filter(item => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = selectedItems.length > 0 ? 5.99 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to proceed to checkout.");
    } else {
      onCheckout();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <div className="w-full lg:w-2/3">
        {items.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between mb-4 bg-white p-4 rounded-lg shadow">
              <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleItemSelection(item.id)}
                  className="mr-4 mb-2 sm:mb-0"
                />
                <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md mr-4 mb-2 sm:mb-0" />
                <div className="text-center sm:text-left">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Price: Rs {item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-indigo-500 text-white px-2 py-1 rounded-l hover:bg-indigo-600"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-indigo-500 text-white px-2 py-1 rounded-r hover:bg-indigo-600"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="w-full lg:w-1/3 bg-gray-100 p-4 rounded-lg lg:sticky lg:top-4 h-fit">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="mb-4">
          <p>Subtotal: Rs {subtotal.toFixed(2)}</p>
          <p>Delivery Fee: Rs {deliveryFee.toFixed(2)}</p>
          <p className="font-bold text-lg mt-2">Total: Rs {total.toFixed(2)}</p>
        </div>
        <h3 className="font-bold mb-2">Selected Items:</h3>
        {selectedItems.length > 0 ? (
          items
            .filter(item => selectedItems.includes(item.id))
            .map(item => (
              <div key={item.id} className="mb-2">
                <p>{item.name}</p>
                <p>Rs {item.price.toFixed(2)} x {item.quantity} = Rs {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))
        ) : (
          <p className="text-gray-500">No items selected</p>
        )}
        <button 
          onClick={handleCheckout}
          className={`w-full font-bold py-2 px-4 rounded mt-4 transition duration-300 ${
            selectedItems.length > 0
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
          disabled={selectedItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

