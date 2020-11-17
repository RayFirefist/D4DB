import React from "react";
import { withRouter } from "next/router";
import l10n from "../../utils/l10n/l10n";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@material-ui/core";
import { getAssetUrl } from "../../utils/assets/getAssetUrl.js";

const strings = new l10n();

class DjMemberEntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // standard
      id: props.router.query.id,
      error: false,
      loading: true,
      // db
      character: {},
      unit: {},
      // page
      illust: 0,
      tab: 0,
      openModal: false,
      illustUrl: ""
    };
  }

  static async getInitialProps(ctx) {
    //console.log(ctx)
    return { arg: null };
  }

  componentDidMount() {
    fetch("/api/dbs", {
      body: JSON.stringify({ dbs: ["CharacterMaster", "UnitMaster"] }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .then(r => r.json())
      .then(json => {
        console.log(json);
        if (json.error)
          return this.setState({ error: json.error, loading: false });

        json = json.result;
        const chara = json["CharacterMaster"][this.state.id];
        const unit = json["UnitMaster"][chara.Unit];

        if (chara === undefined)
          return this.setState({ error: "Chara not found" });

        this.setState({ character: chara, unit, loading: false });
      })
      .catch(err => this.setState({ error: err, loading: false }));
  }

  getIllustUrl(member) {
    return getAssetUrl(
      "ondemand/character",
      `character_stand_up_0${member.Id}.png`
    );
  }

  getCharacterProfile(member) {
    return getAssetUrl(
      "ondemand/character_profile",
      `character_profile_0${member.Id}.jpg`
    );
  }

  openModal(url) {
    this.setState({
      openModal: true,
      illustUrl: url
    });
  }

  closeModal() {
    this.setState({
      openModal: false
    });
  }

  render() {
    if (this.state.loading) return "Loading...";

    if (this.state.error) return this.state.error;

    const chara = this.state.character;
    const unit = this.state.unit;
    const lang = strings.getLanguage();

    console.log(chara);

    return (
      <div>
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Typography variant="h3" align="left">
              {lang === "jp" ? chara.FullName : chara.FullNameEnglish}
            </Typography>
            <Typography variant="h6" align="left" gutterBottom={true}>
              {lang === "jp" ? chara.FullNameEnglish : chara.FullName}
            </Typography>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1" align="left">
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{chara.FullName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1" align="left">
                      Group
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{unit.Name}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              backgroundImage: `url(${this.getIllustUrl(chara)})`,
              height: "500px",
              backgroundPosition: "center top",
              backgroundSize: "cover"
            }}
          ></Grid>
          <Grid item xs={12}>
            <img
              src={this.getCharacterProfile(chara)}
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(DjMemberEntryPage);
