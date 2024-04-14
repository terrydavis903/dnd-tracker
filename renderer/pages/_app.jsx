import React, { useEffect, useState } from 'react'

import '../styles/globals.css'

import CharactersCtx from "../_contexts/characterListCtx";
import MonsterListCtx from "../_contexts/monsterListCtx";
import PlayerCtx from "../_contexts/currPlayerCtx";

function MyApp({ Component, pageProps }) {

  const [characterList, setCharacterList] = useState();
  const [monsterList, setMonsterList] = useState();
  const [player, setPlayer] = useState(0);

  useEffect(()=>{
    window.ipc.on("characters", async (event, arg) => {
      
    })
    
    window.ipc.on("monsters", async (event, arg) => {
      
    })
    
    window.ipc.on("classes", async (event, arg) => {
      
    })
    
    window.ipc.on("races", async (event, arg) => {
      
    })
    
    window.ipc.on("items", async (event, arg) => {
      
    })

    window.ipc.send("characters");
    window.ipc.send("monsters");
    window.ipc.send("classes");
    window.ipc.send("races");
    window.ipc.send("items");
    
  },[])

  return(
    <PlayerCtx.Provider value={{player, setPlayer}}>
      <MonsterListCtx.Provider value={{monsterList, setMonsterList}}>
        <CharactersCtx.Provider value={{characterList, setCharacterList}}>
            <Component {...pageProps} />
        </CharactersCtx.Provider>
      </MonsterListCtx.Provider>
    </PlayerCtx.Provider>
  )
}

export default MyApp
