import Link from 'next/link';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState, useEffect} from "react"


// value
// name
// base

export function StatEditModal(props){

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }
    
    function openModal() {
        console.log("opening modal");
        setIsOpen(true)
    }

    return (
        <div className='w-full h-full'>
                {
                    (props.base != undefined) ?
                    (
                        <button
                            onClick={openModal}
                            className="text-sm font-medium text-white w-full h-full border-2"
                        >
                            {/* <div className='bg-gray-600 h-[66%]'>{(props.value > 0 ? "+" : "") + props.value}</div> */}
                            {/* <div className='bg-gray-600 h-1/4'>{props.name}</div>
                            <div className='bg-gray-600 h-1/4 rounded-full'>{props.base}</div> */}
                        </button>
                    ) :
                    (
                        <button
                            onClick={openModal}
                            className="text-sm font-medium text-white w-full h-full border-2"
                        >
                            <div className='bg-gray-600 w-full h-60 border-2'>{props.name}</div>
                            <div className='bg-gray-600 w-full h-60 border-2'>{(props.value > 0 ? "+" : "") + props.value}</div>
                        </button>
                    )
                }
            
            
        </div>
    )
}