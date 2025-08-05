'use client';

import { useProducts } from "@/providers/ProductsProvider";
import { useVisibility } from "@/providers/VisibilityProvider";

import { visibleMap } from "@/utils/mappingUtils";
import { FaX, FaTrash, FaCartShopping } from 'react-icons/fa6';

import Button from '@/components/button';

export default function ShoppingCart() {
    const { productsCart } = useProducts();
    const { visibleElements } = useVisibility();

    const counter = productsCart.length;
    const showShoppingCart = visibleElements.filter(el => el === 'shopping-cart').join(' ');

    return (
        <div className={`visible ${showShoppingCart} flex flex-col h-screen w-100 fixed top-0 right-0 gap-2 p-4 bg-white shadow-[10px_0_20px_rgba(90,90,90,0.3)] sm:items-center sm:gap-6`}>
            <div className="flex items-center gap-2 p-1 w-full">
                <Button visible={visibleMap(null)} icon={<FaX />} />
                <h1 className="w-full flex justify-center gap-2 items-center font-bold"><FaCartShopping />Shopping Cart</h1>
            </div>
            <div className="flex flex-col w-full gap-2 items-center overflow-hidden">
                {
                    counter ?
                        <>
                            <div className="flex items-center p-2 gap-2">
                                <span>{counter}</span><label>{counter === 1 ? "item" : "itens"}</label>
                            </div>
                            <div className="flex flex-col w-full gap-2 overflow-hidden hover:overflow-auto scrollbar-thin">
                                {
                                    productsCart.map(product =>
                                        <div key={product.id} className="flex flex-col items-center bg-gray-100 p-4 rounded-xl">
                                            <div className="flex flex-col p-2 gap-2 items-center rounded-xl">
                                                <label className="text-center" title={product.title}>{product.title}</label>
                                                <img src={product.image} className="w-40 h-40" />
                                            </div>
                                            <div className="flex justify-center">
                                                <Button title={'Remove'} removeProduct={product} icon={<FaTrash />} className="w-25 text-sm bg-red-200 text-red hover:bg-red-400 active:bg-red-600" />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </>
                        :
                        <label className="flex items-center justify-center w-full p-2 bg-gray-100 rounded-xl">There's nothing here. Let's buy!</label>
                }
            </div>
        </div>
    )
}