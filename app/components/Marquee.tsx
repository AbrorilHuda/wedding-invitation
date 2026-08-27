import React from "react";
import { WEDDING_CONFIG } from "../config/wedding";

export function Marquee() {
  const text = `${WEDDING_CONFIG.groom.name} & ${WEDDING_CONFIG.bride.name}`;
  const date = WEDDING_CONFIG.event.dateDisplay;

  return (
    <div className="marquee bg-cream">
      <div className="track" id="marqueeTrack">
        <span>
          {text} <span className="sep">✦</span> {date}{" "}
          <span className="sep">✦</span>
        </span>
        <span>
          {text} <span className="sep">✦</span> {date}{" "}
          <span className="sep">✦</span>
        </span>
        <span>
          {text} <span className="sep">✦</span> {date}{" "}
          <span className="sep">✦</span>
        </span>
        <span>
          {text} <span className="sep">✦</span> {date}{" "}
          <span className="sep">✦</span>
        </span>
      </div>
    </div>
  );
}
