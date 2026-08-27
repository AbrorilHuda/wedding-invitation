import React from "react";
import { WEDDING_CONFIG } from "../config/wedding";

interface EventDetailsProps {
  onShowToast: (msg: string) => void;
}

export function EventDetails({ onShowToast }: EventDetailsProps) {
  const { event, groom, bride } = WEDDING_CONFIG;

  const handleSaveDate = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
            {event.time}
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
            {event.venue}
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
              View on Map
            </a>

            <a
              className="btn btn-ghost"
              id="saveDateBtn"
              href="#savedate"
              onClick={handleSaveDate}
              data-testid="save-date-button"
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
              Save The Date
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
