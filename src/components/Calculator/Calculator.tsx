import { Box, Button, Grid, TextField, ButtonProps } from "@mui/material";
import { useState } from "react";

/**
 * Strips all '.' characters from the input string except for the first one.
 */
const stripDotsAfterFirst = (input: string) => {
  const dotIndex = input.indexOf(".");

  if (dotIndex !== -1) {
    const firstPart = input.substring(0, dotIndex + 1); // Include the first '.' in the substring
    const restOfString = input.substring(dotIndex + 1).replace(/\./g, ""); // Remove '.' from the rest of the string

    return firstPart + restOfString;
  }

  return input; // If no '.' is found, return the original string
};

const convertValueToDisplayString = (value: number | null, inDecimalMode: boolean) => {
  if (value === null) return "";
  return stripDotsAfterFirst(`${value}${inDecimalMode ? "." : ""}`);
};

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
  const [operationString, setOperationString] = useState<string | null>(null);
  const [inDecimalMode, setInDecimalMode] = useState<boolean>(false);
  const [value, setValue] = useState<number | null>(0);
  const [operator, setOperator] = useState<"*" | "/" | "+" | "-" | null>(null);

  const handleInput = (input: string) => {
    if (input === "CLEAR") {
      setPrevValue(null);
      setOperationString(null);
      setValue(null);
      setOperator(null);
      setInDecimalMode(false);
    }

    if (input === "DELETE") {
      setValue((curVal) => {
        if (!curVal) return null;
        let str = curVal.toString().slice(0, -1);
        if (str[str.length - 1] === ".") {
          setInDecimalMode(false);
        }
        if (str === "") {
          setInDecimalMode(false);
          return null;
        }
        return Number(str);
      });
      setOperator(null);
    }

    if (input === "NEGATIVE") {
      if (!value || value === 0) return;
      setValue(value * -1);
    }

    if (input === "DIVIDE") {
      if (!value) return;
      setPrevValue(value);
      setOperationString(`${value} /`);
      setInDecimalMode(false);
      setValue(null);
      setOperator("/");
    }

    if (input === "MULTIPLY") {
      if (!value) return;
      setPrevValue(value);
      setOperationString(`${value} ×`);
      setInDecimalMode(false);
      setValue(null);
      setOperator("*");
    }

    if (input === "SUBTRACT") {
      if (!value) return;
      setPrevValue(value);
      setOperationString(`${value} -`);
      setInDecimalMode(false);
      setValue(null);
      setOperator("-");
    }

    if (input === "ADD") {
      if (!value) return;
      setPrevValue(value);
      setOperationString(`${value} +`);
      setInDecimalMode(false);
      setValue(null);
      setOperator("+");
    }

    if (input === "DECIMAL") {
      if (!value) setValue(0);
      setInDecimalMode(true);
    }

    if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(input))) {
      if (!inDecimalMode) {
        setValue((curVal) => {
          if (!curVal) return parseInt(input);
          return parseInt(curVal.toString() + input);
        });
      } else {
        // TODO: leading zeroes in decimal don't work with this
        setValue((curVal) => {
          if (!curVal) return parseFloat("0." + input);
          const valString = curVal.toString().includes(".")
            ? curVal.toString() + input
            : curVal.toString() + "." + input;
          return parseFloat(valString);
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
      newValue = newValue % 1 ? newValue : Number(newValue.toFixed(6).toString());
      setValue(newValue);
      setOperationString(`${prevValue} ${operator} ${value} =`);
      setInDecimalMode(false);
      setOperator(null);
    }
  };

  const stringifiedValue = convertValueToDisplayString(value, inDecimalMode);

  return (
    <Box>
      <div style={{ width: "100%", minHeight: "24px", opacity: 0.5 }}>{operationString}</div>
      <TextField
        value={stringifiedValue}
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
