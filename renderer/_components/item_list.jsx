import { useContext, useEffect, useState} from "react";

// {
//      name:
//      tags:
//      quantity:
//      stats:
// }
export default function ItemDisplayList(props){

    let [items, setItems] = useState([]);

    useEffect(()=>{
        props.items && setItems(props.items)
    },[props.items])
    
    return (
        <div className="bg-gray-400 w-full scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-600">
            {
                items.map((render_item)=>{
                    <div className="w-full">
                        <span>{render_item.name}</span>
                        <span>&#40;{render_item.tags.join("&#41;&#40;")}&#41;</span>
                        {
                            (render_item.quantity && (render_item.quantity > 1)) ?
                            <span>X{render_item.quantity}</span>:
                            <></>
                        }
                    </div>
                })
            }
        </div>
    )
}