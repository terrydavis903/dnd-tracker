const { createContext } = require("react");

const CharacterCtx = createContext({
    character: {},
    setCharacter: () => {}
})

export default CharacterCtx;