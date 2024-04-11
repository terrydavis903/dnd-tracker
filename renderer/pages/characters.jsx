import CharactersCtx from "@contexts/characterListCtx";
import CharacterCtx from "@contexts/characterCtx";
import { useEffect, useState } from "react";

export default function CharactersPage(){
    const {characterList, setCharacterList} = useContext(CharactersCtx);
    const [character, setCharacter] = useState();

    useEffect(()=>{

    },[])

    function makeNewCharacter(){
        setCharacterList(cl => [...cl, ])
    }



    return (
    <div className="w-screen h-screen bg-[url('/images/NewUi_Character_Asset.png')] bg-contain bg-no-repeat">

    </div>
    )
}