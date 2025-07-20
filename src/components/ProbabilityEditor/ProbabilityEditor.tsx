import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import Curve from "./components/Curve";
import { BarGraph } from "./components/BarGraph";
import { InputsBell, InputsFlat } from "./components/Inputs";

export enum DistributionType {
  Flat = "Flat",
  Bell = "Bell",
}

export type FlatProbabilityParams = {
  min: number;
  max: number;
  step: number;
  bias: number; // 0 to 1
};

export type BellProbabilityParams = {
  min: number;
  max: number;
  step: number;
  bias: number; // 0 to 1
  width: number; // standard deviation
};

const ProbabilityEditor = () => {
  const [mode, setMode] = useState<DistributionType>(DistributionType.Flat);
  const [flatParams, setFlatParams] = useState<FlatProbabilityParams>({
    min: 0,
    max: 100,
    step: 1,
    bias: 0.5,
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
        gap: 2,
      }}
    >
      <ToggleButtonGroup
        value={mode}
        exclusive
        fullWidth
        size="small"
        onChange={(_event, newArg) => {
          setMode(newArg);
        }}
      >
        {Object.values(DistributionType).map((modeValue) => (
          <ToggleButton key={modeValue} value={modeValue}>
            {modeValue}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Box sx={{ position: "relative", width: "100%", height: "150px" }}>
        <BarGraph mode={mode} flatParams={flatParams} bellParams={bellParams} />
        <Curve mode={mode} flatParams={flatParams} bellParams={bellParams} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {mode === DistributionType.Flat && (
          <InputsFlat params={flatParams} setParams={setFlatParams} />
        )}
        {mode === DistributionType.Bell && (
          <InputsBell params={bellParams} setParams={setBellParams} />
        )}
      </Box>
    </Box>
  );
};

export default ProbabilityEditor;
