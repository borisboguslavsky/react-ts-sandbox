import { useEffect, useRef, useState } from "react";

export const BarGraph = ({ buckets }: { buckets: number[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
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
            fill="rgba(0, 90, 240, 0.75)"
          />
        );
      })}
    </svg>
  );
};
