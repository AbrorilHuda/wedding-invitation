Nah iya bro 😂 sekarang jelas. **PRD-nya khusus untuk redesign/perbaikan website undangan yang sekarang**, bukan untuk bikin platform undangan.

Jadi kita **mempertahankan fitur dan struktur yang sudah ada**, lalu PRD menjadi acuan untuk memperbaiki **visual, layout, typography, UX, responsive, animation, dan konsistensi desain**. Data **20 September 2026** dianggap final; foto sample tetap dipakai dulu karena ini template.

## PRD — Redesign Website Undangan Digital

**Project:** Wedding Invitation — Miftah & Riris
**URL:** `miftah-riris.gounira.my.id`
**Status:** Template / Design Refinement
**Tech:** React + React Router
**Fokus:** UI/UX & Visual Redesign
**Target:** Meningkatkan kualitas desain dari ±8.2/10 menjadi ±9+/10 tanpa mengubah konsep utama undangan.

---

# 1. Tujuan Redesign

Redesign bertujuan membuat website terasa:

> **Elegant · Romantic · Premium · Personal · Calm**

Bukan menambahkan banyak fitur baru, tetapi **memaksimalkan fitur yang sudah ada** agar pengalaman pengguna terasa seperti undangan pernikahan premium.

### Masalah utama yang ingin diselesaikan

* Hierarki typography belum maksimal.
* Beberapa section masih terasa seperti kumpulan card website.
* Visual antar-section belum sepenuhnya memiliki art direction yang konsisten.
* Hero masih bisa dibuat lebih kuat.
* Gallery belum menjadi focal visual.
* Beberapa section terlalu informatif dibanding emosional.
* CTA dan elemen interaktif perlu dibuat lebih refined.
* Spacing dan visual rhythm perlu diperbaiki.
* Animasi perlu dibuat lebih cinematic dan tidak berlebihan.
* Mobile experience harus menjadi prioritas utama.

---

# 2. Prinsip Redesign

### Jangan dilakukan

* ❌ Menambah ornamen secara berlebihan.
* ❌ Terlalu banyak animasi.
* ❌ Menggunakan card di setiap section.
* ❌ Semua teks dibuat besar.
* ❌ Terlalu banyak warna.
* ❌ Mengubah undangan menjadi seperti dashboard.
* ❌ Mengubah konsep utama website.

### Yang dilakukan

* ✅ Strong typography
* ✅ Whitespace
* ✅ Editorial layout
* ✅ Foto sebagai elemen utama
* ✅ Subtle animation
* ✅ Consistent spacing
* ✅ Clear hierarchy
* ✅ Mobile-first
* ✅ Emotional storytelling

---

# 3. Visual Direction

## Mood

Desain harus memberikan kesan:

**Elegant Wedding Editorial**

Referensi karakter visual:

```text
Minimal
     ↓
Elegant
     ↓
Romantic
     ↓
Editorial
     ↓
Premium
```

Bukan:

```text
Colorful
Heavy ornament
Too many animation
Too many cards
```

---

# 4. Design System

Sebelum memperbaiki masing-masing section, buat **design system terlebih dahulu**.

### Typography

Gunakan maksimal 2–3 font family.

**Display / Heading**

Serif elegan.

**Body**

Sans-serif modern.

Contoh kombinasi:

```text
Heading
Cormorant Garamond

Body
Inter
```

### Typography hierarchy

```text
Eyebrow
12–14px

Section Title
36–56px

Subheading
20–28px

Body
14–17px

Caption
12–14px
```

Ukuran tetap responsif.

---

# 5. Color System

Gunakan palette yang tenang.

Struktur:

```text
Primary
Secondary
Background
Surface
Text
Muted
Accent
Border
```

Warna harus berasal dari **satu palette utama**, bukan setiap section mempunyai warna sendiri.

Target:

> Warna terasa seperti satu undangan yang sama dari awal sampai akhir.

---

# 6. Spacing System

Gunakan spacing konsisten:

```text
8
12
16
24
32
48
64
96
128
```

Setiap section mempunyai vertical rhythm yang jelas.

**Whitespace harus menjadi bagian dari desain.**

---

# 7. Section: Opening / Cover

### Tujuan

Menciptakan first impression yang kuat.

### Prioritas visual

```text
1. Nama pasangan
2. Foto
3. Tanggal
4. Label
5. Tombol
```

Nama pasangan menjadi **focal point terbesar**.

Contoh hierarchy:

```text
THE WEDDING OF

Miftah
&
Riris

20 · 09 · 2026

Kepada Yth.
...

[Buka Undangan]
```

### Improvement

* Foto lebih immersive.
* Overlay lebih halus.
* Typography lebih elegan.
* Nama pasangan lebih dominan.
* CTA lebih minimal.
* Animasi opening cinematic.

### Acceptance Criteria

* Nama pasangan langsung terlihat dalam 1–2 detik.
* Tidak ada elemen yang berebut perhatian.
* CTA jelas.
* Mobile tidak menyebabkan text overlap.

---

# 8. Section: Ayat / Quote

### Tujuan

Memberikan transisi emosional setelah opening.

### Improvement

Jangan menggunakan layout seperti card biasa.

Gunakan:

* whitespace
* centered typography
* decorative line minimal
* serif untuk ayat/quote

Contoh:

```text
بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ

"Dan di antara tanda-tanda kekuasaan-Nya
ialah Dia menciptakan untukmu pasangan hidup..."

QS. Ar-Rum : 21
```

---

# 9. Section: Mempelai

### Tujuan

Memperkenalkan kedua mempelai.

### Improvement

Foto harus menjadi fokus.

Struktur:

```text
THE GROOM

[PHOTO]

Miftah Ramadhan

Putra dari
Bapak ... & Ibu ...

        &

THE BRIDE

[PHOTO]

Riris ...

Putri dari
Bapak ... & Ibu ...
```

### UX

* Foto memiliki aspect ratio konsisten.
* Nama mudah dibaca.
* Informasi orang tua lebih kecil.
* Social media optional.
* Jangan terlalu banyak border/card.

---

# 10. Section: Love Story

Ini menjadi **section storytelling utama**.

### Improvement

Ubah dari layout informasi menjadi **editorial timeline**.

```text
2021

AWAL PERTEMUAN

Description...

        [PHOTO]


2022

SEMAKIN DEKAT

[PHOTO]

Description...


2026

SEBUAH JANJI

Description...
```

### Behavior

Saat scroll:

* Text fade-in.
* Foto reveal.
* Timeline bergerak secara subtle.

Jangan menggunakan animasi berat.

---

# 11. Section: Save The Date

Ini harus menjadi salah satu section paling mudah dibaca.

### Hierarchy

```text
SAVE THE DATE

MINGGU

20 SEPTEMBER 2026

08.00 WIB — SELESAI

Ballroom The Grand Estate

Jl. Merdeka No. 88

[ Buka Google Maps ]

[ Tambahkan ke Kalender ]
```

### Catatan penting

**20 September 2026 adalah tanggal final.**

Semua tampilan tanggal harus konsisten:

* Opening
* Event
* Countdown
* Closing
* Metadata jika digunakan

Tidak boleh ada tanggal lain.

---

# 12. Countdown

### Current

Countdown tetap dipertahankan.

### Redesign

Buat lebih editorial:

```text
THE DAY IS COMING

20       08       32       14
DAYS    HOURS    MINUTES   SECONDS
```

Angka besar.

Label kecil.

Jangan menggunakan card berat.

---

# 13. Gallery

### Prioritas redesign: HIGH

Gallery harus menjadi **visual highlight**.

Gunakan editorial/masonry layout.

Contoh:

```text
┌──────────────────────┐
│                      │
│      LARGE PHOTO     │
│                      │
└──────────────────────┘

┌───────────┐ ┌─────────┐
│           │ │         │
│   PHOTO   │ │  PHOTO  │
│           │ │         │
└───────────┘ └─────────┘
```

### Interaction

Klik:

→ Fullscreen lightbox

Mobile:

→ Swipe

### Animation

Image reveal ketika masuk viewport.

---

# 14. RSVP

### Tujuan

Membuat RSVP terasa mudah dan elegan.

### Redesign

Jangan terlihat seperti form admin.

```text
KONFIRMASI KEHADIRAN

Nama Lengkap
[...................]

Apakah Anda akan hadir?

[ HADIR ] [ TIDAK HADIR ]

Jumlah Tamu

[ − ] 1 [ + ]

[ Konfirmasi Kehadiran ]
```

### UX

* Input besar.
* Touch target minimal nyaman untuk mobile.
* Error message jelas.
* Success state bagus.

Contoh setelah berhasil:

> Terima kasih, konfirmasi kehadiran Anda telah diterima. 🤍

---

# 15. Ucapan & Doa

### Redesign

Buat terasa seperti guestbook.

```text
UCAPAN & DOA

"Semoga menjadi keluarga
yang sakinah, mawaddah, warahmah."

— Ahmad
```

### Improvement

* Typography lebih lembut.
* Avatar optional.
* Timestamp subtle.
* Pagination/infinite scroll.
* Empty state tidak terlihat seperti error.

---

# 16. Digital Gift

### Tujuan

Tetap fungsional tetapi tidak mendominasi.

### Layout

```text
UNGKAPAN KASIH

Bagi keluarga dan sahabat
yang ingin memberikan tanda kasih...

BANK BRI

1234567890
Miftah Ramadhan

[ Salin ]

        atau

[ QRIS ]

[ Lihat QRIS ]
```

### Design rule

Digital gift **tidak boleh terasa seperti halaman pembayaran**.

---

# 17. Music

Music control dibuat minimal.

Contoh:

```text
♫
```

atau floating button kecil.

State:

```text
Playing
Paused
```

Jangan membuat player besar yang mengganggu visual.

---

# 18. Navigation

Navigation harus membantu user berpindah section tanpa mengganggu.

Mobile bisa menggunakan:

```text
Home
Couple
Event
Gallery
RSVP
```

Tetapi jangan terlalu banyak menu.

Music dapat dipisahkan dari navigation.

---

# 19. Animation System

Gunakan animation secara konsisten.

### Page

* Fade
* Slow reveal

### Text

* Fade + translate Y

### Image

* Clip/reveal
* Slight scale

### Button

* Subtle hover/tap

### Gallery

* Scale on interaction

### Hindari

* Bounce
* Flash
* Excessive parallax
* Constant floating elements

Target:

> **Animation terasa ketika diperhatikan, tetapi tidak terasa mengganggu.**

---

# 20. Mobile UX

**Mobile adalah prioritas nomor satu.**

Test minimal:

```text
360px
390px
414px
430px
```

Pastikan:

* Tidak horizontal scroll.
* Text tidak overflow.
* Button mudah disentuh.
* Foto tidak pecah.
* Countdown tidak berantakan.
* Form nyaman digunakan.
* Navigation tidak menutupi konten.
* Lightbox fullscreen.
* Music control tidak menghalangi CTA.

---

# 21. Desktop

Desktop bukan sekadar memperbesar mobile.

Gunakan:

* Maximum content width.
* Large whitespace.
* Editorial composition.
* Larger image treatment.
* Section transitions.

Target:

```text
Mobile
→ intimate

Desktop
→ editorial / cinematic
```

---

# 22. React Component Refactor

Karena menggunakan React Router dan bukan Next.js, struktur component cukup diarahkan ke:

```text id="k44e5v"
src/
├── components/
│   ├── Hero/
│   ├── Quote/
│   ├── Couple/
│   ├── Story/
│   ├── Event/
│   ├── Countdown/
│   ├── Gallery/
│   ├── RSVP/
│   ├── Wishes/
│   ├── Gift/
│   ├── Music/
│   └── Closing/
│
├── pages/
│   └── WeddingInvitation/
│
├── data/
│   └── wedding.ts
│
└── router/
```

Tujuannya supaya redesign **tidak membuat satu component/page menjadi sangat besar**.

---

# 23. Data Template

Karena foto sekarang masih sample, jangan hardcode di setiap component.

Gunakan data:

```text id="a8k7a8"
wedding.ts
```

Contoh:

```text id="zj3f4x"
couple
event
story
gallery
gift
music
```

Component hanya melakukan rendering data.

Dengan begitu nanti:

```text
Sample photo
      ↓
Foto asli pasangan
```

tidak perlu redesign ulang.

---

# 24. Performance

Redesign tidak boleh membuat website lebih berat.

Prioritas:

* Lazy loading gallery.
* Optimized image.
* Compress sample image.
* Preload hero.
* Avoid unnecessary animation.
* Avoid unnecessary JavaScript.
* Reduce layout shift.

---

# 25. Prioritas Pengerjaan

Saya akan membaginya menjadi:

### 🔴 P0 — Wajib

1. Hero redesign
2. Typography
3. Spacing
4. Event section
5. Gallery
6. Mobile responsive
7. Konsistensi tanggal
8. Visual hierarchy

### 🟠 P1 — Sangat penting

9. Love story
10. RSVP UX
11. Wishes
12. Countdown
13. Navigation
14. Animation

### 🟢 P2 — Polish

15. Music control
16. Micro interaction
17. Loading state
18. Empty state
19. Error state
20. Desktop refinement

---

# 26. Definition of Done

Redesign dianggap selesai apabila:

* [ ] Seluruh section mempunyai visual language yang konsisten.
* [ ] Hero mempunyai strong first impression.
* [ ] Typography memiliki hierarchy yang jelas.
* [ ] Tidak ada section yang terasa seperti dashboard.
* [ ] Gallery terlihat premium.
* [ ] Love story terasa seperti storytelling.
* [ ] Event mudah dibaca.
* [ ] RSVP mudah digunakan.
* [ ] Countdown responsive.
* [ ] Mobile 360–430px aman.
* [ ] Desktop 1024px+ terlihat proporsional.
* [ ] Animasi subtle.
* [ ] Tidak ada horizontal overflow.
* [ ] Semua tanggal menggunakan **20 September 2026**.
* [ ] Foto sample tetap dapat digunakan sebagai placeholder.
* [ ] Tidak ada fitur utama yang rusak setelah redesign.
* [ ] React component tetap reusable dan terstruktur.
```