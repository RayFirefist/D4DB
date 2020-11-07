import { createMuiTheme } from '@material-ui/core/styles';

let temp;

if (process.browser) {
    temp = localStorage.getItem('settings');
} else {
    temp = {}
}

let themeMode;
if (temp === null)
    themeMode = 'light'
else
    try {
        themeMode = JSON.parse(temp).theme
    }
catch (err) {
    themeMode = 'light'
}

const theme = createMuiTheme({
    palette: {
        type: themeMode,
        primary: {
            dark: '#fff',
            main: '#3f51b5'
        }
    },
});

export default theme;