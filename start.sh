#!/bin/bash

echo "🚀 LMS System - Quick Start"
echo "=========================="

# Check if MySQL is running
if ! mysql -u root -phasanitki -e "SELECT 1;" &> /dev/null; then
    echo "❌ Cannot connect to MySQL. Please check your MySQL connection."
    echo "   Username: root"
    echo "   Password: hasanitki"
    exit 1
fi

echo "✅ MySQL connection successful"

# Setup database
echo "📊 Setting up database..."
mysql -u root -phasanitki -e "CREATE DATABASE IF NOT EXISTS db_lis;" 2>/dev/null
mysql -u root -phasanitki db_lis < database/schema.sql 2>/dev/null
echo "✅ Database setup completed"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd server
    npm install
    cd ..
fi

# Create server .env file
echo "⚙️  Creating server configuration..."
cat > server/.env << EOF
PORT=5000
JWT_SECRET=lms-secret-key-2024
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=hasanitki
DB_NAME=db_lis
EOF

echo "✅ Configuration created"

# Start backend server
echo "🔧 Starting backend server on port 5000..."
cd server
npm start &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend server
echo "🌐 Starting frontend server on port 3000..."
echo ""
echo "✅ LMS System is running!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo "📊 Database: MySQL (db_lis)"
echo ""
echo "Press Ctrl+C to stop all servers"

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    echo "✅ All servers stopped"
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT

# Start frontend
npm start