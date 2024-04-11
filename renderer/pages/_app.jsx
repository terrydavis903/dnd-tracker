import React, { useState } from 'react'

import '../styles/globals.css'

import CharacterListCtx from "@contexts/characterListCtx";
import MonsterListCtx from "@contexts/monsterListCtx";
import CharacterCtx from "@contexts/characterCtx";
import RaceListCtx from '@contexts/racesCtx';
import ClassListCtx from '@contexts/classesCtx';

function MyApp({ Component, pageProps }) {

  const [characterList, setCharacterList] = useState();
  const [monsterList, setMonsterList] = useState();
  const [raceList, setRaceList] = useState();
  const [classList, setClassList] = useState();
  const [character, setCharacter] = useState(0);

  useEffect(()=>{
    window.ipc.on
  },[])

  return(
    <CharacterCtx.Provider value={{character, setCharacter}}>
      <MonsterListCtx.Provider value={{monsterList, setMonsterList}}>
        <CharacterListCtx.Provider value={{characterList, setCharacterList}}>
            <Component {...pageProps} />
        </CharacterListCtx.Provider>
      </MonsterListCtx.Provider>
    </CharacterCtx.Provider>
  )
}

export default MyApp
