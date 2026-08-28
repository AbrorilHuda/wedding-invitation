import React, { useState, useEffect } from "react";
import { WEDDING_CONFIG } from "../config/wedding";

const TARGET_DATE = new Date(WEDDING_CONFIG.event.dateIso).getTime();
// Estimasi durasi acara resepsi: 8 jam dari waktu mulai
const EVENT_DURATION_MS = 8 * 60 * 60 * 1000;

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

type EventStatus = "COUNTDOWN" | "TODAY" | "FINISHED";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [eventStatus, setEventStatus] = useState<EventStatus>("COUNTDOWN");

  useEffect(() => {
    function calculate() {
      const now = Date.now();
      const diff = TARGET_DATE - now;

      if (diff > 0) {
        setEventStatus("COUNTDOWN");
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
      } else if (now <= TARGET_DATE + EVENT_DURATION_MS) {
        setEventStatus("TODAY");
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      } else {
        setEventStatus("FINISHED");
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      }
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
          {eventStatus === "COUNTDOWN"
            ? "Menghitung Hari"
            : eventStatus === "TODAY"
            ? "Hari Bahagia"
            : "Terima Kasih"}
        </span>
        <h2 className="title reveal-el" style={{ marginTop: "12px", color: "#f6ecd8" }}>
          {eventStatus === "COUNTDOWN" ? (
            <>
              Menuju Hari
              <br />
              Bahagia
            </>
          ) : eventStatus === "TODAY" ? (
            <>
              Hari Ini
              <br />
              Sedang Berlangsung
            </>
          ) : (
            <>
              Alhamdulillah
              <br />
              Acara Telah Selesai
            </>
          )}
        </h2>

        {eventStatus === "FINISHED" ? (
          <div className="countdown-passed-card reveal-el">
            <p>
              Terima kasih atas doa dan restu seluruh keluarga, sahabat, dan kerabat yang telah
              menghadiri serta memeriahkan hari bahagia kami.
            </p>
          </div>
        ) : eventStatus === "TODAY" ? (
          <div className="countdown-passed-card reveal-el">
            <p>
              Alhamdulillah, hari pernikahan kami sedang berlangsung hari ini ({WEDDING_CONFIG.event.dateDisplay}).
              Merupakan kebahagiaan bagi kami atas kehadiran dan doa restu Anda.
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

