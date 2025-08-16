import {
  TextField,
  Autocomplete,
  Checkbox,
  Button,
  Box,
  Chip,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  TextareaAutosize,
  Stack,
} from "@mui/material";
import React from "react";
import { useForm, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormValues {
  firstName: string;
  lastName: string;
  autocomplete: string[];
  radioGroup: string;
}

const emptyFormValues = {
  firstName: "",
  lastName: "",
  autocomplete: [],
  radioGroup: "",
};

const defaultFormValues = {
  firstName: "Someone",
  lastName: "Someonerson",
  autocomplete: ["A", "B"],
  radioGroup: "Option 2",
};

// Define validation schema using Yup
const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  autocomplete: yup.array().of(yup.string().default("")).default([]).required(),
  radioGroup: yup.string().default("").required(),
});

export const ReactHookForm = () => {
  const formResolver: Resolver<FormValues> = yupResolver(validationSchema);

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: defaultFormValues,
    resolver: formResolver,
  });

  const [submittedFormData, setSubmittedFormData] = React.useState<FormValues>();

  const onSubmitFormHandler = (data: any) => {
    setSubmittedFormData(data);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitFormHandler)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Stack direction="row" spacing={1}>
          <Controller
            name="firstName"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="First Name"
                value={value}
                onChange={onChange}
                InputLabelProps={{ shrink: true }}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Last Name"
                value={value}
                onChange={onChange}
                InputLabelProps={{ shrink: true }}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
        </Stack>

        <Controller
          name="autocomplete"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Autocomplete
              multiple
              disablePortal
              autoHighlight
              options={["A", "B", "C"]}
              value={value}
              onChange={(event, newValue) => {
                onChange(newValue);
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    InputLabelProps={{ shrink: true }}
                    label="Autocomplete"
                    placeholder={"Select Values..."}
                  />
                );
              }}
              renderTags={(value: readonly string[], getTagProps) => {
                return value.map((option: string, index: number) => {
                  const { key, ...otherChipProps } = getTagProps({ index });
                  return <Chip variant={"filled"} label={option} key={key} {...otherChipProps} />;
                });
              }}
              renderOption={(props, option, state) => {
                return (
                  <li {...props}>
                    <Checkbox checked={state.selected} />
                    {option}
                  </li>
                );
              }}
            />
          )}
        />
        <Controller
          name="radioGroup"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="A"
                onChange={(_, newVal) => onChange(newVal)}
                name="radio-buttons-group"
                row
              >
                <FormControlLabel value="A" control={<Radio />} label="Option A" />
                <FormControlLabel value="B" control={<Radio />} label="Option B" />
              </RadioGroup>
            </>
          )}
        />

        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 1, justifyContent: "space-between" }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setSubmittedFormData(undefined);
                reset(emptyFormValues);
              }}
            >
              Clear
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setSubmittedFormData(undefined);
                reset(defaultFormValues);
              }}
            >
              Reset
            </Button>
            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormLabel>Submitted Data:</FormLabel>
          <TextareaAutosize
            aria-label={"Output"}
            readOnly={true}
            value={submittedFormData ? JSON.stringify(submittedFormData, null, 2) : ""}
            minRows={9}
            style={{ padding: "8px" }}
          />
        </Box>
      </Box>
    </form>
  );
};

export default ReactHookForm;
