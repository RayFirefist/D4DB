import React from 'react';
import consts from '../../consts.json';
import Head from 'next/head'
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(async () => import('../../components/live2d/index'), {
    ssr: false
})

class DjLive2dListPage extends React.Component {

    render() {
        return <>
            <div
                style={{
                    position: 'absolute',
                    //height: '100vh',
                    //width: '100vw',
                    margin: "-32px"
                }}
            >
                {/** urlData={this.context.query.data} */}
                <DynamicComponentWithNoSSR />
            </div>
        </>
    }
}

export default DjLive2dListPage;