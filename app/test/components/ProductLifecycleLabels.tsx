import React, { useEffect, useState } from "react";

const labels: Record<string, any> = {
  wrap: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: "translateY(-50%)",
    padding: "14px 16px",
    borderRadius: 16,
    background: "rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(12px)",
    color: "white",
    width: 210,
    zIndex: 5,
    fontFamily:
      "Inter, Segoe UI, Arial, sans-serif",
  },
  kicker: {
    fontSize: 11,
    opacity: 0.72,
    letterSpacing: 1,
    marginBottom: 10,
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    opacity: 0.45,
    marginBottom: 7,
    transition: "all 0.3s ease",
  },
  active: {
    opacity: 1,
    transform: "translateX(4px)",
    fontWeight: 650,
  },
  dot: (active: boolean) => ({
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: active ? "#22c55e" : "rgba(255,255,255,0.3)",
    boxShadow: active ? "0 0 8px rgba(34,197,94,0.9)" : "none",
    transition: "all 0.3s ease",
  }),
};

export function ProductLifecycleLabels({
  stageRef,
}: {
  stageRef: React.MutableRefObject<number>;
}) {
  const stages = ["Plan", "Design", "Build", "Test", "Deploy"];
  const [, force] = useState(0);

  useEffect(() => {
    const id = setInterval(() => force((n) => n + 1), 80);
    return () => clearInterval(id);
  }, []);

  return (
    <>
    <div style={labels.wrap}>
      <div style={labels.kicker}>PRODUCT LIFECYCLE</div>
      {stages.map((name, i) => {
        const active = stageRef.current === i;
        return (
          <div
            key={name}
            style={{
              ...labels.item,
              ...(active ? labels.active : {}),
            }}
          >
            <span style={labels.dot(active)} />
            {name}
          </div>
        );
      })}
    </div>
    <div className="room-wrapper">

    </div>
    </>
  );
}
