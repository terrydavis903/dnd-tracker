import Link from 'next/link';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState, useEffect} from "react"
import StatModalCtx from '_contexts/StatModalCtx';
import PlayerCtx from '_contexts/PlayerCtx';
import DiceRollCtx from '_contexts/DiceRollCtx';


// value
// name
// base

export function DiceRollButton(props){

    let {diceRoll, setDiceRoll} = useContext(DiceRollCtx);

    let {player, setPlayer} = useContext(PlayerCtx);

    const {setStatModalValue} = useContext(StatModalCtx);
    
    function openModal() {
        setStatModalValue("dice");
    }

    function rollDice(){
        setDiceRoll(Math.round(Math.random()*player.stats.dice));
    }

    return (
        <div className="px-2 flex flex-col place-items-center">
            <div className="bg-gray-400 w-60" onClick={openModal}>
                <div>{player.stats.dice}</div> 
                <div>HIT DICE MAXIMUM</div>
            </div>

            <div className="text-xxl text-green-600">{diceRoll}</div>
            <div>DMG ROLLED</div>

            <div className="flex flex-row">
                <div className="bg-color-green-400 px-3 text-gray-700" onClick={rollDice}>ROLL</div>
            </div>
        </div>
    )
}

export function ExtraDiceRollButton(props){

    let [extraDiceRoll, setExtraDiceRoll] = useState(0);

    const {setStatModalValue} = useContext(StatModalCtx);
    
    function openModal() {
        setStatModalValue(props.property_name);
    }

    function rollDice(){
        setExtraDiceRoll(Math.round(Math.random()*player.stats[props.property_name]));
    }

    return (
        <div className="px-2 flex flex-col place-items-center">
            <div className="bg-gray-400 w-60" onClick={openModal}>
                {/* make this editable */}
                <div>{player.stats[props.property_name]}</div>
            </div>

            <div className="text-xxl text-green-600">{extraDiceRoll}</div>

            <div className="flex flex-row">
                <div className="bg-color-green-400 px-3 text-gray-700" onClick={rollDice}>EXTRA DICE ROLL</div>
            </div>
        </div>
    )
}