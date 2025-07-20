import { Box } from "@mui/material";
import {
  BellProbabilityParams,
  DistributionType,
  FlatProbabilityParams,
} from "../ProbabilityEditor";

interface CurveProps {
  mode: DistributionType;
  flatParams: FlatProbabilityParams;
  bellParams: BellProbabilityParams;
}

const getPathData = (
  mode: DistributionType,
  params: FlatProbabilityParams | BellProbabilityParams
): string => {
  const width = 100; // SVG viewbox width
  const height = 100; // SVG viewbox height

  if (mode === DistributionType.Flat) {
    const { bias } = params as FlatProbabilityParams;
    let startY = 0;
    let endY = 0;

    // A small constant to prevent log(0) which is -Infinity
    const epsilon = 1e-10;

    if (bias > 0.5) {
      // End point is fixed at top-right.
      endY = 0;
      // Map bias from [0.5, 1] to a logarithmic scale for startY
      const normalizedBias = (bias - 0.5) * 2; // -> [0, 1]
      const logValue = -Math.log(1 - normalizedBias + epsilon);
      // Normalize the log value to the height. The effective range of logValue is scaled.
      startY = Math.min(logValue * 20, height); // Multiplier adjusts curve steepness
    } else if (bias < 0.5) {
      // Start point is fixed at top-left.
      startY = 0;
      // Map bias from [0, 0.5] to a logarithmic scale for endY
      const normalizedBias = (0.5 - bias) * 2; // -> [0, 1]
      const logValue = -Math.log(1 - normalizedBias + epsilon);
      endY = Math.min(logValue * 20, height); // Multiplier adjusts curve steepness
    }
    // if bias is 0.5, startY and endY remain 0, creating a flat line at the top.

    return `M 0 ${startY} L ${width} ${endY}`;
  }

  if (mode === DistributionType.Bell) {
    // Bell curve
    const { bias, width: deviation } = params as BellProbabilityParams;
    const mean = bias * width; // Map bias (0-1) to the viewbox width (0-100)
    const stdDev = width / (deviation + 0.01);

    let path = "";
    for (let x = 0; x <= width; x++) {
      const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
      const y = height - height * Math.exp(exponent);
      // Use M for the first point, L for subsequent points
      path += `${x === 0 ? "M" : "L"} ${x} ${y} `;
    }
    return path;
  }

  console.warn("Unsupported distribution type:", mode, "\nReturning empty path");

  return "";
};

const Curve = ({ mode, flatParams, bellParams }: CurveProps) => {
  const params = mode === DistributionType.Flat ? flatParams : bellParams;
  const curvePathData = getPathData(mode, params);

  // Create a second path for the fill by closing the curve path
  const fillPathData = `${curvePathData} L ${100} ${100} L 0 ${100} Z`;

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Path for the fill */}
        <path d={fillPathData} fill="rgba(100, 100, 100, 0.2)" stroke="none" />
        {/* Path for the stroke */}
        <path d={curvePathData} stroke="rgba(255, 0, 0)" strokeWidth="1" fill="none" />
      </svg>
    </Box>
  );
};

export default Curve;
