import styles from '../styles/wheelComponent.module.css'
import React, { useContext, useEffect, useState, useRef } from "react";

import { submissionListContext } from "./adminArea"
import { winnerContext } from "./adminArea"

const WheelComponent = () => {

    const { subs, subsLoading, subsError } = useContext(submissionListContext)
    const { popUpValues, setWinner } = useContext(winnerContext)

    if (subs) {

        const segments = []
        subs.docs.forEach(item => {
            console.log(item.data().selectedBool)
            if (item.data().selectedBool) { segments.push({ value: item.data().submission, odds: item.data().odds, usr: item.data.usrName}) }
        })

        const canvasRef = useRef(null)

        const segmentColors = [
            '#EB55AA',
            '#81E27F',
            '#746EE0',
            '#7FC9F3',
            '#FADD81',
            '#F2982C'
        ]

        let size = 290
        let upDuration = 100
        let downDuration = 1000
        let fontFamily = "Helvetica"

        let currentSegment = "";
        let isStarted = false;
        const [isFinished, setFinished] = useState(false);
        let timerHandle = 0;
        const timerDelay = segments.length;
        let angleCurrent = 0;
        let angleDelta = 0;
        let canvasContext = null;
        let maxSpeed = Math.PI / `${segments.length - 20}`;
        const upTime = (segments.length % 10) * upDuration;
        const downTime = (segments.length % 10) * downDuration;
        let spinStart = 0;
        let frames = 0;

        const centerX = 500;
        const centerY = 250;
        const circleRadius = 225;

        const wheelInit = () => {
            initCanvas();
            wheelDraw();
        };

        const initCanvas = () => {
            let canvas = canvasRef.current;
            canvas.addEventListener("click", spin, false);
            canvasContext = canvas.getContext("2d");
        };

        const spin = () => {
            if (segments.length != 0) {
                isStarted = true;
                if (timerHandle === 0) {
                    spinStart = new Date().getTime();
                    maxSpeed = Math.PI / segments.length;
                    frames = 0;
                    timerHandle = setInterval(onTimerTick, timerDelay);
                }
            }
        };

        const onTimerTick = () => {
            frames++;
            draw();
            const duration = new Date().getTime() - spinStart;
            let progress = 0;
            let finished = false;
            if (duration < upTime) {
                progress = duration / upTime;
                angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
            } else {
                progress = duration / downTime;
                angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
                if (progress >= 1) finished = true;
            }

            angleCurrent += angleDelta;
            while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
            if (finished) {
                setFinished(true);
                onFinished(currentSegment);
                clearInterval(timerHandle);
                timerHandle = 0;
                angleDelta = 0;
            }
        };

        const wheelDraw = () => {
            clear();
            drawWheel();
            drawNeedle();
        };

        const draw = () => {
            clear();
            drawWheel();
            drawNeedle();
        };

        const drawSegment = (key, lastAngle, angle) => {
            const ctx = canvasContext;
            const value = segments[key].value
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, circleRadius, lastAngle, angle, false);
            ctx.lineTo(centerX, centerY);
            ctx.closePath();
            ctx.fillStyle = segmentColors[key % segments.length];
            ctx.fill();
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate((lastAngle + angle) / 2);
            ctx.fillStyle = "black";
            ctx.font = "bold 0.8em" + fontFamily;
            ctx.fillText(value.substr(0, 21), circleRadius / 2 + 20, 0);
            ctx.restore();
        };

        const drawWheel = () => {
            const ctx = canvasContext;
            let lastAngle = angleCurrent;
            const len = segments.length;
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.font = "0.8em " + fontFamily;

            ctx.beginPath();
            ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI, false);
            ctx.fillStyle = "#71DBDB";
            ctx.fill();

            const odds_sum = segments.reduce((total, obj) => parseInt(obj.odds) + total, 0)
            for (let i = 1; i <= len; i++) {
                const oddForSeg = parseInt(segments[i - 1].odds);
                const angle = (2 * Math.PI * (oddForSeg / odds_sum)) + lastAngle;
                drawSegment(i - 1, lastAngle, angle);
                lastAngle = angle;
            }

            /*center circle*/
            ctx.beginPath();
            ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fillStyle = "white";
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.fill();
            ctx.font = "bold 1em " + fontFamily;
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.stroke();

            /*outer circle*/
            ctx.beginPath();
            ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI, false);
            ctx.closePath();

            ctx.lineWidth = 6;
            ctx.strokeStyle = '#f7f7f7';
            ctx.stroke();

        };

        const drawNeedle = () => {
            const ctx = canvasContext;
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.moveTo(centerX + 10, centerY - 50);
            ctx.lineTo(centerX - 10, centerY - 50);
            ctx.lineTo(centerX, centerY - 65);
            ctx.closePath();
            ctx.fill();
            const change = angleCurrent + Math.PI / 2;
            let i =
                segments.length -
                Math.floor((change / (Math.PI * 2)) * segments.length) -
                1;
            if (i < 0) i = i + segments.length;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black";
            ctx.font = "bold 0.8em " + fontFamily;
            currentSegment = segments[i];

            /*user image on needle*/
            /*replace file path for actual usr image or pull from firestore*/
/*            let base_image = new Image();
            base_image.src = '/images/ludwigEmote.webp';
            ctx.drawImage(base_image, centerX, centerY);
            base_image.onload = function () {
                ctx.drawImage(base_image, centerX - 35, centerY - 35, 75, 75);
            }*/

        };

        const clear = () => {
            const ctx = canvasContext;
            ctx.clearRect(0, 0, 1000, 800);
        };

        const onFinished = (winner) => {
            setWinner({ ...popUpValues, popupBool: true, winnerSubmission: winner.value, winnerUsrName: winner.usr})
        };

        useEffect(() => {
            wheelInit()
        }, [wheelInit])

        return (
            <canvas onClick={() => spin()} ref={canvasRef} wheelDraw={wheelDraw} width="1000px" height="500px" style={{cursor : 'pointer'}}></canvas>
        );

    }
    
};

export default WheelComponent;
