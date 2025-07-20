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
  const [sampleNumber, setSampleNumber] = useState(200000);
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
      const newNumbers = Array.from({ length: sampleNumber }, () =>
        rngBell(bellParams.min, bellParams.max, bellParams.step, bellParams.bias, bellParams.width)
      );
      const buckets = generateBuckets(newNumbers, bellParams.min, bellParams.max, bellParams.step);
      setBuckets(buckets);
      return;
    }
    if (mode === DistributionType.Flat) {
      const newNumbers = Array.from({ length: sampleNumber }, () =>
        rngFlat(flatParams.min, flatParams.max, flatParams.step, flatParams.bias)
      );
      const buckets = generateBuckets(newNumbers, flatParams.min, flatParams.max, flatParams.step);
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
      <Bars width={width} height={height} buckets={buckets} />
    </div>
  );
};

const Bars = ({ width, height, buckets }: { width: number; height: number; buckets: number[] }) => {
  if (buckets.length === 0 || width <= 0 || height <= 0) {
    return null;
  }

  const barWidth = width / buckets.length;

  return (
    <svg width={width} height={height}>
      {buckets.map((value, index) => {
        const barHeight = value * height;
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
  );
};
