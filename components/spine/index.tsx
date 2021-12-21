import React, { useEffect, useRef, useState } from "react";
import { Application, Ticker } from "pixi.js";
import { useSize } from "web-api-hooks";
// import { Cubism4ModelSettings, Live2DModel } from "pixi-live2d-display";
import "pixi-spine";
import { getAssetUrl } from "../../utils/assets/getAssetUrl";
import { Container, FormControl, Grid, NativeSelect, Select } from "@material-ui/core";

const MUNI_EARS = [
    "cat_ears_L",
    "cat_ears_R",
    "Rabbit ears_L(for)",
    "Rabbit ears_R(for)",
    "bear_ears_L",
    "bear_ears_R"
]

export const SpineView = (props) => {

    const { spineCharaJsonFilename, additionalSpineCharaJsonFilename, disableMuniBunnyEars } = props;
    const pixi = useRef<Application>();
    const parentRef = useRef<HTMLDivElement>(null);
    const [width, height] = useSize(parentRef);
    const [mode, setMode] = useState<0 | 1>(0);
    const [pose, setPose] = useState("hello");
    const [model1, setModel1] = useState(null);
    const [model2, setModel2] = useState(null);
    const [animation1, setAnimation1] = useState("00_stay");
    const [animation2, setAnimation2] = useState("00_stay");

    useEffect(() => {
        pixi.current = new Application({
            backgroundAlpha: 0,
            width: 500,
            height: 500,
            autoStart: true,
        });
        const { current: app } = pixi;
        // Live2DModel.registerTicker(Ticker);
        parentRef.current.appendChild(app.view);

        console.log(spineCharaJsonFilename, additionalSpineCharaJsonFilename, disableMuniBunnyEars);

        const init = async () => {
            const resources: any = await new Promise((resolve) => {
                app.loader
                    .add("model1", getAssetUrl("ondemand/spine", spineCharaJsonFilename));

                if (additionalSpineCharaJsonFilename) {
                    app.loader.add("model2", getAssetUrl("ondemand/spine", additionalSpineCharaJsonFilename))
                }
                app.loader.load((loader, resources) => {
                    resolve(resources);
                })
            }

            );
            if (mode === 0) {
                let data = resources.model1.spineData;
                const model1 = new PIXI.spine.Spine(data);
                model1.skeleton.setSkinByName("normal");

                const scaleT =
                    model1.width * 2 > app.renderer.width
                        ? app.renderer.width / 3 / model1.width
                        : model1.height > app.renderer.height
                            ? app.renderer.height / model1.height
                            : 1;
                model1.scale.x = scaleT;
                model1.scale.y = scaleT;
                model1.x = 0.5 * app.renderer.width;
                model1.y = app.renderer.height;
                model1.state.setAnimation(0, "00_stay", true);

                if (disableMuniBunnyEars) {
                    MUNI_EARS.forEach(ear => {
                        try {
                            model1.skeleton.findSlot(ear).setAttachment(null);
                        }
                        catch { }
                    })
                }

                if (additionalSpineCharaJsonFilename) {
                    data = resources.model2.spineData;
                    const model2 = new PIXI.spine.Spine(data);

                    model2.skeleton.setSkinByName("reverse");

                    model2.scale.x = -1 * scaleT;
                    model2.scale.y = scaleT;
                    model2.x = 0.7 * app.renderer.width;
                    model2.y = app.renderer.height;

                    // Side-by-side charas
                    model1.x = 0.3 * app.renderer.width;
                    model1.y = app.renderer.height;

                    model2.state.setAnimation(0, "00_stay", true); // interaction

                    if (disableMuniBunnyEars) {
                        MUNI_EARS.forEach(ear => {
                            try {
                                model2.skeleton.findSlot(ear).setAttachment(null);
                            }
                            catch { }
                        })
                    }

                    app.stage.addChild(model1);
                    app.stage.addChild(model2);
                    setModel1(model1);
                    setModel2(model2);
                }
                else {
                    app.stage.addChild(model1);
                }
            }
        };
        init();
        return () => {
            parentRef.current?.removeChild(app.view);
            //   app.destroy();
        };
    }, [spineCharaJsonFilename, additionalSpineCharaJsonFilename, disableMuniBunnyEars]); // width, height, mode

    function setAnimationModel1(animation) {
        model1.state.setAnimation(0, animation, true);
    }

    function setAnimationModel2(animation) {
        model2.state.setAnimation(0, animation, true);
    }

    return (
        <>
            <br></br>
            <FormControl fullWidth>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <FormControl fullWidth>

                            <NativeSelect
                                defaultValue={"d"}
                                value={animation1}
                                onChange={(_) => setAnimationModel1(_.target.value)}

                                inputProps={{
                                    name: 'Animation Spine Model #1',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option value={"d"}></option>
                                <option value={"00_stay"}>00_stay</option>
                                <option value={"06_talk_A"}>06_talk_A</option>
                                <option value={"07_talk_B"}>07_talk_B</option>
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item md={6}>
                        <FormControl fullWidth>

                            <NativeSelect
                                defaultValue={"d"}
                                value={animation2}
                                onChange={(_) => setAnimationModel2(_.target.value)}

                                inputProps={{
                                    name: 'Animation Spine Model #2',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option value={"d"}></option>
                                <option value={"00_stay"}>00_stay</option>
                                <option value={"06_talk_A"}>06_talk_A</option>
                                <option value={"07_talk_B"}>07_talk_B</option>
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                </Grid>
            </FormControl>
            <Container innerRef={parentRef}></Container>
        </>
    );
};

export default SpineView;