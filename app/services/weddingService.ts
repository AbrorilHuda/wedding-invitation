import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../config/firebase";
import type { Wish } from "../types/invitation";

export interface RsvpPayload {
  name: string;
  status: "Hadir" | "Tidak Hadir";
  count: string;
  message?: string;
  timestamp?: string;
}

export interface WishPayload {
  name: string;
  status: string;
  message: string;
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 45) return "Baru saja";
  if (diffMin < 60) return `${diffMin} menit lalu`;
  if (diffHour < 24) return `${diffHour} jam lalu`;
  if (diffDay === 1) return "Kemarin";
  if (diffDay < 7) return `${diffDay} hari lalu`;

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

/**
 * Kirim konfirmasi kehadiran RSVP ke Firestore & cache di localStorage
 */
export async function sendRsvp(data: RsvpPayload): Promise<void> {
  const payload = {
    ...data,
    timestamp: new Date().toISOString(),
  };

  // Simpan ke Firestore jika Firebase terkonfigurasi
  if (isFirebaseConfigured && db) {
    try {
      await addDoc(collection(db, "rsvps"), {
        name: data.name,
        status: data.status,
        count: data.count,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Gagal menyimpan RSVP ke Firebase:", err);
      // Tetap lanjutkan penyimpanan ke localStorage
    }
  }

  // Cache lokal perangkat
  try {
    localStorage.setItem("my_wedding_rsvp", JSON.stringify(payload));
  } catch (e) {
    // Ignore localStorage error
  }
}

/**
 * Kirim ucapan & doa baru ke Firestore
 */
export async function sendWish(data: WishPayload): Promise<Wish> {
  const newWish: Wish = {
    id: Date.now().toString(),
    n: data.name,
    h: data.status,
    p: data.message,
    createdAt: "Baru saja",
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, "wishes"), {
        name: data.name,
        status: data.status,
        message: data.message,
        createdAt: serverTimestamp(),
      });
      newWish.id = docRef.id;
    } catch (err) {
      // Fallback ke localStorage jika gagal mengirim ke Firestore
      saveWishToLocal(newWish);
    }
  } else {
    // Simpan di localStorage jika offline / mode lokal
    console.info("mode localStorage");
    saveWishToLocal(newWish);
  }

  return newWish;
}

const WISHES_STORAGE_KEY = "wedding_wishes_miftah_riris";

function saveWishToLocal(wish: Wish) {
  try {
    const saved = JSON.parse(
      localStorage.getItem(WISHES_STORAGE_KEY) ||
      localStorage.getItem("wedding_wishes_miftah_riris") ||
      "[]"
    );
    saved.unshift(wish);
    localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(saved));
  } catch (e) {
    // Ignore
  }
}

/**
 * Berlangganan (Subscribe) daftar ucapan secara Realtime (Live Update)
 */
export function subscribeToWishes(
  onUpdate: (wishes: Wish[]) => void,
  fallbackWishes: Wish[] = []
): () => void {
  if (isFirebaseConfigured && db) {
    try {
      const wishesQuery = query(
        collection(db, "wishes"),
        orderBy("createdAt", "desc"),
        limit(50)
      );

      const unsubscribe = onSnapshot(
        wishesQuery,
        (snapshot) => {
          if (!snapshot.empty) {
            const liveWishes: Wish[] = snapshot.docs.map((doc) => {
              const d = doc.data();
              let timeStr = "Baru saja";

              if (d.createdAt && typeof (d.createdAt as Timestamp).toDate === "function") {
                timeStr = formatRelativeTime((d.createdAt as Timestamp).toDate());
              }

              return {
                id: doc.id,
                n: d.name || "Tamu",
                h: d.status || "Hadir",
                p: d.message || "",
                createdAt: timeStr,
              };
            });
            onUpdate(liveWishes);
          } else {
            onUpdate(fallbackWishes);
          }
        },
        (error) => {
          console.warn("Firestore listener error, fallback ke lokal:", error);
          loadLocalWishes(onUpdate, fallbackWishes);
        }
      );

      return unsubscribe;
    } catch (err) {
      console.warn("Gagal inisialisasi query Firestore:", err);
      loadLocalWishes(onUpdate, fallbackWishes);
      return () => { };
    }
  } else {
    loadLocalWishes(onUpdate, fallbackWishes);
    return () => { };
  }
}

function loadLocalWishes(
  onUpdate: (wishes: Wish[]) => void,
  fallbackWishes: Wish[]
) {
  try {
    const saved =
      localStorage.getItem(WISHES_STORAGE_KEY) ||
      localStorage.getItem("wedding_wishes_miftah_riris");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        onUpdate(parsed);
        return;
      }
    }
  } catch (e) {
    // Ignore
  }
  onUpdate(fallbackWishes);
}
