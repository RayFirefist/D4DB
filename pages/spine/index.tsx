import React from 'react';
import dynamic from 'next/dynamic'
import { getAssetUrl } from '../../utils/assets/getAssetUrl';
import { FormControl, InputLabel, NativeSelect, Grid, FormControlLabel, Checkbox } from '@material-ui/core';

const DynamicComponentWithNoSSR = dynamic(async () => import('../../components/spine/index'), {
    ssr: false
})

export default class SpineViewerPage extends React.Component {

    state = {
        spine1: "spine_chara_0430062.json",
        spine2: "spine_chara_0410062.json",
        disableMuniBunnyEars: false,
        spineList: []
    }

    componentDidMount(): void {
        fetch(getAssetUrl("ondemand", "spine")).then(r => r.json()).then(r => {
            let spineList = [];

            r.response_data.forEach(entry => {
                if (entry.type === "database") {
                    spineList.push(entry.filename);
                }
            });

            this.setState({ spineList: spineList })
        })
    }

    triggerMuniEars() {
        this.setState({disableMuniBunnyEars: !this.state.disableMuniBunnyEars})
    }

    setSpine(spinePath, spineSlot) {
        if (spinePath === "Remove") {
            spinePath = null;
        }
        switch (spineSlot) {
            case 1:
                this.setState({spine1: spinePath});
                break;
            case 2:
                this.setState({spine2: spinePath});
                break;
        }
    }

    render() {
        return <>
            <h2>Spine</h2>
            <Grid container spacing={2}>
                <Grid item md={4}>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Spine Model #1
                    </InputLabel>
                    <FormControl fullWidth>

                        <NativeSelect
                            defaultValue={this.state.spine1}
                            value={this.state.spine1}
                            onChange={(_) => this.setSpine(_.target.value, 1)}
                            inputProps={{
                                name: 'Spine Model #1',
                                id: 'uncontrolled-native',
                            }}
                        >
                            {
                                this.state.spineList.map(entry => <option value={entry}>{entry.replace(".json", "")}</option>)
                            }
                        </NativeSelect>
                    </FormControl>

                </Grid>
                <Grid item md={4}>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Spine Model #2
                    </InputLabel>
                    <FormControl fullWidth>

                        <NativeSelect
                            defaultValue={this.state.spine2}
                            value={this.state.spine2}
                            onChange={(_) => this.setSpine(_.target.value, 2)}

                            inputProps={{
                                name: 'Spine Model #2',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value={null}>Remove</option>
                            {
                                this.state.spineList.map(entry => <option value={entry}>{entry.replace(".json", "")}</option>)
                            }
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid item md={4}>
                    <FormControlLabel
                        control={
                            <Checkbox checked={this.state.disableMuniBunnyEars} onChange={this.triggerMuniEars.bind(this)} name="gilad" />
                        }
                        label="Disable Muni's Bunny Ears"
                    />
                </Grid>
            </Grid>
            <DynamicComponentWithNoSSR
                spineCharaJsonFilename={this.state.spine1}
                additionalSpineCharaJsonFilename={this.state.spine2}
                disableMuniBunnyEars={this.state.disableMuniBunnyEars}
            />
        </>
    }
}
