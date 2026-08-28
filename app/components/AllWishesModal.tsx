import React, { useState, useEffect } from "react";
import type { Wish } from "../types/invitation";

interface AllWishesModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishes: Wish[];
}

function getInitial(name: string): string {
  if (!name) return "✦";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function AllWishesModal({ isOpen, onClose, wishes }: AllWishesModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"Semua" | "Hadir" | "Tidak Hadir">("Semua");

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSearchQuery("");
      setActiveFilter("Semua");
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredWishes = wishes.filter((w) => {
    const matchesSearch =
      w.n.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.p.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "Semua") return matchesSearch;
    return matchesSearch && w.h === activeFilter;
  });

  const countHadir = wishes.filter((w) => w.h === "Hadir").length;
  const countTidakHadir = wishes.filter((w) => w.h === "Tidak Hadir").length;

  return (
    <div
      className="wishes-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="wishes-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="wishes-modal-header">
          <div>
            <span className="num-tag" style={{ fontSize: "0.55rem" }}>
              Buku Tamu Digital
            </span>
            <h3 className="wishes-modal-title serif">Semua Ucapan &amp; Doa</h3>
            <span className="wishes-modal-badge">{wishes.length} Pesan Masuk</span>
          </div>
          <button
            type="button"
            className="wishes-modal-close"
            onClick={onClose}
            aria-label="Tutup"
          >
            &times;
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="wishes-modal-toolbar">
          <div className="wishes-search-box">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="search-icon"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Cari nama atau isi doa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
              >
                &times;
              </button>
            )}
          </div>

          <div className="wishes-filter-pills">
            <button
              type="button"
              className={`filter-pill ${activeFilter === "Semua" ? "active" : ""}`}
              onClick={() => setActiveFilter("Semua")}
            >
              Semua ({wishes.length})
            </button>
            <button
              type="button"
              className={`filter-pill ${activeFilter === "Hadir" ? "active" : ""}`}
              onClick={() => setActiveFilter("Hadir")}
            >
              Hadir ({countHadir})
            </button>
            <button
              type="button"
              className={`filter-pill ${activeFilter === "Tidak Hadir" ? "active" : ""}`}
              onClick={() => setActiveFilter("Tidak Hadir")}
            >
              Tidak Hadir ({countTidakHadir})
            </button>
          </div>
        </div>

        {/* Wishes List */}
        <div className="wishes-modal-body">
          {filteredWishes.length > 0 ? (
            <div className="wishes-full-list">
              {filteredWishes.map((w) => (
                <div key={w.id || w.n + w.p} className="wish-card-modal">
                  <div className="wish-avatar">{getInitial(w.n)}</div>
                  <div className="wish-content">
                    <div className="top">
                      <span className="nm serif">{w.n}</span>
                      <div className="wish-meta">
                        {w.createdAt && (
                          <span className="wish-time">{w.createdAt}</span>
                        )}
                        <span
                          className={`badge ${
                            w.h === "Tidak Hadir" ? "badge-absent" : ""
                          }`}
                        >
                          {w.h}
                        </span>
                      </div>
                    </div>
                    <p>{w.p}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="wishes-empty-state">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="empty-icon"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <p>Tidak ada ucapan yang cocok dengan pencarian.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="wishes-modal-footer">
          <button type="button" className="btn btn-solid" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
