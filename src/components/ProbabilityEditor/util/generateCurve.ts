import { BellProbabilityParams } from "../components/Parameters_Bell";
import { FlatProbabilityParams } from "../components/Parameters_Flat";
import { DistributionType } from "../ProbabilityEditor";

const generateCurve = (
  mode: DistributionType,
  params: FlatProbabilityParams | BellProbabilityParams
): string => {
  const width = 100; // SVG viewbox width
  const height = 100; // SVG viewbox height

  if (mode === DistributionType.Flat) {
    const { bias } = params as FlatProbabilityParams;

    let startY = 0;
    let endY = 0;

    if (bias > 0.5) {
      startY = height - (1 - 1 / bias) * height * -1;
    }
    if (bias < 0.5) {
      endY = height - (1 - 1 / (1 - bias)) * height * -1;
    }

    return `M 0 ${startY} L ${width} ${endY}`;
  }

  if (mode === DistributionType.Normal) {
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

export default generateCurve;
