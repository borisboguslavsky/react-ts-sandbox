import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Typography,
  Box,
  Card,
  ListItem,
  ListItemText,
  FormLabel,
  List,
} from "@mui/material";

const Stopwatch = () => {
  const [isPaused, setIsPaused] = useState(true);
  // Current milliseconds at the last pause. Used to accurately restart the stopwatch on resume.
  const [pausedTime, setPausedTime] = useState(0);
  // Total number of milliseconds elapsed for the whole stopwatch
  const [millisecondsElapsed, setMillisecondsElapsed] = useState(0);

  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    if (isPaused) {
      setPausedTime(millisecondsElapsed);
      return;
    }
    let startTimestamp = Date.now();
    const timer = setInterval(() => {
      const msElapsedSinceStart = Date.now() + pausedTime - startTimestamp;
      setMillisecondsElapsed(msElapsedSinceStart);
    }, 33);
    return () => {
      clearInterval(timer);
    };
  }, [isPaused]);

  const pausePlayHandler = () => {
    setIsPaused((bool) => !bool);
  };

  const convertMillisecondsToTimerString = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const remainingMs = milliseconds % 1000;

    const paddedHours = hours.toString().padStart(2, "0");
    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = seconds.toString().padStart(2, "0");
    const paddedMilliseconds = remainingMs.toString().padStart(3, "0");

    const formattedTime = `${hours > 0 ? paddedHours + ":" : ""}${
      minutes > 0 ? paddedMinutes + ":" : ""
    }${paddedSeconds}.${paddedMilliseconds}`;
    return formattedTime;
  };

  const resetHandler = () => {
    setIsPaused(true);
    setMillisecondsElapsed(0);
    setLaps([]);
  };

  const addLapHandler = () => {
    setIsPaused(false);
    setMillisecondsElapsed(0);
    setPausedTime(0);
    setLaps((laps) => [...laps, millisecondsElapsed]);
  };

  return (
    <>
      <Typography variant="h2" textAlign={"center"} lineHeight={1}>
        {convertMillisecondsToTimerString(millisecondsElapsed)}
      </Typography>

      <Box style={{ display: "flex", gap: "0.25rem" }}>
        <Button fullWidth variant="outlined" onClick={pausePlayHandler}>
          {isPaused ? (millisecondsElapsed === 0 ? "Start" : "Resume") : "Pause"}
        </Button>
        <Button
          disabled={millisecondsElapsed === 0 || isPaused}
          fullWidth
          variant="outlined"
          onClick={addLapHandler}
        >
          Lap
        </Button>
        <Button
          disabled={millisecondsElapsed === 0}
          fullWidth
          variant="outlined"
          onClick={resetHandler}
        >
          Reset
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormLabel>Laps:</FormLabel>
        <Card
          elevation={2}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            "& > *": {
              m: 0,
              p: 0,
              width: "100%",
            },
            "& ol": {
              listStyle: "none",
              counterReset: "item",
              "& li": {
                counterIncrement: "item",
                "&:before": {
                  content: "counter(item)",
                  mr: 1,
                  opacity: 0.5,
                },
                "& span:nth-of-type(2)": {
                  opacity: 0.5,
                },
              },
            },
          }}
        >
          {laps.length > 0 && (
            <ol>
              {laps.map((lap, index) => {
                return (
                  <li key={`lap_${index}`}>
                    <span>{convertMillisecondsToTimerString(lap)} </span>
                    {index > 0 && (
                      <span>
                        (+{convertMillisecondsToTimerString(laps[index] - laps[index - 1])})
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
          {laps.length === 0 && <Typography>No laps recorded...</Typography>}
        </Card>
      </Box>
    </>
  );
};

export default Stopwatch;
