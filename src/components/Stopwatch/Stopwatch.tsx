import { useEffect, useMemo, useState } from "react";
import { Button, Typography, Box, Card, ListItem, ListItemText, FormLabel } from "@mui/material";

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
    }, 10);
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
        <Button fullWidth variant="outlined" onClick={addLapHandler}>
          Lap
        </Button>
        <Button fullWidth variant="outlined" onClick={resetHandler}>
          Reset
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormLabel>Laps:</FormLabel>
        <Card elevation={2} sx={{ py: "6px", mt: "6px" }}>
          {laps.map((lap, index) => {
            return (
              <ListItem key={`lap_${index}`}>
                <ListItemText
                  primary={`Lap ${index + 1} - ${convertMillisecondsToTimerString(lap)}`}
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
