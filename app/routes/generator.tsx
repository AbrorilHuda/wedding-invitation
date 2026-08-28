import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { WEDDING_CONFIG } from "../config/wedding";
import { Toast } from "../components/Toast";

// --- Clean SVG Icons ---
function IconArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg-ic">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="svg-ic">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.07c-.24.68-1.2 1.26-1.68 1.32-.45.06-1.02.09-3.05-.75-2.58-1.07-4.22-3.69-4.35-3.86-.13-.17-1.04-1.39-1.04-2.64s.66-1.87.9-2.12c.23-.25.5-.32.67-.32.17 0 .34 0 .49.01.16.01.37-.06.58.44.22.52.74 1.82.81 1.95.07.14.11.3.02.48-.09.18-.14.29-.28.45-.14.16-.3.35-.42.47-.14.14-.29.29-.12.58.17.29.74 1.22 1.59 1.98 1.1 1 2.03 1.31 2.32 1.45.29.14.46.12.63-.07.17-.19.74-.86.94-1.15.2-.29.4-.24.67-.14.28.1.1.74 2.22.84 2.35.1.13.17.22.2.27.03.05.03.3-.21.98z" />
    </svg>
  );
}

function IconCopy() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="svg-ic">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="svg-ic">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function IconExternalLink() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="svg-ic">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="svg-ic">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="svg-ic">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="svg-ic">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="svg-ic">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="svg-ic">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg-ic">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg-ic">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function IconSparkles() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="svg-ic">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

function IconFileText() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="svg-ic">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="svg-ic">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconSliders() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="svg-ic">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

function getInitial(name: string): string {
  if (!name) return "✦";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

interface GuestItem {
  id: string;
  name: string;
  phone?: string;
  sent: boolean;
  sentAt?: string;
}

type TemplateType = "formal" | "friendly" | "simple" | "custom";

const STORAGE_KEY = "wedding_guest_list_generator";
const TEMPLATE_CUSTOM_KEY = "wedding_custom_wa_template";

export function meta() {
  return [
    { title: `WhatsApp Invitation Studio — ${WEDDING_CONFIG.groom.name} & ${WEDDING_CONFIG.bride.name}` },
    { name: "description", content: "Studio generator link undangan pernikahan personal via WhatsApp." },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function Generator() {
  const [activeTab, setActiveTab] = useState<"single" | "batch" | "history">("single");
  const [templateType, setTemplateType] = useState<TemplateType>("formal");
  const [customTemplate, setCustomTemplate] = useState<string>("");

  // Single mode state
  const [singleName, setSingleName] = useState("");
  const [singlePhone, setSinglePhone] = useState("");

  // Batch mode state
  const [batchInput, setBatchInput] = useState("");

  // Guest list state for tracking
  const [guests, setGuests] = useState<GuestItem[]>([]);
  const [searchFilter, setSearchFilter] = useState("");

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const [baseUrl, setBaseUrl] = useState("");

  // Detect current base URL in browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(`${window.location.origin}`);
    }
  }, []);

  // Load saved guests & custom template from localStorage
  useEffect(() => {
    try {
      const storedGuests = localStorage.getItem(STORAGE_KEY);
      if (storedGuests) {
        setGuests(JSON.parse(storedGuests));
      }
      const storedCustom = localStorage.getItem(TEMPLATE_CUSTOM_KEY);
      if (storedCustom) {
        setCustomTemplate(storedCustom);
      } else {
        setCustomTemplate(
          `Kepada Yth.\nBapak/Ibu/Saudara/i {nama}\n\nAssalamu’alaikum Wr. Wb.\n\nTanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di pernikahan kami:\n\n💍 {mempelai} 💍\n📅 {tanggal}\n\nBuka link undangan & RSVP:\n{link}\n\nTerima kasih atas doa restunya 🙏`
        );
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  const saveGuests = (newGuests: GuestItem[]) => {
    setGuests(newGuests);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newGuests));
    } catch (e) {
      // Ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2400);
  };

  const couple = `${WEDDING_CONFIG.groom.name} & ${WEDDING_CONFIG.bride.name}`;
  const coupleFull = `${WEDDING_CONFIG.groom.fullName} & ${WEDDING_CONFIG.bride.fullName}`;
  const eventDate = WEDDING_CONFIG.event.dateDisplay;
  const eventVenue = `${WEDDING_CONFIG.event.venue}, ${WEDDING_CONFIG.event.address}`;

  const generateLink = (guestName: string) => {
    const cleanName = guestName.trim();
    if (!cleanName) return baseUrl || "/";
    return `${baseUrl || ""}/?to=${encodeURIComponent(cleanName)}`;
  };

  const getMessageText = (guestName: string) => {
    const link = generateLink(guestName);
    const name = guestName.trim() || "Tamu Undangan";

    switch (templateType) {
      case "formal":
        return (
          `Kepada Yth.\n` +
          `Bapak/Ibu/Saudara/i *${name}*\n\n` +
          `_Assalamu’alaikum Warahmatullahi Wabarakatuh_\n\n` +
          `Dengan memohon rahmat dan ridho Allah SWT, tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara resepsi pernikahan kami:\n\n` +
          `💍 *${couple}* 💍\n` +
          `(${coupleFull})\n\n` +
          `🗓 *Hari/Tgl:* ${eventDate}\n` +
          `⏰ *Waktu:* ${WEDDING_CONFIG.event.time}\n` +
          `📍 *Tempat:* ${eventVenue}\n\n` +
          `Informasi detail acara dan konfirmasi kehadiran (RSVP) dapat diakses melalui tautan undangan berikut:\n` +
          `👉 ${link}\n\n` +
          `Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami berdua.\n\n` +
          `Mohon maaf perihal undangan hanya dibagikan melalui pesan digital ini.\n\n` +
          `_Wassalamu’alaikum Warahmatullahi Wabarakatuh_\n\n` +
          `Kami yang berbahagia,\n` +
          `*${couple}* & Keluarga Besar`
        );

      case "friendly":
        return (
          `Halo *${name}*! 👋✨\n\n` +
          `Bismillah, dengan penuh rasa syukur dan bahagia, kami ingin mengundang kamu untuk hadir dan merayakan hari pernikahan kami:\n\n` +
          `✨ *The Wedding of ${couple}* ✨\n\n` +
          `🗓 *Hari/Tgl:* ${eventDate}\n` +
          `⏰ *Waktu:* ${WEDDING_CONFIG.event.time}\n` +
          `📍 *Lokasi:* ${WEDDING_CONFIG.event.venue}\n\n` +
          `Silakan buka link undangan berikut untuk melihat detail acara, panduan lokasi & mengisi RSVP ya:\n` +
          `👉 ${link}\n\n` +
          `Kehadiran dan doa restumu sangat berarti bagi kami. Sampai jumpa di hari bahagia kami! 🙏💖\n\n` +
          `Warm regards,\n` +
          `*${couple}*`
        );

      case "simple":
        return (
          `Undangan Pernikahan *${couple}*\n` +
          `Spesial untuk: *${name}*\n\n` +
          `Bismillah, kami mengundang Anda untuk hadir di hari bahagia kami pada ${eventDate}.\n\n` +
          `Buka undangan online:\n` +
          `🔗 ${link}\n\n` +
          `Terima kasih atas doa restunya! 🙏`
        );

      case "custom":
        return customTemplate
          .replace(/{nama}/g, name)
          .replace(/{link}/g, link)
          .replace(/{mempelai}/g, couple)
          .replace(/{tanggal}/g, eventDate)
          .replace(/{lokasi}/g, eventVenue);

      default:
        return "";
    }
  };

  const formatPhoneForWa = (phone: string) => {
    let clean = phone.replace(/[^0-9]/g, "");
    if (clean.startsWith("0")) {
      clean = "62" + clean.slice(1);
    } else if (clean.startsWith("8")) {
      clean = "62" + clean;
    }
    return clean;
  };

  const handleOpenWhatsApp = (guestName: string, guestPhone?: string, guestId?: string) => {
    const text = getMessageText(guestName);
    const cleanPhone = guestPhone ? formatPhoneForWa(guestPhone) : "";
    const waUrl = cleanPhone
      ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;

    if (guestId) {
      markAsSent(guestId);
    }

    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopyMessage = (guestName: string, guestId?: string) => {
    const text = getMessageText(guestName);
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast("Pesan WhatsApp berhasil disalin ✦");
        if (guestId) markAsSent(guestId);
      });
    } else {
      const temp = document.createElement("textarea");
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
      showToast("Pesan WhatsApp berhasil disalin ✦");
      if (guestId) markAsSent(guestId);
    }
  };

  const handleCopyLinkOnly = (guestName: string) => {
    const link = generateLink(guestName);
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(link).then(() => {
        showToast("Link undangan disalin ✦");
      });
    } else {
      const temp = document.createElement("textarea");
      temp.value = link;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
      showToast("Link undangan disalin ✦");
    }
  };

  const markAsSent = (id: string) => {
    const updated = guests.map((g) =>
      g.id === id
        ? {
          ...g,
          sent: true,
          sentAt: new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          }),
        }
        : g
    );
    saveGuests(updated);
  };

  const toggleSentStatus = (id: string) => {
    const updated = guests.map((g) => (g.id === id ? { ...g, sent: !g.sent } : g));
    saveGuests(updated);
  };

  const deleteGuest = (id: string) => {
    const updated = guests.filter((g) => g.id !== id);
    saveGuests(updated);
    showToast("Tamu dihapus dari daftar");
  };

  const clearAllGuests = () => {
    if (window.confirm("Hapus semua daftar tamu yang tersimpan?")) {
      saveGuests([]);
      showToast("Semua data tamu dibersihkan");
    }
  };

  const handleProcessBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = batchInput
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) {
      showToast("Masukkan setidaknya 1 nama tamu");
      return;
    }

    const newItems: GuestItem[] = lines.map((line) => {
      let name = line;
      let phone = "";

      if (line.includes(",") || line.includes("-") || line.includes("|")) {
        const separator = line.includes(",") ? "," : line.includes("-") ? "-" : "|";
        const parts = line.split(separator);
        name = parts[0].trim();
        phone = parts[1] ? parts[1].trim() : "";
      }

      return {
        id: Date.now() + Math.random().toString(36).substring(2, 9),
        name,
        phone,
        sent: false,
      };
    });

    const combined = [...newItems, ...guests];
    saveGuests(combined);
    setBatchInput("");
    setActiveTab("history");
    showToast(`${newItems.length} tamu berhasil ditambahkan ke daftar! ✦`);
  };

  const filteredGuests = useMemo(() => {
    if (!searchFilter.trim()) return guests;
    const q = searchFilter.toLowerCase();
    return guests.filter((g) => g.name.toLowerCase().includes(q) || (g.phone && g.phone.includes(q)));
  }, [guests, searchFilter]);

  const sentCount = guests.filter((g) => g.sent).length;
  const unsentCount = guests.length - sentCount;
  const progressPercent = guests.length > 0 ? Math.round((sentCount / guests.length) * 100) : 0;

  return (
    <div className="studio-page">
      {/* Top Glass Navigation */}
      <header className="studio-nav">
        <div className="studio-nav-container">
          <Link to="/" className="studio-back-btn">
            <IconArrowLeft />
            <span>Kembali ke Undangan</span>
          </Link>
          <div className="studio-brand">
            <span className="serif studio-brand-names">{couple}</span>
            <span className="studio-brand-badge">Wedding Studio</span>
          </div>
        </div>
      </header>

      <div className="studio-wrapper">
        {/* Hero Section */}
        <section className="studio-hero">
          <h1 className="studio-title serif">WhatsApp Invitation Studio</h1>
          <p className="studio-desc">
            Buat pesan personal otomatis dan bagikan link undangan ke kerabat dengan tampilan profesional dalam hitungan detik.
          </p>

          {/* Unified Progress & Stats Dashboard */}
          {guests.length > 0 && (
            <div className="studio-progress-card">
              <div className="progress-header">
                <div className="progress-lbl">
                  Progres Pengiriman Undangan: <strong>{sentCount} dari {guests.length} Tamu</strong>
                </div>
                <div className="progress-percent">{progressPercent}%</div>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          )}

          <div className="studio-metrics-bar">
            <div className="metric-item">
              <div className="metric-icon-box">
                <IconUsers />
              </div>
              <div className="metric-data">
                <span className="metric-val serif">{guests.length}</span>
                <span className="metric-lbl">Total Tamu</span>
              </div>
            </div>
            <div className="metric-divider" />
            <div className="metric-item metric-success">
              <div className="metric-icon-box">
                <IconCheck />
              </div>
              <div className="metric-data">
                <span className="metric-val serif">{sentCount}</span>
                <span className="metric-lbl">Terkirim</span>
              </div>
            </div>
            <div className="metric-divider" />
            <div className="metric-item metric-pending">
              <div className="metric-icon-box">
                <IconClock />
              </div>
              <div className="metric-data">
                <span className="metric-val serif">{unsentCount}</span>
                <span className="metric-lbl">Tertunda</span>
              </div>
            </div>
          </div>
        </section>

        {/* Template Style Selector */}
        <section className="studio-card">
          <div className="card-header-bar">
            <div className="step-badge">1</div>
            <div>
              <h2 className="card-section-title">Pilih Format &amp; Nada Pesan</h2>
              <p className="card-section-desc">Pilih gaya bahasa yang sesuai untuk dikirim ke WhatsApp tamu</p>
            </div>
          </div>

          <div className="format-chips-grid">
            <button
              type="button"
              className={`format-chip ${templateType === "formal" ? "active" : ""}`}
              onClick={() => setTemplateType("formal")}
            >
              <div className="chip-icon-wrap">
                <IconFileText />
              </div>
              <div className="chip-content">
                <div className="chip-title">Formal &amp; Sopan</div>
                <div className="chip-sub">Bapak/Ibu &amp; Tokoh</div>
              </div>
            </button>

            <button
              type="button"
              className={`format-chip ${templateType === "friendly" ? "active" : ""}`}
              onClick={() => setTemplateType("friendly")}
            >
              <div className="chip-icon-wrap">
                <IconSparkles />
              </div>
              <div className="chip-content">
                <div className="chip-title">Santai &amp; Akrab</div>
                <div className="chip-sub">Teman &amp; Sahabat</div>
              </div>
            </button>

            <button
              type="button"
              className={`format-chip ${templateType === "simple" ? "active" : ""}`}
              onClick={() => setTemplateType("simple")}
            >
              <div className="chip-icon-wrap">
                <IconZap />
              </div>
              <div className="chip-content">
                <div className="chip-title">Singkat &amp; Padat</div>
                <div className="chip-sub">To the point</div>
              </div>
            </button>

            <button
              type="button"
              className={`format-chip ${templateType === "custom" ? "active" : ""}`}
              onClick={() => setTemplateType("custom")}
            >
              <div className="chip-icon-wrap">
                <IconSliders />
              </div>
              <div className="chip-content">
                <div className="chip-title">Kustom Sendiri</div>
                <div className="chip-sub">Bebas diedit</div>
              </div>
            </button>
          </div>

          {templateType === "custom" && (
            <div className="custom-editor-box">
              <div className="custom-vars-bar">
                <span>Variabel:</span>
                <code>{"{nama}"}</code>
                <code>{"{link}"}</code>
                <code>{"{mempelai}"}</code>
                <code>{"{tanggal}"}</code>
              </div>
              <textarea
                rows={5}
                value={customTemplate}
                onChange={(e) => {
                  setCustomTemplate(e.target.value);
                  try {
                    localStorage.setItem(TEMPLATE_CUSTOM_KEY, e.target.value);
                  } catch (err) { }
                }}
                className="studio-input studio-textarea"
                placeholder="Tulis template kustom Anda..."
              />
            </div>
          )}
        </section>

        {/* Mode Selector Tabs */}
        <div className="studio-tabs-bar">
          <button
            type="button"
            className={`studio-tab-item ${activeTab === "single" ? "active" : ""}`}
            onClick={() => setActiveTab("single")}
          >
            <IconUser />
            <span>Kirim Perorangan</span>
          </button>
          <button
            type="button"
            className={`studio-tab-item ${activeTab === "batch" ? "active" : ""}`}
            onClick={() => setActiveTab("batch")}
          >
            <IconUsers />
            <span>Impor Massal</span>
          </button>
          <button
            type="button"
            className={`studio-tab-item ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            <IconFileText />
            <span>Daftar Tamu ({guests.length})</span>
          </button>
        </div>

        {/* TAB 1: SINGLE MODE */}
        {activeTab === "single" && (
          <div className="studio-tab-panel">
            <section className="studio-card">
              <div className="card-header-bar">
                <div className="step-badge">2</div>
                <div>
                  <h2 className="card-section-title">Masukkan Nama &amp; No. WhatsApp Tamu</h2>
                  <p className="card-section-desc">Nama akan otomatis disematkan pada cover undangan dan pesan</p>
                </div>
              </div>

              <div className="form-fields-grid">
                <div className="field-block">
                  <label className="field-label" htmlFor="inputName">Nama Lengkap / Panggilan Tamu</label>
                  <input
                    type="text"
                    id="inputName"
                    className="studio-input"
                    placeholder="Misal: Bapak H. Hendra / Dian & Partner"
                    value={singleName}
                    onChange={(e) => setSingleName(e.target.value)}
                  />
                </div>
                <div className="field-block">
                  <label className="field-label" htmlFor="inputPhone">
                    Nomor WhatsApp <span className="label-opt">(Opsional)</span>
                  </label>
                  <input
                    type="tel"
                    id="inputPhone"
                    className="studio-input"
                    placeholder="Misal: 081234567890"
                    value={singlePhone}
                    onChange={(e) => setSinglePhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="studio-actions-wrap">
                <button
                  type="button"
                  className="studio-btn studio-btn-wa"
                  disabled={!singleName.trim()}
                  onClick={() => handleOpenWhatsApp(singleName, singlePhone)}
                >
                  <IconWhatsApp />
                  <span>Kirim ke WhatsApp</span>
                </button>

                <button
                  type="button"
                  className="studio-btn studio-btn-secondary"
                  disabled={!singleName.trim()}
                  onClick={() => handleCopyMessage(singleName)}
                >
                  <IconCopy />
                  <span>Salin Pesan</span>
                </button>

                <button
                  type="button"
                  className="studio-btn studio-btn-secondary"
                  disabled={!singleName.trim()}
                  onClick={() => handleCopyLinkOnly(singleName)}
                >
                  <IconLink />
                  <span>Salin Link</span>
                </button>

                <a
                  href={generateLink(singleName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`studio-btn studio-btn-outline ${!singleName.trim() ? "disabled" : ""}`}
                >
                  <IconExternalLink />
                  <span>Tes Buka</span>
                </a>
              </div>
            </section>

            {/* REALISTIC WHATSAPP PHONE SIMULATOR */}
            {singleName.trim() && (
              <div className="phone-simulator-container">
                <div className="phone-header-bar">
                  <div className="phone-avatar-circle">{getInitial(couple)}</div>
                  <div className="phone-contact-info">
                    <div className="phone-contact-name">{couple} (Pernikahan)</div>
                    <div className="phone-contact-status">online</div>
                  </div>
                </div>

                <div className="phone-chat-body">
                  <div className="phone-chat-date-pill">Hari ini</div>

                  <div className="phone-bubble-outgoing">
                    <div className="phone-bubble-text">{getMessageText(singleName)}</div>
                    <div className="phone-bubble-meta">
                      <span>{new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</span>
                      <span className="wa-blue-ticks"> ✓✓</span>
                    </div>
                  </div>
                </div>

                <div className="phone-cta-bar">
                  <button
                    type="button"
                    className="phone-launch-btn"
                    onClick={() => handleOpenWhatsApp(singleName, singlePhone)}
                  >
                    <IconWhatsApp />
                    <span>Lanjutkan Kirim via WhatsApp</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BATCH MODE */}
        {activeTab === "batch" && (
          <div className="studio-tab-panel">
            <section className="studio-card">
              <div className="card-header-bar">
                <div className="step-badge">2</div>
                <div>
                  <h2 className="card-section-title">Impor Daftar Tamu Massal</h2>
                  <p className="card-section-desc">Paste puluhan nama sekaligus dari Excel, Catatan, atau Kontak</p>
                </div>
              </div>

              <form onSubmit={handleProcessBatch}>
                <div className="batch-hint-box">
                  <IconSparkles />
                  <span>
                    Tulis <strong>1 nama per baris</strong>. Jika ingin menyertakan nomor HP, pisahkan dengan koma (contoh: <code>Budi Santoso, 08123456789</code>).
                  </span>
                </div>

                <textarea
                  rows={8}
                  className="studio-input studio-textarea batch-textarea"
                  placeholder={`Bapak H. Sukardi & Keluarga\nDra. Hj. Nurul Aini, 081234567890\nDimas Arya & Partner\nKeluarga Besar Alumni Teknik\nSiti Rahmawati, 085712345678`}
                  value={batchInput}
                  onChange={(e) => setBatchInput(e.target.value)}
                />

                <button type="submit" className="studio-btn studio-btn-primary studio-btn-full" style={{ marginTop: "16px" }}>
                  <IconSend />
                  <span>Proses &amp; Masukkan ke Daftar Tamu</span>
                </button>
              </form>
            </section>
          </div>
        )}

        {/* TAB 3: HISTORY & TRACKING */}
        {activeTab === "history" && (
          <div className="studio-tab-panel">
            <section className="studio-card">
              <div className="history-search-row">
                <div className="history-search-input-wrap">
                  <IconSearch />
                  <input
                    type="text"
                    className="studio-input history-search-field"
                    placeholder="Cari nama tamu di daftar..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                  />
                  {searchFilter && (
                    <button
                      type="button"
                      className="search-clear-btn"
                      onClick={() => setSearchFilter("")}
                    >
                      &times;
                    </button>
                  )}
                </div>

                {guests.length > 0 && (
                  <button
                    type="button"
                    className="studio-btn-danger"
                    onClick={clearAllGuests}
                  >
                    <IconTrash />
                    <span>Hapus Semua</span>
                  </button>
                )}
              </div>

              {filteredGuests.length > 0 ? (
                <div className="guest-cards-list">
                  {filteredGuests.map((g) => (
                    <div key={g.id} className={`luxury-guest-card ${g.sent ? "is-sent" : ""}`}>
                      <div className="lg-card-main">
                        <div className="lg-avatar">{getInitial(g.name)}</div>
                        <div className="lg-info">
                          <div className="lg-name serif">{g.name}</div>
                          {g.phone && <div className="lg-phone">{g.phone}</div>}
                          {g.sent && g.sentAt && (
                            <div className="lg-sent-time">
                              <IconCheck />
                              <span>Terkirim: {g.sentAt}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="lg-status-toggle">
                        <label className="lg-check-container" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={g.sent}
                            onChange={() => toggleSentStatus(g.id)}
                            className="lg-checkbox"
                          />
                          <span className={`lg-badge ${g.sent ? "badge-sent" : "badge-pending"}`}>
                            {g.sent ? "Terkirim ✓" : "Tertunda"}
                          </span>
                        </label>
                      </div>

                      <div className="lg-link-box">
                        <code>{generateLink(g.name)}</code>
                      </div>

                      <div className="lg-actions-row">
                        <button
                          type="button"
                          className="lg-btn lg-btn-wa"
                          onClick={() => handleOpenWhatsApp(g.name, g.phone, g.id)}
                        >
                          <IconWhatsApp />
                          <span>Kirim WA</span>
                        </button>
                        <button
                          type="button"
                          className="lg-btn"
                          onClick={() => handleCopyMessage(g.name, g.id)}
                          title="Salin Pesan"
                        >
                          <IconCopy />
                          <span>Salin</span>
                        </button>
                        <a
                          href={generateLink(g.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lg-btn"
                          title="Tes Buka Undangan"
                        >
                          <IconExternalLink />
                          <span>Buka</span>
                        </a>
                        <button
                          type="button"
                          className="lg-btn lg-btn-del"
                          onClick={() => deleteGuest(g.id)}
                          title="Hapus Tamu"
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="studio-empty-state">
                  <IconUsers />
                  <p>Belum ada daftar tamu tersimpan.</p>
                  <span>Mulai tambahkan tamu di tab <strong>Kirim Perorangan</strong> atau <strong>Impor Massal</strong>.</span>
                </div>
              )}
            </section>
          </div>
        )}
      </div>

      <Toast message={toastMessage} visible={toastVisible} />
    </div>
  );
}
