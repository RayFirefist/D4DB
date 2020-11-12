import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import ResponsiveBase from '../components/common/base';

// Theme constant
//import theme from './../utils/darkMode/darkMode';

const consts = require('../consts.json');

// eslint-disable-next-line
String.prototype.format = function() {
    let a = this;
    for (let k in arguments) {
        a = a.replace('{' + k + '}', arguments[k]);
        a = a.replace('{' + k + '}', arguments[k]);
        a = a.replace('{' + k + '}', arguments[k]);
    }
    return a;
};

// eslint-disable-next-line
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

/**
 * function MyApp({ Component, pageProps }) {
    return <Component {...pageProps }
    />
}
 */

class MyApp extends React.Component {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }
    render() {
        const { Component, pageProps } = this.props;
        return (
            <React.Fragment>
                <Head>
                    <title>
                        {consts.name} v{consts.version}
                    </title>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
                </Head>
                <ResponsiveBase
                    body={<Component {...pageProps} />}
                ></ResponsiveBase>
            </React.Fragment>
        );
    }
}

export default MyApp;
