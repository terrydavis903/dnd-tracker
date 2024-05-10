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

    let [maxRoll, setMaxRoll] = useState(0);
    let {diceRoll, setDiceRoll} = useContext(DiceRollCtx);

    function rollDice(){
        setDiceRoll(Math.round(Math.random()*maxRoll));
    }

    useEffect(()=>{
        setMaxRoll(roll_value)
    },[props.roll_value]);

    return (
        <div className="px-2 flex flex-col place-items-center">
            <div className="bg-gray-400 w-60">
                {/* make this editable */}
                <div>{props.roll_value}</div> 
                {
                    props.mini_text.length > 0 ?
                    <div>{props.mini_text}</div>:<></>
                }
            </div>

            <div className="text-xxl text-green-600">{player.stats.current_hp}</div>
            {
                props.large_text.length > 0 ?
                <div>{props.large_text}</div>:<></>
            }

            <div className="flex flex-row">
                <div className="bg-color-green-400 px-3 text-gray-700" onClick={rollDice}>{props.button_text}</div>
            </div>
        </div>
    )
}