import CharactersCtx from "@contexts/characterListCtx";
import CharacterCtx from "@contexts/characterCtx";
import { useEffect } from "react";

export default function CharactersPage(){
    const {characterList, setCharacterList} = useContext(CharactersCtx);
    const {character, setCharacter} = useContext(CharacterCtx);

    useEffect(()=>{

    },[])

    function newCharacter(){

    }



    return (
    <div className="w-screen h-screen bg-[url('/images/NewUi_Character_Asset.png')] bg-contain bg-no-repeat">

    </div>
    )
}