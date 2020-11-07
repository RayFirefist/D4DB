import React from 'react';
import Drawer from '../components/common/base.jsx'

class DjSettingsPage extends React.Component {
    render() {
        return <Drawer Body={<h1>Settings Page</h1>} path={['Home', 'Settings']}/>
    }
}

export default DjSettingsPage;