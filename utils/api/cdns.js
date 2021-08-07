import environmentMode from '../environment/environmentMode';
import getEnvironmentMode from '../environment/getEnvironmentMode';

let CONFIG = require('./config');

const IS_DEV_MODE = getEnvironmentMode() === environmentMode.DEV;
const DEFAULT_CDN_KEY = "ja";
const DEFAULT_CDN_CONFIG = [
    {
        cdnKey: "ja",
        cdnAddress: "https://api.gurumiku.makoo.eu/assets/",
        cdnL10n: "CDN_JAPANESE"
    }
];

if (CONFIG.length === 0) {
    CONFIG = DEFAULT_CDN_CONFIG;
}

class Cdn {
    constructor() {
        this.cdnKey = null;
        if (typeof window !== "undefined") {
            this.cdnKey = localStorage.getItem("cdnKey");
        }
        if (this.cdnKey === null) {
            this.cdnKey = DEFAULT_CDN_KEY;
            this.setCdnKey(DEFAULT_CDN_KEY);
        }
    }

    setCdnKey(cdnKey) {
        if (typeof window !== "undefined") {
            localStorage.setItem("cdnKey", cdnKey);
        }
        this.cdnKey = cdnKey;
        return this;
    }

    getDefaultCdnKey() {
        return DEFAULT_CDN_KEY;
    }

    getCurrentCdnKey() {
        return this.cdnKey;
    }

    getConfig() {
        let out = Object.values(CONFIG)[0].filter(config => {
            if (!IS_DEV_MODE) {
                // filter out dev cdns
                if (!config.cdnDevOnly) {
                    return config;
                }
            }
            else {
                // return all cdns
                return config;
            }
        });
        return out;
    }

    getCdnInformation(cdnKey = this.cdnKey) {
        let out = Object.values(CONFIG)[0].filter(configEntry => {
            if (configEntry.cdnKey === cdnKey) {
                return configEntry;
            }
        });
        return out[0];
    }

    getCdn(cdnKey = this.cdnKey) {
        return this.getCdnInformation(cdnKey);
    }

    getCdnAddress(cdnKey = this.cdnKey) {
        return this.getCdnInformation(cdnKey).cdnAddress;
    }
}

export default Cdn;