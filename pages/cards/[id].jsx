import React from 'react';
import Drawer from '../../components/drawer.jsx'

class DjCardsEntryPage extends React.Component {
    render() {
        return <Drawer body={<h1>Cards Entry Page</h1>} path={['Home', 'Cards', 'DUMMY']}/>
    }
}

export default DjCardsEntryPage;