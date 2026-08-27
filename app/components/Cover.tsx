import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import { WEDDING_CONFIG } from "../config/wedding";

interface CoverProps {
  guestName: string;
  isOpen: boolean;
  onOpen: () => void;
  onBeforeOpen?: () => void;
}

export function Cover({ guestName, isOpen, onOpen, onBeforeOpen }: CoverProps) {
  const coverRef = useRef<HTMLDivElement>(null);
  const introRunRef = useRef(false);

  useEffect(() => {
    if (introRunRef.current) return;
    introRunRef.current = true;

    const ctx = gsap.context(() => {
      const coverLines = coverRef.current?.querySelectorAll(".reveal-line > span");
      const coverFades = coverRef.current?.querySelectorAll(".fade-up");

      if (coverFades && coverFades.length > 0) {
        gsap.set(coverFades, { opacity: 0, y: 20 });
      }

      if (coverLines && coverLines.length > 0) {
        gsap.to(coverLines, {
          y: "0%",
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.12,
          delay: 0.15,
        });
      }

      if (coverFades && coverFades.length > 0) {
        gsap.to(coverFades, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.7,
        });
      }

      const bg = coverRef.current?.querySelector(".cover-bg");
      if (bg) {
        gsap.fromTo(
          bg,
          { scale: 1.25 },
          { scale: 1.12, duration: 2.4, ease: "power2.out" }
        );
      }
    }, coverRef);

    return () => ctx.revert();
  }, []);

  const handleOpenClick = () => {
    if (onBeforeOpen) {
      onBeforeOpen();
    }

    if (!coverRef.current) {
      onOpen();
      return;
    }

    gsap.to(coverRef.current, {
      yPercent: -100,
      opacity: 0.4,
      duration: 1.15,
      ease: "expo.inOut",
      onComplete: () => {
        if (coverRef.current) {
          coverRef.current.style.display = "none";
        }
        onOpen();
      },
    });
  };

  if (isOpen && (!coverRef.current || coverRef.current.style.display === "none")) {
    return null;
  }

  return (
    <div id="cover" ref={coverRef} style={isOpen ? { display: "none" } : undefined}>
      <div
        className="cover-bg"
        style={{
          backgroundImage:
            "url('./cover.webp')",
          filter: " brightness(0.50) contrast(1.15)"
        }}
      />
      <div className="cover-shade" />
      <div className="cover-grain" />

      <div className="cover-top">
        <span className="eyebrow">The Wedding Of</span>
        <div className="cover-arab">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
      </div>

      <div className="cover-inner">
        <h1 className="cover-names">
          <span className="reveal-line">
            <span>{WEDDING_CONFIG.groom.name}</span>
          </span>
          <span className="cover-amp reveal-line">
            <span>&amp;</span>
          </span>
          <span className="reveal-line">
            <span>{WEDDING_CONFIG.bride.name}</span>
          </span>
        </h1>
        <div className="cover-date reveal-line">
          <span>{WEDDING_CONFIG.event.dateShort}</span>
        </div>

        <div className="guest-card fade-up">
          <div className="lbl">Kepada Yth. Bapak/Ibu/Saudara/i</div>
          <div className="nm" id="guestName">
            {guestName || "Tamu Undangan"}
          </div>
        </div>

        <button
          className="open-btn fade-up"
          id="openBtn"
          data-testid="open-invitation-button"
          onClick={handleOpenClick}
          type="button"
        >
          Buka Undangan
          <svg
            className="ic"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        <div className="cover-scrolltease fade-up">Ketuk untuk membuka</div>
      </div>
    </div>
  );
}
