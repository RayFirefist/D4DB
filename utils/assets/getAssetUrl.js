import path from 'path';
import Cdn from '../api/cdns';
const consts = require('../../consts.json');
const cdns = new Cdn();

export const getAssetUrl = (folder, filename) => {
    return new URL(path.join(folder, filename), cdns.getCdnAddress()).href;
};
