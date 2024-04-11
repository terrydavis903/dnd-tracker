const { createContext } = require("react");

const ClassListCtx = createContext({
    classList: {},
    setClassList: () => {}
})

export default ClassListCtx;