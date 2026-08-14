import { ImageResponse } from "next/og";
import { markPaths, markViewBox } from "@/components/layout/logo-art";
import { custodyPartyCount } from "@/lib/custody";
import { site } from "@/lib/site";

export const alt = `${site.name} — freight forwarding and customs clearance across the GCC`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The social card is the document's cover sheet: security paper, a ruled
 * caption block, and the site's one argument stated as a count. It carries the
 * same thesis as the first viewport rather than a generic strapline.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8f9f5",
          borderTop: "16px solid #4c2f95",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          <svg width="86" height="73" viewBox={markViewBox} fill="none">
            {markPaths.map((path) => (
              <path key={path.d} d={path.d} fill={path.fill} />
            ))}
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{ color: "#17131f", fontSize: "30px", fontWeight: 700 }}
            >
              NOBLE STAR
            </span>
            <span
              style={{
                color: "#6d6088",
                fontSize: "14px",
                letterSpacing: "5px",
              }}
            >
              SHIPPING SERVICES L.L.C
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#948aa9",
              fontSize: "18px",
              letterSpacing: "5px",
              textTransform: "uppercase",
            }}
          >
            Description of goods
          </span>
          <span
            style={{
              marginTop: "22px",
              color: "#17131f",
              fontSize: "82px",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-3px",
            }}
          >
            Freight fails at
          </span>
          <span
            style={{
              color: "#17131f",
              fontSize: "82px",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-3px",
            }}
          >
            the handover.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "2px solid #17131f",
            paddingTop: "24px",
          }}
        >
          <span style={{ color: "#4d4166", fontSize: "24px", maxWidth: "640px" }}>
            Sea, air and road freight with in-house customs brokerage, across
            all six GCC markets.
          </span>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                color: "#948aa9",
                fontSize: "14px",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              Parties to the file
            </span>
            <span
              style={{
                color: "#4c2f95",
                fontSize: "56px",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {custodyPartyCount.typical} → {custodyPartyCount.noblestar}
            </span>
          </span>
        </div>
      </div>
    ),
    size,
  );
}
