import React from "react";
import { Grid, Card } from "@material-ui/core";
//import styles from '../styles/Home.module.css'

import consts from "../consts.json";
import l10n from "../utils/l10n/l10n";
import ImageLoader from "../components/common/image";
import Countdown from "../components/common/countdown";

const strings = new l10n();
const forbiddenGachaId = [4, 5, 6];

class HomePage extends React.Component {
    state = {
        event: [],
        gacha: [],
        news: []
    };

    componentDidMount() {
        fetch("/api/dbs", {
            body: JSON.stringify({ dbs: ["GachaMaster", "EventMaster"] }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })
            .then(r => r.json())
            .then(json => {
                if (json.error)
                    return this.setState({ error: json.error, loading: false });

                json = json.result;

                let event = [],
                    gacha = [];
                let now = parseInt(Date.now() / 1000);

                for (let eventId in json.EventMaster) {
                    let _event = json.EventMaster[eventId];
                    if (_event.StartDate < now && _event.EndDate > now) {
                        event.push(_event);
                    }
                }

                for (let gachaId in json.GachaMaster) {
                    let _gacha = json.GachaMaster[gachaId];
                    if (_gacha.IsTutorial === true) {
                        continue;
                    }
                    if (forbiddenGachaId.includes(_gacha.Id)) {
                        continue;
                    }
                    if (_gacha.StartDate < now && _gacha.EndDate > now) {
                        gacha.push(_gacha);
                    }
                }

                this.setState({ event: event, gacha: gacha });
            });
    }

    render() {
        //<Drawer/>
        return (
            <div>
                <div align="left">
                    <h1>{strings.getString("HOME_TITLE")}</h1>
                    <br></br>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <h2>{strings.getString("HOME_ONGOING_EVENT")}</h2>
                        {this.state.event.map(event => (
                            <Card style={{ marginBottom: "20px" }}>
                                <a href={"/events/" + event.Id}>
                                    <div style={{ padding: "20px" }}>
                                        <ImageLoader
                                            src={
                                                consts.cdn +
                                                "ondemand/event/event_{0}/banner_event.png".format(
                                                    event.Id
                                                )
                                            }
                                            style={{ width: "100%" }}
                                        />
                                        <br />
                                        <h2>{event.Name}</h2>
                                        <>{event.Type._name_} - <Countdown end={event.ReceptionCloseDate}/></>
                                        
                                    </div>
                                </a>
                            </Card>
                        ))}
                    </Grid>
                    <Grid item xs={6}>
                        <h2>{strings.getString("HOME_ONGOING_GACHA")}</h2>
                        {this.state.gacha.map(gacha => (
                            <Card style={{ marginBottom: "20px" }}>
                                <a href={"/gacha/" + gacha.Id}>
                                    <div style={{ padding: "20px" }}>
                                        <ImageLoader
                                            src={
                                                consts.cdn +
                                                "ondemand/banner/banner_gacha_{0}.png".format(
                                                    gacha.Id.toString().padStart(
                                                        4,
                                                        "0"
                                                    )
                                                )
                                            }
                                            style={{ width: "100%" }}
                                        />
                                        <br />
                                        <h2>{gacha.Name}</h2>
                                        <Countdown end={gacha.EndDate} />
                                    </div>
                                </a>
                            </Card>
                        ))}
                    </Grid>
                    <Grid item xs={6}>
                        <h2>{strings.getString("HOME_NEWS")}</h2>
                        <Card>TODO</Card>
                    </Grid>
                    <Grid item xs={6}>
                        <h2>{strings.getString("HOME_OFFICIAL_TWITTER")}</h2>
                        <Card>TODO</Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default HomePage;
