# Product Requirements Document (PRD)
## Website Undangan Pernikahan Digital — Miftah & Someone

---

### 1. Overview

**Nama Project:** Website Undangan Pernikahan "Miftah & Someone"
**Jenis:** Website undangan pernikahan digital, single-page, mobile-first
**Tujuan:** Menyediakan undangan pernikahan digital yang elegan, modern, dan personal untuk mengundang tamu ke acara resepsi, sekaligus memfasilitasi konfirmasi kehadiran (RSVP), ucapan/doa, dan kado digital dari tamu tanpa perlu hadir fisik.

---

### 2. Latar Belakang & Tujuan

Undangan fisik konvensional memiliki keterbatasan dalam hal jangkauan, interaktivitas, dan efisiensi biaya. Website undangan digital ini bertujuan untuk:
- Memberikan pengalaman membuka undangan yang personal dan berkesan bagi tiap tamu
- Menyampaikan informasi acara secara lengkap dan mudah diakses dari HP
- Memudahkan tamu memberikan konfirmasi kehadiran, ucapan, dan kado secara digital
- Merepresentasikan identitas pasangan lewat desain yang elegan dan bernuansa Islami secara halus

---

### 3. Target Pengguna

| Pengguna | Kebutuhan |
|---|---|
| Tamu undangan | Membaca info acara, RSVP, memberi ucapan, memberi kado, melihat galeri foto |
| Mempelai (pemilik acara) | Membagikan undangan personal per tamu, memantau RSVP & ucapan masuk |

---

### 4. Arah Desain

**Konsep visual:** Modern, elegan, minimalis, dengan nuansa Islami yang halus — dihadirkan melalui konten (ayat suci, ucapan salam, doa), bukan lewat ornamen visual yang berat seperti motif arabesque atau kaligrafi besar.

**Palet warna:** Cream (dasar) + Gold (aksen), dengan variasi tone beige/blush di antar-section untuk menghindari kesan monoton.

**Tipografi:**
- Heading / nama mempelai: serif elegan (rekomendasi: *Cormorant Garamond*)
- Body text: sans-serif modern (rekomendasi: *Jost*)
- Teks Arab (ayat/Bismillah): font Arab ringan (rekomendasi: *Amiri*)

**Prinsip layout:**
- Mobile-first, single scrolling page
- Banyak white space namun tetap "hidup" lewat foto pre-wedding natural di tiap section
- Pergantian tone latar antar-section untuk ritme visual
- Rounded corners, soft shadow, aksen gold digunakan konsisten sebagai unifying thread

**Animasi:** Level medium — ada wow-factor namun tetap smooth, tidak berlebihan. Mencakup scroll-reveal, parallax halus, countdown flip, dan transisi antar-section.

---

### 5. Ruang Lingkup Fitur

#### 5.1 Fitur Inti (Must Have)

| # | Fitur | Deskripsi |
|---|---|---|
| 1 | Cover Personal | Hero full-bleed dengan foto pasangan, sapaan pembuka, nama tamu yang dipersonalisasi ("Kepada Yth. [Nama Tamu]"), tombol buka undangan |
| 2 | Ayat Pernikahan | Kutipan QS. Ar-Rum: 21 ditampilkan minimalis |
| 3 | Profil Mempelai | Foto (arch-frame), nama, identitas orang tua kedua mempelai, tautan media sosial |
| 4 | Love Story | 3–4 momen penting perjalanan hubungan pasangan, masing-masing dengan foto & narasi singkat |
| 5 | Detail Acara Resepsi | Tanggal, waktu, lokasi lengkap, tombol "View on Map" dan "Save the Date" |
| 6 | Countdown Timer | Hitung mundur real-time menuju hari pernikahan (hari/jam/menit/detik) |
| 7 | Galeri Foto | Grid foto pre-wedding dengan layout dinamis, lightbox saat foto ditekan |
| 8 | RSVP | Form nama, status kehadiran (Hadir/Tidak Hadir), jumlah tamu, pesan |
| 9 | Ucapan & Doa | Tamu dapat mengirim & melihat ucapan dari tamu lain (guestbook digital) |
| 10 | Kado Digital | Info rekening bank/e-wallet dengan tombol copy-to-clipboard |
| 11 | Penutup | Ucapan terima kasih & doa penutup dari kedua mempelai |

#### 5.2 Fitur Personalisasi

- Nama tamu tampil otomatis berdasarkan parameter URL (contoh: `?to=Budi`)
- Setiap tamu mendapat link undangan unik untuk dibagikan lewat WhatsApp

#### 5.3 Fitur Pendukung (Nice to Have)

- Musik latar dengan tombol toggle on/off
- Tombol share ke WhatsApp dengan preview otomatis (Open Graph image)
- Gift registry (daftar kado terpisah dari transfer bank)
- Multi-bahasa (jika ada tamu asing)

#### 5.4 Di Luar Cakupan (Out of Scope)

- Detail acara Akad Nikah (hanya Resepsi yang ditampilkan)
- Live streaming acara
- Dashboard admin untuk mempelai (RSVP & ucapan dikelola manual/via database sederhana)

---

### 6. Alur Pengguna (User Flow)

1. Tamu membuka link undangan personal → melihat cover dengan nama mereka
2. Tamu menekan tombol "Buka Undangan" → animasi transisi ke konten utama
3. Tamu scroll melalui: ayat pernikahan → profil mempelai → love story → detail acara → countdown → galeri
4. Tamu mengisi RSVP dan/atau mengirim ucapan
5. Tamu (opsional) memberikan kado digital via info rekening/e-wallet
6. Tamu membaca penutup & dapat membagikan undangan ke kontak lain

---

### 7. Kebutuhan Non-Fungsional

| Aspek | Kebutuhan |
|---|---|
| Performa | Loading cepat di koneksi HP standar; lazy load untuk gambar & animasi berat |
| Responsif | Mobile-first, tetap optimal di tablet/desktop |
| Kompatibilitas | Berfungsi baik di WebView WhatsApp/Instagram in-app browser |
| Aksesibilitas | Kontras warna teks tetap terbaca di atas foto/overlay |
| SEO/Share | Meta tag Open Graph untuk preview link saat dibagikan |

---

### 8. Rencana Teknis

| Komponen | Teknologi |
|---|---|
| Frontend | Astro |
| Animasi | GSAP + ScrollTrigger (parallax, scroll-reveal), Framer Motion (komponen interaktif seperti RSVP form) |
| Data RSVP & Ucapan | Database sederhana (realtime, misal Supabase/Firebase) |
| Hosting | VPS / hosting statis (disesuaikan dengan infrastruktur yang sudah ada) |

---

### 9. Proses Desain

Eksplorasi visual dilakukan secara iteratif menggunakan tool AI design (Stitch by Google) untuk menentukan arah visual sebelum masuk tahap coding, dengan pembanding dari beberapa platform undangan digital yang sudah mapan untuk memastikan kelengkapan fitur dan kualitas visual setara standar industri.

---

### 10. Metrik Keberhasilan

- Tamu dapat mengakses undangan dan menyelesaikan RSVP tanpa kendala teknis
- Waktu loading halaman awal < 3 detik pada koneksi 4G standar
- Tampilan konsisten dan tetap elegan di berbagai ukuran layar HP

---

*Dokumen ini adalah acuan awal dan dapat berkembang seiring proses development.*