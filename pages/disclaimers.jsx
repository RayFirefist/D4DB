import React from 'react';
import Drawer from '../components/drawer.jsx'

class DjDisclaimersPage extends React.Component {
    render() {
        return <Drawer body={<h1>About Page</h1>} path={['Home', 'Disclaimers']}/>
    }
}

export default DjDisclaimersPage;