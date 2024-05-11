import Link from 'next/link';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState, useEffect} from "react"
import StatModalCtx from '_contexts/StatModalCtx';
import PlayerCtx from '_contexts/PlayerCtx';


// value
// name
// base

export function HPButton(props){
    return (
        <div className="px-2 flex flex-col place-items-center">
            <div className="bg-gray-400 w-60">
                <div>{player.stats.max_hp}</div>
                <div>HIT POINTS MAXIMUM</div>
            </div>

            <div className="text-xxl text-green-600">{player.stats.current_hp}</div>
            <div>CURRENT HIT POINTS</div>

            <div className="flex flex-row">
                <div className="bg-color-green-400 px-3 text-gray-700">GAIN</div>
                <div className="bg-color-red-400 px-3 text-gray-700">LOSE</div>
            </div>
        </div>
    )
}