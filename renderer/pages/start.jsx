import { useContext, useEffect, useState } from "react";

import CharactersCtx from "../_contexts/CharactersCtx";
import MonstersCtx from "../_contexts/MonstersCtx";

import PlayerCtx from "../_contexts/PlayerCtx";
import ItemDisplayList from "_components/lists/item_list";
import { BonusStatButton, StatModal } from "_components/modals/stat_edit";
import { HPButton } from "_components/_buttons/hp_button";
import { DiceRollButton } from "_components/_buttons/dice_roll_button";
import { AccuracyButton, DeathSaveButton, StaticStatButtonLower, StaticStatButtonUpper } from "_components/_buttons/stat_button";
import { PassiveButton } from "_components/_buttons/passive_button";

export default function StartPage(){

    let [useAccuracy, setUseAccuracy] = useState(true);

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
                            {/* treasure */}
                            <ItemDisplayList></ItemDisplayList>
                        </div>
                        <div className="w-3/8 h-full border-2">
                            {/* extras */}
                            <div className="h-1/3 w-full border-2 ">
                                <ItemDisplayList></ItemDisplayList>
                            </div>
                            {/* utility */}
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
                            <StaticStatButtonUpper name="Dodge"/>
                        </div>
                        <div className="w-1/8 border-2 h-full text-center">
                            <StaticStatButtonUpper name="Speed"/>
                        </div>
                        <div className="w-1/8 border-2 h-full text-center">
                            <BonusStatButton name="Strength"/>
                        </div>
                        <div className="w-1/8 border-2 h-full text-center">
                            <BonusStatButton name="Dexterity"/>
                        </div>
                        <div className="w-1/8 border-2 h-full text-center">
                            <BonusStatButton name="Constitution"/>
                        </div>
                        <div className="w-1/8 border-2 h-full text-center">
                            <BonusStatButton name="Intelligence"/>
                        </div>
                        <div className="w-1/8 border-2 h-full text-center">
                            <BonusStatButton name="Wisdom"/>
                        </div>
                        <div className="w-1/8 border-2 h-full text-center">
                            <BonusStatButton name="Charisma"/>
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
                        <HPButton/>

                        {/* dice roll */}
                        <DiceRollButton/>
                    </div>

                    {/* deaths door, extra rolls, accuracy, etc */}
                    <div className="flex flex-row">
                        <PassiveButton property_name="deaths_door"/>
                        <PassiveButton property_name="deaths_save"/>

                        <DiceRollButton property_name="extra_dice_1"/>
                        <DiceRollButton property_name="extra_dice_2"/>

                        <AccuracyButton/>

                        <PassiveButton property_name="passive_1"/>
                        <PassiveButton property_name="passive_2"/>
                        
                    </div>

                    {/* use accuracy */}
                    <div className="flex flex-row">
                        {
                            useAccuracy ? 
                            <div onClick={()=>{setUseAccuracy(false)}} className="bg-red-700 text-gray-800">Turn OFF Accuracy</div>:
                            <div onClick={()=>{setUseAccuracy(true)}} className="bg-green-700 text-gray-800">Turn ON Accuracy</div>
                        }
                    </div>

                    {/* equipment and abilities */}
                    <div className="flex flex-row w-full gap-1">
                        <ItemDisplayList></ItemDisplayList>
                        
                    </div>

                </div>

                {/* right bar */}
                <div className="border-2 w-1/6">
                    
                </div>
            </div>
        </div>
    )
}