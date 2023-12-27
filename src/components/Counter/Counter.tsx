import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useRef } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const incrementHandler = () => {
    let current = inputRef.current as HTMLInputElement;
    if (current.value !== "") setCount((count) => count + parseInt(current.value));
  };

  const decrementHandler = () => {
    let current = inputRef.current as HTMLInputElement;
    if (current.value !== "") setCount((count) => count - parseInt(current.value));
  };

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2" textAlign={"center"} lineHeight={1}>
          {count}
        </Typography>
      </Box>
      <TextField
        label="Amount:"
        InputLabelProps={{ shrink: true }}
        id="incrementDecrementInput"
        type="number"
        inputRef={inputRef}
        defaultValue={1}
      />
      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        <Button variant="outlined" fullWidth onClick={incrementHandler}>
          Increment
        </Button>
        <Button variant="outlined" fullWidth onClick={decrementHandler}>
          Decrement
        </Button>
        <Button variant="outlined" fullWidth onClick={() => setCount(0)}>
          Reset
        </Button>
      </Box>
    </>
  );
};

export default Counter;
