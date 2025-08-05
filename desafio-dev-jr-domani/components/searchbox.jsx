import { useVisibility } from "@/providers/VisibilityProvider";

import { visibleMap } from "@/utils/mappingUtils";

import Button from "@/components/button";

export default function SearchBox(props) {
    const { visibleElements } = useVisibility();

    const list = props?.results;
    let showSearchBox = "";

    if (list) showSearchBox = visibleElements.filter(el => el === 'search-box').join(' ');
    
    return (
        <div className={`visible ${showSearchBox} absolute top-15 p-4 w-125 h-140 bg-gray-200 rounded-xl shadow-[2px_0_5px_rgba(90,90,90,0.3)] overflow-hidden hover:overflow-auto scrollbar-thin`}>
            {
                list.length ?
                    list.map(productFiltered => {
                        return (
                            <div key={productFiltered.id} className="flex items-center justify-between gap-2 p-4 border-b-2 border-solid border-gray-300">
                                <div className="flex items-center">
                                    <img src={productFiltered.image} className="w-15 h-15" />
                                    <label title={productFiltered.title} className="line-clamp-2 text-center mx-2">{productFiltered.title}</label>
                                </div>
                                <div className="">
                                    <Button title={'Add to cart'} addProduct={productFiltered} visible={visibleMap(['shopping-cart', { mantain: true }])} className="mt-auto bg-blue-100 hover:bg-blue-300 active:bg-sky-400 w-30" classNameChld="text-gray-700" />
                                </div>
                            </div>
                        )
                    })
                    :
                    <label className="flex items-center justify-center w-full p-2 bg-gray-300 rounded-xl">Product not founded.</label>
            }
        </div>
    )
}