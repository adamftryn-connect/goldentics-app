# Goldentics

Platform analisis dan prediksi harga emas berbasis data historis dan AI.

Capstone Project — Coding Camp DBS Foundation 2026.

## Fitur MVP

- **Beranda** — landing, ringkasan harga, edukasi emas
- **Grafik** — chart & tabel histori harga (7 hari – 1 tahun)
- **Kalkulator** — konversi emas ↔ rupiah
- **Prediksi** — prediksi 7 hari + rekomendasi AI (riwayat jika login)
- **Tentang** — info proyek & tim
- **Login / Register** — JWT untuk menyimpan riwayat prediksi

## Tech Stack

React 18 · Vite · React Router · Axios · Node.js · Express · PostgreSQL · Hugging Face Space

## Menjalankan Aplikasi

### 1. Install dependensi

```bash
npm run install:all
```

### 2. Backend — environment & database

```bash
cd backend
copy .env.example .env
```

Isi `DATABASE_URL`, `JWT_SECRET`, dan `HUGGING_FACE_API_URL` di `.env`.

```bash
npm run db:setup
npm run dev
```

Backend: http://localhost:5000/health

### 3. Frontend

Terminal terpisah:

```bash
cd frontend
npm run dev
```

Frontend: http://localhost:5173 (proxy `/api` → backend port 5000)

> Backend dan frontend **wajib** jalan bersamaan.

## Halaman

| Route | Deskripsi |
|-------|-----------|
| `/` | Beranda |
| `/grafik` | Grafik & histori harga |
| `/kalkulator` | Kalkulator emas |
| `/prediksi` | Prediksi AI |
| `/tentang` | Tentang proyek |
| `/login`, `/register` | Autentikasi |

## API Utama

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/auth/register` | - |
| POST | `/api/auth/login` | - |
| GET | `/api/auth/me` | JWT |
| GET | `/api/gold-history` | - |
| GET | `/api/gold-price/latest` | - |
| GET | `/api/gold-stats/summary` | - |
| POST | `/api/predict` | Opsional |
| GET | `/api/predict-history` | JWT |

Response JSON: `{ success, data, error }`. Detail kontrak ada di komentar file `backend/src/routes/` dan `backend/src/controllers/`.

## Database

PostgreSQL — tabel `users`, `gold_prices`, `predictions`.

Data emas diimport dari `backend/data/gold_historis.csv`:

```bash
cd backend
npm run db:migrate      # migrasi saja
npm run db:import-gold  # import CSV saja
```

## Environment (Backend)

| Variable | Keterangan |
|----------|------------|
| `DATABASE_URL` | Koneksi PostgreSQL |
| `JWT_SECRET` | Secret JWT (min. 16 karakter) |
| `JWT_EXPIRES_IN` | Default `7d` |
| `HUGGING_FACE_API_URL` | URL HF Space prediksi |
| `HUGGING_FACE_API_KEY` | Opsional (untuk Inference API) |

Contoh lengkap: `backend/.env.example`
