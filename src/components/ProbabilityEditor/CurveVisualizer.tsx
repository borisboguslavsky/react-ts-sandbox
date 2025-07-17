import { useEffect, useRef, useState } from "react";
import { Mode } from "./ProbabilityEditor";

interface CurveVisualizerProps {
  mode: Mode;
  params: {
    apexPosition: number; // 0 to 100
    slope: number; // 0 to 100
    dropPosition: number; // 0 to 100
    ascentPosition: number; // 0 to 100
  };
}

const CurveVisualizer = ({ mode, params }: CurveVisualizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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

  const getPathData = () => {
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return "";

    const points = 100;
    let path = `M 0,${height}`;

    for (let i = 0; i <= points; i++) {
      const x = (i / points) * width;
      let y = height;

      const normalizedX = i / points; // 0 to 1
      const { apexPosition, slope, dropPosition, ascentPosition } = params;

      switch (mode) {
        case Mode.Flat:
          y = height / 2;
          break;
        case Mode.Bell:
          {
            const normalizedApex = apexPosition / 100;
            const bellWidth = 1 / (slope / 10);
            const exponent = -((normalizedX - normalizedApex) ** 2) / (2 * bellWidth ** 2);
            y = height - height * Math.exp(exponent) * 0.8;
          }
          break;
        case Mode.BiasMin:
          {
            const normalizedDrop = dropPosition / 100;
            if (normalizedX < normalizedDrop) {
              y = height / 4;
            } else {
              const curveSteepness = slope / 10;
              y =
                height / 4 +
                ((normalizedX - normalizedDrop) / (1 - normalizedDrop)) *
                  (height * 0.75) *
                  curveSteepness;
            }
          }
          break;
        case Mode.BiasMax:
          {
            const normalizedAscent = ascentPosition / 100;
            if (normalizedX > normalizedAscent) {
              y = height / 4;
            } else {
              const curveSteepness = slope / 10;
              y =
                height -
                height / 4 -
                ((normalizedAscent - normalizedX) / normalizedAscent) *
                  (height * 0.75) *
                  curveSteepness;
            }
          }
          break;
      }
      path += ` L ${x},${Math.max(0, Math.min(height, y))}`;
    }
    return path;
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "150px",
        border: "1px solid #989898",
        borderRadius: "4px",
        overflow: "hidden",
        marginBottom: "16px",
      }}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <path d={getPathData()} stroke="red" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
};

export default CurveVisualizer;
