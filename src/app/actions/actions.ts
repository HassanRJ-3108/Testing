'use server'

import { client } from '@/sanity/lib/client'
import { getCategoriesQuery, getProductsQuery, getProductsByCategoryQuery } from '@/sanity/lib/queries'
import { Category, CategoryProducts } from '@/types/types'

export async function getCategories(): Promise<Category[]> {
  return client.fetch(getCategoriesQuery)
}

export async function getAllProducts(): Promise<CategoryProducts> {
  const categories = await client.fetch(getProductsQuery)
  const products = categories.reduce((acc: CategoryProducts, category: any) => {
    acc[category.slug] = {
      id: category.id,
      name: category.name,
      products: category.products,
    }
    return acc
  }, {})
  return products
}

export async function getProductsByCategory(slug: string) {
  return client.fetch(getProductsByCategoryQuery, { slug })
}

