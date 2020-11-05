import React from 'react';
import Drawer from '../../components/drawer.jsx'

class DjCardsListPage extends React.Component {
    render() {
        return <Drawer body={<h1>Cards Index Page</h1>} path={['Home', 'Cards']}/>
    }
}

export default DjCardsListPage;