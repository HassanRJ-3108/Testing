import React from 'react';
import { getAllProducts } from '@/app/actions/actions';
import ProductsClient from '@/app/products/ProductsClient';
export default async function ProductsPage() {
  const products = await getAllProducts();
  
  return <ProductsClient initialProducts={products} />;
}
