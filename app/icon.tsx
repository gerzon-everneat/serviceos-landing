import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const LIME = "#C8FF00";
  const INK = "#0A0A0A";
  const rows = [0, 1, 2];
  const cols = [0, 1, 2];

  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        {rows.map((row) => (
          <div
            key={row}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: row < 2 ? 3 : 0,
            }}
          >
            {cols.map((col) => {
              const i = row * 3 + col;
              const center = i === 4;
              return (
                <div
                  key={col}
                  style={{
                    width: center ? 7 : 5,
                    height: center ? 7 : 5,
                    borderRadius: "50%",
                    background: center ? LIME : INK,
                    marginRight: col < 2 ? 3 : 0,
                    opacity: center ? 1 : 0.85,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    ),
    { ...size }
  );
}
