import React from "react";
import { WEDDING_CONFIG } from "../config/wedding";

export function LoveStory() {
  const moments = WEDDING_CONFIG.storyMoments;

  return (
    <section className="bg-beige pad" id="story">
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span className="num-tag reveal-el">02 — Perjalanan</span>
          <h2 className="title reveal-el" style={{ marginTop: "10px" }}>
            Kisah Cinta
          </h2>
          <p
            className="lede reveal-el"
            style={{ margin: "16px auto 0", textAlign: "center" }}
          >
            Setiap kisah cinta itu indah, namun kisah yang kami rajut bersama
            adalah yang paling kami syukuri.
          </p>
        </div>

        <div className="story-timeline">
          {moments.map((item, index) => {
            const isAlt = index % 2 !== 0;
            return (
              <div
                key={item.chapter + item.title}
                className={`story-item reveal-el ${isAlt ? "story-item-alt" : ""}`}
              >
                <div className="story-photo-wrap">
                  <div className="story-photo">
                    <div className="story-chapter-badge serif">{item.chapter}</div>
                    <img src={item.image} alt={item.alt} loading="lazy" />
                  </div>
                </div>

                <div className="story-body">
                  <div className="story-year-tag">{item.year || item.when}</div>
                  <div className="when">{item.when}</div>
                  <h3 className="serif">{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


