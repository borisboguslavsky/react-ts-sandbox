import { Box, FormLabel, Grid, Slider, TextField, TextFieldProps } from "@mui/material";

const SHARED_PROPS: Partial<TextFieldProps> = {
  type: "number",
  size: "small",
  fullWidth: true,
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
      <Grid container spacing={1}>
        <Grid item sm={4} md={4} lg={4} xs={4}>
          <TextField
            label="Min"
            {...SHARED_PROPS}
            value={params.min}
            onChange={(e) => setParams({ ...params, min: Number(e.target.value) })}
          />
        </Grid>
        <Grid item sm={4} md={4} lg={4} xs={4}>
          <TextField
            label="Max"
            {...SHARED_PROPS}
            value={params.max}
            onChange={(e) => setParams({ ...params, max: Number(e.target.value) })}
          />
        </Grid>
        <Grid item sm={4} md={4} lg={4} xs={4}>
          <TextField
            label="Step"
            {...SHARED_PROPS}
            value={params.step}
            onChange={(e) => setParams({ ...params, step: Number(e.target.value) })}
          />
        </Grid>
        <Grid item sm={4} md={4} lg={4} xs={4}>
          <FormLabel sx={{ textAlign: "left", minWidth: "35%" }} htmlFor="bell_bias_slider">
            Bias:
          </FormLabel>
        </Grid>
        <Grid item sm={8} md={8} lg={8} xs={8}>
          <Slider
            id="bell_bias_slider"
            value={params.bias}
            onChange={(_, value) => setParams({ ...params, bias: Number(value) })}
            getAriaValueText={(value: number) => `${value}`}
            step={0.01}
            min={0}
            max={1}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item sm={4} md={4} lg={4} xs={4}>
          <FormLabel sx={{ textAlign: "left", minWidth: "35%" }} htmlFor="bell_width_slider">
            Dev:
          </FormLabel>
        </Grid>
        <Grid item sm={8} md={8} lg={8} xs={8}>
          <Slider
            id="bell_width_slider"
            value={params.width}
            onChange={(_, value) => setParams({ ...params, width: Number(value) })}
            getAriaValueText={(value: number) => `${value}`}
            step={0.1}
            min={1}
            max={25}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>
    </>
  );
};
