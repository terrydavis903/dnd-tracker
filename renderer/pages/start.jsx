import { useContext, useEffect } from "react";

import CharactersCtx from "@contexts/characterListCtx";
import MonstersCtx from "@contexts/monsterListCtx";

import PlayerCtx from "@contexts/playerCtx";

export default function StartPage(){
    const {characterList} = useContext(CharactersCtx);
    const {monsterList} = useContext(MonstersCtx);

    const {player} = useContext(PlayerCtx);

    useEffect(()=>{

    },[])

    return (
        <div className="w-screen h-screen bg-[url('/images/NewUi_Character_Asset.png')] bg-contain bg-no-repeat">
            {/* header bar */}
            <div className="h-12 flex flex-row">
            {
                characterList.map((char, ind)=>{
                    <button className="w-12" key={char.name}>
                        Player {ind}
                    </button>
                })
            }
            </div>

            {/* body interface */}
            <div>

            </div>
        </div>
    )
}