import React from 'react';
import { withRouter } from 'next/router';
import l10n from '../../utils/l10n/l10n';
import { Button, Card, Grid, Modal, Paper } from '@material-ui/core';
import RowInformation from '../../components/common/rowInfo.jsx';
import timestampToString from '../../utils/time/timeString.js';
import CenteredTabs from '../../components/common/tabs.jsx';
import ImageLoader from '../../components/common/image.jsx';
import D4DJCard from '../../components/cards/card';
import SafeImageLoader from '../../components/common/safeImage';

const consts = require('../../consts.json')
const strings = new l10n();

class DjCardsEntryPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // standard
            id: props.router.query.id,
            error: false,
            loading: true,
            // db
            card: {},
            character: {},
            // page
            illust: 0,
            tab: 0,
            openModal: false,
            illustUrl: "",
        }
    }

    static async getInitialProps(ctx) {
        //console.log(ctx)
        return { arg: null }
    }

    componentDidMount() {
        fetch("/api/dbs", {
            body: JSON.stringify({ dbs: ['CardMaster', 'CharacterMaster'] }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST"
        }).then(r => r.json())
            .then(json => {

                if (json.error)
                    return this.setState({ error: json.error, loading: false })

                json = json.result
                let card = json['CardMaster'][this.state.id]

                if (card === undefined)
                    return this.setState({ error: "element not found" })

                let chara = json.CharacterMaster[card['Character']]
                this.setState({ card: card, character: chara, loading: false })
            })
            .catch(err => this.setState({ error: err, loading: false }))
    }

    getIllustUrl() {
        const card = this.state.card;
        return consts.cdn + "ondemand/card_chara/card_chara_0" + card.Id + "_" + this.state.illust + ".jpg"
    }

    swapIllust() {
        let neww = 0;
        switch (this.state.illust) {
            case 0:
                neww = 1;
                break;
            case 1:
            default:
                neww = 0;
                break;
        }
        this.setState({ illust: neww })
    }

    openModal(url) {
        this.setState({
            openModal: true,
            illustUrl: url
        })
    }

    closeModal() {
        this.setState({
            openModal: false
        })
    }

    render() {

        if (this.state.loading)
            return "Loading..."

        if (this.state.error)
            return this.state.error

        const card = this.state.card;
        const chara = this.state.character;
        const lang = strings.getLanguage()
        const charaName = lang === "ja" ? chara.FullName : chara.FullNameEnglish;
        const clothCardId = card.ClothCardId === 0 ? card.Id : card.ClothCardId;

        return <div >

            {/* Head */}
            <div align="left">
                <h1 style={{ fontSize: "34px" }}>{card.CardName} - {charaName}</h1>
            </div>
            <D4DJCard cardIllust={this.getIllustUrl()} rarity={card.Rarity}/>
            <br></br>
            <br></br>
            <div hidden={card.Rarity < 3}>
                <Button type="primary" onClick={() => this.swapIllust()} hidden={card.Rarity < 3}>{strings.getString("BUTTON_CHANGE_ARTWORK")}</Button>
            </div>

            <br /><br />

            {/* Information */}
            <div align="left">
                <RowInformation left={strings.getString("CARD_CHARA_NAME")} right={<div>{charaName}<SafeImageLoader src={consts.cdn + "adv/ondemand/chara_icon/adv_icon_0" + card.Character + ".png"} style={{ width: "100%", maxWidth: "50px" }} /></div>} />
                <RowInformation left={strings.getString("CARD_NAME")} right={card.CardName} />
                <RowInformation left={strings.getString("CARD_RARITY")} right={card.Rarity} />
                <RowInformation left={strings.getString("CARD_ATTRIBUTE")} right={strings.getString("COMMON_ATTRIBUTE_{0}".format(card.Attribute))} />
                <RowInformation left={strings.getString("CARD_SKILL_NAME")} right={card.SkillName} />
                <RowInformation left={strings.getString("CARD_GACHA_MESSAGE")} right={card.GachaMessage} hidden={card.GachaMessage === ""} />
                <RowInformation left={strings.getString("CARD_RELEASE_DATE")} right={timestampToString(card.StartDate)} />
            </div>

            <br /><br />

            {/* Cards Parameter */}
            <div align="left">
                <h1>{strings.getString("CARD_PARAMETERS_TITLE")}</h1>
                <RowInformation left={strings.getString("CARD_PARAMETERS_1")} right={card.MaxParameters[0]} />
                <RowInformation left={strings.getString("CARD_PARAMETERS_2")} right={card.MaxParameters[1]} />
                <RowInformation left={strings.getString("CARD_PARAMETERS_3")} right={card.MaxParameters[2]} />
                <RowInformation left={strings.getString("CARD_PARAMETERS_POWER")} right={card.MaxParameters[2] + card.MaxParameters[1] + card.MaxParameters[0]} />
            </div>

            {/* Cards Assets */}
            <div align="left">
                <h1>{strings.getString("CARD_ILLUST_TITLE")}</h1>
                <CenteredTabs labels={["CARD_ILLUST_ILLUSTS", "CARD_ILLUST_TRANSPARENT", "CARD_ILLUST_ICONS", "CARD_ILLUST_CHIBI"]} callbackChange={(e) => { this.setState({ tab: e }) }} />
            </div>
            <div hidden={this.state.tab !== 0} align="center">
                <br />
                <Card variant="outlined" style={{ margin: "10px", maxWidth: "250px", paddingTop: "10px" }} onClick={() => this.openModal(consts.cdn + "ondemand/card_chara/card_chara_0" + card.Id + "_0.jpg")}>
                    <SafeImageLoader src={consts.cdn + "ondemand/card_chara/card_chara_0" + card.Id + "_0.jpg"} style={{ maxWidth: "90%" }} />
                    <p>{strings.getString("CARDS_ILLUST_NORMAL")}</p>
                </Card>

                <br />
                <Card variant="outlined" style={{ margin: "10px", maxWidth: "250px", paddingTop: "10px" }} hidden={card.Rarity < 3} onClick={() => this.openModal(consts.cdn + "ondemand/card_chara/card_chara_0" + card.Id + "_1.jpg")}>
                    <SafeImageLoader src={consts.cdn + "ondemand/card_chara/card_chara_0" + card.Id + "_1.jpg"} style={{ maxWidth: "90%" }} />
                    <p>{strings.getString("CARDS_ILLUST_AFTER_TRAINING")}</p>
                </Card>

            </div>
            <div hidden={this.state.tab !== 1} align="center">
                <br />
                <Card variant="outlined" style={{ margin: "10px", maxWidth: "250px", paddingTop: "10px" }} onClick={() => this.openModal(consts.cdn + "ondemand/card_chara_transparent/card_chara_transparent_0" + card.Id + "_0.png")}>
                    <SafeImageLoader src={consts.cdn + "ondemand/card_chara_transparent/card_chara_transparent_0" + card.Id + "_0.png"} style={{ maxWidth: "90%" }} />
                    <p>{strings.getString("CARDS_ILLUST_NORMAL")}</p>
                </Card>

                <br />
                <Card variant="outlined" style={{ margin: "10px", maxWidth: "250px", paddingTop: "10px" }} hidden={card.Rarity < 3} onClick={() => this.openModal(consts.cdn + "ondemand/card_chara_transparent/card_chara_transparent_0" + card.Id + "_1.png")}>
                    <SafeImageLoader src={consts.cdn + "ondemand/card_chara_transparent/card_chara_transparent_0" + card.Id + "_1.png"} style={{ maxWidth: "90%" }} />
                    <p>{strings.getString("CARDS_ILLUST_AFTER_TRAINING")}</p>
                </Card>
            </div>
            <div hidden={this.state.tab !== 2} align="center">
                <br />
                <Card variant="outlined" style={{ margin: "10px", maxWidth: "250px", paddingTop: "10px" }} onClick={() => this.openModal(consts.cdn + "ondemand/card_icon/card_icon_0" + card.Id + "_0.jpg")}>
                    <SafeImageLoader src={consts.cdn + "ondemand/card_icon/card_icon_0" + card.Id + "_0.jpg"} style={{ maxWidth: "90%" }} />
                    <p>{strings.getString("CARDS_ILLUST_NORMAL")}</p>
                </Card>

                <br />
                <Card variant="outlined" style={{ margin: "10px", maxWidth: "250px", paddingTop: "10px" }} hidden={card.Rarity < 3} onClick={() => this.openModal(consts.cdn + "ondemand/card_icon/card_icon_0" + card.Id + "_1.jpg")}>
                    <SafeImageLoader src={consts.cdn + "ondemand/card_icon/card_icon_0" + card.Id + "_1.jpg"} style={{ maxWidth: "90%" }} />
                    <p>{strings.getString("CARDS_ILLUST_AFTER_TRAINING")}</p>
                </Card>
            </div>
            <div hidden={this.state.tab !== 3}>
                <Grid container>
                    <Grid item xs={6}>
                        <Card variant="outlined" style={{ margin: "10px", maxWidth: "250px", paddingTop: "10px" }} onClick={() => this.openModal(consts.cdn + "ondemand/sd_card_chara/sd_card_chara_0" + clothCardId + "_00.png")}>
                            <SafeImageLoader src={consts.cdn + "ondemand/sd_card_chara/sd_card_chara_0" + clothCardId + "_00.png"} style={{ maxWidth: "90%" }} />
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card variant="outlined" style={{ margin: "10px", maxWidth: "250px", paddingTop: "10px" }} onClick={() => this.openModal(consts.cdn + "ondemand/sd_card_chara/sd_card_chara_0" + clothCardId + "_01.png")}>
                            <SafeImageLoader src={consts.cdn + "ondemand/sd_card_chara/sd_card_chara_0" + clothCardId + "_01.png"} style={{ maxWidth: "90%" }} />
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card variant="outlined" style={{ margin: "10px", maxWidth: "250px", paddingTop: "10px" }} onClick={() => this.openModal(consts.cdn + "ondemand/sd_card_chara/sd_card_chara_0" + clothCardId + "_02.png")}>
                            <SafeImageLoader src={consts.cdn + "ondemand/sd_card_chara/sd_card_chara_0" + clothCardId + "_02.png"} style={{ maxWidth: "90%" }} />
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card variant="outlined" style={{ margin: "10px", maxWidth: "250px", paddingTop: "10px" }} onClick={() => this.openModal(consts.cdn + "ondemand/sd_card_chara/sd_card_chara_0" + clothCardId + "_10.png")}>
                            <SafeImageLoader src={consts.cdn + "ondemand/sd_card_chara/sd_card_chara_0" + clothCardId + "_10.png"} style={{ maxWidth: "90%" }} />
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card variant="outlined" style={{ margin: "10px", maxWidth: "250px", paddingTop: "10px" }} onClick={() => this.openModal(consts.cdn + "ondemand/sd_card_chara/sd_card_chara_0" + clothCardId + "_11.png")}>
                            <SafeImageLoader src={consts.cdn + "ondemand/sd_card_chara/sd_card_chara_0" + clothCardId + "_11.png"} style={{ maxWidth: "90%" }} />
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card variant="outlined" style={{ margin: "10px", maxWidth: "250px", paddingTop: "10px" }} onClick={() => this.openModal(consts.cdn + "ondemand/sd_card_chara/sd_card_chara_0" + clothCardId + "_12.png")}>
                            <SafeImageLoader src={consts.cdn + "ondemand/sd_card_chara/sd_card_chara_0" + clothCardId + "_12.png"} style={{ maxWidth: "90%" }} />
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <Modal
                open={this.state.openModal}
                onClose={() => this.closeModal()}
                //style={{ width: "100%", maxWidth: "500px", display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: "center" }}
                style={{display:'flex',alignItems:'center',justifyContent:'center', width: "100%"}}
            >
                <div align="center">
                    <Paper>
                        <br />
                        <h2>{strings.getString("CARDS_ILLUST_VIEW")}</h2>
                        <SafeImageLoader src={this.state.illustUrl} style={{ width: "100%", maxWidth: "700px", padding: "30px" }} />
                        <br/>
                        <Button onClick={() => window.open(this.state.illustUrl)}>{strings.getString("BUTTON_DOWNLOAD")}</Button>
                        <br /><br />
                        <Button onClick={() => this.closeModal()}>{strings.getString("BUTTON_CLOSE")}</Button>
                        <br /><br />
                    </Paper>
                </div>
            </Modal>
        </div>;
    }
}

export default withRouter(DjCardsEntryPage);