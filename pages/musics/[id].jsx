import React from "react";
import { withRouter } from "next/router";
import AppBase from "../../components/common/base.jsx";
import l10n from "../../utils/l10n/l10n";
import timestampToString from "../../utils/time/timeString.js";
import { Button } from "@material-ui/core";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@material-ui/core";
import { DifficultyBadge } from "./index";
const consts = require("../../consts.json");
const languages = new l10n();

class DjMusicEntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // standard
      id: props.router.query.id,
      error: false,
      loading: true,
      // db
      music: {},
      charts: {},
      unit: {},
      // page
      illust: 0
    };
  }

  static async getInitialProps(ctx) {
    //console.log(ctx)
    return { arg: null };
  }

  componentDidMount() {
    fetch("/api/dbs", {
      body: JSON.stringify({
        dbs: ["MusicMaster", "UnitMaster", "ChartMaster"]
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
        console.log(json.MusicMaster, typeof this.state.id);
        const music = json.MusicMaster[this.state.id];
        const charts = {
          Easy: json.ChartMaster[music.Id + "1"],
          Normal: json.ChartMaster[music.Id + "2"],
          Hard: json.ChartMaster[music.Id + "3"],
          Expert: json.ChartMaster[music.Id + "4"]
        };
        const unit = json.UnitMaster[music.Unit];

        if (music === undefined)
          return this.setState({ error: "element not found", loading: false });
        this.setState({ music, charts, unit, loading: false });
      })
      .catch(err => this.setState({ error: err, loading: false }));
  }

  getIllustUrl() {
    let id = this.state.music.Id.toString().padStart(7, "0");
    return consts.cdn + "music_jacket/music_jacket_" + id + ".jpg";
  }

  render() {
    if (this.state.loading) return "Loading...";

    if (this.state.error) return this.state.error;

    const music = this.state.music;
    const charts = this.state.charts;
    const unit = this.state.unit;
    console.log(charts);
    const lang = languages.getLanguage();

    console.log(music);

    return (
      <React.Fragment>
        <Typography variant="h4" align="left" gutterBottom>
          {music.Name}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={8}>
            <Table aria-label="simple table" size="small">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1" align="left">
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{music.Name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1" align="left">
                      Group
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {music.Unit !== 50 && music.Unit !== 30
                      ? unit.Name
                      : music.SpecialUnitName || "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1" align="left">
                      Category
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{music.Category._name_}</TableCell>
                </TableRow>
                {music.Arranger && (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" align="left">
                        Arranger
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{music.Arranger}</TableCell>
                  </TableRow>
                )}
                {music.Composer && (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" align="left">
                        Composer
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{music.Composer}</TableCell>
                  </TableRow>
                )}
                {music.Lyrist && (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" align="left">
                        Lyricist
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{music.Lyrist}</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1" align="left">
                      Release Date
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {timestampToString(music.StartDate)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1" align="left">
                      BPM
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{music.MusicBpm}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1" align="left">
                      Difficulty
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Grid container spacing={2} justify="flex-end">
                      <Grid item>
                        <DifficultyBadge
                          difficulty="Easy"
                          color="rgb(43,135,231)"
                          level={
                            charts["Easy"]?.OverrideLevel ||
                            charts["Easy"]?.Level
                          }
                        />
                      </Grid>
                      <Grid item>
                        <DifficultyBadge
                          difficulty="Normal"
                          color="rgb(90,196,76)"
                          level={
                            charts["Normal"]?.OverrideLevel ||
                            charts["Normal"]?.Level
                          }
                        />
                      </Grid>
                      <Grid item>
                        <DifficultyBadge
                          difficulty="Hard"
                          color="rgb(238,172, 92)"
                          level={
                            charts["Hard"]?.OverrideLevel ||
                            charts["Hard"]?.Level
                          }
                        />
                      </Grid>
                      <Grid item>
                        <DifficultyBadge
                          difficulty="Expert"
                          color="rgb(239,72, 83)"
                          level={
                            charts["Expert"]?.OverrideLevel ||
                            charts["Expert"]?.Level
                          }
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            style={{
              backgroundImage: `url(${this.getIllustUrl()})`,
              height: "500px",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat"
            }}
          ></Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withRouter(DjMusicEntryPage);
