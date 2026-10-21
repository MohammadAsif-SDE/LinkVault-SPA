import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FolderIcon,
  GlobeIcon,
  SparklesIcon,
  CloudIcon,
  Share2Icon,
  LockIcon,
  FolderOpenIcon,
  MonitorIcon,
  RocketIcon,
  SettingsIcon,
} from "lucide-react";

interface Feature {
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

const FEATURES: Feature[] = [
  { name: "FOLDER STRUCTURE", description: "Organize your links in a hierarchical folder structure for easy navigation and retrieval.", icon: FolderIcon },
  { name: "ACCESS ANYWHERE", description: "Access your saved links from any device, anywhere in the world.", icon: GlobeIcon },
  { name: "ONE-CLICK SAVE", description: "Save any link with a single click for instant organization.", icon: SparklesIcon },
  { name: "CLOUD SYNC", description: "Automatically sync your links across all your devices in real-time.", icon: CloudIcon },
  { name: "SHARE COLLECTIONS", description: "Share your curated link folders with teammates and collaborators.", icon: Share2Icon },
  { name: "SECURE STORAGE", description: "Your links are encrypted and stored securely with enterprise-grade protection.", icon: LockIcon },
  { name: "FOLDER STRUCTURE", description: "Organize your links in a hierarchical folder structure for easy navigation and retrieval.", icon: FolderIcon },
  { name: "ACCESS ANYWHERE", description: "Access your saved links from any device, anywhere in the world.", icon: GlobeIcon },
  { name: "ONE-CLICK SAVE", description: "Save any link with a single click for instant organization.", icon: SparklesIcon },
  { name: "CLOUD SYNC", description: "Automatically sync your links across all your devices in real-time.", icon: CloudIcon },
  { name: "SHARE COLLECTIONS", description: "Share your curated link folders with teammates and collaborators.", icon: Share2Icon },
  { name: "SECURE STORAGE", description: "Your links are encrypted and stored securely with enterprise-grade protection.", icon: LockIcon },
];

const TOTAL_NODES = 12;
const ANGLE_STEP = 360 / TOTAL_NODES;
const SVG_WIDTH = 1600;
const SVG_HEIGHT = 600;
const CX = SVG_WIDTH / 2;
const CY = 1850;
const RADIUS = 1600;
const NODE_RADIUS = 64;
const CONNECTOR_DOT_RADIUS = 12;

function getPointOnCircle(angleDeg: number, radius: number, cx: number, cy: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return { x: cx + radius * Math.sin(angleRad), y: cy - radius * Math.cos(angleRad) };
}

function createArcPath(startAngleDeg: number, endAngleDeg: number, r: number, cx: number, cy: number) {
  const steps = 120;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const angle = startAngleDeg + (endAngleDeg - startAngleDeg) * (i / steps);
    const p = getPointOnCircle(angle, r, cx, cy);
    points.push(`${i === 0 ? "M" : "L"} ${p.x} ${p.y}`);
  }
  return points.join(" ");
}

function ProcessFlow() {
  const pillWidth = 300;
  const pillHeight = 64;
  const hGap = 60;
  const vGap = 100;
  const semicircleRadius = (pillHeight + vGap) / 2;

  const topY = 0;
  const bottomY = pillHeight + vGap;
  const leftX = 0;
  const rightX = pillWidth + hGap;

  const topCenterY = topY + pillHeight / 2;
  const bottomCenterY = bottomY + pillHeight / 2;

  const rArc = semicircleRadius;
  const svgPadding = 40;

  const svgOffsetX = rArc + svgPadding;
  const svgOffsetY = svgPadding;
  const svgWidth = rightX + pillWidth + rArc * 2 + svgPadding * 2;
  const svgHeight = bottomY + pillHeight + svgPadding * 2;

  const racetrackPath = [
    `M ${leftX + pillWidth} ${topCenterY}`,
    `L ${rightX + pillWidth} ${topCenterY}`,
    `A ${rArc} ${rArc} 0 0 1 ${rightX + pillWidth} ${bottomCenterY}`,
    `L ${leftX} ${bottomCenterY}`,
    `A ${rArc} ${rArc} 0 0 1 ${leftX} ${topCenterY}`,
    "Z",
  ].join(" ");

  const pillStyle: React.CSSProperties = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    borderRadius: 9999,
    width: pillWidth,
    height: pillHeight,
    backgroundColor: "#f8f8f8",
    border: "1.5px solid #e8e8e8",
  };

  return (
    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 0 60px" }}>
      <style>{`@keyframes flowDash { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -60; } }`}</style>
      <div style={{ position: "relative", width: svgWidth, height: svgHeight }}>
        <svg
          style={{ position: "absolute", inset: 0 }}
          width={svgWidth}
          height={svgHeight}
          viewBox={`${-svgOffsetX} ${-svgOffsetY} ${svgWidth} ${svgHeight}`}
          fill="none"
        >
          <path d={racetrackPath} stroke="#e0e0e0" strokeWidth="2" fill="none" />
          <path
            d={racetrackPath}
            stroke="#3b82f6"
            strokeWidth="2"
            fill="none"
            strokeDasharray="12 18"
            strokeLinecap="round"
            style={{ animation: "flowDash 1.5s linear infinite" }}
          />
        </svg>

        {[
          { x: leftX, y: topY, icon: <FolderOpenIcon size={20} style={{ color: "#999" }} />, label: "Save & Organize" },
          { x: rightX, y: topY, icon: <MonitorIcon size={20} style={{ color: "#999" }} />, label: "Preview" },
          { x: leftX, y: bottomY, icon: <SettingsIcon size={20} style={{ color: "#999" }} />, label: "Auto-Organize" },
          { x: rightX, y: bottomY, icon: <RocketIcon size={20} style={{ color: "#999" }} />, label: "Share & Deploy" },
        ].map(({ x, y, icon, label }) => (
          <div key={label} style={{ ...pillStyle, left: x + svgOffsetX, top: y + svgOffsetY }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: "100%", paddingLeft: 16 }}>
              {icon}
            </div>
            <span style={{ flex: 1, color: "#555", fontSize: "0.8rem", fontWeight: 600, paddingRight: 20, textAlign: "center", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArcFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToFeature = useCallback(
    (index: number) => {
      const currentPos = ((activeIndex % FEATURES.length) + FEATURES.length) % FEATURES.length;
      let diff = index - currentPos;
      if (diff > FEATURES.length / 2) diff -= FEATURES.length;
      if (diff < -FEATURES.length / 2) diff += FEATURES.length;
      setDirection(diff >= 0 ? 1 : -1);
      setActiveIndex(activeIndex + diff);
    },
    [activeIndex]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const rotationAngle = -activeIndex * ANGLE_STEP;
  const activeFeatureIndex = ((activeIndex % FEATURES.length) + FEATURES.length) % FEATURES.length;
  const activeFeature = FEATURES[activeFeatureIndex];

  const nodes = Array.from({ length: TOTAL_NODES }, (_, i) => {
    const baseAngle = i * ANGLE_STEP;
    const connectorPos = getPointOnCircle(baseAngle, RADIUS, CX, CY);
    const nodePos = getPointOnCircle(baseAngle, RADIUS + 150, CX, CY);
    return { index: i, number: i + 1, connectorPos, nodePos, baseAngle };
  });

  return (
    <section style={{ background: "#FCFBF9", overflow: "hidden", position: "relative" }}>
      {/* Arc + nodes */}
      <div style={{ position: "relative", width: "100%", height: SVG_HEIGHT }}>
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
          preserveAspectRatio="xMidYMin meet"
        >
          <defs>
            <radialGradient id="nodeGlowLight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g
            style={{
              transform: `rotate(${rotationAngle}deg)`,
              transformOrigin: `${CX}px ${CY}px`,
              transition: "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Dashed arc */}
            <path
              d={createArcPath(-180, 179.9, RADIUS, CX, CY)}
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="2.5"
              strokeDasharray="14 12"
            />

            {nodes.map((node) => {
              const isActive = node.index === activeFeatureIndex;
              const angularDist = Math.abs(
                (((node.index - activeFeatureIndex + TOTAL_NODES) % TOTAL_NODES) * ANGLE_STEP) % 360
              );
              const adjustedDist = angularDist > 180 ? 360 - angularDist : angularDist;
              const dotOpacity = adjustedDist <= 180 ? Math.max(0.08, 1 - adjustedDist / 200) : 0;
              const nodeOpacity = adjustedDist <= 90 ? Math.max(0.15, 1 - adjustedDist / 100) : 0;

              return (
                <g key={node.index}>
                  <circle
                    cx={node.connectorPos.x} cy={node.connectorPos.y}
                    r={CONNECTOR_DOT_RADIUS}
                    fill={isActive ? "#888" : "#ccc"}
                    style={{ opacity: dotOpacity }}
                  />
                  <line
                    x1={node.connectorPos.x} y1={node.connectorPos.y}
                    x2={node.nodePos.x} y2={node.nodePos.y}
                    stroke={isActive ? "#bbb" : "#ddd"}
                    strokeWidth="2"
                    style={{ opacity: nodeOpacity }}
                  />
                  <circle
                    cx={node.nodePos.x} cy={node.nodePos.y}
                    r={isActive ? NODE_RADIUS + 8 : NODE_RADIUS}
                    fill={isActive ? "#fff" : "#fafafa"}
                    stroke={isActive ? "#d0d0d0" : "#eee"}
                    strokeWidth={isActive ? 1.5 : 1}
                    style={{ opacity: nodeOpacity, cursor: "pointer", filter: isActive ? "drop-shadow(0 2px 12px rgba(0,0,0,0.08))" : "none" }}
                    onClick={() => goToFeature(node.index)}
                  />
                  {isActive && (
                    <circle cx={node.nodePos.x} cy={node.nodePos.y} r={NODE_RADIUS + 32} fill="url(#nodeGlowLight)" />
                  )}
                  <text
                    x={node.nodePos.x} y={node.nodePos.y}
                    textAnchor="middle" dominantBaseline="central"
                    fill={isActive ? "#222" : "#bbb"}
                    fontSize={isActive ? "32" : "28"}
                    fontWeight="300"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    style={{
                      opacity: nodeOpacity,
                      transform: `rotate(${-rotationAngle}deg)`,
                      transformOrigin: `${node.nodePos.x}px ${node.nodePos.y}px`,
                      transition: "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
                      pointerEvents: "none",
                    }}
                  >
                    {node.number}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Center feature text */}
        <div
          style={{
            position: "absolute",
            left: 0, right: 0,
            top: "65%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeatureIndex}
              initial={{ opacity: 0, y: direction * 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction * -16 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 32px" }}
            >
              <h2 style={{
                color: "#000",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                lineHeight: 1.2,
                marginBottom: 16,
              }}>
                {activeFeature.name}
              </h2>
              <p style={{
                maxWidth: 480,
                color: "#888",
                fontSize: "1rem",
                lineHeight: 1.8,
                fontStyle: "italic",
              }}>
                {activeFeature.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Feature selector pills */}
      {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 16px", marginTop: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, maxWidth: 680 }}>
          {FEATURES.slice(0, 6).map((feature, i) => {
            const isActive = i === activeFeatureIndex;
            const Icon = feature.icon;
            return (
              <button
                key={i}
                onClick={() => goToFeature(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  borderRadius: 9999,
                  padding: "10px 18px",
                  cursor: "pointer",
                  background: isActive ? "#fff" : "#f8f8f8",
                  border: isActive ? "1.5px solid #3b82f6" : "1.5px solid #eee",
                  boxShadow: isActive ? "0 2px 12px rgba(59,130,246,0.12)" : "none",
                  transition: "all 0.25s",
                  minWidth: 180,
                }}
              >
                <Icon size={14} style={{ color: isActive ? "#3b82f6" : "#bbb", flexShrink: 0 }} />
                <span style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: isActive ? "#000" : "#aaa",
                  whiteSpace: "nowrap",
                }}>
                  {feature.name.split(" ").slice(0, 2).join(" ")}
                </span>
              </button>
            );
          })}
        </div> */}

        {/* Pagination dots */}
        {/* <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "24px 0 8px" }}>
          {FEATURES.slice(0, 6).map((_, i) => (
            <button
              key={i}
              onClick={() => goToFeature(i)}
              style={{
                width: i === activeFeatureIndex ? 24 : 8,
                height: 4,
                borderRadius: 2,
                background: i === activeFeatureIndex ? "#3b82f6" : "#e0e0e0",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div> */}

      {/* Process flow racetrack */}
      <ProcessFlow />
    </section>
  );
}
