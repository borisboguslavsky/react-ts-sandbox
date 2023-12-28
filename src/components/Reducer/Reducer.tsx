import { Button, Card, FormControlLabel, TextField, Typography, Checkbox } from "@mui/material";
import { Box } from "@mui/system";
import React, { useReducer } from "react";

interface ReducerState {
  field1: string;
  field2: string;
  field3: string;
  allFieldsPopulated: boolean;
}

type ReducerTypes = "CHANGE" | "REVERSE" | "UPPER" | "LOWER" | "RESET";

interface RedcuerAction {
  type: ReducerTypes;
  field?: string;
  value?: string;
}

const reducerFunction = (state: ReducerState, action: RedcuerAction) => {
  if (action.type === "CHANGE") {
    let newState: ReducerState = {
      ...state,
      allFieldsPopulated: true,
      [action.field as keyof ReducerState]: action.value,
    };
    Object.keys(newState).forEach((key) => {
      if (newState[key as keyof ReducerState] === "") {
        newState.allFieldsPopulated = false;
      }
    });
    return newState;
  }
  if (action.type === "REVERSE") {
    return {
      field1: state.field1.split("").reverse().join(""),
      field2: state.field2.split("").reverse().join(""),
      field3: state.field3.split("").reverse().join(""),
      allFieldsPopulated: state.allFieldsPopulated,
    };
  }
  if (action.type === "UPPER") {
    return {
      field1: state.field1.toUpperCase(),
      field2: state.field2.toUpperCase(),
      field3: state.field3.toUpperCase(),
      allFieldsPopulated: state.allFieldsPopulated,
    };
  }
  if (action.type === "LOWER") {
    return {
      field1: state.field1.toLowerCase(),
      field2: state.field2.toLowerCase(),
      field3: state.field3.toLowerCase(),
      allFieldsPopulated: state.allFieldsPopulated,
    };
  }
  if (action.type === "RESET") {
    return {
      field1: "it's rough",
      field2: "it's coarse",
      field3: "and it gets everywhere",
      allFieldsPopulated: true,
    };
  }
  return state;
};

const ReducerExample = () => {
  // Using useReducer()
  // const [state, dispatchFn] = useReducer(reducerFn, initialState, initialFn)
  const initialState: ReducerState = {
    field1: "it's rough",
    field2: "it's coarse",
    field3: "and it gets everywhere",
    allFieldsPopulated: true,
  };
  const [formState, dispatchForm] = useReducer(reducerFunction, initialState, undefined);

  const submitHandler = (e: React.FormEvent, type: ReducerTypes) => {
    e.preventDefault();
    dispatchForm({ type: type });
  };

  const changeHandler = (e: any) => {
    // console.log((e.target as HTMLInputElement).id)
    let field = (e.target as HTMLInputElement).id;
    let value = (e.target as HTMLInputElement).value;
    dispatchForm({ type: "CHANGE", field: field, value: value });
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          label="Field 1"
          InputLabelProps={{ shrink: true }}
          id="field1"
          value={formState.field1}
          onChange={changeHandler}
        />
        <TextField
          label="Field 1"
          InputLabelProps={{ shrink: true }}
          id="field2"
          value={formState.field2}
          onChange={changeHandler}
        />
        <TextField
          label="Field 1"
          InputLabelProps={{ shrink: true }}
          id="field3"
          value={formState.field3}
          onChange={changeHandler}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "0.5rem", "& > button": { flexGrow: 1, flexBasis: 0 } }}>
        <Button variant="outlined" onClick={(e) => submitHandler(e, "REVERSE")}>
          Reverse
        </Button>
        <Button variant="outlined" onClick={(e) => submitHandler(e, "UPPER")}>
          Uppercase
        </Button>
        <Button variant="outlined" onClick={(e) => submitHandler(e, "LOWER")}>
          Lowercase
        </Button>
      </Box>
      <Button variant="contained" onClick={(e) => submitHandler(e, "RESET")}>
        Reset
      </Button>
      <Card
        elevation={2}
        sx={{
          padding: "0.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>All fields populated:</Typography>
        <FormControlLabel
          control={
            <Checkbox sx={{ pointerEvents: "none" }} checked={formState.allFieldsPopulated} />
          }
          label={formState.allFieldsPopulated.toString()}
        />
      </Card>
    </>
  );
};

export default ReducerExample;
