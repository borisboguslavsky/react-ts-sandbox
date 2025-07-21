import { Button, Card, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import ResetButton from "./ResetButton";
import { AppContext } from "../ReactUseContext";

const NestedComponent = () => {
  const appCtx = useContext(AppContext);

  const incrementNumbers = () => {
    appCtx.setTimesIncremented((cur) => cur + 1);
    appCtx.setData((currentData) => {
      return currentData.map((num, index) => {
        return num + 1;
      });
    });
  };

  const decrementNumbers = () => {
    appCtx.setTimesDecremented((cur) => cur + 1);
    appCtx.setData((currentData) => {
      return currentData.map((num, index) => {
        return num - 1;
      });
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        <TextField
          fullWidth
          label="Times Incremented:"
          type="number"
          InputLabelProps={{ shrink: true }}
          value={appCtx.timesIncremented}
          sx={{ pointerEvents: "none" }}
          inputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          label="Times Decremented:"
          type="number"
          InputLabelProps={{ shrink: true }}
          value={appCtx.timesDecremented}
          sx={{ pointerEvents: "none" }}
          inputProps={{ readOnly: true }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormLabel>Context Data:</FormLabel>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "1.125rem",
            mt: 1,
            marginBottom: 2,
            backgroundColor: "rgba(0,0,0,0.125)",
            p: 2,
            borderRadius: "4px",
            fontFamily: "monospace",
          }}
        >
          <span>[</span>
          {appCtx.data.map((num, index) => {
            return <span key={`key_${index}`}>{num}</span>;
          })}
          <span>]</span>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button fullWidth onClick={incrementNumbers} variant="outlined">
            Increment
          </Button>
          <Button fullWidth onClick={decrementNumbers} variant="outlined">
            Decrement
          </Button>
        </Box>
        <ResetButton />
      </Box>
    </>
  );
};

export default NestedComponent;
