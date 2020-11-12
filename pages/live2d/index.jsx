import React from 'react';
import consts from '../../consts.json';
import dynamic from 'next/dynamic'
const ReactLive2d = dynamic(import('react-live2d'), {
    ssr: false
})

class DjLive2dListPage extends React.Component {

    render() {
        return <>
            <h1>Live2D Index Page</h1>
            <div style={{backgroundImage: ("url(" + consts.cdn + "ondemand/background/bg_training.jpg)").replace("\"", "")}}>
                <ReactLive2d
                    width={600}
                    height={800}
                    //bottom={'10px'}
                    //right={'10px'}
                    ModelList={['Rika']}
                    //TouchBody={['啊啊啊啊啊你要干嘛', '哼', '坏人']}
                    PathFull={consts.cdn + "test/live2d/"}
                    TouchDefault={null}
                />
            </div>
        </>
    }
}

export default DjLive2dListPage;