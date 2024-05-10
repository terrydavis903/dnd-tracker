const { createContext } = require("react");

const DiceRollCtx = createContext({
    diceRoll: {},
    setDiceRoll: () => {}
})

export default DiceRollCtx;