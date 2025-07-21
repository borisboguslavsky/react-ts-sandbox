import { Box, TextField, TextFieldProps } from "@mui/material";

const SHARED_PROPS: Partial<TextFieldProps> = {
  type: "number",
  InputLabelProps: { shrink: true },
};

export type FlatProbabilityParams = {
  min: number;
  max: number;
  step: number;
  bias: number; // 0 to 1
};

export const Parameters_Flat = ({
  params,
  setParams,
}: {
  params: FlatProbabilityParams;
  setParams: React.Dispatch<React.SetStateAction<FlatProbabilityParams>>;
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
      </Box>
    </>
  );
};
