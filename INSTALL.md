# 🚀 LMS System - Panduan Instalasi

## 📋 Prasyarat

- **Node.js** (v14 atau lebih baru)
- **MySQL** (v8.0 atau lebih baru)
- **npm** atau **yarn**

## 🔧 Instalasi Cepat

### 1. Clone Repository
```bash
git clone <repository-url>
cd lis
```

### 2. Jalankan Script Instalasi
```bash
./start-app.sh
```

Script ini akan:
- ✅ Mengecek koneksi MySQL
- 📊 Setup database
- 📦 Install dependencies
- ⚙️ Buat konfigurasi
- 🚀 Start server

## 🔧 Instalasi Manual

### 1. Setup Database
```bash
# Buat database MySQL
mysql -u root -phasanitki -e "CREATE DATABASE IF NOT EXISTS db_lis;"

# Import schema
mysql -u root -phasanitki db_lis < database/schema.sql
```

### 2. Install Dependencies
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd server
npm install
cd ..
```

### 3. Konfigurasi Environment
Buat file `server/.env`:
```
PORT=5000
JWT_SECRET=lms-secret-key-2024
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=hasanitki
DB_NAME=db_lis
```

### 4. Jalankan Aplikasi
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
npm start
```

## 🌐 Akses Aplikasi

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: MySQL (db_lis)

## 👤 Login Default

Database sudah include dengan data sample:
- **Admin**: admin / (sesuai password di database)
- **Instruktur**: instructor1 / (sesuai password di database)
- **Siswa**: student1 / (sesuai password di database)

## 📱 Fitur yang Tersedia

### 1. **Beranda** (/)
- Hero section dengan CTA
- Statistik platform
- Fitur-fitur unggulan
- Preview kursus populer

### 2. **Pilih Kursus** (/courses)
- Daftar semua kursus
- Filter berdasarkan kesulitan
- Pencarian kursus
- Sorting options

### 3. **Pembelajaran** (/learning/:courseId)
- Daftar pelajaran di sidebar
- Video pembelajaran
- Progress tracking
- Navigasi antar pelajaran

### 4. **Kuis** (/quiz/:quizId)
- Soal pilihan ganda
- Soal benar/salah
- Soal esai
- Timer countdown
- Hasil kuis

## 🎨 Design Features

- **Responsive Design** - Optimal di semua perangkat
- **Modern UI** - Gradient colors dan smooth animations
- **User Friendly** - Interface yang intuitif dan mudah digunakan
- **Fast Loading** - Optimized untuk performa terbaik

## 🔧 Troubleshooting

### Database Connection Error
```bash
# Cek MySQL status
sudo systemctl status mysql

# Start MySQL jika tidak berjalan
sudo systemctl start mysql

# Cek koneksi
mysql -u root -phasanitki -e "SELECT 1;"
```

### Port Already in Use
```bash
# Cek port yang digunakan
lsof -i :3000
lsof -i :5000

# Kill process jika perlu
kill -9 <PID>
```

### Module Not Found
```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install

# Untuk server
cd server
rm -rf node_modules package-lock.json
npm install
cd ..
```

## 📊 Database Schema

Database sudah include dengan data sample:
- **3 kursus** (React.js, JavaScript, Node.js)
- **Pelajaran** untuk setiap kursus
- **Kuis** dengan berbagai jenis soal
- **User** admin, instruktur, dan siswa

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

## 📞 Support

Untuk pertanyaan atau bantuan, silakan buat issue di repository ini.

---

**Dibuat dengan ❤️ menggunakan React.js dan MySQL**
