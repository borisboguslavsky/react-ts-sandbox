import Box from "@mui/material/Box";
import { DistributionType } from "../ProbabilityEditor";

import rngBell from "../util/rngBell";
import generateBuckets from "../util/generateBuckets";
import rngFlat from "../util/rngFlat";
import { BellProbabilityParams } from "./Parameters_Bell";
import { FlatProbabilityParams } from "./Parameters_Flat";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

export const SampleGenerator = ({
  mode,
  flatParams,
  bellParams,
  sampleNumber,
  setSampleNumber,
  buckets,
  setBuckets,
}: {
  mode: DistributionType;
  flatParams: FlatProbabilityParams;
  bellParams: BellProbabilityParams;
  sampleNumber: number;
  setSampleNumber: React.Dispatch<React.SetStateAction<number>>;
  buckets: number[];
  setBuckets: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const generateSampleSet = () => {
    if (mode === DistributionType.Normal) {
      const newNumbers = Array.from({ length: sampleNumber }, () =>
        rngBell(bellParams.min, bellParams.max, bellParams.step, bellParams.bias, bellParams.width)
      );
      const buckets = generateBuckets(newNumbers, bellParams.min, bellParams.max, bellParams.step);
      setBuckets(buckets);
      return;
    }
    if (mode === DistributionType.Flat) {
      const newNumbers = Array.from({ length: sampleNumber }, () =>
        rngFlat(flatParams.min, flatParams.max, flatParams.step, flatParams.bias)
      );
      const buckets = generateBuckets(newNumbers, flatParams.min, flatParams.max, flatParams.step);
      setBuckets(buckets);
      return;
    }
  };

  const clearSampleSet = () => {
    setBuckets([]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        p: 1,
        pt: 2,
      }}
    >
      <TextField
        label="Samples"
        type="number"
        value={sampleNumber}
        onChange={(e) => setSampleNumber(Number(e.target.value))}
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: 1, step: 1, max: 250000 }}
        size="small"
      />
      <Box
        sx={{
          display: "flex",
          gap: 1,
          ml: "auto",
        }}
      >
        <Button
          sx={{
            textTransform: "none",
          }}
          variant="outlined"
          size="small"
          onClick={clearSampleSet}
        >
          Clear
        </Button>
        <Button
          sx={{
            textTransform: "none",
          }}
          variant="contained"
          size="small"
          onClick={generateSampleSet}
        >
          Generate
        </Button>
      </Box>
    </Box>
  );
};
