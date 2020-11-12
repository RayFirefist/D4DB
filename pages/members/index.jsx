import React from "react";
import Drawer from "../../components/common/base.jsx";

import Link from "next/link";

import consts from "../../consts.json";
import { Card, Grid, Typography } from "@material-ui/core";

import AbstractList from "../../components/common/listPage.tsx";

class DjMembersListPage extends AbstractList {
  constructor(props) {
    super(props);
    this.databases = ["CharacterMaster", "UnitMaster"];
    this.title = "MEMBERS_TITLE";
    this.hideEntriesAmount = true;
  }

  getIllustUrl(member) {
    return (
      consts.cdn +
      "ondemand/character/character_stand_up_0" +
      member.Id +
      ".png"
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
              .map((e) => e[0])
          : unit.InitDeckCharacterIds.sort();

      out.push(
        <Grid container key={"unit" + id}>
          <Grid item xs={12}>
            <Typography variant="h5" align="left">
              <p>{id === "50" ? "Others" : unit.Name}</p>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {unitMembers.map((charaId) => {
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
                                backgroundColor: member.ColorCode,
                              }}
                            ></Grid>
                          )}
                          <Grid item xs={12}>
                            <Typography variant="h6" align="center">
                              {member.FullName}
                            </Typography>
                            <Typography variant="caption" align="center">
                              {member.FullNameEnglish ||
                                member.FirstNameEnglish}
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
