import { ImageResponse } from "next/og";
import { BUSINESS_FULL_NAME, PHONE_DISPLAY } from "./lib/site";

export const alt = BUSINESS_FULL_NAME;
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#f4fbff",
          background:
            "radial-gradient(circle at 18% 12%, rgba(102,228,255,0.42), transparent 30%), radial-gradient(circle at 82% 18%, rgba(47,139,255,0.36), transparent 34%), linear-gradient(135deg, #041022 0%, #08264e 55%, #061225 100%)"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 34,
            fontWeight: 900
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 22,
              background: "linear-gradient(135deg, #66e4ff, #2f8bff)"
            }}
          />
          Бойлер-Мен
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}>
          <div
            style={{
              display: "flex",
              width: 520,
              marginBottom: 28,
              border: "1px solid rgba(176,232,255,0.32)",
              borderRadius: 999,
              padding: "12px 20px",
              color: "#66e4ff",
              background: "rgba(255,255,255,0.08)",
              fontSize: 26,
              fontWeight: 800
            }}
          >
            Сервиз на адрес · София и Пазарджик
          </div>
          <div
            style={{
              fontSize: 82,
              fontWeight: 950,
              letterSpacing: "-0.06em",
              lineHeight: 0.94
            }}
          >
            Ремонт на бойлери в София и Пазарджик
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#cce2f3", fontSize: 28 }}>
          <span>Течове · липса на топла вода · електрически проблеми</span>
          <strong style={{ color: "#66e4ff" }}>{PHONE_DISPLAY}</strong>
        </div>
      </div>
    ),
    size
  );
}
