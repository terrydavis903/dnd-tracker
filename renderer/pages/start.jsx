import { useContext, useEffect } from "react";

import CharactersCtx from "../_contexts/CharactersCtx";
import MonstersCtx from "../_contexts/MonstersCtx";

import PlayerCtx from "../_contexts/PlayerCtx";
import ItemDisplayList from "_components/item_list";
import { StatButton, StatModal } from "_components/modals/stat_edit";

export default function StartPage(){
    const {characterList} = useContext(CharactersCtx);
    const {monsterList} = useContext(MonstersCtx);

    const {player, setPlayer} = useContext(PlayerCtx);

    useEffect(()=>{

    },[])

    return (
        <div className="w-screen h-screen relative bg-contain bg-no-repeat text-sm bg-gray-800 z-0">
            <StatModal />
            {/* header bar */}
            <div className="w-full flex flex-row gap-4 px-4 h-[6%]">
                {
                    characterList && characterList.map((char, ind)=>{
                        <button className="w-12" key={char.name}>
                            PLAYER {ind}
                        </button>
                    })
                }
                <div className="grow"></div>
                <div className="border border-color-gray p-2 h-full pt-3 text-xs">
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


            <div className="w-full h-[2%] bg-gray-600"/>

            {/* body interface */}
            <div className="w-full h-[92%] bg-transparent flex flex-row">
                {/* left bar */}
                <div className="border-2 w-1/3">
                    {/* character info */}
                    <div className="w-full grid grid-rows-2 grid-cols-3 border-2 h-1/6">
                            <input className="text-center" type="text" placeholder="CHARACTER" value={""}></input>
                            <input className="text-center" type="text" placeholder="RACE" value={""}></input>
                            <input className="text-center" type="text" placeholder="CLASS" value={""}></input>
                            <input className="text-center" type="text" placeholder="BACKGROUND" value={""}></input>
                            <input className="text-center" type="text" placeholder="ALIGNMENT" value={""}></input>
                            <input className="text-center" type="text" placeholder="PLAYER NAME" value={""}></input>
                    </div>
                    {/* background info + gold */}
                    <div className="w-full grid grid-rows-2 grid-cols-4 border-2 h-1/6">
                        <button className="border-2">Button</button>
                        <button className="border-2">Button</button>
                        <button className="border-2 row-span-2">Button</button>
                        <button className="border-2">Button</button>
                        <button className="border-2">Button</button>
                        <button className="border-2">Button</button>
                        <button className="border-2">Button</button>
                    </div>
                    {/* treasure and usables */}
                    <div className="border-2 w-full h-2/3 flex flex-row">
                        <div className="border-2 w-5/8">
                            <ItemDisplayList></ItemDisplayList>
                        </div>
                        <div className="w-3/8 h-full border-2">
                            <div className="h-1/3 w-full border-2 ">
                                <ItemDisplayList></ItemDisplayList>
                            </div>
                            <div className="border-2 border-red-200">
                                <ItemDisplayList></ItemDisplayList>
                            </div>
                        </div>
                    </div>
                </div>
                {/* middle bar */}
                <div className="border-2 w-1/2 pt-1">
                    {/* stats bar */}
                    <div className="border-2 h-[12%] mx-4 flex flex-row gap-1">
                        <div className="w-1/8 border-2 h-full text-center">
                            <StatButton name="Dodge"/>
                        </div>
                        <div className="w-1/8 border-2 h-full text-center">
                            <StatButton name="Speed"/>
                        </div>
                        <div className="w-1/8 border-2 h-full text-center">
                            <StatButton name="Strength"/>
                        </div>
                        <div className="w-1/8 border-2 h-full text-center">
                            <StatButton name="Dexterity"/>
                        </div>
                        <div className="w-1/8 border-2 h-full text-center">
                            <StatButton name="Constitution"/>
                        </div>
                        <div className="w-1/8 border-2 h-full text-center">
                            <StatButton name="Intelligence"/>
                        </div>
                        <div className="w-1/8 border-2 h-full text-center">
                            <StatButton name="Wisdom"/>
                        </div>
                        <div className="w-1/8 border-2 h-full text-center">
                            <StatButton name="Charisma"/>
                        </div>
                    </div>


                    {/* armor */}
                    <div className="w-30">
                        <div>{player.stats.armor}</div>
                        <div>Armor</div>
                    </div>

                    {/* health, dice roll */}
                    <div className="grid grow-cols-2">
                        
                        {/* health */}
                        <div className="px-2 flex flex-col place-items-center">
                            <div className="bg-gray-400 w-60">
                                <div>{player.stats.max_hp}</div>
                                <div>HIT POINTS MAXIMUM</div>
                            </div>

                            <div>{player.stats.current_hp}</div>
                            <div>CURRENT HIT POINTS</div>

                            <div className="flex flex-row">
                                <div className="bg-color-green-400">GAIN</div>
                                <div className="bg-color-red-400">LOSE</div>
                            </div>
                        </div>

                        {/* dice roll */}
                        <div className="px-2">

                        </div>

                    </div>
                </div>
                {/* right bar */}
                <div className="border-2 w-1/6">
                    
                </div>
            </div>
        </div>
    )
}