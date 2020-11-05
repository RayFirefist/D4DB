import React from 'react';
import Drawer from '../../components/drawer.jsx'

class DjGachaListPage extends React.Component {
    render() {
        return <Drawer body={<h1>Gacha Index Page</h1>} path={['Home', 'Gacha']}/>
    }
}

export default DjGachaListPage;