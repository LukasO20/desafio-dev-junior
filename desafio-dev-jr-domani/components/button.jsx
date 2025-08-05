'use client';

import { useVisibility } from "@/providers/VisibilityProvider";
import { useProducts } from "@/providers/ProductsProvider";

export default function Button(props) {
    const { toggleVisibility } = useVisibility();
    const { addProduct, removeProduct } = useProducts();

    const handleClick = (e) => {
        //Caso seja necessário exibir algum elemento na DOM
        if (props.visible) toggleVisibility(props.visible, e);

        //Caso seja necessário remover um produto do carrinho
        if (props.addProduct) addProduct(props.addProduct, e);

        //Caso seja necessário adicionar um produto ao carrinho
        if (props.removeProduct) removeProduct(props.removeProduct, e);

        // Caso seja necessário executar alguma função auxiliar no click do button 
        if (typeof props.onClick === 'function') {
            props.onClick({ props, e });   
        };
    };

    return (
        <span className={`flex p-1 gap-2 items-center justify-center rounded-xl cursor-pointer transition duration-300 ease-in-out ${props.className ?? ""}`} onClick={handleClick} onKeyDown={(e) => e.key === 'Enter' ? handleClick(e) : ''} role='button' tabIndex='0'>
            {!Number.isNaN(Number(props.counter)) && props.counter > 0 && <span className="absolute flex justify-center -left-1 -top-4.5 w-5 h-5 bg-white text-sky-400 text-sm font-bold rounded-full">{props.counter}</span>}
            {props.icon}{props.title && <span className={`button-title ${props?.classNameChld} font-bold`}>{props.title}</span>}
        </span>
    );
};