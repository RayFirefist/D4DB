const arrToMap = arr => {
    const map = {};
    for (const [_, [k, v]] of Object.entries(arr)) {
        map[k] = v;
    }
    return map;
};

export default arrToMap;
