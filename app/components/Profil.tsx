import React from "react";
import { WEDDING_CONFIG } from "../config/wedding";

export function Profil() {
  const { groom, bride } = WEDDING_CONFIG;

  return (
    <section className="bg-blush pad" id="profil">
      <div className="wrap" style={{ textAlign: "center" }}>
        <span className="num-tag reveal-el">01 — Mempelai</span>
        <h2 className="title reveal-el" style={{ marginTop: "10px" }}>
          Kedua
          <br />
          Mempelai
        </h2>
        <p
          className="lede reveal-el"
          style={{ margin: "16px auto 0", textAlign: "center" }}
        >
          Dengan penuh rasa syukur, kami mempersembahkan dua insan yang akan
          menyatukan cinta dalam ikatan suci.
        </p>

        <div className="profiles-container">
          {/* Groom */}
          <div className="profile-card reveal-el">
            <div className="arch">
              <img
                src={groom.photo}
                alt={groom.fullName}
                loading="lazy"
              />
            </div>
            <div className="profile-name serif">{groom.fullName}</div>
            <div className="profile-role">The Groom</div>
            <div className="profile-parents">
              {groom.order}
              <br />
              {groom.parents}
            </div>
            <div className="socials">
              <a
                href={groom.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="groom-instagram"
                aria-label={`Instagram ${groom.name}`}
                className="instagram-btn"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                {groom.instagramHandle && (
                  <span className="ig-handle">{groom.instagramHandle}</span>
                )}
              </a>
            </div>
          </div>

          {/* Ampersand Divider */}
          <div className="amp-divider reveal-el">
            <span className="amp-line" />
            <span className="amp-big">&amp;</span>
            <span className="amp-line" />
          </div>

          {/* Bride */}
          <div className="profile-card reveal-el">
            <div className="arch">
              <img
                src={bride.photo}
                alt={bride.fullName}
                loading="lazy"
              />
            </div>
            <div className="profile-name serif">{bride.fullName}</div>
            <div className="profile-role">The Bride</div>
            <div className="profile-parents">
              {bride.order}
              <br />
              {bride.parents}
            </div>
            <div className="socials">
              <a
                href={bride.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="bride-instagram"
                aria-label={`Instagram ${bride.name}`}
                className="instagram-btn"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                {bride.instagramHandle && (
                  <span className="ig-handle">{bride.instagramHandle}</span>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

