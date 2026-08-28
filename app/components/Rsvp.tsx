import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface RsvpData {
  name: string;
  status: "Hadir" | "Tidak Hadir";
  count: string;
  message: string;
  timestamp?: string;
}

interface RsvpProps {
  initialName?: string;
  onShowToast: (msg: string) => void;
  onSubmitSuccess?: (rsvpData: RsvpData) => void;
}

export function Rsvp({ initialName = "", onShowToast, onSubmitSuccess }: RsvpProps) {
  const [name, setName] = useState(initialName);
  const [status, setStatus] = useState<"Hadir" | "Tidak Hadir">("Hadir");
  const [count, setCount] = useState("1 Orang");
  const [message, setMessage] = useState("");
  const [savedRsvp, setSavedRsvp] = useState<RsvpData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load existing RSVP from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("my_wedding_rsvp");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name) {
          setSavedRsvp(parsed);
          setName(parsed.name);
          setStatus(parsed.status || "Hadir");
          setCount(parsed.count || "1 Orang");
          setMessage(parsed.message || "");
        }
      }
    } catch (e) {
      // Ignore localStorage error
    }
  }, []);

  // Update name if prop changes and not edited yet
  useEffect(() => {
    if (initialName && !name && !savedRsvp) {
      setName(initialName);
    }
  }, [initialName, name, savedRsvp]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      onShowToast("Mohon isi nama Anda");
      return;
    }

    // Trigger celebration if Hadir
    if (status === "Hadir") {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#b48a4a", "#c9a56a", "#f7f1e7", "#e4d3be"],
        });
      } catch (err) {
        // Fallback gracefully
      }
    }

    const rsvpPayload: RsvpData = {
      name: trimmedName,
      status,
      count: status === "Hadir" ? count : "0 Orang",
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    // Save to local storage
    try {
      localStorage.setItem("my_wedding_rsvp", JSON.stringify(rsvpPayload));
      setSavedRsvp(rsvpPayload);
      setIsEditing(false);
    } catch (err) {
      // Ignore
    }

    onShowToast(`Terima kasih, ${trimmedName}! ✦`);

    if (onSubmitSuccess) {
      onSubmitSuccess(rsvpPayload);
    }
  };

  return (
    <section className="bg-beige pad" id="rsvp">
      <div className="wrap" style={{ textAlign: "center" }}>
        <span className="num-tag reveal-el">05 — Konfirmasi</span>
        <h2 className="title reveal-el" style={{ marginTop: "10px" }}>
          RSVP
        </h2>
        <p
          className="lede reveal-el"
          style={{ margin: "16px auto 36px", textAlign: "center" }}
        >
          Mohon konfirmasi kehadiran Anda untuk membantu kami mempersiapkan hari
          istimewa ini.
        </p>

        {savedRsvp && !isEditing ? (
          <div className="rsvp-confirmed-card reveal-el">
            <div className="confirmed-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="confirmed-title serif">Konfirmasi Terkirim</div>
            <div className="confirmed-name">{savedRsvp.name}</div>
            <div className="confirmed-badge">
              Status: <strong>{savedRsvp.status}</strong>
              {savedRsvp.status === "Hadir" && ` (${savedRsvp.count})`}
            </div>
            {savedRsvp.message && (
              <p className="confirmed-msg">&ldquo;{savedRsvp.message}&rdquo;</p>
            )}
            <button
              type="button"
              className="btn-edit-rsvp"
              onClick={() => setIsEditing(true)}
            >
              Ubah Konfirmasi
            </button>
          </div>
        ) : (
          <form
            id="rsvpForm"
            className="reveal-el"
            style={{ textAlign: "left" }}
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label htmlFor="rsvpNama">Nama Lengkap</label>
              <input
                type="text"
                id="rsvpNama"
                placeholder="Nama Anda"
                required
                data-testid="rsvp-name-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Konfirmasi Kehadiran</label>
              <div className="radio-row">
                <label
                  data-testid="rsvp-hadir"
                  className={status === "Hadir" ? "active" : ""}
                >
                  <input
                    type="radio"
                    name="hadir"
                    value="Hadir"
                    checked={status === "Hadir"}
                    onChange={() => setStatus("Hadir")}
                  />
                  <span>Hadir</span>
                </label>
                <label
                  data-testid="rsvp-tidak"
                  className={status === "Tidak Hadir" ? "active" : ""}
                >
                  <input
                    type="radio"
                    name="hadir"
                    value="Tidak Hadir"
                    checked={status === "Tidak Hadir"}
                    onChange={() => setStatus("Tidak Hadir")}
                  />
                  <span>Tidak Hadir</span>
                </label>
              </div>
            </div>

            {status === "Hadir" && (
              <div className="field">
                <label htmlFor="rsvpJumlah">Jumlah Tamu</label>
                <select
                  id="rsvpJumlah"
                  data-testid="rsvp-count-select"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                >
                  <option value="1 Orang">1 Orang</option>
                  <option value="2 Orang">2 Orang</option>
                  <option value="3 Orang">3 Orang</option>
                  <option value="4 Orang">4 Orang</option>
                </select>
              </div>
            )}

            <div className="field">
              <label htmlFor="rsvpPesan">Pesan (opsional)</label>
              <textarea
                id="rsvpPesan"
                placeholder="Tuliskan pesan singkat..."
                data-testid="rsvp-message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="rsvp-btn-row">
              {isEditing && savedRsvp && (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setIsEditing(false)}
                  style={{ flex: 1 }}
                >
                  Batal
                </button>
              )}
              <button
                type="submit"
                className="btn btn-solid btn-full"
                data-testid="rsvp-submit-button"
                style={{ flex: 2 }}
              >
                {savedRsvp ? "Perbarui Konfirmasi" : "Kirim Konfirmasi"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

