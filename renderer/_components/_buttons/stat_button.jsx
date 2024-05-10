import Link from 'next/link';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState, useEffect} from "react"
import StatModalCtx from '_contexts/StatModalCtx';
import PlayerCtx from '_contexts/PlayerCtx';


// value
// name
// base

export function BonusStatButton(props){

    const {setStatModalValue} = useContext(StatModalCtx);
    const {player} = useContext(PlayerCtx);
    
    function openModal() {
        setStatModalValue(props.name.toLowerCase())
    }

    return (
        <div className='w-full h-full z-0'>
            <button
                onClick={openModal}
                className="text-sm font-medium text-white w-full h-full border-2"
            >
                <div className='bg-gray-600 h-2/3 border-2'>{(player.bonus_stats[props.name.toLowerCase()] > 0 ? "+" : "") + player.bonus_stats[props.name.toLowerCase()]}</div>
                <div className='bg-gray-600 h-1/4'>{props.name}</div>
                <div className='bg-gray-600 h-1/4 rounded-full'>{player.stats[props.name.toLowerCase()]}</div>
            </button>
        </div>
    )
}

export function StaticStatButtonUpper(props){

    const {setStatModalValue} = useContext(StatModalCtx);
    const {player} = useContext(PlayerCtx);
    
    function openModal() {
        setStatModalValue(props.name.toLowerCase())
    }

    return (
        <div className='w-full h-full z-0'>
            <button
                onClick={openModal}
                className="text-sm font-medium text-white w-full h-full border-2"
            >
                <div className='bg-gray-600 w-full h-6 border-2'>{props.name}</div>
                <div className='bg-gray-600 w-full h-20 border-2'>{player.stats[props.name.toLowerCase()]}</div>
            </button>
        </div>
    )
}

export function DeathDoorButton(props){

    const {setStatModalValue} = useContext(StatModalCtx);
    const {player} = useContext(PlayerCtx);
    
    function openModal() {
        setStatModalValue("deaths_door")
    }

    return (
        <div className='w-full h-full z-0'>
            <button
                        onClick={openModal}
                        className="text-sm font-medium text-white w-full h-full border-2"
                    >
                        <div className='bg-gray-600 text-xxl w-full h-20 border-2'>{player.stats.deaths_door}</div>
                        <div className='bg-gray-600 w-full h-6 border-2'>Deaths Door</div>
                    </button>
        </div>
    )
}

export function DeathSaveButton(props){

    const {setStatModalValue} = useContext(StatModalCtx);
    const {player} = useContext(PlayerCtx);
    
    function openModal() {
        setStatModalValue("deaths_save")
    }

    return (
        <div className='w-full h-full z-0'>
            <button
                        onClick={openModal}
                        className="text-sm font-medium text-white w-full h-full border-2"
                    >
                        <div className='bg-gray-600 text-xxl w-full h-20 border-2'>{player.stats.deaths_save}</div>
                        <div className='bg-gray-600 w-full h-6 border-2'>Death Save</div>
                    </button>
        </div>
    )
}

export function AccuracyButton(props){

    const {setStatModalValue} = useContext(StatModalCtx);
    const {player} = useContext(PlayerCtx);
    
    function openModal() {
        setStatModalValue("accuracy")
    }

    return (
        <div className='w-full h-full z-0'>
            <button
                        onClick={openModal}
                        className="text-sm font-medium text-white w-full h-full border-2"
                    >
                        <div className='bg-gray-600 text-xxl w-full h-20 border-2'>{player.stats.accuracy}%</div>
                        <div className='bg-gray-600 w-full h-6 border-2'>{props.name}</div>
                    </button>
        </div>
    )
}