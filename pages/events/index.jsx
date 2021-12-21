import React from "react";

import Link from "next/link";

import { Box, Card, Grid } from "@material-ui/core";

import consts from "../../consts.json";
import AbstractList from "../../components/common/listPage.tsx";
import SafeImageLoader from "../../components/common/safeImage";
import l10n from '../../utils/l10n/l10n';
import Cdn from "../../utils/api/cdns";

const strings = new l10n();
const cdns = new Cdn();

class DjEventsListPage extends AbstractList {
    constructor(props) {
        super(props);
        this.databases = ["EventMaster"];
        this.title = "EVENTS_TITLE";
        this.sortDefaultKey = "Id";
        this.sortAvailableKeys = ['Id', 'StartDate', 'EndDate']
        this.availableFilters = {
            "Type": ["Bingo", "Medley", "Poker", "Raid"],
            "IsD4FesStory": [true, false]
        }
    }

    getIllustUrl(event) {
        try {
            let id = event.Id.toString();
            return `${cdns.getCdnAddress()}ondemand/event/event_${id}/banner_event.png`;
        }
        catch (e) {
            return null;
        }
    }

    renderElements() {
        let events = this.state.databases.EventMaster;
        //let charas = this.state.databases.CharacterMaster;

        let out = [];

        Object.keys(events).sort((a, b) => (parseInt(a) > parseInt(b)) ? 1 : -1).reverse().forEach(event => {
            event = events[`${event}`];

            if (event.CardName === "※危険トランプ追加用") return;

            out.push(
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                    <Link href={"/events/" + event.Id}>
                        <Card className={this.classes.card}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <SafeImageLoader
                                        src={this.getIllustUrl(event)}
                                        alt={event.Id}
                                        className={this.classes.responsiveIcon}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            maxHeight: "85px"
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <div style={{ textAlign: "center", paddingTop: "10px" }}>
                                        <b>{event.Name}</b>
                                        <p>{strings.getString(`EVENT_TYPE__${event.Type._name_}`, event.Type._name_)}</p>
                                    </div>
                                </Grid>
                            </Grid>
                        </Card>
                    </Link>
                </Grid>
            );
        });

        return out;
    }
}

export default DjEventsListPage;
