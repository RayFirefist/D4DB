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
//import l10n from '../../utils/l10n/l10n';

//const strings = new l10n();

class DjCardsListPage extends AbstractList {
  constructor(props) {
    super(props);
    this.databases = ["MusicMaster", "UnitMaster", "ChartMaster"];
    this.title = "MUSIC_TITLE";
  }

  renderElements() {
    console.log("rendering");
    console.log(this.state);
    let musics = this.state.databases.MusicMaster;
    let units = this.state.databases.UnitMaster;
    let charts = this.state.databases.ChartMaster;
    //let charas = this.state.databases.CharacterMaster;
    console.log(musics, units);
    let res = {};
    Object.values(musics).forEach(m => {
      if (!(m.OpenKey in res)) {
        res[m.OpenKey] = [];
      }
      res[m.OpenKey].push(m.Name);
    });
    console.log(res);

    let out = [];

    for (let music in musics) {
      music = musics[music];

      if (music.CardName === "※危険トランプ追加用") continue;

      out.push(
        <div key={`music-${music.Id}`} style={{ margin: "10px" }}>
          <MusicCardListView
            music={music}
            unit={units[music.Unit]}
            charts={charts}
          />
        </div>
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
          <Box display="flex" height="100%" width="100%" alignItems="stretch">
            <Box
              flexDirection="column"
              display="flex"
              justifyContent="center"
              alignItems="stretch"
              maxWidth="150px"
              marginRight="10px"
            >
              <img
                src={getIllustUrl(music)}
                style={{ width: "100%", height: "auto" }}
                alt={music.Id}
              />
            </Box>
            <Box width="100%">
              <Box flexDirection="column" display="flex" height="100%">
                <Box flexGrow={1} height="100%">
                  <Typography variant="h6" align="left" gutterBottom={false}>
                    {music.Name}
                  </Typography>
                  <Typography variant="subtitle1" align="left">
                    {music.Unit !== 50 && music.Unit !== 30
                      ? unit.Name + " - "
                      : music.SpecialUnitName && music.SpecialUnitName + " - "}
                    {music.Category._name_}
                  </Typography>
                </Box>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item>
                      <DifficultyBadge
                        difficulty="Easy"
                        color="rgb(43,135,231)"
                        level={
                          charts[music.Id + "1"]?.OverrideLevel ||
                          charts[music.Id + "1"]?.Level
                        }
                      />
                    </Grid>
                    <Grid item>
                      <DifficultyBadge
                        difficulty="Normal"
                        color="rgb(90,196,76)"
                        level={
                          charts[music.Id + "2"]?.OverrideLevel ||
                          charts[music.Id + "2"]?.Level
                        }
                      />
                    </Grid>
                    <Grid item>
                      <DifficultyBadge
                        difficulty="Hard"
                        color="rgb(238,172, 92)"
                        level={
                          charts[music.Id + "3"]?.OverrideLevel ||
                          charts[music.Id + "3"]?.Level
                        }
                      />
                    </Grid>
                    <Grid item>
                      <DifficultyBadge
                        difficulty="Expert"
                        color="rgb(239,72, 83)"
                        level={
                          charts[music.Id + "4"]?.OverrideLevel ||
                          charts[music.Id + "4"]?.Level
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
