import { useEffect, useMemo, useState } from "react";
import { Button, Typography, Box, Card, FormLabel } from "@mui/material";
import React from "react";

const convertMillisecondsToTimerString = (
  milliseconds: number,
  options?: {
    showHours?: boolean;
    showMinutes?: boolean;
  }
) => {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const remainingMs = milliseconds % 1000;

  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = seconds.toString().padStart(2, "0");
  const paddedMilliseconds = remainingMs.toString().padStart(3, "0");

  const showHours = options?.showHours ?? hours > 0;
  const showMinutes = options?.showMinutes ?? minutes > 0;

  const formattedTime = `${showHours ? paddedHours + ":" : ""}${
    showMinutes ? paddedMinutes + ":" : ""
  }${paddedSeconds}.${paddedMilliseconds}`;
  return formattedTime;
};

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

  const resetHandler = () => {
    setIsPaused(true);
    setMillisecondsElapsed(0);
    setPausedTime(0);
    setLaps([]);
  };

  const addLapHandler = () => {
    setLaps((laps) => [...laps, millisecondsElapsed]);
  };

  return (
    <>
      <Typography variant="h2" textAlign={"center"} lineHeight={1} marginBottom={1}>
        {convertMillisecondsToTimerString(millisecondsElapsed)}
      </Typography>

      <Box sx={{ display: "flex", gap: 1 }}>
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

      {laps.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Card
            elevation={2}
            sx={{
              py: 2,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              columnGap: 1,
              "& > p": {
                m: 0,
                textAlign: "center",
                "&.lap_table_header": {
                  fontWeight: "bold",
                  mb: 1,
                },
              },
            }}
          >
            <React.Fragment>
              <p className={"lap_index lap_table_header"}>Lap</p>
              <p className={"lap_time lap_table_header"}>Lap Time</p>
              <p className={"overall_time lap_table_header"}>Overall</p>
            </React.Fragment>
            {laps.map((lap, index) => {
              return (
                <React.Fragment key={`lap_${index}`}>
                  <p className={"lap_index"}>{index}</p>
                  <p className={"lap_time"}>
                    {convertMillisecondsToTimerString(
                      index === 0 ? lap : laps[index] - laps[index - 1]
                    )}
                  </p>
                  {index > 0 ? (
                    <p className={"overall_time"}>{convertMillisecondsToTimerString(lap)}</p>
                  ) : (
                    <p className={"overall_time"}>{convertMillisecondsToTimerString(lap)}</p>
                  )}
                </React.Fragment>
              );
            })}
          </Card>
        </Box>
      )}
    </>
  );
};

export default Stopwatch;
