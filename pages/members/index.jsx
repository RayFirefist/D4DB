import React from 'react';
import Drawer from '../../components/drawer.jsx'

class DjMembersListPage extends React.Component {
    render() {
        return <Drawer body={<h1>Members Index Page</h1>} path={['Home', 'Members']}/>
    }
}

export default DjMembersListPage;