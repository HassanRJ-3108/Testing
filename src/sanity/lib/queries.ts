import { groq } from 'next-sanity'

export const getCategoriesQuery = groq`
  *[_type == "category"] {
    name,
    image,
    "slug": slug.current
  }
`

export const getProductsQuery = groq`
  *[_type == "category"] {
    "id": _id,
    name,
    "slug": slug.current,
    "products": *[_type == "product" && references(^._id)] {
      "id": _id,
      name,
      "category": ^.name,
      image,
      rating,
      price
    }
  }
`

export const getProductsByCategoryQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    "id": _id,
    name,
    "slug": slug.current,
    "products": *[_type == "product" && references(^._id)] {
      "id": _id,
      name,
      "category": ^.name,
      image,
      rating,
      price
    }
  }
`

