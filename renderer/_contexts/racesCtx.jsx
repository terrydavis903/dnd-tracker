const { createContext } = require("react");

const RaceListCtx = createContext({
    raceList: {},
    setRaceList: () => {}
})

export default RaceListCtx;