const { createContext } = require("react");

const MonstersCtx = createContext({
    monsterList: {},
    setMonsterList: () => {}
})

export default MonstersCtx;