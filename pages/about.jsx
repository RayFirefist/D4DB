import React from 'react';
import consts from '../consts.json';
import {GitHub, Twitter} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

class DjAboutPage extends React.Component {
    render() {
        return <>
            <h1 style={{textAlign: "left"}}>About</h1>
            <h2>{consts.name} - {consts.version}</h2>
            <Alert severity={"info"} style={{textAlign: "left"}}>
                <GitHub style={{maxWidth: "20px"}}/> You can contribute to the website's code through our 
                <a href="https://github.com/RayFirefist/D4DJ_Frontend"> GitHub repository</a> 
            </Alert>
            <br></br>
            <Alert severity={"info"} style={{textAlign: "left"}}>
                <Twitter></Twitter> Developer: <a href={"https://twitter.com/RayFirefist"}>RayFirefist</a>
            </Alert>
            <br></br>
            <Alert severity={"info"} style={{textAlign: "left"}}>
                <Twitter></Twitter> Developer: <a href={"https://twitter.com/HamP_punipuni"}>HamP_punipuni</a>
            </Alert>
        </>
    }
}

export default DjAboutPage;