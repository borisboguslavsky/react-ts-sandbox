import { Box, Button, Grid, TextField, Typography, ButtonProps } from "@mui/material";
import { useState } from "react";

interface CalcButtonProps extends ButtonProps {
  text: string;
  wide?: boolean;
}

const CalcButton = ({ text, wide, ...rest }: CalcButtonProps) => {
  const span = wide ? 6 : 3;
  return (
    <Grid
      item
      xs={span}
      sm={span}
      md={span}
      lg={span}
      xl={span}
      sx={{
        display: "flex",
        alignItems: "stretch",
        "& > button": {
          p: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          // make operator buttons have larger font size
          fontSize: [".", "±", "÷", "×", "−", "+", "="].includes(text) ? "1.4rem" : "1.125rem",
        },
      }}
    >
      <Button variant="outlined" {...rest}>
        {text}
      </Button>
    </Grid>
  );
};

const Calculator = () => {
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [inDecimalMode, setInDecimalMode] = useState<boolean>(false);
  const [value, setValue] = useState<number | null>(0);
  const [operator, setOperator] = useState<"*" | "/" | "+" | "-" | null>(null);

  const handleInput = (input: string) => {
    if (input === "CLEAR") {
      setPrevValue(null);
      setValue(0);
      setOperator(null);
      setInDecimalMode(false);
    }

    if (input === "DELETE") {
      setValue((curVal) => {
        if (!curVal) return null;
        let str = curVal.toString().slice(0, -1);
        if (str[str.length - 1] === ".") str = str.slice(0, -1);
        if (str === "") return 0;
        return Number(str);
      });
      setOperator(null);
    }

    if (input === "NEGATIVE") {
      if (!value || value === 0) return;
      setValue(value * -1);
    }

    if (input === "DIVIDE") {
      setPrevValue(value);
      setInDecimalMode(false);
      setValue(null);
      setOperator("/");
    }

    if (input === "MULTIPLY") {
      setPrevValue(value);
      setInDecimalMode(false);
      setValue(null);
      setOperator("*");
    }

    if (input === "SUBTRACT") {
      setPrevValue(value);
      setInDecimalMode(false);
      setValue(null);
      setOperator("-");
    }

    if (input === "ADD") {
      setPrevValue(value);
      setInDecimalMode(false);
      setValue(null);
      setOperator("+");
    }

    if (input === "DECIMAL") {
      setInDecimalMode(true);
    }

    if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(input))) {
      if (!inDecimalMode) {
        setValue((curVal) => {
          if (!curVal) return Number(input);
          return Number(curVal.toString() + input);
        });
      } else {
        setValue((curVal) => {
          if (!curVal) return Number("0." + input);
          const valString = curVal.toString().includes(".")
            ? curVal.toString() + input
            : curVal.toString() + "." + input;
          return Number(valString);
        });
      }
    }

    if (input === "EQUAL") {
      if (!operator || !prevValue || !value) return;
      let newValue = 0;
      if (operator === "*") newValue = prevValue * value;
      if (operator === "/") newValue = prevValue / value;
      if (operator === "+") newValue = prevValue + value;
      if (operator === "-") newValue = prevValue - value;
      setValue(newValue);
      setInDecimalMode(false);
      setOperator(null);
    }
  };

  return (
    <Box>
      <TextField
        value={value}
        InputProps={{ readOnly: true }}
        sx={{
          mb: 2,
          width: "100%",
          "& input": {
            fontSize: "1.5rem",
          },
        }}
      />
      <Grid container rowSpacing={1} columnSpacing={1}>
        <CalcButton onClick={() => handleInput("CLEAR")} text="C" />
        <CalcButton onClick={() => handleInput("DELETE")} text="DEL" />
        <CalcButton onClick={() => handleInput("NEGATIVE")} text="±" />
        <CalcButton onClick={() => handleInput("DIVIDE")} text="÷" />

        <CalcButton onClick={() => handleInput("7")} text="7" />
        <CalcButton onClick={() => handleInput("8")} text="8" />
        <CalcButton onClick={() => handleInput("9")} text="9" />
        <CalcButton onClick={() => handleInput("MULTIPLY")} text="×" />

        <CalcButton onClick={() => handleInput("4")} text="4" />
        <CalcButton onClick={() => handleInput("5")} text="5" />
        <CalcButton onClick={() => handleInput("6")} text="6" />
        <CalcButton onClick={() => handleInput("SUBTRACT")} text="−" />

        <CalcButton onClick={() => handleInput("1")} text="1" />
        <CalcButton onClick={() => handleInput("2")} text="2" />
        <CalcButton onClick={() => handleInput("3")} text="3" />
        <CalcButton onClick={() => handleInput("ADD")} text="+" />

        <CalcButton onClick={() => handleInput("0")} text="0" wide />
        <CalcButton onClick={() => handleInput("DECIMAL")} text="." />
        <CalcButton onClick={() => handleInput("EQUAL")} text="=" variant="contained" />
      </Grid>
    </Box>
  );
};

export default Calculator;
