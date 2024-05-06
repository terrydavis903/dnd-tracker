const { createContext } = require("react");

const ItemModalCtx = createContext({
    itemModalValue: {},
    setItemModalValue: () => {}
})

export default ItemModalCtx;