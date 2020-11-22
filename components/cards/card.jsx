import React from 'react';

import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    card: {
        width: "100%",
        backgroundSize: "100% !important",
        backgroundRepeat: "no-repeat !important",
    },
    coolIcon: {
        
    }
});

class D4DJCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cardIllust: props.cardIllust,
            rarity: props.rarity,
        }
    }

    componentDidUpdate() {
        if (this.props.cardIllust !== this.state.cardIllust)
            this.setState({
                cardIllust: this.props.cardIllust
            })
    }

    render() {
        const { classes } = this.props;
        return <img 
            src={"/assets/chara/frame/frame{0}.png".format(this.state.rarity)} 
            className={classes.card} 
            style={{background: `url(${this.state.cardIllust})`}} 
            alt={"frame"}
        />
    }

}

export default withStyles(useStyles)(D4DJCard);