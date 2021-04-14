import React from "react";
import consts from "../consts.json";
import { GitHub, Twitter } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import l10n from "../utils/l10n/l10n";
import { withStyles } from '@material-ui/core/styles';

const style = {
    message: {
        display: "flex",
        alignItems: "center"
    },
    textLeft: {
        textAlign: "left"
    },
    icon: {
        marginRight: "6px",
        maxWidth: "20px"
    }
};

const strings = new l10n();

class DjAboutPage extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <>
                <h1 className={classes.textLeft}>
                    {strings.getString("ABOUT_TITLE")}
                </h1>
                <h2>
                    {consts.name} - {consts.version}
                </h2>
                <Alert classes={{
                    message: classes.message
                }} className={classes.textLeft} severity={"info"}>
                    <GitHub className={classes.icon} />
                    {strings.getString("ABOUT_GITHUB_1")}&nbsp;
                    <a href="https://github.com/RayFirefist/D4DJ_Frontend">
                        {strings.getString("ABOUT_GITHUB_2")}
                    </a>&nbsp;
                    {strings.getString("ABOUT_GITHUB_3")}
                </Alert>
                <br />
                <Alert classes={{
                    message: classes.message
                }} className={classes.textLeft} severity={"info"}>
                    <Twitter className={classes.icon} /> {strings.getString("ABOUT_DEVELOPER")}:&nbsp;
                    <a href={"https://twitter.com/RayFirefist"}>RayFirefist</a>
                </Alert>
                <br />
                <Alert classes={{
                    message: classes.message
                }} className={classes.textLeft}severity={"info"}>
                    <Twitter className={classes.icon} /> {strings.getString("ABOUT_DEVELOPER")}:&nbsp;
                    <a href={"https://twitter.com/HamP_punipuni"}>
                        HamP_punipuni
                    </a>
                </Alert>
            </>
        );
    }
}

export default withStyles(style)(DjAboutPage);
