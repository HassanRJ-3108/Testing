// src/app/category/[slug]/page.tsx
import React from 'react';
import { getProductsByCategory } from '@/app/actions/actions';
import ProductGrid from '@/components/ProductGrid'; // Separate Client Component

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryData = await getProductsByCategory(params.slug);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-10">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          {categoryData ? categoryData.name : 'Category Not Found'}
        </span>
      </h1>
      <ProductGrid products={categoryData ? categoryData.products : []} />
    </div>
  );
}
