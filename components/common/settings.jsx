import React from "react";

import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
} from "@material-ui/core";
// -------------------------------------------------------------------
import l10n from "../../utils/l10n/l10n";
import Cdn from "../../utils/api/cdns";
// -------------------------------------------------------------------

const strings = new l10n();
const cdns = new Cdn();

class SettingsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: strings.getLanguage(),
            cdnKey: cdns.getCurrentCdnKey()
        };
    }

    setLanguage(lang){
        strings.setLanguage(lang);
        this.setState({ language: lang });
    }

    setCdn(cdnKey) {
        cdns.setCdnKey(cdnKey);
        this.setState({cdnKey: cdnKey});
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle>{strings.getString("SETTINGS_TITLE")}</DialogTitle>
                <DialogContent>
                <FormControl component="fieldset">
                    <FormLabel component="legend">{strings.getString("SETTINGS_CDN")}</FormLabel>
                    <p>{strings.getString("SETTINGS_CDN_NOTES")}</p>
                    <RadioGroup
                        row
                        aria-label="cdn"
                        value={this.state.cdnKey}
                        onChange={(_, v) => {
                            this.setCdn(v);
                            location.reload();
                        }}
                    >
                        {cdns.getConfig()
                        .map(config => {
                            return <FormControlLabel
                            key={config.cdnKey}
                            value={config.cdnKey}
                            control={<Radio />}
                            label={strings.getString(config.cdnL10n)} // this is not translated on purpose
                            ></FormControlLabel>
                        })}
                    </RadioGroup>
                </FormControl>
                <br/>
                <br/>
                <FormControl component="fieldset">
                    <FormLabel component="legend">{strings.getString("SETTINGS_LANGUAGE")}</FormLabel>
                    <p>{strings.getString("SETTINGS_LANGUAGE_NOTES")}</p>
                    <RadioGroup
                        row
                        aria-label="language"
                        value={this.state.language}
                        onChange={(_, v) => {
                            this.setLanguage(v);
                            location.reload();
                        }}
                    >
                        {strings.availableLanguages
                        .map((lang) => (
                            <FormControlLabel
                            key={lang.code}
                            value={lang.code}
                            control={<Radio />}
                            label={lang.name} // this is not translated on purpose
                            ></FormControlLabel>
                        ))}
                    </RadioGroup>
                </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        {strings.getString("SETTINGS_QUIT")}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default SettingsView;
