import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import l10n from '../../utils/l10n/l10n';

const strings = new l10n();

function CenteredTabs(props) {
    //const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (callback !== undefined)
            callback(newValue);
    };

    const callback = props.callbackChange
    const style = props.style ?? {}
    const labels = props.labels ?? []

    return (
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            style={style}
        >
            {
                labels.map(label => <Tab label={strings.getString(label)} />)
            }
        </Tabs>
    );
}

export default CenteredTabs;