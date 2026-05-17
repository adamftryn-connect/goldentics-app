# Goldentics App — CLAUDE.md

## Deskripsi Project
**Goldentics** adalah web aplikasi prediksi kenaikan/penurunan harga emas berdasarkan data historis menggunakan model machine learning via Hugging Face API.

---

## Tech Stack

### Backend
- **Runtime:** Node.js (ESM)
- **Framework:** Express v5
- **Deps:** axios, cors, dotenv
- **Port:** 5000 (default)

### Frontend
- **Framework:** React + Vite
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Port:** 5173 (default Vite)

---

## Struktur Folder

```
goldentics-app/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic + Hugging Face integration
│   │   ├── routes/          # API route definitions
│   │   ├── middleware/       # Validation, error handling
│   │   ├── utils/           # Helper functions
│   │   ├── data/            # Static data (gold history)
│   │   ├── app.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
├── frontend/                # React + Vite (belum di-init)
├── CLAUDE.md
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/gold-history` | Ambil data historis harga emas |
| POST | `/api/predict` | Prediksi harga emas |
| GET | `/api/predict-history` | Ambil riwayat prediksi |

---

## Cara Menjalankan

### Backend
```bash
cd backend
cp .env.example .env   # isi HUGGING_FACE_API_KEY
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables (Backend)

```env
NODE_ENV=development
PORT=5000
SERVER_URL=http://localhost:5000
HUGGING_FACE_API_KEY=your_api_key_here
HUGGING_FACE_API_URL=https://api-inference.huggingface.co/models/sample-model
```

---

## Rules Kerja dengan Claude

1. **Selalu konfirmasi sebelum membuat atau mengubah apapun** — jangan assume, tanya dulu
2. **Skeptis dan kritis** — setiap permintaan dipertanyakan jika ada yang kurang jelas
3. **Dilarang overconfident** — kalau tidak yakin, bilang tidak yakin
4. **Akhir setiap sesi** — laporkan semua perubahan yang dilakukan beserta manfaatnya
5. **Bahasa komunikasi** — Indonesia, boleh santai/meme/tiktok style
6. **Jangan bikin fitur ekstra** — stick to what was asked, no gold plating
