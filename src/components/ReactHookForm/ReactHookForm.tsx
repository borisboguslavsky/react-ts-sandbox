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
} from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";

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

export const ReactHookForm = () => {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: defaultFormValues,
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
        <Controller
          name="firstName"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="First Name"
              value={value}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
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
            />
          )}
        />

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
                  return <Chip variant={"filled"} label={option} {...getTagProps({ index })} />;
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
                defaultValue="2"
                onChange={() => {}}
                name="radio-buttons-group"
                row
              >
                <FormControlLabel value="1" control={<Radio />} label="Option 1" />
                <FormControlLabel value="2" control={<Radio />} label="Option 2" />
                <FormControlLabel value="3" control={<Radio />} label="Option 3" />
              </RadioGroup>
            </>
          )}
        />

        <Box sx={{ display: "flex", gap: "0.5rem", justifyContent: "space-between" }}>
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
            Defaults
          </Button>
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormLabel>Submitted Data:</FormLabel>
          <TextareaAutosize
            aria-label={"Output"}
            readOnly={true}
            value={submittedFormData ? JSON.stringify(submittedFormData, null, 2) : ""}
            minRows={4}
            style={{ padding: "8px" }}
          />
        </Box>
      </Box>
    </form>
  );
};

export default ReactHookForm;
