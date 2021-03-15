import NodeCache from "node-cache";

const cache = new NodeCache({
    stdTTL: 120,
    deleteOnExpire: true,
    checkperiod: 120,
})

export default cache;
