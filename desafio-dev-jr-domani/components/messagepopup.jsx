"use client";

import { useEffect, useState } from "react";
import { useProducts } from "@/providers/ProductsProvider";

/*

- MessagePopUp exibe um pequeno balão pop-up e se esconde a cada 3 segundos

Obs: por padrão o será usado productsCart de "useProducts" para gerenciar as mensagens

*/

export default function MessagePopUp(props) {
    const [visible, setVisible] = useState(false);
    const { productsCart, messageCart } = useProducts();

    useEffect(() => {

        if (productsCart.length) {
            setVisible(true);

            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }

    }, [productsCart]);

    return (
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 ${messageCart.bgcolor} text-white rounded-xl transition-opacity duration-500 opacity-0 pointer-events-none
            ${visible && 'opacity-100'}
        `}>
            {messageCart.message}
        </div>
    );
}