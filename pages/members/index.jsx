import React from 'react';
import Drawer from '../../components/common/base.jsx'

class DjMembersListPage extends React.Component {
    render() {
        return <Drawer Body={<h1>Members Index Page</h1>} path={['Home', 'Members']}/>
    }
}

export default DjMembersListPage;