import React, { useEffect, useRef, useState } from "react";
import { Application, Ticker, RenderTexture } from "pixi.js";
import { useSize } from "web-api-hooks";
import { Cubism4ModelSettings, Live2DModel } from "pixi-live2d-display";
import { ButtonGroup, Button, Select, Container, Slider, Typography } from "@material-ui/core";
import { getAssetUrl } from "../../utils/assets/getAssetUrl";

export const Live2DViewer = (props) => {

    const { backgroundColor, models, } = props;

    const pixi = useRef<Application>();
    const parentRef = useRef<HTMLDivElement>(null);
    const [width, height] = useSize(parentRef);
    const [pose, setPose] = useState("hello");

    const modelLive2d = useRef<Live2DModel>();

    function draggable(model) {
        model.buttonMode = true;
        model.on("pointerdown", (e) => {
            model.dragging = true;
            model._pointerX = e.data.global.x - model.x;
            model._pointerY = e.data.global.y - model.y;
        });
        model.on("pointermove", (e) => {
            if (model.dragging) {
                model.position.x = e.data.global.x - model._pointerX;
                model.position.y = e.data.global.y - model._pointerY;
            }
        });
        model.on("pointerupoutside", () => (model.dragging = false));
        model.on("pointerup", () => (model.dragging = false));
    }

    /**
    useEffect(async () => {
        pixi.current = new Application({
            autoStart: true,
            width: innerWidth,
            height: innerHeight,
            backgroundColor: 0xFFFFFF
        });
        const { current: app } = pixi;
        Live2DModel.registerTicker(Ticker);
        parentRef.current.appendChild(app.view);

        const model = await Live2DModel.from(getAssetUrl("d4db_test", "live2d/muni/resources.model3.json"));
        modelLive2d.current = model;

        let a = app.stage.addChild(model);
        a.trackedPointers = [];

        if (innerHeight > innerWidth) {
            setScale(2, model);
            model.y = innerHeight * -0.37;
            model.x = innerWidth * -0.5;
        }
        else {
            setScale(1.5, model);
            model.y = innerHeight * -0.37;
            model.x = innerWidth * .1;
        }

        draggable(model);
        //addFrame(model);
        //addHitAreaFrames(model);
    }, []);*/

    function setMotion(motion) {
        modelLive2d.current?.motion("", getPose(modelLive2d.current, motion));
    }

    function setScale(newScale, model = modelLive2d.current) {

        console.log(newScale)

        if (newScale === "" || newScale === 0) {
            newScale = 0.1
        }

        const scaleX = (innerWidth * newScale) / model.width;
        const scaleY = (innerHeight * newScale) / model.height;


        // fit the window
        model.scale.set(Math.min(scaleX, scaleY));
    }

    function makeScreenshot() {
        let renderTexture = RenderTexture.create(pixi.current.renderer.width, pixi.current.renderer.height);
        pixi.current.renderer.render(modelLive2d, renderTexture);
        let canvas = pixi.current.renderer.extract.canvas(renderTexture);
        window.open(canvas.toDataURL('image/png'));
    }

    return (
        <>
        <br/>
        <br/>
        <br/>
            <div align="center" px={2}>
                <Typography id="input-slider" gutterBottom>
                    Scale
                </Typography>
                <Slider style={{ width: "50%" }} defaultValue={2} min={0.5} step={0.1} max={2} marks onChange={(e, value) => setScale(value)} />
            </div>
            <Button onClick={() => makeScreenshot()}>Screenshot</Button>
            <Container innerRef={parentRef}></Container>
        </>
    );
};

export default Live2DViewer;

const getPose = (model: Live2DModel, pose: string) => {
    return (
        (model.internalModel.settings as Cubism4ModelSettings).motions[""]
            .map((p, idx) => (p.File.match(pose) ? idx : undefined))
            .filter((p) => p)[0] ?? 0
    );
};
