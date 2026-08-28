export interface GroomConfig {
  name: string;
  fullName: string;
  order: string;
  parents: string;
  instagram: string;
  instagramHandle?: string;
  photo: string;
}

export interface BrideConfig {
  name: string;
  fullName: string;
  order: string;
  parents: string;
  instagram: string;
  instagramHandle?: string;
  photo: string;
}

export interface EventConfig {
  title: string;
  dateIso: string;
  dateDisplay: string;
  dateShort: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
  icsProdId: string;
  icsSummary: string;
  icsDescription: string;
  icsStart: string;
  icsEnd: string;
}

export interface BankAccountConfig {
  bank: string;
  accountNumber: string;
  accountHolder: string;
  testId: string;
}

export interface PhysicalGiftConfig {
  recipient: string;
  phone: string;
  address: string;
}

export interface WeddingConfig {
  groom: GroomConfig;
  bride: BrideConfig;
  event: EventConfig;
  bankAccounts: BankAccountConfig[];
  musicUrl: string;
  qrisImage: string;
  physicalGift?: PhysicalGiftConfig;
}

const env = typeof import.meta !== "undefined" && import.meta.env ? import.meta.env : ({} as Record<string, string | undefined>);

export const WEDDING_CONFIG: WeddingConfig = {
  musicUrl:
    env.VITE_MUSIC_URL ||
    "https://cdn.pixabay.com/download/audio/2022/03/10/audio_2c8d4f4b8f.mp3",
  qrisImage: env.VITE_QRIS_IMAGE || "",
  groom: {
    name: env.VITE_GROOM_NAME || "Miftah",
    fullName: env.VITE_GROOM_FULL_NAME || "Miftah Pratama",
    order: env.VITE_GROOM_ORDER || "Putra pertama dari",
    parents: env.VITE_GROOM_PARENTS || "Bapak H. Suryadi & Ibu Hj. Kartika",
    instagram: env.VITE_GROOM_INSTAGRAM || "https://instagram.com",
    instagramHandle: env.VITE_GROOM_IG_HANDLE || "@miftahpratama",
    photo:
      env.VITE_GROOM_PHOTO ||
      "https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
  },
  bride: {
    name: env.VITE_BRIDE_NAME || "Sofia",
    fullName: env.VITE_BRIDE_FULL_NAME || "Sofia Anindya",
    order: env.VITE_BRIDE_ORDER || "Putri kedua dari",
    parents: env.VITE_BRIDE_PARENTS || "Bapak H. Bambang & Ibu Hj. Ratna",
    instagram: env.VITE_BRIDE_INSTAGRAM || "https://instagram.com",
    instagramHandle: env.VITE_BRIDE_IG_HANDLE || "@sofiaanindya",
    photo:
      env.VITE_BRIDE_PHOTO ||
      "https://images.unsplash.com/photo-1492175742197-ed20dc5a6bed?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
  },
  event: {
    title: env.VITE_EVENT_TITLE || "Resepsi",
    dateIso: env.VITE_EVENT_DATE_ISO || "2026-09-20T11:00:00+07:00",
    dateDisplay: env.VITE_EVENT_DATE_DISPLAY || "Minggu, 20 September 2026",
    dateShort: env.VITE_EVENT_DATE_SHORT || "20 . 09 . 2026",
    time: env.VITE_EVENT_TIME || "11.00 — 14.00 WIB",
    venue: env.VITE_EVENT_VENUE || "Ballroom The Grand Estate",
    address: env.VITE_EVENT_ADDRESS || "Jl. Merdeka No. 88, Jakarta Selatan",
    mapsUrl: env.VITE_EVENT_MAPS_URL || "https://maps.google.com/?q=The+Grand+Estate+Jakarta",
    icsProdId: env.VITE_ICS_PRODID || "-//Miftah & Sofia Wedding//ID",
    icsSummary: env.VITE_ICS_SUMMARY || "Pernikahan Miftah & Sofia",
    icsDescription:
      env.VITE_ICS_DESCRIPTION || "Resepsi Pernikahan Miftah Pratama & Sofia Anindya",
    icsStart: env.VITE_ICS_START || "20260920T040000Z",
    icsEnd: env.VITE_ICS_END || "20260920T070000Z",
  },
  bankAccounts: [
    {
      bank: env.VITE_GROOM_BANK_NAME || "Bank BCA",
      accountNumber: env.VITE_GROOM_BANK_NO || "1234567890",
      accountHolder: env.VITE_GROOM_BANK_HOLDER
        ? env.VITE_GROOM_BANK_HOLDER.startsWith("a.n.")
          ? env.VITE_GROOM_BANK_HOLDER
          : `a.n. ${env.VITE_GROOM_BANK_HOLDER}`
        : "a.n. Miftah Pratama",
      testId: "copy-bca-button",
    },
    {
      bank: env.VITE_BRIDE_BANK_NAME || "Bank Mandiri",
      accountNumber: env.VITE_BRIDE_BANK_NO || "0987654321",
      accountHolder: env.VITE_BRIDE_BANK_HOLDER
        ? env.VITE_BRIDE_BANK_HOLDER.startsWith("a.n.")
          ? env.VITE_BRIDE_BANK_HOLDER
          : `a.n. ${env.VITE_BRIDE_BANK_HOLDER}`
        : "a.n. Sofia Anindya",
      testId: "copy-mandiri-button",
    },
  ],
  physicalGift: {
    recipient: env.VITE_GIFT_RECIPIENT || "",
    phone: env.VITE_GROOM_BANK_NO || "",
    address:
      env.VITE_GIFT_ADDRESS ||
      "Jl. Melati Indah No. 12, Cilandak Barat, Jakarta Selatan, DKI Jakarta 12430",
  },
};
