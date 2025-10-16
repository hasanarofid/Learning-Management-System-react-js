#!/bin/bash

echo "🚀 LMS System - Quick Start"
echo "=========================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if MySQL is running
print_info "Checking MySQL connection..."
if ! mysql -u root -phasanitki -e "SELECT 1;" &> /dev/null; then
    print_error "Cannot connect to MySQL. Please check:"
    echo "1. MySQL is running"
    echo "2. Username: root"
    echo "3. Password: hasanitki"
    echo "4. Database server is accessible"
    exit 1
fi
print_status "MySQL connection successful"

# Setup database
print_info "Setting up database..."
mysql -u root -phasanitki -e "CREATE DATABASE IF NOT EXISTS db_lis;" 2>/dev/null
if [ $? -eq 0 ]; then
    print_status "Database created/verified"
else
    print_error "Failed to create database"
    exit 1
fi

# Import schema
print_info "Importing database schema..."
mysql -u root -phasanitki db_lis < database/schema.sql 2>/dev/null
if [ $? -eq 0 ]; then
    print_status "Database schema imported"
else
    print_error "Failed to import schema"
    exit 1
fi

# Install dependencies
print_info "Installing frontend dependencies..."
npm install --silent
if [ $? -eq 0 ]; then
    print_status "Frontend dependencies installed"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi

print_info "Installing backend dependencies..."
cd server
npm install --silent
if [ $? -eq 0 ]; then
    print_status "Backend dependencies installed"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi
cd ..

# Create server .env file
print_info "Creating server environment file..."
cat > server/.env << EOF
PORT=5000
JWT_SECRET=lms-secret-key-2024
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=hasanitki
DB_NAME=db_lis
EOF
print_status "Server environment file created"

# Start backend server
print_info "Starting backend server..."
cd server
npm start &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Check if backend is running
if curl -s http://localhost:5000/api/courses > /dev/null 2>&1; then
    print_status "Backend server is running on port 5000"
else
    print_warning "Backend server might not be ready yet"
fi

# Start frontend server
print_info "Starting frontend server..."
print_status "LMS System is starting up!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo "📊 Database: MySQL (db_lis)"
echo ""
echo "Press Ctrl+C to stop all servers"

# Cleanup function
cleanup() {
    echo ""
    print_info "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    print_status "All servers stopped"
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT

# Start frontend
npm start
