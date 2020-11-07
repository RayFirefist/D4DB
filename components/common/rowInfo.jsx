import React, { Component } from 'react';
import { Divider, Grid } from '@material-ui/core';

class RowInformation extends Component {

    constructor(props) {
        super(props);
        let hidden = props.hidden === undefined ? false : props.hidden
        //console.log(props.left + " " + props.right + " " + hidden)
        this.state = {
            "left": props.left,
            "right": props.right,
            "hidden": hidden
        }
    }

    componentWillUpdate() {
        this.setState({ "left": this.props.left, "right": this.props.right })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.left !== nextProps.left)
            return true;
        if (this.state.right !== nextProps.right)
            return true;
        return false;
    }

    render() {
        return <div hidden={this.state.hidden}>
            <Grid container spacing={2}>
                <Grid item key={0} xs={3}><b>{this.state.left}</b></Grid>
                <Grid item key={1} xs={9} align="right">{this.state.right}</Grid>
            </Grid>
            <br></br>
            <Divider></Divider>
            <br></br>
        </div>
    }
}

export default RowInformation;