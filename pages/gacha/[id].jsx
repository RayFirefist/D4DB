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
import SafeImageLoader from "../../components/common/safeImage";
import D4DJCardIcon from "../../components/cards/icon";
import consts from "../../consts.json";
import Cdn from "../../utils/api/cdns";

const strings = new l10n();
const cdns = new Cdn();

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
        return { arg: null };
    }

    componentDidMount() {
        fetch("/api/dbs", {
            body: JSON.stringify({
                dbs: [
                    "GachaMaster",
                    "GachaTableMaster",
                    "CardMaster",
                    "CharacterMaster",
                    "UnitMaster"
                ], cdnKey: cdns.getCurrentCdnKey()
            }),
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
                //const chara = json["CharacterMaster"][this.state.id];
                const cards = json["CardMaster"];
                const gacha = json["GachaMaster"][this.state.id];

                if (gacha === undefined)
                    return this.setState({
                        error: "Chara not found",
                        loading: false
                    });

                this.setState({ gacha: gacha, cards: cards, loading: false });
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

    getIllustUrl(card, illustMode = 0) {
        return (
            cdns.getCdnAddress() +
            "ondemand/card_icon/card_icon_0" +
            card.Id +
            "_" +
            illustMode +
            ".jpg"
        );
    }

    getIllustUrl2() {
        let id = this.state.gacha.Id.toString();
        return (
            cdns.getCdnAddress() +
            "ondemand/gacha/top/banner/" +
            id.padStart(5, "0") +
            ".png"
        );
    }

    getIllustUrl3(_id) {
        return cdns.getCdnAddress() + "ondemand/gacha/top/live2d_bg/" + _id + ".jpg";
    }

    render() {
        if (this.state.loading) return strings.getString("COMMON_LOADING");

        if (this.state.error) return this.state.error;

        const gacha = this.state.gacha;
        const lang = strings.getLanguage();

        return (
            <div>
                <div align="left">
                    <h1>{gacha.Name}</h1>
                </div>
                <SafeImageLoader
                    src={this.getBannerUrl()}
                    alternativeUrl={this.getIllustUrl2()}
                    style={{ width: "100%" }}
                />
                <br />
                <br />
                <br />

                <div align="left">
                    {/* Gacha Information */}
                    <RowInformation
                        left={strings.getString("GACHA_NAME")}
                        right={gacha.Name}
                    />
                    <RowInformation
                        left={strings.getString("GACHA_START")}
                        right={timestampToString(gacha.StartDate)}
                    />
                    <RowInformation
                        left={strings.getString("GACHA_END")}
                        right={timestampToString(gacha.EndDate)}
                    />
                    <RowInformation
                        left={strings.getString("GACHA_TYPE")}
                        right={gacha.Type._name_}
                    />

                    {/* Gacha Rates */}

                    {/* Gacha Cards (w/ featured) */}
                    <h2>{strings.getString("GACHA_CARDS_TITLE")}</h2>
                    <h3>{strings.getString("GACHA_PICKUP_CARDS_TITLE")}</h3>
                    <Grid container>
                        {this.state.gacha.PickUpCards.map(cardId => {
                            let cardData = this.state.cards[cardId];
                            return (
                                <D4DJCardIcon
                                    illustUrl={this.getIllustUrl({
                                        Id: cardId
                                    })}
                                    rarity={cardData.Rarity}
                                    typeId={cardData.Attribute}
                                />
                            );
                        })}
                    </Grid>

                    {/* Assets */}
                    <h2>{strings.getString("GACHA_ASSETS_TITLE")}</h2>
                    <h3>{strings.getString("GACHA_BANNER_ASSETS_TITLE")}</h3>
                    <SafeImageLoader
                        src={this.getBannerUrl()}
                        style={{ width: "100%" }}
                    />

                    <h3>{strings.getString("GACHA_ICON_ASSETS_TITLE")}</h3>
                    <SafeImageLoader
                        src={this.getIllustUrl2()}
                        style={{ width: "100%" }}
                    />

                    <div hidden={this.state.gacha.Live2dBg === undefined}>
                        <h3>
                            {strings.getString("GACHA_LIVE2D_BG_ASSETS_TITLE")}
                        </h3>
                        {(this.state.gacha.Live2dBg ?? []).map(file => {
                            return (
                                <SafeImageLoader
                                    src={this.getIllustUrl3(file)}
                                    style={{ width: "100%" }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(DjGachaEntryPage);
