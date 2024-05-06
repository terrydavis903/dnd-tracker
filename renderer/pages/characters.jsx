import CharactersCtx from "../_contexts/CharactersCtx";
import CharacterCtx from "../_contexts/characterCtx";
import { useEffect, useState } from "react";

export default function CharactersPage(){
    const {characterList, setCharacterList} = useContext(CharactersCtx);
    const [character, setCharacter] = useState();

    useEffect(()=>{

    },[])

    function makeNewCharacter(){
        setCharacterList(cl => [...cl,character ])
    }



    return (
    <div className="w-screen h-screen bg-[url('/images/NewUi_Character_Asset.png')] bg-contain bg-no-repeat">

    </div>
    )
}