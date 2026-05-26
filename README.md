# Dokumentasi Goldentics App
**Goldentics** adalah platform yang membantu untuk memprediksi kenaikan atau penurunan harga emas berdasarkan data historis berbasis AI.

Capstone Project - Coding Camp DBS Foundation 2026.

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
│   │   │   ├── Beranda.css     # CSS khusus halaman Beranda
│   │   │   ├── Grafik.jsx      # Grafik + tabel histori harga
│   │   │   ├── Grafik.css      # CSS khusus halaman Grafik
│   │   │   ├── Kalkulator.jsx  # Kalkulator harga emas (2 mode)
│   │   │   ├── Kalkulator.css  # CSS khusus halaman Kalkulator
│   │   │   ├── Prediksi.jsx    # Form prediksi AI + result panel
│   │   │   ├── Prediksi.css    # CSS khusus halaman Prediksi
│   │   │   ├── Tentang.jsx     # Info proyek, tim, tech stack
│   │   │   └── Tentang.css     # CSS khusus halaman Tentang
│   │   ├── api/                # Axios client + helper endpoint (kontrak backend)
│   │   ├── config/             # Fallback constants (selaras data backend)
│   │   ├── utils/              # formatRupiah, dll.
│   │   ├── App.jsx             # BrowserRouter + Routes
│   │   ├── main.jsx            # Entry point React
│   │   └── index.css           # CSS global: reset, navbar, page-hero, field shared, footer-simple
│   ├── index.html
│   ├── package.json
│   └── vite.config.js          # Vite config + proxy /api → localhost:5000
│
│   
└── README.md
```

---

## Cara Menjalankan

### Install semua dependensi (pertama kali)

Dari folder root:

```bash
npm run install:all
```

Atau per folder:

```bash
cd backend && npm install
cd frontend && npm install
```

### Backend
```bash
cd backend
cp .env.example .env    # Windows: copy .env.example .env
npm install             # lewati jika sudah npm run install:all
npm run dev             # jalan di port 5000
```

Cek: http://localhost:5000/health

### Frontend
```bash
cd frontend
npm install             # wajib jika frontend/node_modules belum ada
npm run dev             # jalan di port 5173
```

Cek: http://localhost:5173

### Dari folder root (hanya backend)

```bash
npm run dev             # hanya menjalankan backend, BUKAN frontend
npm run dev:frontend    # menjalankan frontend saja
```

> Jalankan **backend dan frontend di dua terminal terpisah** agar UI dan API aktif bersamaan. Vite sudah dikonfigurasi proxy `/api` → `http://localhost:5000`.

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

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| POST | `/api/auth/register` | - | Daftar akun baru |
| POST | `/api/auth/login` | - | Login, dapat JWT |
| GET | `/api/auth/me` | JWT | Profil user |
| GET | `/api/gold-history` | - | Data historis harga emas (+ OHLC) |
| GET | `/api/gold-price/latest` | - | Harga emas terbaru per gram |
| POST | `/api/predict` | JWT opsional | Prediksi; simpan riwayat jika login |
| GET | `/api/predict-history` | JWT wajib | Riwayat prediksi user |

---

## Database (PostgreSQL)

Tabel: `users`, `gold_prices`, `predictions`.

```powershell
cd backend
copy .env.example .env
npm install
npm run db:setup
```

Perintah terpisah: `npm run db:migrate`, `npm run db:seed`.

---

## Environment Variables (Backend)

Salin dari `.env.example`:

```env
NODE_ENV=development
PORT=5000
SERVER_URL=http://localhost:5000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/goldentics_db
JWT_SECRET=your-long-random-secret
JWT_EXPIRES_IN=7d
HUGGING_FACE_API_KEY=your_api_key_here
HUGGING_FACE_API_URL=https://api-inference.huggingface.co/models/sample-model
```
---

## Catatan Teknis

- **CSS dipecah per halaman**: `index.css` hanya untuk global (reset, navbar, page-hero, field shared, footer-simple). Tiap halaman punya CSS-nya sendiri di `src/pages/`.
- **CSS conflicts dihindari** dengan rename class: `.main-grafik` (halaman Grafik) dan `.about-info-rows`/`.about-info-row` (halaman Tentang) — berbeda dari `.main` dan `.info-rows` yang dipakai halaman Kalkulator.
- **Kalkulator** menggunakan `FALLBACK_PRICE_PER_GRAM` (2.420.000) selaras `backend/src/data/data-gold.js`.
- **Prediksi** menggunakan `useState` untuk toggle empty state ↔ result panel (belum memanggil `POST /api/predict`).
- **Grafik** menggunakan `useState` untuk tab filter (7 Hari / 1 Bulan / dst) — data tabel/chart masih statis.
- **Navbar** menggunakan `NavLink` dari React Router — class `active` otomatis berdasarkan route aktif.

