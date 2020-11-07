import React from 'react';
import Drawer from '../../components/common/base.jsx'

class DjLive2dListPage extends React.Component {
    render() {
        return <Drawer Body={<h1>Live2D Index Page</h1>} path={['Home', 'Live2D']}/>
    }
}

export default DjLive2dListPage;