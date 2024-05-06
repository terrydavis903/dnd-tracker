import Link from 'next/link';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState, useEffect} from "react"
import PlayerCtx from '_contexts/PlayerCtx';
import StatModalCtx from '_contexts/StatModalCtx';
import {XMarkIcon} from '@heroicons/react/24/outline';

// value
// name
// base

export function StatModal(props){

    const {player, setPlayer} = useContext(PlayerCtx);
    const {statModalValue, setStatModalValue} = useContext(StatModalCtx);

    const [statValue, setStatValue] = useState()

    useEffect(()=>{
        setStatValue(player.stats[statModalValue])
    },[statModalValue, player])

    function closeModal() {
        player.stats[statModalValue] = statValue;
        setPlayer(player);
        setStatModalValue("");
    }
    

    return (
        <div className='w-full h-full absolute top-0 left-0 z-10'>
            <XMarkIcon className='w-6 h-6 absolute top-0 right-0' onClick={closeModal}/>
            {
                statModalValue.length > 0 ?
                <div className='pt-12 w-full flex flex-col place-items-center'>
                    <div className='text-xxl'>
                    {statModalValue}
                    </div>


                    <input
                        value={statValue}
                        type="number"
                        className='w-20'
                    ></input>
                </div>:
                <></>
            }
        </div>
    )
}