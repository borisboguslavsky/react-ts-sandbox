import Box from "@mui/material/Box";
import Button from "@mui/material/Button/Button";
import { useEffect, useRef, useState } from "react";
import rngBell from "../util/rngBell";
import generateBuckets from "../util/generateBuckets";
import rngFlat from "../util/rngFlat";
import {
  BellProbabilityParams,
  DistributionType,
  FlatProbabilityParams,
} from "../ProbabilityEditor";

const SAMPLE_NUMBER = 100000;

export const BarGraph = ({
  mode,
  flatParams,
  bellParams,
}: {
  mode: DistributionType;
  flatParams: FlatProbabilityParams;
  bellParams: BellProbabilityParams;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [buckets, setBuckets] = useState<number[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const { width, height } = dimensions;

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const generateSampleSet = () => {
    if (mode === DistributionType.Bell) {
      const newNumbers = Array.from({ length: SAMPLE_NUMBER }, () =>
        rngBell(bellParams.min, bellParams.max, bellParams.step, bellParams.bias, bellParams.width)
      );
      const buckets = generateBuckets(newNumbers);
      setBuckets(buckets);
      return;
    }
    if (mode === DistributionType.Flat) {
      const newNumbers = Array.from({ length: SAMPLE_NUMBER }, () =>
        rngFlat(flatParams.min, flatParams.max, flatParams.step, flatParams.bias)
      );
      const buckets = generateBuckets(newNumbers);
      setBuckets(buckets);
      return;
    }
  };

  const clearSampleSet = () => {
    setBuckets([]);
  };

  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.0625)",
        zIndex: 1,
      }}
      ref={containerRef}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 4,
          right: 4,
          display: "flex",
          gap: 1,
        }}
      >
        <Button
          sx={{
            textTransform: "none",
            padding: "0px",
          }}
          variant="contained"
          size="small"
          onClick={clearSampleSet}
        >
          Clear
        </Button>
        <Button
          sx={{
            textTransform: "none",
            padding: "0px",
          }}
          variant="contained"
          size="small"
          onClick={generateSampleSet}
        >
          Generate
        </Button>
      </Box>
      {width > 0 && height > 0 && (
        <svg width={width} height={height}>
          {buckets.map((value, index) => {
            const barWidth = width / buckets.length;
            const barHeight = value * height; // 2 to fit in the SVG height
            const x = index * barWidth;
            return (
              <rect
                key={`bucket_${index}`}
                x={x}
                y={height - barHeight}
                width={barWidth - 1} // -1 to create a small gap between bars
                height={barHeight}
                fill="blue"
              />
            );
          })}
        </svg>
      )}
    </div>
  );
};
