
import Banner from "@/components/banner/Banner";
import FeaturedProductsHomePage from "@/components/products/FeaturedProductsHomePage";

export default function Home() {
  return (
    <main className="">
      <div className="relative">
        <Banner />
        <FeaturedProductsHomePage />
      </div>
    </main>
  );
}
