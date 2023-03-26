import { useEffect, useMemo, useState } from "react";
import {
	Button,
	Typography,
	Box,
	Card,
	ListItem,
	ListItemText,
	FormLabel,
} from "@mui/material";

const Stopwatch = () => {
	const [isPaused, setIsPaused] = useState(true);
	const [millisecondsElapsed, setMillisecondsElapsed] = useState(0);

	const [laps, setLaps] = useState<number[]>([]);

	useEffect(() => {
		if (isPaused) return;
		const timer = setInterval(() => {
			setMillisecondsElapsed((num) => num + 10);
		}, 10);
		return () => {
			clearInterval(timer);
		};
	}, [isPaused]);

	const pausePlayHandler = () => {
		setIsPaused((bool) => !bool);
	};

	const convertMillisecondsToTimerString = useMemo(() => {
		return (milliseconds: number) => {
			let minutes = Math.floor(milliseconds / 1000 / 60);
			let seconds = Math.floor((milliseconds / 1000) % 60);
			let ms = (milliseconds - seconds * 1000).toString().slice(0, 2);
			ms = ms === "0" ? "00" : ms;
			let secondsString = seconds.toString();
			if (secondsString.length === 1) secondsString = "0" + secondsString;
			return `${minutes}:${secondsString}:${ms}`;
		};
	}, []);

	const resetHandler = () => {
		setIsPaused(true);
		setMillisecondsElapsed(0);
		setLaps([]);
	};

	const addLapHandler = () => {
		setIsPaused(false);
		setMillisecondsElapsed(0);
		setLaps((laps) => [...laps, millisecondsElapsed]);
	};

	return (
		<>
			<Typography variant="h2" textAlign={"center"} lineHeight={1}>
				{convertMillisecondsToTimerString(millisecondsElapsed)}
			</Typography>

			<Box style={{ display: "flex", gap: "0.25rem" }}>
				<Button fullWidth variant="outlined" onClick={pausePlayHandler}>
					{isPaused
						? millisecondsElapsed === 0
							? "Start"
							: "Resume"
						: "Pause"}
				</Button>
				<Button fullWidth variant="outlined" onClick={addLapHandler}>
					Lap
				</Button>
				<Button fullWidth variant="outlined" onClick={resetHandler}>
					Reset
				</Button>
			</Box>

			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<FormLabel>Laps:</FormLabel>
				<Card elevation={6} sx={{ marginBottom: "1rem" }}>
					{laps.map((lap, index) => {
						return (
							<ListItem key={`lap_${index}`}>
								<ListItemText
									primary={`Lap ${
										index + 1
									} - ${convertMillisecondsToTimerString(lap)}`}
								/>
							</ListItem>
						);
					})}
					{laps.length === 0 && (
						<ListItem>
							<ListItemText primary="No laps recorded..." />
						</ListItem>
					)}
				</Card>
			</Box>
		</>
	);
};

export default Stopwatch;
