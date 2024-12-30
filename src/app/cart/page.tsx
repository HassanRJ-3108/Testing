'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Cart from '@/components/Cart';
import { useCart } from '../contexts/CartContext';
import products, { Product } from '@/app/products/products';

interface CartItemWithQuantity extends Omit<Product, 'id'> {
  quantity: number;
  id: number;
}

const CartPage: React.FC = () => {
  const { cart } = useCart();
  const router = useRouter();

  const cartItemsWithDetails: CartItemWithQuantity[] = cart
    .map(cartItem => {
      const productDetails = Object.values(products)
        .flatMap(category => category.products)
        .find(product => product.id === cartItem.id);
      
      if (productDetails) {
        return { 
          ...productDetails, 
          quantity: cartItem.quantity, 
          id: productDetails.id
        };
      }
      return undefined;
    })
    .filter((item): item is CartItemWithQuantity => item !== undefined);

  const totalAmount = cartItemsWithDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Navigate to the checkout page
    router.push('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <Cart items={cartItemsWithDetails} onCheckout={handleCheckout} />
    </div>
  );
};

export default CartPage;