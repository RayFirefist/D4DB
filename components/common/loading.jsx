import React, { Component } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';

// l10n
import l10n from './../../utils/l10n/l10n';
// --------------------------------------------------------------------

const strings = new l10n();

class LoadingComponent extends Component {
    render() {
        return <div align="center">
            <LinearProgress />
            <h2>{strings.getString("COMMON_LOADING")}</h2>
            </div>
    }
}

export default LoadingComponent