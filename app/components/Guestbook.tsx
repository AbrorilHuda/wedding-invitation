import React, { useState, useEffect } from "react";
import type { Wish } from "../types/invitation";
import { WEDDING_CONFIG } from "../config/wedding";

const INITIAL_WISHES: Wish[] = [
  {
    id: "1",
    n: "Rizky Ananda",
    h: "Hadir",
    p: "Barakallahu lakuma wa baraka alaikuma. Semoga menjadi keluarga sakinah, mawaddah, warahmah!",
    createdAt: "2 jam yang lalu",
  },
  {
    id: "2",
    n: "Dewi Lestari",
    h: "Hadir",
    p: `Selamat menempuh hidup baru ${WEDDING_CONFIG.groom.name} & ${WEDDING_CONFIG.bride.name}. Bahagia selalu ya!`,
    createdAt: "5 jam yang lalu",
  },
  {
    id: "3",
    n: "Fajar Nugroho",
    h: "Tidak Hadir",
    p: "Maaf belum bisa hadir langsung, tapi doa terbaik selalu menyertai kalian berdua.",
    createdAt: "Kemarin",
  },
];

function getInitial(name: string): string {
  if (!name) return "✦";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

interface GuestbookProps {
  initialName?: string;
  onShowToast: (msg: string) => void;
}

export function Guestbook({ initialName = "", onShowToast }: GuestbookProps) {
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [name, setName] = useState(initialName);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wedding_wishes_miftah_sofia");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishes(parsed);
        }
      }
    } catch (err) {
      // Ignore localStorage error in private mode / SSR
    }
  }, []);

  useEffect(() => {
    if (initialName && !name) {
      setName(initialName);
    }
  }, [initialName, name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      onShowToast("Mohon lengkapi ucapan Anda");
      return;
    }

    const newWish: Wish = {
      id: Date.now().toString(),
      n: trimmedName,
      h: "Hadir",
      p: trimmedMessage,
      createdAt: "Baru saja",
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);

    try {
      localStorage.setItem(
        "wedding_wishes_miftah_sofia",
        JSON.stringify(updated)
      );
    } catch (err) {
      // Ignore
    }

    setMessage("");
    onShowToast("Ucapan terkirim ✦");
  };

  return (
    <section className="bg-cream pad" id="ucapan">
      <div className="wrap" style={{ textAlign: "center" }}>
        <span className="num-tag reveal-el">06 — Doa &amp; Restu</span>
        <h2 className="title reveal-el" style={{ marginTop: "10px" }}>
          Ucapan &amp; Doa
        </h2>
        <p
          className="lede reveal-el"
          style={{ margin: "16px auto 30px", textAlign: "center" }}
        >
          Berikan doa dan ucapan terbaik untuk kedua mempelai.
        </p>

        <form
          id="wishForm"
          className="reveal-el"
          style={{ textAlign: "left" }}
          onSubmit={handleSubmit}
        >
          <div className="field">
            <label htmlFor="wishNama">Nama Anda</label>
            <input
              type="text"
              id="wishNama"
              placeholder="Nama Anda"
              required
              data-testid="wish-name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="wishPesan">Ucapan &amp; Doa</label>
            <textarea
              id="wishPesan"
              placeholder="Tuliskan ucapan &amp; doa Anda..."
              required
              data-testid="wish-message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-solid btn-full"
            data-testid="wish-submit-button"
          >
            Kirim Ucapan &amp; Doa
          </button>
        </form>

        <div className="wish-list" id="wishList" data-testid="wish-list">
          {wishes.map((w) => (
            <div key={w.id || w.n + w.p} className="wish">
              <div className="wish-avatar">{getInitial(w.n)}</div>
              <div className="wish-content">
                <div className="top">
                  <span className="nm serif">{w.n}</span>
                  <div className="wish-meta">
                    {w.createdAt && <span className="wish-time">{w.createdAt}</span>}
                    <span className={`badge ${w.h === "Tidak Hadir" ? "badge-absent" : ""}`}>
                      {w.h}
                    </span>
                  </div>
                </div>
                <p>{w.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

