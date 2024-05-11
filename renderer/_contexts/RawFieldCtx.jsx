const { createContext } = require("react");

const RawFieldCtx = createContext({
    rawFieldValue: {},
    setRawFieldValue: () => {}
})

export default RawFieldCtx;