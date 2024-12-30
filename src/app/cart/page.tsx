'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cart from '@/components/Cart';
import { useCart } from '@/app/contexts/CartContext';
import { getAllProducts } from '@/app/actions/actions';
import { CategoryProducts, Product } from '@/types/types';

interface CartItemWithQuantity extends Product {
  quantity: number;
}

const CartPage: React.FC = () => {
  const { cart } = useCart();
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<CategoryProducts>({});
  const [cartItemsWithDetails, setCartItemsWithDetails] = useState<CartItemWithQuantity[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      setAllProducts(products);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (Object.keys(allProducts).length > 0) {
      const items = cart
        .map(cartItem => {
          const productDetails = Object.values(allProducts)
            .flatMap(category => category.products)
            .find(product => product.id === cartItem.id);
          
          if (productDetails) {
            return { 
              ...productDetails, 
              quantity: cartItem.quantity
            };
          }
          return undefined;
        })
        .filter((item): item is CartItemWithQuantity => item !== undefined);

      setCartItemsWithDetails(items);
    }
  }, [cart, allProducts]);

  const handleCheckout = () => {
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

