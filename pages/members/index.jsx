import React from "react";

import Link from "next/link";

import { Card, Grid, Typography } from "@material-ui/core";

import AbstractList from "../../components/common/listPage.tsx";
import { getAssetUrl } from "../../utils/assets/getAssetUrl.js";
import l10n from '../../utils/l10n/l10n';

const strings = new l10n();

class DjMembersListPage extends AbstractList {
  constructor(props) {
    super(props);
    this.databases = ["CharacterMaster", "UnitMaster"];
    this.title = "MEMBERS_TITLE";
    this.hideEntriesAmount = true;
  }

  getIllustUrl(member) {
    return getAssetUrl(
      "ondemand/character",
      `character_stand_up_0${member.Id}.png`
    );
  }

  renderElements() {
    console.log(this.state);
    let members = this.state.databases.CharacterMaster;
    let units = this.state.databases.UnitMaster;

    console.log(units);

    let out = [];

    for (let id in units) {
      const unit = units[id];

      if (unit.InitDeckCharacterIds.length === 0 && id !== "50") continue;

      const unitMembers =
        id === "50"
          ? Object.entries(members)
              .filter(([_, m]) => m.Unit == id)
              .map(e => e[0])
          : unit.InitDeckCharacterIds.sort();

      out.push(
        <Grid container key={"unit" + id}>
          <Grid item xs={12}>
            <Typography variant="h5" align="left">
              <p>{id === "50" ? strings.getString("MEMBERS_OTHERS") : unit.Name}</p>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {unitMembers.map(charaId => {
                const member = members[charaId];
                return (
                  <Grid key={"chara" + charaId} xs={6} md={3} lg={3} item>
                    <Link href={"/members/" + charaId}>
                      <Card style={{ height: "100%" }}>
                        <Grid container spacing={2}>
                          {id !== "50" && (
                            <Grid
                              item
                              xs={12}
                              style={{
                                backgroundImage: `url(${this.getIllustUrl(
                                  member
                                )})`,
                                height: "500px",
                                backgroundPosition: "center top",
                                backgroundSize: "cover",
                                backgroundColor: member.ColorCode
                              }}
                            ></Grid>
                          )}
                          <Grid item xs={12}>
                            <Typography variant="h6" align="center">
                              {this.isjp
                              ? member.FullName
                              : strings.getString(`CHR__${member.FullNameEnglish}`,
                                strings.getString(`OUTSIDE_CHR__${member.FullName}`,
                                member.FullName)
                              )}
                            </Typography>
                            <Typography variant="caption" align="center">
                              {member.FirstNameEnglish}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Card>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      );
    }

    return out;
  }
}
export default DjMembersListPage;
