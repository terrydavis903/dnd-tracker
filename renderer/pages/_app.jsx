import React, { useState } from 'react'

import '../styles/globals.css'

import CharacterListCtx from "@contexts/characterListCtx";
import MonsterListCtx from "@contexts/monsterListCtx";
import CharacterCtx from "@contexts/characterCtx";

function MyApp({ Component, pageProps }) {

  const [characterList, setCharacterList] = useState();
  const [monsterList, setMonsterList] = useState();
  const [character, setCharacter] = useState(0);

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
