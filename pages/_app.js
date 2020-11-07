import React from 'react';
import '../styles/globals.css'
import ResponsiveBase from '../components/common/base';

// Theme constant
//import theme from './../utils/darkMode/darkMode';

// eslint-disable-next-line
String.prototype.format = function() {
    let a = this;
    for (let k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
        a = a.replace("{" + k + "}", arguments[k])
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

// eslint-disable-next-line
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

/**
 * function MyApp({ Component, pageProps }) {
    return <Component {...pageProps }
    />
}
 */

class MyApp extends React.Component {
        render() {
            const { Component, pageProps } = this.props;
            return <ResponsiveBase body = { < Component {...pageProps }
                />}></ResponsiveBase >
            }
        }

        export default MyApp