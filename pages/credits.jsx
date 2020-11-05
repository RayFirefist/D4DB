import React from 'react';
import Drawer from '../components/drawer.jsx'

class DjCreditsPage extends React.Component {
    render() {
        return <Drawer body={<h1>Credits Page</h1>} path={['Home', 'Credits']}/>
    }
}

export default DjCreditsPage;