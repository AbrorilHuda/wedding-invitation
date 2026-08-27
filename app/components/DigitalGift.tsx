import React, { useState } from "react";
import { WEDDING_CONFIG } from "../config/wedding";

function formatAccountNumber(num: string): string {
  // Format as 4-digit groups (e.g. 1234 5678 90)
  return num.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function CardChip() {
  return (
    <svg
      width="36"
      height="26"
      viewBox="0 0 36 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="card-chip"
    >
      <rect width="36" height="26" rx="4" fill="url(#chipGrad)" />
      <rect
        x="1"
        y="1"
        width="34"
        height="24"
        rx="3"
        stroke="#9A7B38"
        strokeWidth="0.8"
      />
      <line x1="0" y1="13" x2="36" y2="13" stroke="#8C6E2D" strokeWidth="0.8" />
      <line x1="13" y1="0" x2="13" y2="26" stroke="#8C6E2D" strokeWidth="0.8" />
      <line x1="23" y1="0" x2="23" y2="26" stroke="#8C6E2D" strokeWidth="0.8" />
      <circle
        cx="18"
        cy="13"
        r="3"
        fill="#D4AF37"
        stroke="#7A5E24"
        strokeWidth="0.8"
      />
      <defs>
        <linearGradient
          id="chipGrad"
          x1="0"
          y1="0"
          x2="36"
          y2="26"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F5D77F" />
          <stop offset="0.5" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#AA8222" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BankLogo({ bankName }: { bankName: string }) {
  const name = bankName.toLowerCase();

  if (name.includes("bri")) {
    return (
      <div className="bank-badge bri-badge">
        <svg viewBox="0 0 100 30" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text
            x="4"
            y="22"
            fill="#00529C"
            fontSize="22"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.05em"
          >
            BRI
          </text>
          <text
            x="48"
            y="21"
            fill="#F37021"
            fontSize="10"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.1em"
          >
            BANK
          </text>
        </svg>
      </div>
    );
  }

  if (name.includes("dana")) {
    return (
      <div className="bank-badge dana-badge">
        <svg viewBox="0 0 95 28" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="95" height="28" rx="5" fill="#118EEA" />
          <text
            x="47"
            y="19"
            fill="#FFFFFF"
            fontSize="16"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.15em"
            textAnchor="middle"
          >
            DANA
          </text>
        </svg>
      </div>
    );
  }

  if (name.includes("bca")) {
    return (
      <div className="bank-badge bca-badge">
        <svg viewBox="0 0 90 28" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="90" height="28" rx="5" fill="#0060AF" />
          <text
            x="45"
            y="19"
            fill="#FFFFFF"
            fontSize="16"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.1em"
            textAnchor="middle"
          >
            BCA
          </text>
        </svg>
      </div>
    );
  }

  if (name.includes("mandiri")) {
    return (
      <div className="bank-badge mandiri-badge">
        <svg viewBox="0 0 100 28" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="28" rx="5" fill="#003D79" />
          <text
            x="44"
            y="19"
            fill="#FFFFFF"
            fontSize="13"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
          >
            mandiri
          </text>
          <path d="M78 8c5 0 9 3 12 8-3-2-7-4-12-4V8z" fill="#F8A01B" />
        </svg>
      </div>
    );
  }

  if (name.includes("bni")) {
    return (
      <div className="bank-badge bni-badge">
        <svg viewBox="0 0 85 28" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="85" height="28" rx="5" fill="#005E6A" />
          <text
            x="42"
            y="19"
            fill="#FFFFFF"
            fontSize="15"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.1em"
            textAnchor="middle"
          >
            BNI
          </text>
        </svg>
      </div>
    );
  }

  return <div className="bank-badge generic-badge">{bankName}</div>;
}

interface DigitalGiftProps {
  onShowToast: (msg: string) => void;
}

export function DigitalGift({ onShowToast }: DigitalGiftProps) {
  const bankAccounts = WEDDING_CONFIG.bankAccounts;
  const qrisImage = WEDDING_CONFIG.qrisImage;
  const [qrisModalOpen, setQrisModalOpen] = useState(false);

  const handleCopy = (accNumber: string, label: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(accNumber)
        .then(() => {
          onShowToast(`Nomor ${label} disalin ✦`);
        })
        .catch(() => {
          onShowToast("Gagal menyalin");
        });
    } else {
      // Fallback
      try {
        const temp = document.createElement("textarea");
        temp.value = accNumber;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
        onShowToast(`Nomor ${label} disalin ✦`);
      } catch (err) {
        onShowToast("Gagal menyalin");
      }
    }
  };

  return (
    <section className="bg-blush pad" id="kado">
      <div className="wrap" style={{ textAlign: "center" }}>
        <span className="num-tag reveal-el">07 — Tanda Kasih</span>
        <h2 className="title reveal-el" style={{ marginTop: "10px" }}>
          Kado Digital
        </h2>
        <p
          className="lede reveal-el"
          style={{ margin: "16px auto 36px", textAlign: "center" }}
        >
          Doa restu Anda adalah hadiah terindah. Namun bila ingin memberi tanda
          kasih secara non-tunai, dapat melalui rekening maupun dompet digital
          berikut:
        </p>

        <div className="gift-cards-grid">
          {bankAccounts.map((acc, idx) => (
            <div key={acc.bank + idx} className="gift-card reveal-el">
              <div className="gift-card-top">
                <BankLogo bankName={acc.bank} />
                <CardChip />
              </div>

              <div className="gift-card-body">
                <div className="bank-name-label">{acc.bank}</div>
                <div className="no" id={`acc${idx + 1}`}>
                  {formatAccountNumber(acc.accountNumber)}
                </div>
                <div className="an">{acc.accountHolder}</div>
              </div>

              <div className="gift-card-footer">
                <button
                  className="copy-btn"
                  data-acc={acc.accountNumber}
                  data-testid={acc.testId}
                  onClick={() => handleCopy(acc.accountNumber, acc.bank)}
                  type="button"
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
                  Salin Nomor
                </button>
              </div>
            </div>
          ))}

          {/* QRIS Card (Tampil jika ada QRIS Image yang dikonfigurasi) */}
          {qrisImage ? (
            <div className="gift-card qris-card reveal-el">
              <div className="gift-card-top">
                <div className="qris-header-badge">
                  <span style={{ color: "#EA1C24", fontWeight: 900 }}>QR</span>
                  <span style={{ color: "#1E293B", fontWeight: 900 }}>IS</span>
                  <span className="qris-sub">Pembayaran Nasional</span>
                </div>
                <span className="qris-gpn-tag">GPN</span>
              </div>

              <div className="qris-body">
                <div
                  className="qris-img-container"
                  onClick={() => setQrisModalOpen(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setQrisModalOpen(true);
                  }}
                >
                  <img
                    src={qrisImage}
                    alt="QRIS Pembayaran"
                    className="qris-img"
                    loading="lazy"
                  />
                  <div className="qris-overlay-hint">Ketuk untuk perbesar</div>
                </div>
                <p className="qris-desc">
                  Mendukung transfer dari semua Bank (BCA, Mandiri, BRI, BNI) &amp;
                  E-Wallet (GoPay, DANA, OVO, ShopeePay).
                </p>
              </div>

              <div className="gift-card-footer">
                <a
                  href={qrisImage}
                  download="QRIS-Pernikahan.webp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="copy-btn qris-download-btn"
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
                  Unduh QRIS
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* QRIS Lightbox Modal */}
      {qrisModalOpen && qrisImage && (
        <div
          className="qris-modal-backdrop"
          onClick={() => setQrisModalOpen(false)}
        >
          <div
            className="qris-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="qris-modal-close"
              onClick={() => setQrisModalOpen(false)}
              type="button"
              aria-label="Tutup QRIS"
            >
              &times;
            </button>
            <div className="qris-modal-title">QRIS Pembayaran</div>
            <img
              src={qrisImage}
              alt="QRIS Pembayaran Full"
              className="qris-modal-img"
            />
            <p className="qris-modal-note">
              Scan menggunakan aplikasi Mobile Banking atau E-Wallet pilihan Anda
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
