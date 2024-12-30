import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getCategories } from '../actions/actions'
import { Category } from '@/types/types'

export default async function Categories() {
  const categories = await getCategories();

  return (
    <section className="py-16 bg-gray-50 mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Explore Our Collections
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category: Category) => (
            <div
              key={category._id}
              className="md:col-span-1"
            >
              <Link href={`/category/${category.slug}`} className="block group relative overflow-hidden rounded-lg shadow-lg">
                <div className="relative aspect-[1/1]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 group-hover:bg-opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white text-center drop-shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

