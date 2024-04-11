import React, { useState } from 'react'

import '../styles/globals.css'

import CharacterListCtx from "@contexts/characterListCtx";
import MonsterListCtx from "@contexts/monsterListCtx";
import PlayerCtx from '@contexts/playerCtx';
import RaceListCtx from '@contexts/racesCtx';
import ClassListCtx from '@contexts/classesCtx';

function MyApp({ Component, pageProps }) {

  const [characterList, setCharacterList] = useState();
  const [monsterList, setMonsterList] = useState();
  const [raceList, setRaceList] = useState();
  const [classList, setClassList] = useState();
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
    <RaceListCtx.Provider value={{raceList, setRaceList}}>
      <ClassListCtx.Provider value={{classList, setClassList}}>
        <PlayerCtx.Provider value={{player, setPlayer}}>
          <MonsterListCtx.Provider value={{monsterList, setMonsterList}}>
            <CharacterListCtx.Provider value={{characterList, setCharacterList}}>
                <Component {...pageProps} />
            </CharacterListCtx.Provider>
          </MonsterListCtx.Provider>
        </PlayerCtx.Provider>
      </ClassListCtx.Provider>
    </RaceListCtx.Provider>
  )
}

export default MyApp
