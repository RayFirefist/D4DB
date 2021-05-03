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
import InfiniteScroll from "react-infinite-scroll-component";

import Filter from "../../components/common/filter.tsx";
import AbstractList from "../../components/common/listPage.tsx";
import { getAssetUrl } from "../../utils/assets/getAssetUrl.js";
import SafeImageLoader from "../../components/common/safeImage";
import l10n from "../../utils/l10n/l10n";
import arrToMap from "../../utils/filter/arrToMap";
import isVoidLike from "../../utils/filter/isVoidLike";

const strings = new l10n();

const _ = strings.getString.bind(strings);

const LIST_STEP_SIZE = 10;

class DjCardsListPage extends AbstractList {
    constructor(props) {
        super(props);
        this.databases = ["MusicMaster", "UnitMaster", "ChartMaster"];
        this.title = "MUSIC_TITLE";
        this.sortDefaultKey = "Id";
        this.sortAvailableKeys = ["Id", "StartDate", "EndDate"];
        this.availableFilters = {
            MusicCategory: {
                type: "MULTI_SELECT",
                values: {
                    Original: _("MUSIC_CATEGORY__Original"),
                    Cover: _("MUSIC_CATEGORY__Cover"),
                    Game: _("MUSIC_CATEGORY__Game"),
                    Instrumental: _("MUSIC_CATEGORY__Instrumental"),
                    Collabo: _("MUSIC_CATEGORY__Collabo")
                }
            }
        };

        const musics = Object.values(this.state.databases.MusicMaster || {});
        this.state = {
            ...this.state,
            prepared: false,
            music: musics,
            shownMusic: musics.slice(0, LIST_STEP_SIZE),
            hasMore: musics.length > LIST_STEP_SIZE
        };
    }

    componentDidUpdate() {
        if (this.state.prepared) return;
        if (this.state.music.length === 0) return;

        const musics = this.state.music;

        this.setState({
            shownMusic: musics.slice(0, LIST_STEP_SIZE),
            hasMore: musics.length > LIST_STEP_SIZE,
            prepared: true
        });
    }

    handleFilter(filter) {
        if (Object.values(filter).filter(x => !isVoidLike(x)).length === 0) {
            this.setState({
                music: Object.values(this.state.databases.MusicMaster),
                prepared: false
            });
            return;
        }

        let arr = Object.values(this.state.databases.MusicMaster);
        if (filter.MusicCategory && filter.MusicCategory.length) {
            arr = arr.filter(v =>
                filter.MusicCategory.includes(v.Category._name_)
            );
        }
        this.setState({
            music: arr,
            prepared: false
        });
    }

    nextPage() {
        if (this.state.shownMusic.length >= this.state.music.length) {
            this.setState({
                hasMore: false
            });
            return;
        }

        this.setState({
            shownMusic: this.state.music.slice(
                0,
                this.state.shownMusic.length + LIST_STEP_SIZE
            )
        });
    }

    renderFilter() {
        return (
            <Filter
                key="filter"
                rules={this.availableFilters}
                onUpdate={this.handleFilter.bind(this)}
            />
        );
    }

    getRenderingLength() {
        return this.state.music.length;
    }

    renderElements() {
        let units = this.state.databases.UnitMaster;
        let charts = this.state.databases.ChartMaster;

        return (
            <InfiniteScroll
                dataLength={this.state.shownMusic.length}
                next={this.nextPage.bind(this)}
                hasMore={this.state.hasMore}
                loader={<h4>Loading...</h4>}
            >
                {this.state.shownMusic.map(music => (
                    <div key={`music-${music.Id}`} style={{ margin: "10px" }}>
                        <MusicCardListView
                            music={music}
                            unit={units[music.Unit]}
                            charts={charts}
                        />
                    </div>
                ))}
            </InfiniteScroll>
        );
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
                    <Box
                        display="flex"
                        height="100%"
                        width="100%"
                        alignItems="stretch"
                    >
                        <Box
                            flexDirection="column"
                            display="flex"
                            justifyContent="center"
                            alignItems="stretch"
                            width="150px"
                            height="150px"
                            marginRight="10px"
                            flexShrink="0"
                        >
                            <SafeImageLoader
                                src={getIllustUrl(music)}
                                alt={music.Id}
                                style={{
                                    width: "100%"
                                }}
                            />
                        </Box>
                        <Box width="100%">
                            <Box
                                flexDirection="column"
                                display="flex"
                                height="100%"
                            >
                                <Box flexGrow={1} height="100%">
                                    <Typography
                                        variant="h6"
                                        align="left"
                                        gutterBottom={false}
                                    >
                                        {music.Name}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        align="left"
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
                                </Box>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <DifficultyBadge
                                                difficulty="Easy"
                                                color="rgb(43,135,231)"
                                                level={
                                                    charts[music.Id + "1"]
                                                        ?.OverrideLevel ||
                                                    charts[music.Id + "1"]
                                                        ?.Level
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
                                                        ?.Level
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
                                                        ?.Level
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
                                                        ?.Level
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
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
