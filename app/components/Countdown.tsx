import React, { useState, useEffect } from "react";
import { WEDDING_CONFIG } from "../config/wedding";

const TARGET_DATE = new Date(WEDDING_CONFIG.event.dateIso).getTime();

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    function calculate() {
      const now = Date.now();
      const diff = TARGET_DATE - now;

      if (diff <= 0) {
        setIsPassed(true);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      setIsPassed(false);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
      });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-ink pad" id="countdown">
      <div className="closing-shade" />
      <div
        className="wrap"
        style={{ textAlign: "center", position: "relative", zIndex: 2 }}
      >
        <span className="eyebrow reveal-el" style={{ color: "#c9b48f" }}>
          {isPassed ? "Hari Bahagia" : "Menghitung Hari"}
        </span>
        <h2 className="title reveal-el" style={{ marginTop: "12px", color: "#f6ecd8" }}>
          {isPassed ? "Alhamdulillah" : "Menuju Hari"}
          <br />
          {isPassed ? "Acara Telah Berlangsung" : "Bahagia"}
        </h2>

        {isPassed ? (
          <div className="countdown-passed-card reveal-el">
            <p>
              Terima kasih atas doa dan restu seluruh keluarga, sahabat, dan kerabat yang telah
              menghadiri serta memeriahkan hari bahagia kami.
            </p>
          </div>
        ) : (
          <div className="count reveal-el">
            <div className="unit">
              <div className="n" id="cd-days">
                {timeLeft.days}
              </div>
              <div className="l">Hari</div>
            </div>
            <div className="unit">
              <div className="n" id="cd-hours">
                {timeLeft.hours}
              </div>
              <div className="l">Jam</div>
            </div>
            <div className="unit">
              <div className="n" id="cd-mins">
                {timeLeft.minutes}
              </div>
              <div className="l">Menit</div>
            </div>
            <div className="unit">
              <div className="n" id="cd-secs">
                {timeLeft.seconds}
              </div>
              <div className="l">Detik</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

