import React from 'react';
import Drawer from '../../components/drawer.jsx'

class DjNewsListPage extends React.Component {
    render() {
        return <Drawer body={<h1>News Index Page</h1>} path={['Home', 'News']}/>
    }
}

export default DjNewsListPage;