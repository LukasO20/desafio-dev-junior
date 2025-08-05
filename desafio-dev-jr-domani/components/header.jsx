'use client';

import { FaCartShopping } from 'react-icons/fa6';
import { visibleMap } from "@/utils/mappingUtils";

import { useProducts } from '@/providers/ProductsProvider';

import Button from "@/components/button"

export default function Header () {
    const { productsCart } = useProducts();
    const counter = productsCart.length;

    return (
        <div className="flex items-center justify-center bg-blue-100 h-20 p-4">
            <div className="flex justify-center w-full">
                <h1 className="text-lg font-bold text-sky-500">Virtual Buy!</h1>
            </div>
            <div className="w-20">
                {<Button counter={counter} icon={<FaCartShopping />} visible={visibleMap(['shopping-cart'])} className="relative h-8 w-8 hover:bg-blue-300 active:bg-sky-400 rounded-full" />}
            </div>
        </div>
    )
}