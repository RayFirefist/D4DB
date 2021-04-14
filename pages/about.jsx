import React from "react";
import consts from "../consts.json";
import { GitHub, Twitter } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import l10n from "../utils/l10n/l10n";

const strings = new l10n();

class DjAboutPage extends React.Component {
    render() {
        return (
            <>
                <h1 style={{ textAlign: "left" }}>
                    {strings.getString("ABOUT_TITLE")}
                </h1>
                <h2>
                    {consts.name} - {consts.version}
                </h2>
                <Alert severity={"info"} style={{ textAlign: "left" }}>
                    <GitHub style={{ maxWidth: "20px" }} />{" "}
                    {strings.getString("ABOUT_GITHUB_1")}
                    <a href="https://github.com/RayFirefist/D4DJ_Frontend">
                        {" "}
                        {strings.getString("ABOUT_GITHUB_2")}
                    </a>{" "}
                    {strings.getString("ABOUT_GITHUB_3")}
                </Alert>
                <br></br>
                <Alert severity={"info"} style={{ textAlign: "left" }}>
                    <Twitter></Twitter> {strings.getString("ABOUT_DEVELOPER")}:{" "}
                    <a href={"https://twitter.com/RayFirefist"}>RayFirefist</a>
                </Alert>
                <br></br>
                <Alert severity={"info"} style={{ textAlign: "left" }}>
                    <Twitter></Twitter> {strings.getString("ABOUT_DEVELOPER")}:{" "}
                    <a href={"https://twitter.com/HamP_punipuni"}>
                        HamP_punipuni
                    </a>
                </Alert>
            </>
        );
    }
}

export default DjAboutPage;
