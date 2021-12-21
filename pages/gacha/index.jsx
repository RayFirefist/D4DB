import React from 'react';

import Link from 'next/link';

import { Box, Card, Grid } from '@material-ui/core';

import consts from '../../consts.json';
import AbstractList from '../../components/common/listPage.tsx';
import SafeImageLoader from '../../components/common/safeImage';
import Cdn from '../../utils/api/cdns';
//import l10n from '../../utils/l10n/l10n';

//const strings = new l10n();
const cdns = new Cdn();

class DjGachaListPage extends AbstractList {
    constructor(props) {
        super(props)
        this.databases = ['GachaMaster']
        this.title = "GACHA_TITLE";
        this.sortDefaultKey = "StartDate";
        this.sortAvailableKeys = ['Id', 'StartDate', 'EndDate']
        this.availableFilters = {
            "Type": ["Event", "Birthday", "Normal", "Revival", "Tutorial", "Special"],
            "IsTutorial": [true, false]
        }
    }

    getIllustUrl(event) {
        let id = event.Id.toString()
        return cdns.getCdnAddress() + "ondemand/banner/banner_gacha_" + id.padStart(4, "0") + ".png"
    }

    getIllustUrl2(event) {
        let id = event.Id.toString()
        return cdns.getCdnAddress() + "ondemand/gacha/top/banner/" + id.padStart(4, "0") + ".png"
    }

    renderElements() {
        let gachas = this.state.databases.GachaMaster;
        //let charas = this.state.databases.CharacterMaster;

        let out = []

        let _gachas = Object.keys(gachas).sort((a, b) => {
            return gachas[a][this.state.sortBy ?? this.sortDefaultKey] > gachas[b][this.state.sortBy ?? this.sortDefaultKey];
        })

        if (this.state.orderBy == "desc") {
            _gachas = _gachas.reverse()
        }

        _gachas.forEach(gacha => {
            gacha = gachas[gacha]

            if (gacha.CardName === "※危険トランプ追加用")
                return;

            // if (!gacha.IsTutorial)
            if (!gacha.Id > 999999990)
                return;

            out.push(<Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <Link href={"/gacha/" + gacha.Id}>
                    <Card className={this.classes.card}>
                        <Grid container>
                            <Grid item sm={12}>
                                <div align="center">
                                    <SafeImageLoader
                                        src={this.getIllustUrl(gacha)}
                                        alt={gacha.Id}
                                        className={this.classes.responsiveIcon}
                                        alternativeUrl={this.getIllustUrl2(gacha)}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            maxHeight: "85px"
                                        }}
                                    />
                                </div>
                            </Grid>
                            <Grid item lg={12}>
                                <div style={{ textAlign: "center" }}>
                                    <b>{gacha.Name}</b>
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                </Link>
            </Grid>)
        })

        return out
    }
}

export default DjGachaListPage;