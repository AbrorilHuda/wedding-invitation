import React, { useState } from "react";
import confetti from "canvas-confetti";

interface RsvpProps {
  initialName?: string;
  onShowToast: (msg: string) => void;
  onSubmitSuccess?: (rsvpData: {
    name: string;
    status: string;
    count: string;
    message: string;
  }) => void;
}

export function Rsvp({ initialName = "", onShowToast, onSubmitSuccess }: RsvpProps) {
  const [name, setName] = useState(initialName);
  const [status, setStatus] = useState<"Hadir" | "Tidak Hadir">("Hadir");
  const [count, setCount] = useState("1 Orang");
  const [message, setMessage] = useState("");

  // Update name if prop changes
  React.useEffect(() => {
    if (initialName && !name) {
      setName(initialName);
    }
  }, [initialName]);

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

    onShowToast(`Terima kasih, ${trimmedName}! ✦`);

    if (onSubmitSuccess) {
      onSubmitSuccess({
        name: trimmedName,
        status,
        count,
        message: message.trim(),
      });
    }

    setMessage("");
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

          <button
            type="submit"
            className="btn btn-solid btn-full"
            data-testid="rsvp-submit-button"
          >
            Kirim Konfirmasi
          </button>
        </form>
      </div>
    </section>
  );
}
