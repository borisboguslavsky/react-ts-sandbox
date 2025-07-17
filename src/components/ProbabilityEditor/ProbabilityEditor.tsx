import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import CurveVisualizer from "./CurveVisualizer";

export enum Mode {
  Flat = "Flat",
  Bell = "Bell",
  BiasMin = "Bias Min",
  BiasMax = "Bias Max",
}

const ProbabilityEditor = () => {
  const [mode, setMode] = useState<Mode>(Mode.Flat);

  return (
    <Box>
      <CurveVisualizer
        mode={mode}
        params={{
          apexPosition: 50,
          slope: 50,
          dropPosition: 50,
          ascentPosition: 50,
        }}
      />
      <ToggleButtonGroup
        value={mode}
        exclusive
        fullWidth
        size="small"
        onChange={(_event, newArg) => {
          setMode(newArg);
        }}
      >
        {Object.values(Mode).map((modeValue) => (
          <ToggleButton key={modeValue} value={modeValue}>
            {modeValue}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default ProbabilityEditor;
