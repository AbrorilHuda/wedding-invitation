import React from "react";
import type { BankAccount } from "../types/invitation";

const BANK_ACCOUNTS: BankAccount[] = [
  {
    bank: "Bank BCA",
    accountNumber: "1234567890",
    accountHolder: "a.n. Miftah Pratama",
    testId: "copy-bca-button",
  },
  {
    bank: "Bank Mandiri",
    accountNumber: "0987654321",
    accountHolder: "a.n. Sofia Anindya",
    testId: "copy-mandiri-button",
  },
];

function formatAccountNumber(num: string): string {
  // Format as 4-digit groups (e.g. 1234 5678 90)
  return num.replace(/(\d{4})(?=\d)/g, "$1 ");
}

interface DigitalGiftProps {
  onShowToast: (msg: string) => void;
}

export function DigitalGift({ onShowToast }: DigitalGiftProps) {
  const handleCopy = (accNumber: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(accNumber)
        .then(() => {
          onShowToast("Nomor rekening disalin ✦");
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
        onShowToast("Nomor rekening disalin ✦");
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
          kasih, dapat melalui:
        </p>

        {BANK_ACCOUNTS.map((acc, idx) => (
          <div key={acc.bank} className="gift-card reveal-el">
            <div className="bank">{acc.bank}</div>
            <div className="no" id={`acc${idx + 1}`}>
              {formatAccountNumber(acc.accountNumber)}
            </div>
            <div className="an">{acc.accountHolder}</div>
            <button
              className="copy-btn"
              data-acc={acc.accountNumber}
              data-testid={acc.testId}
              onClick={() => handleCopy(acc.accountNumber)}
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
        ))}
      </div>
    </section>
  );
}
