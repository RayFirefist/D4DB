import path from 'path';
const consts = require('../../consts.json');

export const getAssetUrl = (folder, filename) => {
    return new URL(path.join(folder, filename), consts.cdn).href;
};
