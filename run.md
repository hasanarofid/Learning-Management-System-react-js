# Cara Menjalankan LMS System

## 🚀 Quick Start

### 1. Setup Database
```bash
# Buat database MySQL
mysql -u root -phasanitki -e "CREATE DATABASE IF NOT EXISTS db_lis;"

# Import schema
mysql -u root -phasanitki db_lis < database/schema.sql
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Setup Environment
Buat file `.env` di folder `server`:
```
PORT=5000
JWT_SECRET=your-secret-key-here
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=hasanitki
DB_NAME=db_lis
```

### 4. Jalankan Aplikasi

#### Opsi 1: Menggunakan Script
```bash
./start.sh
```

#### Opsi 2: Manual
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

- **Username**: admin
- **Password**: (sesuai dengan data di database)

## 📱 Fitur yang Tersedia

1. **Beranda** - Tampilan utama dengan informasi platform
2. **Pilih Kursus** - Daftar kursus dengan filter dan pencarian
3. **Pembelajaran** - Interface pembelajaran dengan video dan materi
4. **Kuis** - Sistem evaluasi dengan berbagai jenis pertanyaan

## 🔧 Troubleshooting

### Database Connection Error
- Pastikan MySQL berjalan
- Cek kredensial database di `server/.env`
- Pastikan database `db_lis` sudah dibuat

### Port Already in Use
- Ganti port di `server/.env` (PORT=5001)
- Atau hentikan proses yang menggunakan port tersebut

### Module Not Found
- Jalankan `npm install` di root dan folder `server`
- Pastikan semua dependencies terinstall

## 📊 Database Schema

Database sudah include dengan data sample:
- 3 kursus (React.js, JavaScript, Node.js)
- Pelajaran untuk setiap kursus
- Kuis dengan berbagai jenis soal
- User admin, instruktur, dan siswa

## 🎨 Design Features

- **Responsive Design** - Optimal di semua perangkat
- **Modern UI** - Gradient colors dan smooth animations
- **User Friendly** - Interface yang intuitif dan mudah digunakan
- **Fast Loading** - Optimized untuk performa terbaik
