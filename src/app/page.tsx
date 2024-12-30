import Categories from "@/components/Categories";
import Contact from "@/components/contact";
import FeaturedProducts from "@/components/feature-products";
import Header from "@/components/Header";
import { getCategories, getAllProducts } from "./actions/actions";

export default async function Home() {
  const categories = await getCategories();
  const products = await getAllProducts();

  return (
    <div>
      <Header/>
      <Categories categories={categories}/> 
      <FeaturedProducts products={products}/>
      <Contact/>
    </div>
  );
}