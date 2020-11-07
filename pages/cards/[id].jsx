import React from 'react';
import { withRouter } from 'next/router';
import AppBase from '../../components/common/base.jsx'
import l10n from '../../utils/l10n/l10n';
import { Button } from '@material-ui/core';

const consts = require('../../consts.json')
const languages = new l10n();

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
            illust: 0
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

    render() {

        if (this.state.loading)
            return "Loading..."

        if (this.state.error)
            return this.state.error

        const card = this.state.card;
        const chara = this.state.character;
        const lang = languages.getLanguage()
        const charaName = lang === "ja" ? chara.FullName : chara.FullNameEnglish;

        const body = <div >

            {/* Head */}
            <div align="left">
                <h1 style={{ fontSize: "34px" }}>{card.CardName} - {charaName}</h1>
            </div>
            <img src={this.getIllustUrl()} style={{ width: "100%" }}></img>
            <br></br>
            <br></br>
            <div hidden={card.Rarity < 3}>
                <Button type="primary" onClick={() => this.swapIllust()} hidden={card.Rarity < 3}>{languages.getString("BUTTON_CHANGE_ARTWORK")}</Button>
            </div>


            <br /><br />

            {/* Information */}

        </div>

        return body;
    }
}

export default withRouter(DjCardsEntryPage);