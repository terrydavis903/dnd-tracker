import React, { useEffect, useState } from 'react'

import '../styles/globals.css'

import CharactersCtx from "../_contexts/CharactersCtx";
import MonsterListCtx from "../_contexts/MonstersCtx";
import PlayerCtx from "../_contexts/PlayerCtx";
import StatModalCtx from '_contexts/StatModalCtx';
import ItemModalCtx from '_contexts/ItemModalCtx';
import DiceRollCtx from '_contexts/DiceRollCtx';

function MyApp({ Component, pageProps }) {

  const [diceRoll, setDiceRoll] = useState(0);

  const [itemModalValue, setItemModalValue] = useState(false);
  const [statModalValue, setStatModalValue] = useState(false);

  const [characterList, setCharacterList] = useState();
  const [monsterList, setMonsterList] = useState();
  const [player, setPlayer] = useState(0);

  useEffect(()=>{
    window.ipc.on("characters", async (event, arg) => {
      
    })
    
    window.ipc.on("monsters", async (event, arg) => {
      
    })
    
    window.ipc.on("items", async (event, arg) => {
      
    })

    window.ipc.send("characters");
    window.ipc.send("monsters");
    window.ipc.send("items");
    
  },[])

  return(
    <DiceRollCtx.Provider value={{diceRoll, setDiceRoll}}>
      <StatModalCtx.Provider value={{statModalValue, setStatModalValue}}>
        <ItemModalCtx.Provider value={{itemModalValue, setItemModalValue}}>
          <PlayerCtx.Provider value={{player, setPlayer}}>
            <MonsterListCtx.Provider value={{monsterList, setMonsterList}}>
              <CharactersCtx.Provider value={{characterList, setCharacterList}}>
                <Component {...pageProps} />
              </CharactersCtx.Provider>
            </MonsterListCtx.Provider>
          </PlayerCtx.Provider>
        </ItemModalCtx.Provider>
      </StatModalCtx.Provider>
    </DiceRollCtx.Provider>
  )
}

export default MyApp
