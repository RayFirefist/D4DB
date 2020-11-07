import React from 'react';

import Link from 'next/link';

import { Card, Grid } from '@material-ui/core';

import consts from '../../consts.json';
import AbstractList from '../../components/common/listPage.tsx';
//import l10n from '../../utils/l10n/l10n';

//const strings = new l10n();

class DjEventsListPage extends AbstractList {
    constructor(props) {
        super(props)
        this.databases = ['EventMaster']
        this.title = "EVENTS_TITLE";
    }

    getIllustUrl(event) {
        let id = event.Id.toString()
        return consts.cdn + "ondemand/banner/banner_event_" + id.padStart(4, "0") + ".png"
    }

    renderElements() {
        console.log("rendering")
        console.log(this.state);
        let events = this.state.databases.EventMaster;
        //let charas = this.state.databases.CharacterMaster;
        console.log(events);

        let out = []

        for (let event in events) {
            event = events[event]

            if (event.CardName === "※危険トランプ追加用")
                continue;

            out.push(<Link href={"/events/" + event.Id}>
                <Card className={this.classes.card}>
                    <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item>
                            <img src={this.getIllustUrl(event)} alt={event.Id} className={this.classes.bannerIcon} />
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item>
                            <div style={{ textAlign: "left" }}>
                                <b>{event.Name}</b>
                                <p>{event.Type._name_}</p>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </Link>)
        }

        return out
    }
}

export default DjEventsListPage;