import React from 'react';
import Drawer from '../../components/drawer.jsx'

class DjMusicsListPage extends React.Component {
    render() {
        return <Drawer body={<h1>Musics Index Page</h1>} path={['Home', 'Musics']}/>
    }
}

export default DjMusicsListPage;