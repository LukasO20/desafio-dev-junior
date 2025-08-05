'use client';

/*

- ProductsProvider gerencia o estado dos produtos, tanto na lista principal como no carrinho
- Métodos disponíveis:
    addProduct - Caso precise efetuar uma ação de adicionar produto
    removeProduct - Caso precise efetuar uma ação de remover produto

Estrutura de productsMap = {
    - list: Produto[] lista principal de produtos
    - filter: Produto[] lista filtrada, com base na busca
}

Estrutura de messageCartMap = {
    - message: String armazenar uma mensagem personalizada
    - message: String armazenar uma color
}

*/
import { createContext, useContext, useState, useEffect } from 'react';

import { productsMap, messageCartMap } from '@/utils/mappingUtils';

const ProductsContext = createContext([]);

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState(productsMap);
    const [productsCart, setProductsCart] = useState([]);
    const [messageCart, setMessageCart] = useState(messageCartMap);

    const addProduct = (newProduct) => {
        setProductsCart(prevProduct => {
            const alreadyExists = prevProduct.some(product => product.id === newProduct.id);
            if (alreadyExists) return prevProduct;
            return [...prevProduct, newProduct];
        });

        setMessageCart(prevMessage => {
            return { ...prevMessage, message: "Product added to cart!", bgcolor: "bg-sky-600" }
        });
    };

    const removeProduct = (removeProduct) => {
        setProductsCart(prevProduct => {
            return prevProduct.filter(product => product.id !== removeProduct.id);
        });
        
        setMessageCart(prevMessage => {
            return { ...prevMessage, message: "Product removed of cart!", bgcolor: "bg-red-600" }
        });
    };

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then((data) => {
                setProducts(prev => ({
                    ...prev,
                    list: data
                }));
            })
            .catch(console.error);
    }, []);

    return (
        <ProductsContext.Provider value={{
            products,
            productsCart,
            messageCart,
            addProduct,
            removeProduct,
            setProducts
        }}>
            {children}
        </ProductsContext.Provider>
    );
}

export const useProducts = () => useContext(ProductsContext);