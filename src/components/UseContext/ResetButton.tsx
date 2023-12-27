import { Button } from "@mui/material";
import { useContext } from "react";
import { AppContext, DUMMY_DATA } from "./UseContext";

const ResetButton = () => {
  const appCtx = useContext(AppContext);

  const resetNumbers = () => {
    appCtx.setTimesIncremented(0);
    appCtx.setTimesDecremented(0);
    appCtx.setData(DUMMY_DATA);
  };

  return (
    <Button onClick={resetNumbers} variant="contained">
      Reset
    </Button>
  );
};

export default ResetButton;
