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
// -------------------------------------------------------------------

const strings = new l10n();

class SettingsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: strings.getLanguage()
        };
    }

    setLanguage(lang){
        strings.setLanguage(lang);
        this.setState({ language: lang });
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle>{strings.getString("SETTINGS_TITLE")}</DialogTitle>
                <DialogContent>
                <FormControl component="fieldset">
                    <FormLabel component="legend">{strings.getString("SETTINGS_LANGUAGE")}</FormLabel>
                    <RadioGroup
                        row
                        aria-label="language"
                        value={this.state.language}
                        onChange={(_, v) => {
                            this.setLanguage(v);
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
                        {strings.getString("SETTINGS_EXIT")}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default SettingsView;
