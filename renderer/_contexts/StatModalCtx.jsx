const { createContext } = require("react");

const StatModalCtx = createContext({
    statModalValue: {},
    setStatModalValue: () => {}
})

export default StatModalCtx;