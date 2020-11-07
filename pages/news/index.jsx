import React from 'react';
import Drawer from '../../components/common/base.jsx'

class DjNewsListPage extends React.Component {
    render() {
        return <Drawer Body={<h1>News Index Page</h1>} path={['Home', 'News']}/>
    }
}

export default DjNewsListPage;