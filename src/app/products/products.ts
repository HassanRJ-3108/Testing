import { client } from "@/sanity/lib/client";



export interface Product {
    id: number;
    name: string;
    category: string;
    image: string;
    rating: number;
    price: number;
    quantity?: number; 
  }
  
  export interface CategoryProducts {
    [key: string]: {
      id: number;
      name: string;
      products: Product[];
    };
  }
  
const products: CategoryProducts = await client.fetch(` *[_type == "category"] {
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
  }`)

  // console.log(products)

  export default products;



//   // const products: CategoryProducts = {
//   //   "home-living": {
//   //     id: 1,
//   //     name: "Home & Living",
//   //     products: [
//   //       {
//   //         id: 1,
//   //         name: 'Stylish Sofa',
//   //         category: 'Home & Living',
//   //         image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
//   //         rating: 4.6,
//   //         price: 66399.81, // 20% kam kiya gaya
//   //       },
//   //       {
//   //         id: 2,
//   //         name: 'Elegant Dining Table',
//   //         category: 'Home & Living',
//   //         image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
//   //         rating: 4.3,
//   //         price: 88319.81, // 20% kam kiya gaya
//   //       },
//   //       {
//   //         id: 3,
//   //         name: 'Modern Coffee Table',
//   //         category: 'Home & Living',
//   //         image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
//   //         rating: 4.5,
//   //         price: 33239.81, // 20% kam kiya gaya
//   //       },
//   //       {
//   //         id: 4,
//   //         name: 'Cozy Armchair',
//   //         category: 'Home & Living',
//   //         image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
//   //         rating: 4.2,
//   //         price: 44319.81, // 20% kam kiya gaya
//   //       },
//   //     ]
//   //   },
//   //   "mens-fashion": {
//   //     id: 2,
//   //     name: "Men's Fashion",
//   //     products: [
//   //       {
//   //         id: 5,
//   //         name: 'Classic Men\'s Suit',
//   //         category: 'Men\'s Fashion',
//   //         image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
//   //         rating: 4.8,
//   //         price: 133599.81, // 20% kam kiya gaya
//   //       },
//   //       {
//   //         id: 6,
//   //         name: 'Casual T-Shirt',
//   //         category: 'Men\'s Fashion',
//   //         image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
//   //         rating: 4.5,
//   //         price: 663.83, // 20% kam kiya gaya
//   //       },
//   //       {
//   //         id: 7,
//   //         name: 'Men\'s Leather Jacket',
//   //         category: 'Men\'s Fashion',
//   //         image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
//   //         rating: 4.7,
//   //         price: 69199.76, // 249.99 * 277.24
//   //       },
//   //       {
//   //         id: 8,
//   //         name: 'Men\'s Jeans',
//   //         category: 'Men\'s Fashion',
//   //         image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80',
//   //         rating: 4.4,
//   //         price: 22199.76, // 79.99 * 277.24
//   //       },
//   //     ]
//   //   },
//   //   "womens-fashion": {
//   //     id: 3,
//   //     name: "Women's Fashion",
//   //     products: [
//   //       {
//   //         id: 9,
//   //         name: 'Elegant Dress',
//   //         category: 'Women\'s Fashion',
//   //         image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1783&q=80',
//   //         rating: 4.7,
//   //         price: 17759.81, // 20% kam kiya gaya
//   //       },
//   //       {
//   //         id: 10,
//   //         name: 'Stylish Handbag',
//   //         category: 'Women\'s Fashion',
//   //         image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//   //         rating: 4.3,
//   //         price: 13899.76, // 49.99 * 277.24
//   //       },
//   //       {
//   //         id: 11,
//   //         name: 'Women\'s Blouse',
//   //         category: 'Women\'s Fashion',
//   //         image: 'https://images.unsplash.com/photo-1604695573706-53170668f6a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
//   //         rating: 4.5,
//   //         price: 11049.76, // 39.99 * 277.24
//   //       },
//   //       {
//   //         id: 12,
//   //         name: 'Women\'s Heels',
//   //         category: 'Women\'s Fashion',
//   //         image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
//   //         rating: 4.6,
//   //         price: 24999.76, // 89.99 * 277.24
//   //       },
//   //     ]
//   //   },
//   //   "electronics": {
//   //     id: 4,
//   //     name: "Electronics",
//   //     products: [
//   //       {
//   //         id: 13,
//   //         name: 'Smartphone',
//   //         category: 'Electronics',
//   //         image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
//   //         rating: 4.5,
//   //         price: 155999.81, // 20% kam kiya gaya
//   //       },
//   //       {
//   //         id: 14,
//   //         name: 'Laptop',
//   //         category: 'Electronics',
//   //         image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
//   //         rating: 4.2,
//   //         price: 277999.76, // 999.99 * 277.24
//   //       },
//   //       {
//   //         id: 15,
//   //         name: 'Wireless Headphones',
//   //         category: 'Electronics',
//   //         image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//   //         rating: 4.4,
//   //         price: 41549.76, // 149.99 * 277.24
//   //       },
//   //       {
//   //         id: 16,
//   //         name: 'Smart Watch',
//   //         category: 'Electronics',
//   //         image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80',
//   //         rating: 4.3,
//   //         price: 55399.76, // 199.99 * 277.24
//   //       },
//   //     ]
//   //   },
//   //   "beauty": {
//   //     id: 5,
//   //     name: "Beauty",
//   //     products: [
//   //       {
//   //         id: 17,
//   //         name: 'Lipstick Set',
//   //         category: 'Beauty',
//   //         image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1015&q=80',
//   //         rating: 4.6,
//   //         price: 663.83, // 20% kam kiya gaya
//   //       },
//   //       {
//   //         id: 18,
//   //         name: 'Facial Cleanser',
//   //         category: 'Beauty',
//   //         image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
//   //         rating: 4.4,
//   //         price: 5549.76, // 19.99 * 277.24
//   //       },
//   //       {
//   //         id: 19,
//   //         name: 'Eyeshadow Palette',
//   //         category: 'Beauty',
//   //         image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//   //         rating: 4.7,
//   //         price: 11049.76, // 39.99 * 277.24
//   //       },
//   //       {
//   //         id: 20,
//   //         name: 'Perfume',
//   //         category: 'Beauty',
//   //         image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1104&q=80',
//   //         rating: 4.5,
//   //         price: 16649.76, // 59.99 * 277.24
//   //       },
//   //     ]
//   //   },
//   //   "sports-outdoors": {
//   //     id: 6,
//   //     name: "Sports & Outdoors",
//   //     products: [
//   //       {
//   //         id: 21,
//   //         name: 'Yoga Mat',
//   //         category: 'Sports & Outdoors',
//   //         image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
//   //         rating: 4.3,
//   //         price: 663.83, // 20% kam kiya gaya
//   //       },
//   //       {
//   //         id: 22,
//   //         name: 'Camping Tent',
//   //         category: 'Sports & Outdoors',
//   //         image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//   //         rating: 4.5,
//   //         price: 55399.76, // 199.99 * 277.24
//   //       },
//   //       {
//   //         id: 23,
//   //         name: 'Hiking Backpack',
//   //         category: 'Sports & Outdoors',
//   //         image: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
//   //         rating: 4.6,
//   //         price: 22199.76, // 79.99 * 277.24
//   //       },
//   //       {
//   //         id: 24,
//   //         name: 'Fitness Tracker',
//   //         category: 'Sports & Outdoors',
//   //         image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//   //         rating: 4.4,
//   //         price: 24999.76, // 89.99 * 277.24
//   //       },
//   //     ]
//   //   },
//   // };
  