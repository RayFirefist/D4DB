const window = require("global/window");

/**
 * D4DJ Site Translations class
 */
class DjL10n {
    constructor() {
        if (process.browser) {
            this.lang = localStorage.getItem("ui_lang");

            if (this.lang === undefined || this.lang === null) {
                this.lang = "en";
            }

            this.data = require('../../public/l10n/' + this.lang + '.json');
        } else {
            this.data = {}
        }
        this.default = require('../../public/l10n/en.json');
    }

    availableLanguages = [{
        code: "en",
        name: "English"
    }, {
        code: "zh-hans",
        name: "简体中文"
    }, {
        code: "th",
        name: "ภาษาไทย"
    }]

    // Setting the language to use
    setLanguage(language) {
        this.lang = language
        localStorage.setItem("ui_lang", language);
    }

    // Getting the language in use
    getLanguage() {
        return this.lang;
    }

    // Getting the specific string
    // If not translated yet, it will safely return just the variable, except
    // that the fallbackOverride is set, in which case it wil return the
    // overriden fallback value
    getString(id, fallbackOverride) {
        let out = this.data[id]
        if (out === undefined || out === null)
            out = this.default[id]
        if (out === undefined || out === null)
            out = fallbackOverride || id;
        return out;
    }
}

export default DjL10n;
