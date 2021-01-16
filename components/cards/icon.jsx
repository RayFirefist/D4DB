import React, { Component } from 'react';
import SafeImageLoader from '../common/safeImage';

import constants from './../../consts.json';

import Image from './../common/image.jsx';

const classes = {
    iconContainer: {
        width: "72px", // 100%
        height: "72px",
        position: "relative"
    },
    illust: {
        width: "68px", // 93,05555556%
        height: "68px",
        position: "absolute",
        top: "3px", // 4,166666667%
        left: "3px"
    },
    attribute: {
        position: "absolute",
        top: "2%",
        right: "2%",
        width: "17px"
    },
    star1: {
        position: "absolute",
        bottom: "2%", // 2,7777777778%
        left: "2%",
        width: "14px"
    },
    star2: {
        position: "absolute",
        bottom: "16%", // 2,7777777778%
        left: "2%",
        width: "14px"
    },
    star3: {
        position: "absolute",
        bottom: "30%", // 2,7777777778%
        left: "2%",
        width: "14px"
    },
    star4: {
        position: "absolute",
        bottom: "44%", // 2,7777777778%
        left: "2%",
        width: "14px"
    },
    frame1cool: {
        background: "url('/assets/chara/icon/frame1_cool.png')",
        backgroundSize: "100% 100%",
        width: "72px",
        height: "72px",
        position: "absolute"
    },
    frame1cute: {
        background: "url('/assets/chara/icon/frame1_cute.png')",
        backgroundSize: "100% 100%",
        width: "72px",
        height: "72px",
        position: "absolute"
    },
    frame1party: {
        background: "url('/assets/chara/icon/frame1_party.png')",
        backgroundSize: "100% 100%",
        width: "72px",
        height: "72px",
        position: "absolute"
    },
    frame1street: {
        background: "url('/assets/chara/icon/frame1_street.png')",
        backgroundSize: "100% 100%",
        width: "72px",
        height: "72px",
        position: "absolute"
    },
    frame1elegant: {
        background: "url('/assets/chara/icon/frame1_elegant.png')",
        backgroundSize: "100% 100%",
        width: "72px",
        height: "72px",
        position: "absolute"
    },
    frame2: {
        background: "url('/assets/chara/icon/frame2.png')",
        backgroundSize: "100% 100%",
        width: "72px",
        height: "72px",
        position: "absolute"
    },
    frame3: {
        background: "url('/assets/chara/icon/frame3.png')",
        backgroundSize: "100% 100%",
        width: "72px",
        height: "72px",
        position: "absolute"
    },
    frame4: {
        background: "url('/assets/chara/icon/frame4.png')",
        backgroundSize: "100% 100%",
        width: "72px",
        height: "72px",
        position: "absolute"
    }
}

class D4DJCardIcon extends Component {
    constructor(props) {
        super(props)
        this.illustUrl = props.illustUrl
        this.frameClass = classes['frame' + props.rarity]
        this.typeId = props.typeId
        this.role = props.role
    }

    render() {


        let type = "unk"

        switch (this.typeId) {
            case 1:
                type = "street"
                break;
            case 2:
                type = "party"
                break;
            case 3:
                type = "cute"
                break;
            case 4:
                type = "cool"
                break;
            case 5:
                type = "elegant"
                break;
        }

        if (this.props.rarity === 1) {
            this.frameClass = classes['frame' + this.props.rarity + type];
        }

        let rarity = []

        for (let i = 0; i < this.props.rarity; i++) {
            rarity.push(<img src={"/assets/chara/rarity/normal.png"} style={classes["star" + (i+1)]} alt="" />)
        }

        return <div style={classes.iconContainer}>
            <SafeImageLoader src={this.illustUrl} style={classes.illust} alt={"illust"} />
            <div style={this.frameClass} />
            <div>
                {rarity}
            </div>
            <div>
                <SafeImageLoader src={"/assets/chara/type/icon_" + type + ".png"} style={classes.attribute} alt="" />
            </div>
        </div>
    }
}

export default D4DJCardIcon;