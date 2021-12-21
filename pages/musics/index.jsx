import React from "react";

import Link from "next/link";

import {
    Card,
    CardContent,
    Grid,
    Typography,
    Avatar,
    Box
} from "@material-ui/core";

import AbstractList from "../../components/common/listPage.tsx";
import { getAssetUrl } from "../../utils/assets/getAssetUrl.js";
import SafeImageLoader from "../../components/common/safeImage";
import l10n from '../../utils/l10n/l10n';

const strings = new l10n();

class DjCardsListPage extends AbstractList {
    constructor(props) {
        super(props);
        this.databases = ["MusicMaster", "UnitMaster", "ChartMaster"];
        this.title = "MUSIC_TITLE";
        this.sortDefaultKey = "Id";
        this.sortAvailableKeys = ["Id", "StartDate", "EndDate"];
        this.availableFilters = {
            MusicCategory: ["Original", "Cover", "Game", "Instrumental", "Collabo"],
            IsTutorial: [true, false]
        };
    }

    renderElements() {
        let musics = this.state.databases.MusicMaster;
        let units = this.state.databases.UnitMaster;
        let charts = this.state.databases.ChartMaster;
        let res = {};
        Object.values(musics).forEach(m => {
            if (!(m.OpenKey in res)) {
                res[m.OpenKey] = [];
            }
            res[m.OpenKey].push(m.Name);
        });

        let out = [];

        for (let music in musics) {
            music = musics[music];

            if (music.CardName === "※危険トランプ追加用") continue;

            out.push(
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                    <div key={`music-${music.Id}`} style={{ margin: "10px" }}>
                        <MusicCardListView
                            music={music}
                            unit={units[music.Unit]}
                            charts={charts}
                        />
                    </div>
                </Grid>
            );
        }

        return out;
    }
}

export default DjCardsListPage;

const MusicCardListView = ({ music, unit, charts }) => {
    const getIllustUrl = music => {
        let id = music.Id.toString().padStart(7, "0");
        return getAssetUrl("music_jacket", "music_jacket_" + id + ".jpg");
    };
    return (
        <Link href={"/musics/" + music.Id}>
            <Card>
                <CardContent style={{ height: "100%" }}>
                    <div align="center">
                        <Grid container spacing={2} justify="center">
                            <Grid item sm={12} md={6} lg={6}>
                                <SafeImageLoader
                                    src={getIllustUrl(music)}
                                    alt={music.Id}
                                    style={{
                                        width: "100%",
                                        maxWidth: "300px"
                                    }}
                                />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6}>

                                {/* Title */}
                                <Typography
                                    variant="h6"
                                    align="center"
                                    gutterBottom={false}
                                >
                                    {music.Name}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    align="center"
                                >
                                    {music.Unit !== 50 && music.Unit !== 30
                                        ? unit.Name + " - "
                                        : music.SpecialUnitName &&
                                        music.SpecialUnitName + " - "}
                                    {strings.getString(
                                        `MUSIC_CATEGORY__${music.Category._name_}`,
                                        music.Category._name_
                                    )}
                                </Typography>

                                {/* Difficulty */}
                                <Grid container spacing={1} justify="center">
                                    <Grid item>
                                        <DifficultyBadge
                                            difficulty="Easy"
                                            color="rgb(43,135,231)"
                                            level={
                                                charts[music.Id + "1"]
                                                    ?.OverrideLevel ||
                                                charts[music.Id + "1"]
                                                    ?.Level || "?"
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <DifficultyBadge
                                            difficulty="Normal"
                                            color="rgb(90,196,76)"
                                            level={
                                                charts[music.Id + "2"]
                                                    ?.OverrideLevel ||
                                                charts[music.Id + "2"]
                                                    ?.Level || "?"
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <DifficultyBadge
                                            difficulty="Hard"
                                            color="rgb(238,172, 92)"
                                            level={
                                                charts[music.Id + "3"]
                                                    ?.OverrideLevel ||
                                                charts[music.Id + "3"]
                                                    ?.Level || "?"
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <DifficultyBadge
                                            difficulty="Expert"
                                            color="rgb(239,72, 83)"
                                            level={
                                                charts[music.Id + "4"]
                                                    ?.OverrideLevel ||
                                                charts[music.Id + "4"]
                                                    ?.Level || "?"
                                            }
                                        />
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export const DifficultyBadge = ({ difficulty, level, color, ...rest }) => {
    return (
        <div {...rest}>
            <Typography variant="body2" align="center">
                {difficulty}
            </Typography>
            <Avatar
                style={{
                    backgroundColor: color || "grey",
                    cursor: "pointer"
                }}
            >
                {(level * 2) % 2 === 1 ? Math.floor(level) + "+" : level}
            </Avatar>
        </div>
    );
};
