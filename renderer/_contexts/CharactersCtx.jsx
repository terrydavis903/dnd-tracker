const { createContext } = require("react");

const CharactersCtx = createContext({
    characterList: {},
    setCharacterList: () => {}
})

export default CharactersCtx;