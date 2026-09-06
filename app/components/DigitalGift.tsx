import React, { useState } from "react";
import { WEDDING_CONFIG } from "../config/wedding";

function formatAccountNumber(num: string): string {
  return num.replace(/(\d{4})(?=\d)/g, "$1 ");
}

const BANK_LOGOS: Record<string, { src: string; alt: string; height: number }> = {
  bri: { src: "/images/banks/bri.webp", alt: "Bank BRI", height: 26 },
  dana: { src: "/images/banks/dana.webp", alt: "DANA", height: 22 },
  bca: { src: "/images/banks/bca.webp", alt: "BCA", height: 22 },
  mandiri: { src: "/images/banks/mandiri.webp", alt: "Bank Mandiri", height: 24 },
};

function BankLogo({ bankName }: { bankName: string }) {
  const name = bankName.toLowerCase();
  const matchKey = Object.keys(BANK_LOGOS).find((k) => name.includes(k));

  if (matchKey) {
    const logo = BANK_LOGOS[matchKey];
    return (
      <div className="bank-logo-flat-wrap">
        <img
          src={logo.src}
          alt={logo.alt}
          className="bank-logo-flat"
          style={{ height: `${logo.height}px`, width: "auto", objectFit: "contain" }}
          loading="lazy"
        />
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
  const physicalGift = WEDDING_CONFIG.physicalGift;
  const [qrisModalOpen, setQrisModalOpen] = useState(false);
  const [copiedBankIdx, setCopiedBankIdx] = useState<number | null>(null);
  const [physicalCopied, setPhysicalCopied] = useState(false);
  const [physicalOpen, setPhysicalOpen] = useState(false);

  const handleCopy = (accNumber: string, label: string, index: number) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(accNumber)
        .then(() => {
          setCopiedBankIdx(index);
          onShowToast(`Nomor ${label} disalin ✦`);
          setTimeout(() => setCopiedBankIdx(null), 2000);
        })
        .catch(() => {
          onShowToast("Gagal menyalin");
        });
    } else {
      try {
        const temp = document.createElement("textarea");
        temp.value = accNumber;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
        setCopiedBankIdx(index);
        onShowToast(`Nomor ${label} disalin ✦`);
        setTimeout(() => setCopiedBankIdx(null), 2000);
      } catch (err) {
        onShowToast("Gagal menyalin");
      }
    }
  };

  const handleCopyPhysicalAddress = () => {
    if (!physicalGift) return;
    const textToCopy = `Penerima: ${physicalGift.recipient}\nNo. HP: ${physicalGift.phone}\nAlamat: ${physicalGift.address}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy);
    }
    setPhysicalCopied(true);
    onShowToast("Alamat pengiriman kado disalin ✦");
    setTimeout(() => setPhysicalCopied(false), 2000);
  };

  return (
    <section className="bg-blush pad" id="kado">
      <div className="wrap" style={{ textAlign: "center" }}>
        <span className="num-tag reveal-el">07 — Tanda Kasih</span>
        <h2 className="title reveal-el" style={{ marginTop: "10px" }}>
          Ungkapan Kasih
        </h2>
        <p
          className="lede reveal-el"
          style={{ margin: "16px auto 36px", textAlign: "center" }}
        >
          Doa restu Anda merupakan karunia terindah bagi kami. Bagi keluarga dan
          sahabat yang ingin memberikan tanda kasih secara non-tunai, dapat
          melalui rekening maupun dompet digital berikut:
        </p>

        <div className="gift-cards-grid">
          {bankAccounts.map((acc, idx) => (
            <div key={acc.bank + idx} className="gift-card reveal-el">
              <div className="gift-card-top">
                <BankLogo bankName={acc.bank} />
                <span className="gift-card-type">Rekening / E-Wallet</span>
              </div>

              <div className="gift-card-body">
                <div className="bank-name-label">{acc.bank}</div>
                <div className="no serif" id={`acc${idx + 1}`}>
                  {formatAccountNumber(acc.accountNumber)}
                </div>
                <div className="an">{acc.accountHolder}</div>
              </div>

              <div className="gift-card-footer">
                <button
                  className={`copy-btn ${copiedBankIdx === idx ? "copied" : ""}`}
                  data-acc={acc.accountNumber}
                  data-testid={acc.testId}
                  onClick={() => handleCopy(acc.accountNumber, acc.bank, idx)}
                  type="button"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    {copiedBankIdx === idx ? (
                      <path d="M20 6L9 17l-5-5" />
                    ) : (
                      <>
                        <rect x="9" y="9" width="12" height="12" rx="2" />
                        <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                      </>
                    )}
                  </svg>
                  {copiedBankIdx === idx ? "Tersalin! ✓" : "Salin Nomor"}
                </button>
              </div>
            </div>
          ))}

          {/* QRIS Card (Tampil jika ada QRIS Image yang dikonfigurasi) */}
          {qrisImage ? (
            <div className="gift-card qris-card reveal-el">
              <div className="gift-card-top">
                <div className="bank-logo-flat-wrap">
                  <img
                    src="/images/banks/qris.webp"
                    alt="Logo QRIS"
                    className="bank-logo-flat qris-logo-flat"
                    style={{ height: "24px", width: "auto", objectFit: "contain" }}
                    loading="lazy"
                  />
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

          {/* Physical Gift Delivery Card */}
          {physicalGift && (
            <div className="physical-gift-wrapper reveal-el">
              <button
                type="button"
                className="physical-gift-toggle"
                onClick={() => setPhysicalOpen(!physicalOpen)}
                aria-expanded={physicalOpen}
              >
                <div className="toggle-left">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="box-icon"
                  >
                    <polyline points="21 8 21 21 3 21 3 8" />
                    <rect x="1" y="3" width="22" height="5" />
                    <line x1="10" y1="12" x2="14" y2="12" />
                  </svg>
                  <span>Kirim Kado Fisik / Parsel</span>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`chevron-icon ${physicalOpen ? "open" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {physicalOpen && (
                <div className="physical-gift-card">
                  <div className="recipient-row">
                    <span className="lbl">Penerima:</span>
                    <strong>{physicalGift.recipient}</strong>
                  </div>
                  <div className="phone-row">
                    <span className="lbl">No. Telepon:</span>
                    <span>{physicalGift.phone}</span>
                  </div>
                  <div className="address-box">
                    <span className="lbl">Alamat Pengiriman:</span>
                    <p>{physicalGift.address}</p>
                  </div>
                  <button
                    type="button"
                    className={`copy-btn physical-copy-btn ${physicalCopied ? "copied" : ""}`}
                    onClick={handleCopyPhysicalAddress}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      {physicalCopied ? (
                        <path d="M20 6L9 17l-5-5" />
                      ) : (
                        <>
                          <rect x="9" y="9" width="12" height="12" rx="2" />
                          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                        </>
                      )}
                    </svg>
                    {physicalCopied ? "Alamat Tersalin ✓" : "Salin Alamat Kado"}
                  </button>
                </div>
              )}
            </div>
          )}
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

