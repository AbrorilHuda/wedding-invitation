import React, { useState } from "react";
import { WEDDING_CONFIG } from "../config/wedding";

interface EventDetailsProps {
  onShowToast: (msg: string) => void;
}

export function EventDetails({ onShowToast }: EventDetailsProps) {
  const { event, groom, bride } = WEDDING_CONFIG;
  const [addressCopied, setAddressCopied] = useState(false);

  // Google Calendar URL
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.icsSummary
  )}&dates=${event.icsStart}/${event.icsEnd}&details=${encodeURIComponent(
    event.icsDescription
  )}&location=${encodeURIComponent(`${event.venue}, ${event.address}`)}`;

  const handleSaveIcs = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      `PRODID:${event.icsProdId}`,
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `SUMMARY:${event.icsSummary}`,
      `DTSTART:${event.icsStart}`,
      `DTEND:${event.icsEnd}`,
      `LOCATION:${event.venue}, ${event.address}`,
      `DESCRIPTION:${event.icsDescription}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${groom.name}-${bride.name}-Wedding.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    onShowToast("Tersimpan ke kalender ✦");
  };

  const handleCopyAddress = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(`${event.venue}, ${event.address}`);
    }
    setAddressCopied(true);
    onShowToast("Alamat berhasil disalin ✦");
    setTimeout(() => setAddressCopied(false), 2000);
  };

  return (
    <section className="bg-blush pad" id="acara">
      <div className="wrap" style={{ textAlign: "center" }}>
        <span className="num-tag reveal-el">03 — Save The Date</span>
        <h2 className="title reveal-el" style={{ marginTop: "10px" }}>
          {event.title}
          <br />
          Pernikahan
        </h2>

        <div className="event-card reveal-el" style={{ marginTop: "44px" }}>
          <div className="ttl serif">{event.title}</div>
          <div className="event-when serif">{event.dateDisplay}</div>

          <div className="event-row">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <span>{event.time}</span>
          </div>

          <div className="divider" style={{ margin: "22px 0" }}>
            <span className="bar" />
            <span className="dot" />
            <span className="bar" />
          </div>

          <div className="event-row">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <strong>{event.venue}</strong>
          </div>

          <p
            style={{
              color: "var(--ink-soft)",
              fontWeight: 300,
              marginTop: "6px",
              fontSize: "0.92rem",
            }}
          >
            {event.address}
          </p>

          <div className="event-quick-actions">
            <button
              type="button"
              className="action-chip"
              onClick={handleCopyAddress}
              data-testid="copy-address-button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <rect x="9" y="9" width="12" height="12" rx="2" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </svg>
              {addressCopied ? "Alamat Tersalin ✓" : "Salin Alamat"}
            </button>
          </div>

          <div className="btn-row">
            <a
              className="btn btn-solid"
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="view-map-button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Buka Google Maps
            </a>

            <div className="cal-btn-group">
              <a
                className="btn btn-ghost"
                href={googleCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="google-calendar-button"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                Google Calendar
              </a>

              <a
                className="btn btn-ghost btn-ics"
                id="saveDateBtn"
                href="#savedate"
                onClick={handleSaveIcs}
                data-testid="save-date-button"
                title="Unduh file .ics untuk Apple Calendar / Outlook"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Apple / .ICS
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

