import { useEffect, useState } from "react"

import classes from './Stopwatch.module.css'

const Stopwatch = () => {

	const [isPaused, setIsPaused] = useState(false)
	const [secondsElapsed, setSecondsElapsed] = useState(0)

	const [laps, setLaps] = useState<number[]>([])
	
	useEffect(() => {
		if (isPaused) return
		const timer = setInterval(() => {
			setSecondsElapsed(num => num + 1)
		}, 1000)
		return () => {clearInterval(timer)}
	}, [isPaused])

	const pausePlayHandler = () => {
		setIsPaused(bool => !bool)
	}

	const convertSecondsToTimeString = (seconds: number) => {
		// let h = Math.floor((seconds/60)/60)
		let m = Math.floor(seconds/60).toString()
		let s = (seconds % 60).toString()
		if (s.length === 1) s = '0' + s
		return(`${m}:${s}`)
	}

	const resetHandler = () => {
		setSecondsElapsed(0)
	}

	const addLapHandler = () => {
		setSecondsElapsed(0)
		setLaps(laps => [...laps, secondsElapsed])
	}

	const clearLapsHandler = () => {
		setLaps([])
	}

	return (<section>
		<div className={classes.stopwatch}>
			<h2>Stopwatch</h2>
			<h3 style={{marginTop: '0', padding: '0'}}>{convertSecondsToTimeString(secondsElapsed)}</h3>
			<div>
				<button onClick={pausePlayHandler}>{isPaused ? 'Play' : 'Pause'}</button>
				<button onClick={resetHandler}>Reset</button>
			</div>
			<ul style={{border: '1px solid grey', listStyle: 'none', padding: '1rem'}}>
				{laps.length > 0 && laps.map((lap, index) => {
					return <li key={`lap_${index}`}>Lap {index+1} - {convertSecondsToTimeString(lap)}</li>
				})}
				{laps.length === 0 && <li>No laps recorded.</li>}
			</ul>
			<div>
				<button onClick={addLapHandler}>Lap</button>
				<button onClick={clearLapsHandler}>Clear laps</button>
			</div>
		</div>
	</section>)
}

export default Stopwatch