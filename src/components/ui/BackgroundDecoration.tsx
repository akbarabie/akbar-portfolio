"use client";

import { useReducedMotion } from "framer-motion";
import { graphNodes, graphEdges } from "@/data/network-graph";

// Subset edge yang dikasih animasi "sinyal berjalan" — sengaja gak semua edge,
// biar gak terlalu ramai/berisik secara visual. Disebar merata di seluruh graph.
const SIGNAL_EDGE_INDICES = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45];

export function BackgroundDecoration() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1536 1024"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Garis statis — mesh jaringan penuh */}
        <g className="graph-edge">
          {graphEdges.map((edge, i) => {
            const from = graphNodes[edge.from];
            const to = graphNodes[edge.to];
            return (
              <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} strokeWidth={1} />
            );
          })}
        </g>

        {/* Node statis */}
        <g className="graph-node">
          {graphNodes.map((node, i) => (
            <circle key={i} cx={node.x} cy={node.y} r={node.r} />
          ))}
        </g>

        {/* Sinyal berjalan node-ke-node — cuma subset edge */}
        {!prefersReducedMotion &&
          SIGNAL_EDGE_INDICES.filter((i) => i < graphEdges.length).map((edgeIdx, i) => {
            const edge = graphEdges[edgeIdx];
            const from = graphNodes[edge.from];
            const to = graphNodes[edge.to];
            const duration = 2.5 + (i % 5) * 0.6;
            const delay = (i % 7) * 0.4;

            return (
              <circle key={edgeIdx} r={4} className="graph-signal">
                <animateMotion
                  dur={`${duration}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                  path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.1;0.9;1"
                  dur={`${duration}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
      </svg>
    </div>
  );
}