import Link from 'next/link';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState, useEffect} from "react"
import PlayerCtx from '_contexts/PlayerCtx';
import {XMarkIcon} from '@heroicons/react/24/outline';
import RawFieldCtx from '_contexts/RawFieldCtx';

// value
// name
// base

export function RawFieldModal(props){

    const {player, setPlayer} = useContext(PlayerCtx);
    const {rawFieldValue, setRawFieldValue} = useContext(RawFieldCtx);

    const [fieldValue, setFieldValue] = useState()

    useEffect(()=>{
        setFieldValue(player[rawFieldValue])
    },[rawFieldValue, player])

    function closeModal() {
        player[rawFieldValue] = fieldValue;
        setPlayer(player);
        setRawFieldValue("");
    }
    

    return (
        <div className='w-full h-full absolute top-0 left-0 z-10'>
            <XMarkIcon className='w-6 h-6 absolute top-0 right-0' onClick={closeModal}/>
            {
                rawFieldValue.length > 0 ?
                <div className='pt-12 w-full flex flex-col place-items-center'>
                    <div className='text-xxl'>
                        {rawFieldValue.includes("_") ? rawFieldValue.split("_").join(" ") : rawFieldValue}
                    </div>

                    <input
                        value={fieldValue}
                        onChange={(e) => {setFieldValue(e.target.value)}}
                        type="text"
                        className='w-20'
                    ></input>
                    
                    <div onClick={closeModal}>Save</div>
                </div>:
                <></>
            }
        </div>
    )
}