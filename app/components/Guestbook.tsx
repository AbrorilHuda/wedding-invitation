import React, { useState, useEffect, useRef } from "react";
import type { Wish } from "../types/invitation";
import { WEDDING_CONFIG } from "../config/wedding";
import { sendWish, subscribeToWishes, type RsvpPayload } from "../services/weddingService";
import { AllWishesModal } from "./AllWishesModal";
import { containsProfanity } from "../utils/contentFilter";

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

const COOLDOWN_DURATION = 30; // 30 seconds cooldown between submissions
const MAX_MESSAGE_LENGTH = 300;
const MIN_MESSAGE_LENGTH = 5;

// URL/Link pattern detector for spam protection
const LINK_SPAM_REGEX = /(https?:\/\/|www\.|t\.me\/|wa\.me\/|bit\.ly\/|[a-zA-Z0-9-]+\.(com|id|net|org|xyz|top|online|site|vip|shop|fun|click|link|info)\b)/i;

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
  userRsvp?: RsvpPayload | null;
  onShowToast: (msg: string) => void;
}

export function Guestbook({ userRsvp: userRsvpProp, onShowToast }: GuestbookProps) {
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [activeRsvp, setActiveRsvp] = useState<RsvpPayload | null>(userRsvpProp || null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Anti-spam states
  const [honeypot, setHoneypot] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const lastSubmittedMsg = useRef<string>("");

  // Sync prop or check localStorage for active RSVP
  useEffect(() => {
    if (userRsvpProp) {
      setActiveRsvp(userRsvpProp);
      return;
    }

    try {
      const stored = localStorage.getItem("my_wedding_rsvp");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name) {
          setActiveRsvp(parsed);
        }
      }
    } catch (e) {
      // Ignore
    }
  }, [userRsvpProp]);

  // Check existing cooldown on mount
  useEffect(() => {
    try {
      const lastWishTime = localStorage.getItem("wedding_last_wish_time");
      if (lastWishTime) {
        const elapsed = Math.floor((Date.now() - parseInt(lastWishTime, 10)) / 1000);
        if (elapsed < COOLDOWN_DURATION) {
          setCooldown(COOLDOWN_DURATION - elapsed);
        }
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  // Cooldown countdown interval
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  // Subscribe to realtime wishes
  useEffect(() => {
    const unsubscribe = subscribeToWishes((liveWishes) => {
      if (liveWishes && liveWishes.length > 0) {
        setWishes(liveWishes);
      }
    }, INITIAL_WISHES);

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot check (trap automated spam bots)
    if (honeypot.trim() !== "") {
      // Silently pretend it worked to confuse bot
      setMessage("");
      onShowToast("Ucapan & doa terkirim! ✦");
      return;
    }

    if (!activeRsvp) {
      onShowToast("Silakan isi konfirmasi RSVP terlebih dahulu");
      return;
    }

    // 2. Cooldown check
    if (cooldown > 0) {
      onShowToast(`Mohon tunggu ${cooldown} detik sebelum mengirim lagi`);
      return;
    }

    const trimmedMessage = message.trim();

    // 3. Length validation
    if (!trimmedMessage || trimmedMessage.length < MIN_MESSAGE_LENGTH) {
      onShowToast(`Ucapan terlalu pendek (minimal ${MIN_MESSAGE_LENGTH} karakter)`);
      return;
    }

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      onShowToast(`Ucapan maksimal ${MAX_MESSAGE_LENGTH} karakter`);
      return;
    }

    // 4. Link / Spam domain detection
    if (LINK_SPAM_REGEX.test(trimmedMessage)) {
      onShowToast("Demi keamanan, dilarang menyertakan link/tautan website");
      return;
    }

    // 5. Profanity & forbidden words check
    if (containsProfanity(trimmedMessage)) {
      onShowToast("Pesan mengandung kata tidak pantas. Mohon gunakan bahasa yang sopan.");
      return;
    }

    // 6. Duplicate message check
    if (lastSubmittedMsg.current && lastSubmittedMsg.current === trimmedMessage) {
      onShowToast("Anda sudah mengirimkan ucapan ini");
      return;
    }

    setIsSubmitting(true);

    try {
      const addedWish = await sendWish({
        name: activeRsvp.name,
        status: activeRsvp.status,
        message: trimmedMessage,
      });

      // Optimistic update if offline / local
      setWishes((prev) => {
        if (prev.some((w) => w.id === addedWish.id)) return prev;
        return [addedWish, ...prev];
      });

      lastSubmittedMsg.current = trimmedMessage;
      setMessage("");
      
      // Start cooldown
      setCooldown(COOLDOWN_DURATION);
      try {
        localStorage.setItem("wedding_last_wish_time", Date.now().toString());
      } catch (e) {
        // Ignore
      }

      onShowToast("Ucapan & doa terkirim! ✦");
    } catch (err) {
      onShowToast("Gagal mengirim ucapan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewWishes = wishes.slice(0, 3);

  return (
    <>
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

          {!activeRsvp ? (
            /* LOCKED STATE: Guest hasn't filled RSVP yet */
            <div className="wish-locked-card reveal-el">
              <div className="locked-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="serif locked-title">Konfirmasi Kehadiran Terlebih Dahulu</h3>
              <p className="locked-desc">
                Silakan lakukan konfirmasi kehadiran (RSVP) di atas sebelum menuliskan ucapan &amp; doa untuk mempelai.
              </p>
              <a
                href="#rsvp"
                className="btn btn-solid btn-go-rsvp"
                onClick={(e) => {
                  e.preventDefault();
                  const rsvpEl = document.getElementById("rsvp");
                  if (rsvpEl) {
                    rsvpEl.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "14px", height: "14px" }}>
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                Isi RSVP Sekarang
              </a>
            </div>
          ) : (
            /* UNLOCKED FORM: Guest has completed RSVP */
            <form
              id="wishForm"
              className="reveal-el"
              style={{ textAlign: "left" }}
              onSubmit={handleSubmit}
            >
              {/* Bot Honeypot Trap (Hidden from humans) */}
              <div
                style={{
                  position: "absolute",
                  left: "-9999px",
                  opacity: 0,
                  height: 0,
                  width: 0,
                  overflow: "hidden",
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="user_homepage_confirm"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                />
              </div>

              {/* Sender preview badge */}
              <div className="wish-sender-bar">
                <div className="wish-avatar">{getInitial(activeRsvp.name)}</div>
                <div className="wish-sender-text">
                  <div className="sender-label">Mengirim sebagai</div>
                  <div className="sender-name serif">{activeRsvp.name}</div>
                </div>
                <span className={`badge ${activeRsvp.status === "Tidak Hadir" ? "badge-absent" : ""}`}>
                  {activeRsvp.status}
                </span>
              </div>

              <div className="field" style={{ marginTop: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label htmlFor="wishPesan" style={{ margin: 0 }}>Tuliskan Ucapan &amp; Doa</label>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      color: message.length >= MAX_MESSAGE_LENGTH ? "#b91c1c" : "var(--muted)",
                      fontWeight: message.length >= MAX_MESSAGE_LENGTH ? 600 : 400,
                    }}
                  >
                    {message.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
                <textarea
                  id="wishPesan"
                  placeholder="Tuliskan ucapan selamat &amp; doa terbaik Anda untuk kedua mempelai..."
                  required
                  maxLength={MAX_MESSAGE_LENGTH}
                  data-testid="wish-message-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-solid btn-full"
                data-testid="wish-submit-button"
                disabled={isSubmitting || cooldown > 0}
                style={{
                  opacity: cooldown > 0 ? 0.75 : 1,
                  cursor: cooldown > 0 ? "not-allowed" : "pointer",
                }}
              >
                {isSubmitting
                  ? "Mengirim..."
                  : cooldown > 0
                  ? `Tunggu ${cooldown} detik...`
                  : "Kirim Ucapan & Doa"}
              </button>
            </form>
          )}

          {/* List of Preview Wishes */}
          <div className="wish-list" id="wishList" data-testid="wish-list">
            {previewWishes.map((w) => (
              <div key={w.id || w.n + w.p} className="wish">
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

          {wishes.length > 3 && (
            <div style={{ marginTop: "24px" }} className="reveal-el">
              <button
                type="button"
                className="btn btn-ghost see-all-wishes-btn"
                onClick={() => setIsModalOpen(true)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ width: "16px", height: "16px" }}
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                Lihat Semua Ucapan &amp; Doa ({wishes.length})
              </button>
            </div>
          )}
        </div>
      </section>

      <AllWishesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        wishes={wishes}
      />
    </>
  );
}


