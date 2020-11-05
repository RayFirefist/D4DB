import React from 'react';
import Drawer from '../../components/drawer.jsx'

class DjEventsListPage extends React.Component {
    render() {
        return <Drawer body={<h1>Events Index Page</h1>} path={['Home', 'Events']}/>
    }
}

export default DjEventsListPage;