const { createStore } = require("redux");
const { default: reducer } = require("./reducer");

const Store = createStore(reducer);

export default Store;
