import React from 'react';

import Link from 'next/link';

import { Card, Grid } from '@material-ui/core';

import consts from '../../consts.json';
import AbstractList from '../../components/common/listPage.tsx';
import SafeImageLoader from '../../components/common/safeImage';
//import l10n from '../../utils/l10n/l10n';

//const strings = new l10n();

class DjGachaListPage extends AbstractList {
    constructor(props) {
        super(props)
        this.databases = ['GachaMaster']
        this.title = "GACHA_TITLE";
    }

    getIllustUrl(event) {
        let id = event.Id.toString()
        return consts.cdn + "ondemand/banner/banner_gacha_" + id.padStart(4, "0") + ".png"
    }

    getIllustUrl2(event) {
        let id = event.Id.toString()
        return consts.cdn + "ondemand/gacha/top/banner/" + id.padStart(4, "0") + ".png"
    }

    renderElements() {
        console.log("rendering")
        console.log(this.state);
        let gachas = this.state.databases.GachaMaster;
        //let charas = this.state.databases.CharacterMaster;
        console.log(gachas);

        let out = []

        for (let gacha in gachas) {
            gacha = gachas[gacha]

            if (gacha.CardName === "※危険トランプ追加用")
                continue;

            if (gacha.IsTutorial)
                continue;

            out.push(<Link href={"/gacha/" + gacha.Id}>
                <Card className={this.classes.card}>
                    <Grid container>
                        <Grid item xs={0} sm={1}></Grid>
                        <Grid item xs={12} sm={5}>
                            <SafeImageLoader 
                                src={this.getIllustUrl(gacha)} 
                                alt={gacha.Id} 
                                className={this.classes.bannerIcon} 
                                alternativeUrl={this.getIllustUrl2(gacha)}
                            />
                        </Grid>
                        <Grid item xs={0} sm={1}></Grid>
                        <Grid item xs={12} sm={5}>
                            <div style={{ textAlign: "left" }}>
                                <b>{gacha.Name}</b>
                                
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </Link>)
        }

        return out
    }
}

export default DjGachaListPage;