import React from "react";

export function Profil() {
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

        {/* Groom */}
        <div style={{ marginTop: "56px" }} className="reveal-el">
          <div className="arch">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=srgb&fm=jpg&q=85&w=600"
              alt="Miftah Pratama"
              loading="lazy"
            />
          </div>
          <div className="profile-name serif">Miftah Pratama</div>
          <div className="profile-role">The Groom</div>
          <div className="profile-parents">
            Putra pertama dari
            <br />
            Bapak H. Suryadi &amp; Ibu Hj. Kartika
          </div>
          <div className="socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="groom-instagram"
              aria-label="Instagram Miftah"
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
            </a>
          </div>
        </div>

        {/* Ampersand */}
        <div className="amp-big reveal-el">&amp;</div>

        {/* Bride */}
        <div className="reveal-el">
          <div className="arch">
            <img
              src="https://images.unsplash.com/photo-1492175742197-ed20dc5a6bed?crop=entropy&cs=srgb&fm=jpg&q=85&w=600"
              alt="Sofia Anindya"
              loading="lazy"
            />
          </div>
          <div className="profile-name serif">Sofia Anindya</div>
          <div className="profile-role">The Bride</div>
          <div className="profile-parents">
            Putri kedua dari
            <br />
            Bapak H. Bambang &amp; Ibu Hj. Ratna
          </div>
          <div className="socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="bride-instagram"
              aria-label="Instagram Sofia"
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
