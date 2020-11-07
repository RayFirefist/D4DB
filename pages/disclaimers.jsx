import React from 'react';
import Drawer from '../components/common/base.jsx'

class DjDisclaimersPage extends React.Component {
    render() {
        return <Drawer Body={<h1>About Page</h1>} path={['Home', 'Disclaimers']}/>
    }
}

export default DjDisclaimersPage;