import styles from '../styles/wheelComponent.module.css'
import { useCollection } from "react-firebase-hooks/firestore"
import { useEffect, useRef } from 'react'

const WheelCanvas = () => {

    const segments = [
        { isSuper: true, value: '120001 RUB', odds: 5},
        { isSuper: false, value: '2002 RUB', odds: 1 },
        { isSuper: true, value: '19003 RUB', odds: 2 },
        { isSuper: false, value: '2004 RUB', odds: 5 },
        { isSuper: true, value: 'IPhone 12', odds: 5 },
        { isSuper: false, value: '2006 RUB', odds: 3 },
        { isSuper: true, value: '6007 RUB', odds: 5 },
        { isSuper: false, value: '2008 RUB', odds: 10 },
        { isSuper: true, value: '6009 RUB', odds: 0.5 },
        { isSuper: false, value: '2010 RUB', odds: 7 },
    ]

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
        ctx.arc(centerX, centerY, circleRadius, 0, 2*Math.PI)
        ctx.fill()

        /*outer circle*/
        ctx.beginPath()
        ctx.arc(centerX, centerY, circleRadius+2.5, 0, 2 * Math.PI)
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

        console.log(segmentColors[key])

        ctx.fill()
        /*ctx.stroke()*/
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate((lastAngle + angle) / 2)
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

    return <canvas ref={canvasRef} draw={draw} width="1000px" height="1000px"></canvas >

}

export { WheelCanvas }