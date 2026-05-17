# Dokumentasi Goldentics App

Platform prediksi kenaikan/penurunan harga emas berbasis AI.
Proyek capstone Coding Camp DBS Foundation 2026.

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 18 + Vite 6 |
| Routing | React Router v6 |
| Styling | Custom CSS (ported dari desain HTML) |
| HTTP Client | Axios |
| Backend | Node.js + Express v5 |
| AI Model | Hugging Face Inference API |
| Font | Poppins (Google Fonts) |

---

## Struktur Folder

```
goldentics-app/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── services/           # Business logic + HuggingFace integration
│   │   ├── routes/             # Definisi API routes
│   │   ├── middleware/         # Validasi, error handling
│   │   ├── utils/              # Helper functions
│   │   ├── data/               # Data historis harga emas (static)
│   │   ├── app.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Navigasi shared (NavLink auto-active)
│   │   │   └── FooterSimple.jsx # Footer ringkas untuk halaman dalam
│   │   ├── pages/
│   │   │   ├── Beranda.jsx     # Halaman utama (hero, edu sections, CTA)
│   │   │   ├── Grafik.jsx      # Grafik + tabel histori harga
│   │   │   ├── Kalkulator.jsx  # Kalkulator harga emas (2 mode)
│   │   │   ├── Prediksi.jsx    # Form prediksi AI + result panel
│   │   │   └── Tentang.jsx     # Info proyek, tim, tech stack
│   │   ├── App.jsx             # BrowserRouter + Routes
│   │   ├── main.jsx            # Entry point React
│   │   └── index.css           # Semua CSS (combined dari 5 halaman desain)
│   ├── index.html
│   ├── package.json
│   └── vite.config.js          # Vite config + proxy /api → localhost:5000
│
├── CLAUDE.md                   # Instruksi kerja dengan Claude
├── DOKUMENTASI.md              # File ini
└── README.md
```

---

## Cara Menjalankan

### Backend
```bash
cd backend
cp .env.example .env    # isi HUGGING_FACE_API_KEY
npm install
npm run dev             # jalan di port 5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev             # jalan di port 5173
```

> Pastikan backend jalan dulu sebelum frontend. Vite sudah dikonfigurasi proxy `/api` → `http://localhost:5000`.

---

## Halaman & Routes

| Route | Komponen | Deskripsi |
|-------|----------|-----------|
| `/` | `Beranda.jsx` | Landing page — hero, edukasi emas, CTA |
| `/grafik` | `Grafik.jsx` | Grafik SVG + tabel histori harga |
| `/kalkulator` | `Kalkulator.jsx` | Kalkulator konversi emas ↔ rupiah |
| `/prediksi` | `Prediksi.jsx` | Form prediksi AI + tampilan rekomendasi |
| `/tentang` | `Tentang.jsx` | Info tim, tech stack, metadata proyek |

---

## API Endpoints (Backend)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/gold-history` | Data historis harga emas |
| POST | `/api/predict` | Prediksi harga emas via AI |
| GET | `/api/predict-history` | Riwayat prediksi sebelumnya |

---

## Environment Variables (Backend)

Salin dari `.env.example`:

```env
NODE_ENV=development
PORT=5000
SERVER_URL=http://localhost:5000
HUGGING_FACE_API_KEY=your_api_key_here
HUGGING_FACE_API_URL=https://api-inference.huggingface.co/models/sample-model
```

---

## Catatan Teknis

- **CSS conflicts dihindari** dengan rename class: `.main-grafik` (halaman Grafik) dan `.about-info-rows`/`.about-info-row` (halaman Tentang) — berbeda dari `.main` dan `.info-rows` yang dipakai halaman Kalkulator.
- **Kalkulator** menggunakan React `useState` untuk kalkulasi real-time tanpa reload.
- **Prediksi** menggunakan `useState` untuk toggle empty state ↔ result panel.
- **Grafik** menggunakan `useState` untuk tab filter (7 Hari / 1 Bulan / dst).
- **Navbar** menggunakan `NavLink` dari React Router — class `active` otomatis berdasarkan route aktif.
- Backend data masih **dummy/static** di frontend — belum disambung ke API (next step).

---

## Changelog

### [2026-05-17] — Sesi 1: Setup Frontend React
- Init project Vite + React di `frontend/`
- Install dependencies: `react`, `react-dom`, `react-router-dom`, `axios`
- Buat `index.css` — gabungan CSS dari 5 file desain HTML
- Buat shared components: `Navbar.jsx`, `FooterSimple.jsx`
- Convert 5 halaman HTML → React JSX:
  - `Beranda.jsx` — tombol navigasi fungsional ke `/prediksi` & `/kalkulator`
  - `Grafik.jsx` — tab filter chart interaktif
  - `Kalkulator.jsx` — kalkulasi real-time (emas↔uang)
  - `Prediksi.jsx` — toggle result panel
  - `Tentang.jsx` — halaman statis
- Dev server berjalan di `http://localhost:5173` tanpa error
