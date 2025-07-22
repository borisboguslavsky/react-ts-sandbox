import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Curve } from "./components/Curve";
import { BarGraph } from "./components/BarGraph";
import { BellProbabilityParams, Parameters_Bell } from "./components/Parameters_Bell";
import { FlatProbabilityParams, Parameters_Flat } from "./components/Parameters_Flat";
import { SampleGenerator } from "./components/SampleGenerator";

export enum DistributionType {
  Flat = "Flat",
  Normal = "Normal",
}

const ProbabilityEditor = () => {
  const [mode, setMode] = useState<DistributionType>(DistributionType.Normal);
  const [sampleNumber, setSampleNumber] = useState(100000);
  const [buckets, setBuckets] = useState<number[]>([]);
  const [flatParams, setFlatParams] = useState<FlatProbabilityParams>({
    min: 0,
    max: 100,
    step: 1,
    bias: 1,
  });
  const [bellParams, setBellParams] = useState<BellProbabilityParams>({
    min: 0,
    max: 100,
    step: 1,
    bias: 0.5,
    width: 5,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ToggleButtonGroup
        value={mode}
        exclusive
        fullWidth
        size="small"
        onChange={(_event, newArg) => {
          setBuckets([]);
          setMode(newArg);
        }}
      >
        {Object.values(DistributionType).map((modeValue) => (
          <ToggleButton key={modeValue} value={modeValue}>
            {modeValue}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Box
        sx={{
          my: 2,
          border: "1px solid rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
          borderRadius: "4px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "150px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.25)",
          }}
        >
          <BarGraph buckets={buckets} />
          <Curve mode={mode} flatParams={flatParams} bellParams={bellParams} />
        </Box>

        <SampleGenerator
          mode={mode}
          flatParams={flatParams}
          bellParams={bellParams}
          buckets={buckets}
          setBuckets={setBuckets}
          sampleNumber={sampleNumber}
          setSampleNumber={setSampleNumber}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          border: "1px solid rgba(0, 0, 0, 0.25)",
          borderRadius: "4px",
          p: 1,
        }}
      >
        <Typography variant="caption">RNG Parameters</Typography>
        {mode === DistributionType.Flat && (
          <Parameters_Flat params={flatParams} setParams={setFlatParams} />
        )}
        {mode === DistributionType.Normal && (
          <Parameters_Bell params={bellParams} setParams={setBellParams} />
        )}
      </Box>
    </Box>
  );
};

export default ProbabilityEditor;
