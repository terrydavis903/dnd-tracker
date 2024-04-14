import { useContext, useEffect } from "react";

import CharactersCtx from "../_contexts/characterListCtx";
import MonstersCtx from "../_contexts/monsterListCtx";

import PlayerCtx from "../_contexts/currPlayerCtx";

export default function StartPage(){
    const {characterList} = useContext(CharactersCtx);
    const {monsterList} = useContext(MonstersCtx);

    const {player} = useContext(PlayerCtx);

    useEffect(()=>{

    },[])

    return (
        <div className="w-screen h-screen bg-[url('/images/NewUi_Character_Asset.png')] bg-contain bg-no-repeat text-sm bg-gray-800">
            {/* header bar */}
            <div className="w-full flex flex-row gap-4 px-4 h-12">
                {
                    characterList && characterList.map((char, ind)=>{
                        <button className="w-12" key={char.name}>
                            PLAYER {ind}
                        </button>
                    })
                }
                <div className="grow"></div>
                <div className="border border-color-gray p-2 pt-3 w-18 break-all text-xs h-full">
                    <button>MONSTERPEDIA</button>
                </div>
                <div className="border border-color-gray p-2 h-full pt-3">
                    <button>MUSIC</button>
                </div>
                <div className="border border-color-gray p-2 h-full pt-3">
                    <button>MAP</button>
                </div>
                <div className="border border-color-gray p-2 h-full pt-3">
                    <button>DICE</button>
                </div>

                <div className="border border-color-gray p-2 text-xs h-full pt-3">
                    <button>CALCULATOR</button>
                </div>
                <div className="border border-color-gray p-2 h-full pt-3">
                    <button>SAVE</button>
                </div>
                <div className="border border-color-gray pt-1 w-20 break-word">
                    <button>SAVE & MENU</button>
                </div>

            </div>
            <div className="w-full h-4 bg-gray-600">
                
            </div>

            {/* body interface */}
            <div className="w-full h-[770px] mt-[10px] bg-transparent flex flex-row">
                <div className="border-2 w-[466px] ml-[11px]">
                    <div className="w-full h-[95px] grid grid-rows-2 grid-cols-3 border-2">
                            <input className="text-center" type="text" placeholder="CHARACTER" value={""}></input>
                            <input className="text-center" type="text" placeholder="RACE" value={""}></input>
                            <input className="text-center" type="text" placeholder="CLASS" value={""}></input>
                            <input className="text-center" type="text" placeholder="BACKGROUND" value={""}></input>
                            <input className="text-center" type="text" placeholder="ALIGNMENT" value={""}></input>
                            <input className="text-center" type="text" placeholder="PLAYER NAME" value={""}></input>
                    </div>
                    <div className="w-full h-[125px] grid grid-rows-2 grid-cols-4 border-2 pt-[2px]">
                        <button className="border-2 h-[55px] w-[118px] ">Button</button>
                        <button className="border-2 h-[55px] w-[118px] ml-[6px]">Button</button>
                        <button className="border-2 w-[86px] ml-[18px] mt-[1px] row-span-2">Button</button>
                        <button className="border-2 h-[55px] w-[118px] ">Button</button>
                        <button className="border-2 h-[54px] w-[118px] ">Button</button>
                        <button className="border-2 h-[54px] w-[118px] ml-[6px]">Button</button>
                        <button className="border-2 h-[54px] w-[118px] mt-[8px]">Button</button>
                    </div>
                </div>
                <div className="border-2 w-[751px] ml-[10px]">

                </div>
                <div className="border-2 w-[260px] ml-[6px]">

                </div>
            </div>
        </div>
    )
}