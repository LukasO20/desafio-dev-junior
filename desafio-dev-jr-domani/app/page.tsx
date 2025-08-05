import Image from "next/image";

import { ProductsProvider } from "@/providers/ProductsProvider";
import { VisibilityProvider } from "@/providers/VisibilityProvider";

import Product from "@/components/products";
import ShoppingCart from "@/components/shoppingcart";
import Header from "@/components/header";
import SearchBar from "@/components/searchbar";
import MessagePopUp from "@/components/messagepopup";

export default function Home() {
  return (
    <ProductsProvider>
      <VisibilityProvider>
        <div className="sticky top-0">
          <Header />
        </div>
        <div className="sticky top-16 p-4 rounded-xl">
          <SearchBar />
        </div>
        <div className="grid grid-cols-4 grid-rows-3 gap-5 p-4">
          <Product />
          <MessagePopUp />
        </div>
        <ShoppingCart />
      </VisibilityProvider>
    </ProductsProvider>
  );
}
