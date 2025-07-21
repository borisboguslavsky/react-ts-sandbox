import { Box, TextField, TextFieldProps } from "@mui/material";

const SHARED_PROPS: Partial<TextFieldProps> = {
  type: "number",
  InputLabelProps: { shrink: true },
};

export type BellProbabilityParams = {
  min: number;
  max: number;
  step: number;
  bias: number; // 0 to 1
  width: number; // standard deviation
};

export const Parameters_Bell = ({
  params,
  setParams,
}: {
  params: BellProbabilityParams;
  setParams: React.Dispatch<React.SetStateAction<BellProbabilityParams>>;
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          "& > *": { flex: 1 },
        }}
      >
        <TextField
          label="Min"
          {...SHARED_PROPS}
          value={params.min}
          onChange={(e) => setParams({ ...params, min: Number(e.target.value) })}
        />
        <TextField
          label="Max"
          {...SHARED_PROPS}
          value={params.max}
          onChange={(e) => setParams({ ...params, max: Number(e.target.value) })}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          "& > *": { flex: 1 },
        }}
      >
        <TextField
          label="Step"
          {...SHARED_PROPS}
          value={params.step}
          onChange={(e) => setParams({ ...params, step: Number(e.target.value) })}
        />
        <TextField
          label="Bias"
          {...SHARED_PROPS}
          value={params.bias}
          inputProps={{ min: 0, max: 1, step: 0.1 }}
          onChange={(e) => setParams({ ...params, bias: Number(e.target.value) })}
        />
        <TextField
          label="Width"
          {...SHARED_PROPS}
          value={params.width}
          inputProps={{ min: 0, max: 150, step: 1 }}
          onChange={(e) => setParams({ ...params, width: Number(e.target.value) })}
        />
      </Box>
    </>
  );
};
