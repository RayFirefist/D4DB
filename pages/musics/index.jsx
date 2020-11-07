import React from 'react';

import Link from 'next/link';

import { Card, Grid } from '@material-ui/core';

import consts from '../../consts.json';
import AbstractList from '../../components/common/listPage.tsx';
//import l10n from '../../utils/l10n/l10n';

//const strings = new l10n();

class DjCardsListPage extends AbstractList {
    constructor(props) {
        super(props)
        this.databases = ['MusicMaster']
        this.title = "MUSIC_TITLE";
    }

    getIllustUrl(music) {
        let id = music.Id.toString().padStart(7, "0")
        return consts.cdn + "music_jacket/music_jacket_" + id + ".jpg"
    }

    renderElements() {
        console.log("rendering")
        console.log(this.state);
        let musics = this.state.databases.MusicMaster;
        //let charas = this.state.databases.CharacterMaster;
        console.log(musics);

        let out = []

        for (let music in musics) {
            music = musics[music]

            if (music.CardName === "※危険トランプ追加用")
                continue;

            out.push(<Link href={"/musics/" + music.Id}>
                <Card className={this.classes.card}>
                    <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item>
                            <img src={this.getIllustUrl(music)} alt={music.Id} className={this.classes.musicIcon} />
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item>
                            <div style={{ textAlign: "left" }}>
                                <b>{music.Name}</b>
                                <p>{music.Category._name_}</p>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </Link>)
        }

        return out
    }
}

export default DjCardsListPage;