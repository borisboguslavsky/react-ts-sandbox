import { Box } from "@mui/material";
import { DistributionType } from "../ProbabilityEditor";
import generateCurve from "../util/generateCurve";
import { BellProbabilityParams } from "./Parameters_Bell";
import { FlatProbabilityParams } from "./Parameters_Flat";

interface CurveProps {
  mode: DistributionType;
  flatParams: FlatProbabilityParams;
  bellParams: BellProbabilityParams;
}

export const Curve = ({ mode, flatParams, bellParams }: CurveProps) => {
  const params = mode === DistributionType.Flat ? flatParams : bellParams;
  const curvePathData = generateCurve(mode, params);

  // Create a second path for the fill by closing the curve path
  const fillPathData = `${curvePathData} L ${100} ${100} L 0 ${100} Z`;

  return (
    <Box sx={{ height: "100%" }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Path for the fill */}
        <path d={fillPathData} fill="rgba(100, 100, 100, 0.3)" stroke="none" />
        {/* Path for the stroke */}
        <path d={curvePathData} stroke="rgba(255, 0, 0)" strokeWidth="1" fill="none" />
      </svg>
    </Box>
  );
};
