'use client';

import { useProducts } from "@/providers/ProductsProvider";

import { FaStar } from 'react-icons/fa6';

import Button from "@/components/button";
import LoadingSpin from "@/components/loadingspin";

export default function Products() {
    const { products } = useProducts();

    return (
        products.list.length ?
            products.list.map(product => (
                <div key={product.id} className="flex flex-col items-center gap-4 overflow-hidden bg-gray-100 p-4 rounded-xl">
                    <span className="flex items-center gap-2"><FaStar className="text-yellow-600" />{product.rating.rate}</span>
                    <img src={product.image} className="w-40 h-40" />
                    <label className="text-center line-clamp-2 flex-1" title={product.title}>{product.title}</label>
                    <label className="font-semibold">${product.price}</label>
                    <label className="line-clamp-3 text-sm text-gray-700" title={product.description}>{product.description}</label>
                    <Button title={'Add to cart'} addProduct={product} className="mt-auto bg-blue-100 hover:bg-blue-300 active:bg-sky-400 w-30" classNameChld="text-gray-700" />
                </div>
            ))
            :
            <LoadingSpin className="col-span-4 row-span-3" spinBorderColor="border-sky-500" />
    )
}