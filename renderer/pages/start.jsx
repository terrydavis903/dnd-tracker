import { useContext } from "react"
import CharactersCtx from "@contexts/characterListCtx";
import MonstersCtx from "@contexts/monsterListCtx";

export default function StartPage(){
    const {characterList} = useContext(CharactersCtx);
    const {monsterList} = useContext(MonstersCtx);


    return (
        <div className="w-screen h-screen bg-[url('/images/NewUi_Character_Asset.png')] bg-contain bg-no-repeat">
            {/* header bar */}
            <div className="h-12 flex flex-row">

            </div>

            {/* body interface */}
            <div>

            </div>
        </div>
    )
}