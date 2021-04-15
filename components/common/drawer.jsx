import React from 'react';
import Link from 'next/link';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
// -------------------------------------------------------------------
import l10n from '../../utils/l10n/l10n';
// -------------------------------------------------------------------

const strings = new l10n();
const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});

class DrawerContents extends React.Component {
    state = {
        openDb: true,
        openTools: true,
        openOther: true,
    }

    static async getInitialProps(ctx) {
        //console.log(ctx)
        return { arg: null }
    }

    handleClickDb() {
        this.setState({ openDb: !this.state.openDb });
    }

    handleClickTools() {
        this.setState({ openTools: !this.state.openTools });
    }

    handleClickOther() {
        this.setState({ openOther: !this.state.openOther });
    }

    render() {
        const { classes } = this.props;
        return <div>
            <div className={classes.toolbar} />
            <Divider />
            <Link href="/">
                <ListItem button>
                    <ListItemText primary={strings.getString("HOME_TITLE")} />
                </ListItem>
            </Link>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
            >

                <ListItem button onClick={this.handleClickDb.bind(this)}>
                    <ListItemText primary={strings.getString("MENU_DATABASE")} />
                    {this.state.openDb ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.openDb} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Link href="/cards">
                            <ListItem button className={classes.nested}>
                                <ListItemText primary={strings.getString("CARDS_TITLE")} />
                            </ListItem>
                        </Link>
                        <Link href="/members">
                            <ListItem button className={classes.nested}>
                                <ListItemText primary={strings.getString("MEMBERS_TITLE")} />
                            </ListItem>
                        </Link>
                        <Link href="/musics">
                            <ListItem button className={classes.nested}>
                                <ListItemText primary={strings.getString("MUSIC_TITLE")} />
                            </ListItem>
                        </Link>
                        <Link href="/gacha">
                            <ListItem button className={classes.nested}>
                                <ListItemText primary={strings.getString("GACHA_TITLE")} />
                            </ListItem>
                        </Link>
                        <Link href="/events">
                            <ListItem button className={classes.nested}>
                                <ListItemText primary={strings.getString("EVENTS_TITLE")} />
                            </ListItem>
                        </Link>
                        <Link href="/live2d">
                            <ListItem button className={classes.nested} disabled={true}>
                                <ListItemText primary={strings.getString("LIVE2D_TITLE")} />
                            </ListItem>
                        </Link>
                    </List>
                </Collapse>
                <ListItem button onClick={this.handleClickTools.bind(this)}>
                    <ListItemText primary={strings.getString("MENU_OTHER")} />
                    {this.state.openTools ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.openTools} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Link href="/settings">
                            <ListItem button className={classes.nested} disabled={true}>
                                <ListItemText primary={strings.getString("SETTINGS_TITLE")} />
                            </ListItem>
                        </Link>
                        <Link href="/credits">
                            <ListItem button className={classes.nested} disabled={true}>
                                <ListItemText primary={strings.getString("CREDITS_TITLE")} />
                            </ListItem>
                        </Link>
                        <Link href="/about">
                            <ListItem button className={classes.nested}>
                                <ListItemText primary={strings.getString("ABOUT_TITLE")} />
                            </ListItem>
                        </Link>
                    </List>
                </Collapse>
            </List>
        </div>
    }
}

export default withStyles(styles)(DrawerContents);