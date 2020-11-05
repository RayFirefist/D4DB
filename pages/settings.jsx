import React from 'react';
import Drawer from '../components/drawer.jsx'

class DjSettingsPage extends React.Component {
    render() {
        return <Drawer body={<h1>Settings Page</h1>} path={['Home', 'Settings']}/>
    }
}

export default DjSettingsPage;