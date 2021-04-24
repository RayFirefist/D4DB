import React from "react";
import { withRouter } from "next/router";
import AppBase from "../../components/common/base.jsx";
import l10n from "../../utils/l10n/l10n";
import timestampToString from "../../utils/time/timeString.js";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
  Tab,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@material-ui/core";
import { DifficultyBadge } from "./index";
import { getAssetUrl } from "../../utils/assets/getAssetUrl.js";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
      //chart
      chartOpen: true,
      chartDifficulty: 1,
      // page
      illust: 0
    };
  }

  static async getInitialProps(ctx) {
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
    return getAssetUrl("music_jacket/", `music_jacket_${id}.jpg`);
  }

  render() {
    const _ = languages.getString.bind(languages);

    if (this.state.loading) return _("COMMON_LOADING");

    if (this.state.error) return this.state.error;

    const music = this.state.music;
    const charts = this.state.charts;
    const unit = this.state.unit;
    const lang = languages.getLanguage();

    return (
      <React.Fragment>
        <Box marginBottom="20px">
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
                        {_("MUSIC_NAME")}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{music.Name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" align="left">
                      {_("MUSIC_GROUP")}
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
                      {_("MUSIC_CATEGORY")}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{_(`MUSIC_CATEGORY__${music.Category._name_}`, music.Category._name_)}</TableCell>
                  </TableRow>
                  {music.Arranger && (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Typography variant="body1" align="left">
                        {_("MUSIC_ARRANGER")}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{music.Arranger}</TableCell>
                    </TableRow>
                  )}
                  {music.Composer && (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Typography variant="body1" align="left">
                        {_("MUSIC_COMPOSER")}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{music.Composer}</TableCell>
                    </TableRow>
                  )}
                  {music.Lyrist && (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Typography variant="body1" align="left">
                        {_("MUSIC_LYRIST")}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{music.Lyrist}</TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" align="left">
                      {_("MUSIC_RELEASE_DATE")}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {timestampToString(music.StartDate)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" align="left">
                      {_("MUSIC_BPM")}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{music.MusicBpm}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" align="left">
                      {_("MUSIC_DIFFICULTY")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Grid container spacing={2} justify="flex-end">
                        <Grid
                          item
                          onClick={() =>
                            this.setState({
                              chartOpen: true,
                              chartDifficulty: 1
                            })
                          }
                        >
                          <DifficultyBadge
                            difficulty="Easy"
                            color="rgb(43,135,231)"
                            level={
                              charts["Easy"]?.OverrideLevel ||
                              charts["Easy"]?.Level
                            }
                          />
                        </Grid>
                        <Grid
                          item
                          onClick={() =>
                            this.setState({
                              chartOpen: true,
                              chartDifficulty: 2
                            })
                          }
                        >
                          <DifficultyBadge
                            difficulty="Normal"
                            color="rgb(90,196,76)"
                            level={
                              charts["Normal"]?.OverrideLevel ||
                              charts["Normal"]?.Level
                            }
                          />
                        </Grid>
                        <Grid
                          item
                          onClick={() =>
                            this.setState({
                              chartOpen: true,
                              chartDifficulty: 3
                            })
                          }
                        >
                          <DifficultyBadge
                            difficulty="Hard"
                            color="rgb(238,172, 92)"
                            level={
                              charts["Hard"]?.OverrideLevel ||
                              charts["Hard"]?.Level
                            }
                          />
                        </Grid>
                        <Grid
                          item
                          onClick={() =>
                            this.setState({
                              chartOpen: true,
                              chartDifficulty: 4
                            })
                          }
                        >
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
            <Grid item xs={12} sm={4}>
              <Box display="flex" height="100%" alignItems="center">
                <img
                  src={this.getIllustUrl()}
                  style={{ width: "100%", margin: "auto 0" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Grid container>
          <Grid item xs>
            <Accordion
              expanded={this.state.chartOpen}
              onChange={(_, s) => this.setState({ chartOpen: s })}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography variant="h5" align="left">
                {_("MUSIC_CHARTS")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ flexDirection: "column" }}>
                <SongChartView
                  difficulty={this.state.chartDifficulty}
                  handleChange={(_, c) => this.setState({ chartDifficulty: c })}
                  music={music}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withRouter(DjMusicEntryPage);

const SongChartView = ({ difficulty, handleChange, music }) => {
  const id = music.Id.toString().padStart(7, "0");
  const jacketUrl = getAssetUrl("maps/", `chart_${id}${difficulty}.png`);

  return (
    <React.Fragment>
      <Tabs variant="scrollable" value={difficulty} onChange={handleChange}>
        <Tab label="Easy" value={1} />
        <Tab label="Normal" value={2} />
        <Tab label="Hard" value={3} />
        <Tab label="Expert" value={4} />
      </Tabs>
      <Box width="100%" overflow="scroll">
        <br />
        <img style={{ maxHeight: "1000px" }} src={jacketUrl} />
      </Box>
    </React.Fragment>
  );
};
