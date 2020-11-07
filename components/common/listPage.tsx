import React from 'react';
import l10n from '../../utils/l10n/l10n';
import classes from '../../styles/list.module.css';

const strings = new l10n();

abstract class DjAbstractListPage extends React.Component {

    protected databases: object = [];
    protected title: string = "DUMMY_TITLE";
    protected lang: string;
    protected isJp: boolean;
    protected getElements;
    protected classes;
    protected strings: l10n;
    public state = {
        // standard
        error: false,
        loading: true,
        // db
        databases: {},
        // ui
        displayedAmounts: 10,
    }

    constructor(props) {
        super(props);
        this.lang = strings.getLanguage();
        this.isJp = this.lang === "ja";
        this.classes = classes;
        this.strings = strings;
    }

    static async getInitialProps(ctx) {
        //console.log(ctx)
        return { arg: null }
    }

    componentDidMount() {
        fetch("/api/dbs", {
            body: JSON.stringify({ dbs: this.databases }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST"
        }).then(r => r.json())
            .then(json => {
                if (json.error)
                    return this.setState({ error: json.error, loading: true })
                this.setState({ databases: json.result, loading: false })
            })
            .catch(err => this.setState({ error: err, loading: false }))
    }

    displayMore() {
        console.log("display more")
    }

    renderElements() {
        throw new Error("renderElements must be implemented first")
    }

    render() {

        if (this.state.loading)
            return "Loading..."

        if (this.state.error)
            return this.state.error

        const classes = this.classes;
        const strings = this.strings;
        const elements = this.renderElements();

        console.log(elements);

        return <div >

            {/* Head */}
            <div className={classes.title}>
                <h1>{strings.getString(this.title)}</h1>
            </div>

            <br /><br />

            {/* Information */}
            {elements}

        </div>;
    }
}

export default DjAbstractListPage;