import React from 'react';
import { withRouter } from 'next/router';
import AppBase from '../../components/common/base.jsx'
import l10n from '../../utils/l10n/l10n';
import { Button } from '@material-ui/core';

const consts = require('../../consts.json')
const languages = new l10n();

class DjMusicEntryPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // standard
            id: props.router.query.id,
            error: false,
            loading: true,
            // db
            music: {},
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
            body: JSON.stringify({ dbs: ['MusicMaster'] }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST"
        }).then(r => r.json())
            .then(json => {

                if (json.error)
                    return this.setState({ error: json.error, loading: false })

                json = json.result
                console.log(json.MusicMaster, typeof this.state.id)
                let music = json.MusicMaster[this.state.id]

                if (music === undefined)
                    return this.setState({ error: "element not found", loading: false })
                this.setState({ music: music, loading: false })
            })
            .catch(err => this.setState({ error: err, loading: false }))
    }

    getIllustUrl() {
        let id = this.state.music.Id.toString().padStart(7, "0")
        return consts.cdn + "music_jacket/music_jacket_" + id + ".jpg"
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

        const music = this.state.music;
        const lang = languages.getLanguage()
        //const charaName = lang === "ja" ? chara.FullName : chara.FullNameEnglish;

        console.log(music);
        
        return <div >

            {/* Head */}
            <div align="left">
                <h1 style={{ fontSize: "34px" }}>{music.Name}</h1>
            </div>
            <img src={this.getIllustUrl()} style={{ width: "100%", maxWidth: "400px" }}></img>
            <br></br>
            <br></br>


            <br /><br />

            {/* Information */}
            

        </div>;
    }
}

export default withRouter(DjMusicEntryPage);