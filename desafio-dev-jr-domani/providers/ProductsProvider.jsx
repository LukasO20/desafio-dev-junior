'use client';

/*

- ProductsProvider gerencia o estado dos produtos, tanto na lista principal como no carrinho
- Métodos disponíveis:
    addProduct - Caso precise evetuar uma ação de adicionar produto
    removeProduct - Caso precise evetuar uma ação de remover produto

Estrutura de productsMap = {
    - list: Produto[] lista principal de produtos
    - filter: Produto[] lista filtrada, com base na busca
}

*/
import { createContext, useContext, useState, useEffect } from 'react';

import { productsMap } from '@/utils/mappingUtils';

const ProductsContext = createContext([]);

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState(productsMap);
    const [productsCart, setProductsCart] = useState([]);

    const addProduct = (newProduct) => {
        setProductsCart(prevProduct => {
            const alreadyExists = prevProduct.some(product => product.id === newProduct.id);
            if (alreadyExists) return prevProduct;
            return [...prevProduct, newProduct];
        });
    };

    const removeProduct = (removeProduct) => {
        setProductsCart(prevProduct => {
            return prevProduct.filter(product => product.id !== removeProduct.id);
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
            addProduct,
            removeProduct,
            setProducts
        }}>
            {children}
        </ProductsContext.Provider>
    );
}

export const useProducts = () => useContext(ProductsContext);