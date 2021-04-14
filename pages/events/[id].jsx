import React from "react";
import { withRouter } from "next/router";
import l10n from "../../utils/l10n/l10n";
import {
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@material-ui/core";
import { getAssetUrl } from "../../utils/assets/getAssetUrl.js";
import RowInformation from "../../components/common/rowInfo";
import timestampToString from "../../utils/time/timeString";
import SafeImageLoader from "../../components/common/safeImage";

const strings = new l10n();

class DjEventEntryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // standard
            id: props.router.query.id,
            error: false,
            loading: true,
            // db
            cards: {},
            character: {},
            unit: {},
            event: {},
            // page
            tab: 0,
            openModal: false,
            illustUrl: ""
        };
    }

    static async getInitialProps(ctx) {
        //console.log(ctx)
        return { arg: null };
    }

    componentDidMount() {
        fetch("/api/dbs", {
            body: JSON.stringify({ dbs: ["EventMaster", "CardMaster", "CharacterMaster", "UnitMaster"] }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })
            .then(r => r.json())
            .then(json => {
                console.log(json);
                if (json.error)
                    return this.setState({ error: json.error, loading: false });

                json = json.result;
                //const chara = json["CharacterMaster"][this.state.id];
                //const unit = json["UnitMaster"][chara.Unit];
                const event = json["EventMaster"][this.state.id];

                if (event === undefined)
                    return this.setState({ error: "Chara not found", loading: false });

                this.setState({ event: event, loading: false });
            })
            .catch(err => this.setState({ error: err, loading: false }));
    }

    getCharaUrl() {
        const event = this.state.event;
        return getAssetUrl(
            `AssetBundles/iOS`,
            `ondemand_card_chara_transparent_0${event.DisplayCard}_${event.DisplayCardType._value_}_extracted/card_chara_transparent_0${event.DisplayCard}_${event.DisplayCardType._value_}.png`
        );
    }

    getBgUrl() {
        return getAssetUrl(
            `ondemand/event`,
            `event_${this.state.event.Id}/background.jpg`
        );
    }

    openModal(url) {
        this.setState({
            openModal: true,
            illustUrl: url
        });
    }

    closeModal() {
        this.setState({
            openModal: false
        });
    }

    render() {
        if (this.state.loading) return "Loading...";

        if (this.state.error) return this.state.error;

        const event = this.state.event;
        const lang = strings.getLanguage();

        console.log(event);

        return (
            <div>
                <div align="left"><h1>{event.Name}</h1></div>
                <div style={{ position: "relative" }}>
                    <SafeImageLoader src={this.getCharaUrl()} style={{
                        width: "100%",
                        maxWidth: "550px",
                        background: `url(${this.getBgUrl()})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                    overrideStyle={true}
                    transparent={true}/>
                </div>
                <br />
                <br />

                <div align="left">
                    {/* Event Information */}
                    <RowInformation left={strings.getString("EVENT_NAME")} right={event.Name} />
                    <RowInformation left={strings.getString("EVENT_TYPE")} right={event.Type._name_} />
                    <RowInformation left={strings.getString("EVENT_START")} right={timestampToString(event.StartDate)} />
                    <RowInformation left={strings.getString("EVENT_RECEPTION_CLOSE_DATE")} right={timestampToString(event.ReceptionCloseDate)} />
                    <RowInformation left={strings.getString("EVENT_RANK_FIX_START_DATE")} right={timestampToString(event.RankFixStartDate)} />
                    <RowInformation left={strings.getString("EVENT_RESULT_ANNOUNCE")} right={timestampToString(event.ResultAnnouncement)} />
                    <RowInformation left={strings.getString("EVENT_END")} right={timestampToString(event.EndDate)} />

                    {/* Event Assets */}
                </div>
            </div>
        );
    }
}

export default withRouter(DjEventEntryPage);
