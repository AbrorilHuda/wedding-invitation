/**
 * Profanity, Slur, and Prohibited Content Filter
 * Digunakan untuk menyaring kata-kata kasar/kotor, SARA, dan promosi judi/spam
 * pada parameter `?to=` (nama tamu), form RSVP, dan Buku Tamu (Guestbook).
 */

const FORBIDDEN_WORDS = [
  // Kata kasar / umpatan / kotoran (Bahasa Indonesia)
  "anjing",
  "anjir",
  "anjay",
  "babi",
  "bangsat",
  "bajingan",
  "brengsek",
  "kontol",
  "memek",
  "jembut",
  "ngentot",
  "ngewe",
  "titit",
  "itil",
  "pantek",
  "puki",
  "pukimak",
  "pepek",
  "lonte",
  "perek",
  "pelacur",
  "jablay",
  "bispak",
  "asu",
  "taek",
  "kampret",
  "goblok",
  "tolol",
  "bego",
  "idiot",
  "tetek",
  "toket",
  "bokep",
  "porno",
  "coli",
  "sange",
  "peler",
  "pler",
  "kimak",
  "bencong",
  "banci",

  // Kata kasar Bahasa Inggris
  "fuck",
  "fucker",
  "fucking",
  "shit",
  "bitch",
  "bastard",
  "asshole",
  "cunt",
  "dick",
  "pussy",
  "whore",
  "slut",
  "nigger",
  "nigga",
  "faggot",
  "cock",

  // Promosi Judi Online / Spam
  "slot gacor",
  "judol",
  "judi online",
  "situs judi",
  "slot online",
  "maxwin",
  "pragmatic",
  "zeus slot",
  "togel",
  "bandar togel",
  "depo pulsa",
  "bocoran slot",
  "agen slot",
  "sbobet",
  "poker online",
];

// Exact whole-word matches only (untuk kata-kata pendek agar tidak false positive seperti 'pantai' kena 'tai')
const STRICT_WHOLE_WORDS = ["tai", "asu", "cunt", "shit", "dick"];

// Peta konversi leetspeak angka/simbol ke huruf
const LEET_MAP: Record<string, string> = {
  "0": "o",
  "1": "i",
  "!": "i",
  "3": "e",
  "4": "a",
  "@": "a",
  "5": "s",
  "$": "s",
  "7": "t",
  "8": "b",
};

/**
 * Normalisasi teks untuk mendeteksi leetspeak, karakter berulang, dan simbol tersembunyi
 */
function normalizeText(input: string): string {
  let normalized = input.toLowerCase();

  // 1. Hapus zero-width characters & control characters
  normalized = normalized.replace(/[\u200B-\u200D\uFEFF\u0000-\u001F]/g, "");

  // 2. Ganti leetspeak characters
  normalized = normalized
    .split("")
    .map((char) => LEET_MAP[char] || char)
    .join("");

  // 3. Reduksi huruf berulang berlebihan (misal: "anjiiiiiing" -> "anjiing")
  normalized = normalized.replace(/(.)\1{2,}/g, "$1$1");

  return normalized;
}

/**
 * Mengecek apakah teks mengandung kata kotor, kasar, atau terlarang
 */
export function containsProfanity(text: string): boolean {
  if (!text || typeof text !== "string") return false;

  const rawLower = text.toLowerCase();
  const normalized = normalizeText(text);

  // Buat versi tanpa spasi untuk deteksi "a n j i n g" atau "k o n t o l"
  const strippedSpaces = normalized.replace(/\s+/g, "");

  for (const word of FORBIDDEN_WORDS) {
    // 1. Cek pencocokan frasa atau kata langsung
    if (word.includes(" ")) {
      if (rawLower.includes(word) || normalized.includes(word)) {
        return true;
      }
    } else {
      // 2. Cek dengan regex word boundary atau kata tertutup
      const wordRegex = new RegExp(`(^|\\W|_)(${word})($|\\W|_)`, "i");
      if (wordRegex.test(rawLower) || wordRegex.test(normalized)) {
        return true;
      }

      // 3. Cek kata pada string yang spasi/simbolnya dihilangkan (misal "k.o.n.t.o.l")
      if (word.length >= 4 && strippedSpaces.includes(word)) {
        return true;
      }
    }
  }

  // 4. Cek kata pendek yang butuh pencocokan kata utuh ketat
  const wordsInText = rawLower.split(/\s+|[.,!?:;_\-/\\]+/);
  for (const w of wordsInText) {
    if (STRICT_WHOLE_WORDS.includes(w)) {
      return true;
    }
  }

  return false;
}

/**
 * Membersihkan nama tamu dari parameter URL ?to=.
 * Jika mengandung kata terlarang/kotor, diganti menjadi "Tamu Undangan".
 */
export function sanitizeGuestName(rawName: string | null | undefined): string {
  if (!rawName) return "Tamu Undangan";

  try {
    const decoded = decodeURIComponent(rawName.replace(/\+/g, " "))
      .trim()
      .slice(0, 80)
      .replace(/[\r\n\t]/g, " ");

    if (!decoded || containsProfanity(decoded)) {
      return "Tamu Undangan";
    }

    return decoded;
  } catch (e) {
    return "Tamu Undangan";
  }
}
