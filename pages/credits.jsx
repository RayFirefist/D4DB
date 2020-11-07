import React from 'react';
import Drawer from '../components/common/base.jsx'

class DjCreditsPage extends React.Component {
    render() {
        return <Drawer Body={<h1>Credits Page</h1>} path={['Home', 'Credits']}/>
    }
}

export default DjCreditsPage;