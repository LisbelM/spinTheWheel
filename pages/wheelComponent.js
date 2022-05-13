import styles from '../styles/wheelComponent.module.css'
import { useCollection } from "react-firebase-hooks/firestore"
import { useContext, useEffect, useRef } from 'react'

import { submissionListContext } from "./adminArea"

const WheelCanvas = () => {

    const { subs, subsLoading, subsError } = useContext(submissionListContext)

    if (subs) {

        const segments = []
        subs.docs.forEach(item => {
            segments.push({ value: item.data().submission, odds: item.data().odds})
        })

        const segmentColors = [
            '#EB55AA',
            '#81E27F',
            '#746EE0',
            '#7FC9F3',
            '#FADD81',
            '#F2982C'
        ]

        const centerX = 200;
        const centerY = 200;
        const circleRadius = 150;

        const canvasRef = useRef(null)

        const draw = ctx => {

            ctx.fillStyle = 'red'
            ctx.beginPath()
            ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI)
            ctx.fill()

            /*outer circle*/
            ctx.beginPath()
            ctx.arc(centerX, centerY, circleRadius + 2.5, 0, 2 * Math.PI)
            ctx.closePath()
            ctx.lineWidth = 6;
            ctx.strokeStyle = '#f1f1f1';
            ctx.stroke()

            /*segments*/
            let angleCurrent = 0
            let lastAngle = angleCurrent

            const odds_sum = segments.reduce((total, obj) => obj.odds + total, 0)
            const numSegments = segments.length;
            for (let i = 1; i <= numSegments; i++) {
                const oddForSeg = segments[i - 1].odds;
                const angle = 2 * Math.PI * (oddForSeg / odds_sum) + angleCurrent
                drawSegment(ctx, i - 1, lastAngle, angle)
                lastAngle = angle
            }

            /*inner circle*/
            ctx.beginPath()
            ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI)
            ctx.closePath()
            ctx.fillStyle = 'white'
            ctx.fill()

            /*needle*/
            drawNeedle(ctx, angleCurrent)

        }

        const drawSegment = (ctx, key, lastAngle, angle) => {

            const value = segments[key].value
            const odds = segments[key].odds
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.arc(centerX, centerY, circleRadius, lastAngle, angle, false)
            ctx.lineTo(centerX, centerY)
            ctx.closePath()
            ctx.fillStyle = segmentColors[key % segmentColors.length]
            ctx.fill()
            /*ctx.stroke()*/
            ctx.save()
            ctx.translate(centerX, centerY)
            ctx.rotate((lastAngle + angle))
            ctx.fillStyle = 'black' || 'white'
            ctx.font = 'bold 0.8em Helvetica'
            ctx.fillText(value.substr(0, 21), circleRadius / 2 + 20, 0)
            ctx.restore()

        }

        const drawNeedle = (ctx, angleCurrent) => {
            ctx.lineWidth = 1
            ctx.strokeStyle = 'black' || 'white'
            ctx.fileStyle = 'black' || 'white'
            ctx.beginPath()
            ctx.moveTo(centerX + 20, centerY - 10)
            ctx.lineTo(centerX - 20, centerY - 10)
            ctx.lineTo(centerX, centerY - 40)
            ctx.closePath()
            ctx.fill()
            const change = angleCurrent + Math.PI / 2
            let i =
                segments.length -
                Math.floor((change / (Math.PI * 2)) * segments.length) -
                1
            if (i < 0) i = i + segments.length
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillStyle = 'black' || 'black'
            ctx.font = 'bold 0.8em Helvetica'

        }

        useEffect(() => {
            const wheelCanvas = canvasRef.current
            const wheelContext = wheelCanvas.getContext('2d');
            draw(wheelContext)

        }, [draw])

        /*    const { submissionListEntries } = useContext();
        
            useEffect(() => {
        
            }, [submissionListEntries])*/

        return <canvas ref={canvasRef} draw={draw} width="1000px" height="1000px"></canvas >
    }
   
}

export { WheelCanvas }