import Link from 'next/link';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState, useEffect} from "react"
import PlayerCtx from '_contexts/PlayerCtx';
import StatModalCtx from '_contexts/StatModalCtx';


// value
// name
// base

export function StatModal(props){

    const {player, setPlayer} = useContext(PlayerCtx);
    const {statModalValue, setStatModalValue} = useContext(StatModalCtx);

    function closeModal() {
        setStatModalValue("")
    }
    

    return (
        <div className='w-full h-full absolute top-0 left-0 z-10'>
            {
                statModalValue.length > 0 ?
                <div>

                </div>:
                <></>
            }
        </div>
    )
}