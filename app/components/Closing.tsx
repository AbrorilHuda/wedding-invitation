import React from "react";
import { WEDDING_CONFIG } from "../config/wedding";

export function Closing() {
  return (
    <section id="closing" className="pad">
      <div
        className="closing-bg"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1519741196428-6a2175fa2557?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200")',
        }}
      />
      <div className="closing-shade" />
      <div className="wrap inner">
        <div
          className="gold-line reveal-el"
          style={{
            background: "linear-gradient(var(--gold-light), transparent)",
          }}
        />
        <p className="thanks reveal-el" style={{ marginTop: "30px" }}>
          Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>
        <div style={{ margin: "36px 0" }} className="reveal-el">
          <span className="eyebrow" style={{ color: "#c9b48f" }}>
            Wassalamualaikum Wr. Wb.
          </span>
        </div>
        <div className="names serif reveal-el">
          {WEDDING_CONFIG.groom.name}
          <br />
          <span style={{ fontStyle: "italic", fontSize: "0.5em", color: "#dcc79f" }}>
            &amp;
          </span>
          <br />
          {WEDDING_CONFIG.bride.name}
        </div>
        <p className="thanks reveal-el" style={{ marginTop: "24px" }}>
          Kami yang berbahagia beserta keluarga besar
          <br />
          kedua mempelai.
        </p>
        <div className="credit reveal-el">Create By AbrorilHuda</div>
      </div>
    </section>
  );
}
