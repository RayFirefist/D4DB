import React from "react";
import l10n from "../../utils/l10n/l10n";
import classes from "../../styles/list.module.css";
import LoadingComponent from "./loading";
import { Typography } from "@material-ui/core";

const strings = new l10n();

abstract class DjAbstractListPage extends React.Component {
  protected databases: object = [];
  protected title: string = "DUMMY_TITLE";
  protected lang: string;
  protected isJp: boolean;
  protected getElements;
  protected classes;
  protected strings: l10n;
  protected hideEntriesAmount: boolean;
  public state = {
    // standard
    error: false,
    loading: true,
    // db
    databases: {},
    // ui
    displayedAmounts: 10,
    // sort/filter
    orderBy: "desc",
    sortBy: null,
    filters: {},
  };

  constructor(props) {
    super(props);
    this.lang = strings.getLanguage();
    this.isJp = this.lang === "ja";
    this.classes = classes;
    this.strings = strings;
  }

  static async getInitialProps(ctx) {
    //console.log(ctx)
    return { arg: null };
  }

  componentDidMount() {
    fetch("/api/dbs", {
      body: JSON.stringify({ dbs: this.databases }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((r) => r.json())
      .then((json) => {
        if (json.error)
          return this.setState({ error: json.error, loading: true });
        this.setState({ databases: json.result, loading: false });
      })
      .catch((err) => this.setState({ error: err, loading: false }));
  }

  displayMore() {
    console.log("display more");
  }

  renderElements(): object {
    throw new Error("renderElements must be implemented first");
  }

  applyFilter(key, value) {
    let filters = this.state.filters;
    if (filters[key] !== undefined) {
      if (filters[key].includes(value)) {
        // REMOVE
      }
      else {
        // APPEND
        filters[key].push(value)
      }
    }
    else {
      // CREATE
      filters[key] = [value]
    }
    this.setState({filters: filters});
  }

  render() {
    if (this.state.loading) return <LoadingComponent />;

    if (this.state.error) return this.state.error;

    const classes = this.classes;
    const strings: l10n = this.strings;
    const elements: any = this.renderElements();

    console.log(elements);

    return (
      <div>
        {/* Head */}
        <div className={classes.title}>
          <Typography variant="h3">{strings.getString(this.title)}</Typography>
        </div>

        <br />
        <div style={{ textAlign: "left" }} hidden={this.hideEntriesAmount}>
          {strings.getString("COMMON_ENTRIES").format(elements.length)}
        </div>

        {/* Information */}
        {elements}
      </div>
    );
  }
}

export default DjAbstractListPage;
