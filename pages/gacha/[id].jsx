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
import ImageLoader from "../../components/common/image";

const strings = new l10n();

class DjGachaEntryPage extends React.Component {
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
            body: JSON.stringify({ dbs: ["GachaMaster", "CardMaster", "CharacterMaster", "UnitMaster"] }),
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
                const gacha = json["GachaMaster"][this.state.id];

                if (gacha === undefined)
                    return this.setState({ error: "Chara not found", loading: false });

                this.setState({ gacha: gacha, loading: false });
            })
            .catch(err => this.setState({ error: err, loading: false }));
    }

    getBannerUrl() {
        const gachaId = this.state.gacha.Id.toString();
        return getAssetUrl(
            `ondemand/banner`,
            `banner_gacha_${gachaId.padStart(4, "0")}.png`
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

        const gacha = this.state.gacha;
        const lang = strings.getLanguage();

        console.log(gacha);

        return (
            <div>
                <div align="left"><h1>{gacha.Name}</h1></div>
                <ImageLoader src={this.getBannerUrl()}/>
                <br />
                <br />
                <br />

                <div align="left">
                    {/* Gacha Information */}
                    <RowInformation left={strings.getString("GACHA_NAME")} right={gacha.Name} />
                    <RowInformation left={strings.getString("GACHA_START")} right={timestampToString(gacha.StartDate)} />
                    <RowInformation left={strings.getString("GACHA_END")} right={timestampToString(gacha.EndDate)} />

                    {/* Gacha Rates */}

                    {/* Gacha Cards (w/ featured) */}

                    {/* Assets */}
                </div>
            </div>
        );
    }
}

export default withRouter(DjGachaEntryPage);
