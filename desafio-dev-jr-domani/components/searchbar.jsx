'use client';

import { FaMagnifyingGlass  } from 'react-icons/fa6';

import { useProducts } from '@/providers/ProductsProvider';
import { useVisibility } from '@/providers/VisibilityProvider';

import { visibleMap } from '@/utils/mappingUtils';

import SearchBox from "@/components/searchbox";

export default function SerachBar() {
    const { products, setProducts } = useProducts();
    const { toggleVisibility } = useVisibility();

    const filterProducts = (searchTerm) => {
        if (typeof searchTerm !== "string") return console.error("searchTerm parameter should be a string value.");

        const filtered = products.list.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (searchTerm.trim()) {
            toggleVisibility(visibleMap(['search-box', { mantain: true }]));
        } else {
            toggleVisibility(visibleMap(['search-box']));
        }

        setProducts(prevList => ({
            ...prevList,
            filter: searchTerm === "" ? [] : filtered
        }));
    };

    return (
        <div className="relative flex flex-col items-center p-2 bg-white">
            <div className="flex items-center p-2 gap-2 outline-gray-200 rounded-xl bg-gray-100 w-125 overflow-hidden hover:outline-2 hover:outline-blue-300 focus:outline-2 focus:outline-blue-200" tabIndex="0" role="button">
                <FaMagnifyingGlass  className="text-gray-700" />
                <input className="w-full border-none outline-none" type="search" role='search' tabIndex='0' onChange={(e) => filterProducts(e.target.value)} />
            </div>
            <SearchBox results={products.filter} />
        </div>
    )
}