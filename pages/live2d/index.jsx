import React from 'react';
import Drawer from '../../components/drawer.jsx'

class DjLive2dListPage extends React.Component {
    render() {
        return <Drawer body={<h1>Live2D Index Page</h1>} path={['Home', 'Live2D']}/>
    }
}

export default DjLive2dListPage;