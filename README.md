# LMS - Learning Management System by @hasanarofid

Sistem Manajemen Pembelajaran (LMS) yang dibangun dengan React.js dan MySQL. Platform ini menyediakan fitur pembelajaran online yang lengkap dengan kursus, pelajaran, dan sistem kuis.

## 🚀 Fitur Utama

- **Halaman Beranda**: Tampilan modern dengan informasi platform dan kursus populer
- **Pilih Kursus**: Daftar kursus dengan filter dan pencarian
- **Pembelajaran**: Interface pembelajaran dengan video dan materi
- **Kuis**: Sistem evaluasi dengan berbagai jenis pertanyaan
- **Responsive Design**: Tampilan yang optimal di semua perangkat

## 🛠️ Teknologi yang Digunakan

### Frontend
- React.js 18
- React Router DOM
- Styled Components
- React Icons
- Axios
- Framer Motion

### Backend
- Node.js
- Express.js
- MySQL2
- JWT Authentication
- Bcryptjs

### Database
- MySQL

## 📋 Prasyarat

- Node.js (v14 atau lebih baru)
- MySQL (v8.0 atau lebih baru)
- npm atau yarn

## 🔧 Instalasi

### 1. Clone Repository
```bash
git clone <repository-url>
cd lis
```

### 2. Install Dependencies

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd server
npm install
```

### 3. Setup Database

1. Buat database MySQL:
```sql
CREATE DATABASE db_lis;
```

2. Import schema database:
```bash
mysql -u root -p db_lis < database/schema.sql
```

### 4. Konfigurasi Environment

Buat file `.env` di root project:
```
REACT_APP_API_URL=http://localhost:5000
```

Buat file `.env` di folder `server`:
```
PORT=5000
JWT_SECRET=your-secret-key-here
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=hasanitki
DB_NAME=db_lis
```

## 🚀 Menjalankan Aplikasi

### 1. Start Backend Server
```bash
cd server
npm start
```

### 2. Start Frontend (Terminal baru)
```bash
npm start
```

### 3. Akses Aplikasi
Buka browser dan kunjungi: `http://localhost:3000`

## 📱 Halaman Aplikasi

### 1. Beranda (/)
- Hero section dengan CTA
- Statistik platform
- Fitur-fitur unggulan
- Preview kursus populer

### 2. Pilih Kursus (/courses)
- Daftar semua kursus
- Filter berdasarkan kesulitan
- Pencarian kursus
- Sorting options

### 3. Pembelajaran (/learning/:courseId)
- Daftar pelajaran di sidebar
- Video pembelajaran
- Progress tracking
- Navigasi antar pelajaran

### 4. Kuis (/quiz/:quizId)
- Soal pilihan ganda
- Soal benar/salah
- Soal esai
- Timer countdown
- Hasil kuis

## 🎨 Design System

### Warna
- Primary: #667eea (Gradient: #667eea → #764ba2)
- Secondary: #e2e8f0
- Success: #22c55e
- Warning: #fbbf24
- Error: #ef4444

### Typography
- Font: Inter
- Headings: 700 weight
- Body: 400 weight
- Small text: 500 weight

### Spacing
- Container: max-width 1200px
- Padding: 1rem mobile, 2rem desktop
- Gap: 1rem, 1.5rem, 2rem

## 📊 Database Schema

### Tabel Utama
- `users`: Data pengguna (admin, instruktur, siswa)
- `courses`: Data kursus
- `lessons`: Pelajaran dalam kursus
- `quizzes`: Kuis untuk kursus
- `questions`: Soal dalam kuis
- `question_options`: Pilihan jawaban
- `enrollments`: Pendaftaran kursus
- `quiz_attempts`: Percobaan kuis

## 🔐 Authentication

Sistem menggunakan JWT (JSON Web Token) untuk autentikasi:
- Login dengan username/email dan password
- Token disimpan di localStorage
- Automatic logout jika token expired

## 📱 Responsive Design

Aplikasi dirancang untuk semua ukuran layar:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build aplikasi: `npm run build`
2. Deploy folder `build`

### Backend (Heroku/Railway)
1. Setup environment variables
2. Deploy dari folder `server`

### Database (PlanetScale/Railway)
1. Import schema ke database cloud
2. Update connection string di backend

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

## 📄 Lisensi

MIT License - lihat file LICENSE untuk detail.

## 📞 Support

Untuk pertanyaan atau bantuan, silakan buat issue di repository ini.

---

**Dibuat dengan ❤️ menggunakan React.js dan MySQL**
