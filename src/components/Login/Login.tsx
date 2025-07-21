import React, { useState } from "react";

import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import { TextareaAutosize } from "@mui/material";

const Login = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [output, setOutput] = useState("");

  const emailIsValid = emailValue.includes("@");
  const passwordIsValid = passwordValue.length > 4;

  const randInt = (a: number, b: number): number => {
    let min = a;
    let max = b;
    if (a > b) {
      min = b;
      max = a;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailIsValid || !passwordIsValid) {
      setOutput(
        'Form invalid. Email must contain an "@" character, and password must be > 4 chars.'
      );
      return;
    }
    console.log(emailValue, passwordValue);
    let user = randInt(1, 10);
    setOutput("Loading...");
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${user}`);
      const data = await response.json();
      console.log(data);
      setOutput(JSON.stringify(data, null, 2));
    } catch (err) {
      console.log(err);
      setOutput("Error with API response...");
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Email"
            InputLabelProps={{ shrink: true }}
            id="emailField"
            type="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            required
          />
          <TextField
            label="Password"
            InputLabelProps={{ shrink: true }}
            id="passwordField"
            type="password"
            autoComplete="current-password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            required
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormLabel>Response:</FormLabel>
        <TextareaAutosize
          aria-label={"Output"}
          readOnly={true}
          value={output ? output : ""}
          minRows={7}
          style={{ padding: "8px" }}
        />
      </Box>
    </>
  );
};

export default Login;
