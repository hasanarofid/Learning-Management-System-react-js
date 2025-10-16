-- Database LMS Schema
CREATE DATABASE IF NOT EXISTS db_lis;
USE db_lis;

-- Tabel Users
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'student', 'instructor') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Courses
CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    instructor_id INT,
    thumbnail_url VARCHAR(500),
    duration_hours INT DEFAULT 0,
    difficulty_level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    price DECIMAL(10,2) DEFAULT 0.00,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (instructor_id) REFERENCES users(id)
);

-- Tabel Lessons
CREATE TABLE lessons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    video_url VARCHAR(500),
    duration_minutes INT DEFAULT 0,
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Tabel Quizzes
CREATE TABLE quizzes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    time_limit_minutes INT DEFAULT 30,
    passing_score INT DEFAULT 70,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Tabel Questions
CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quiz_id INT NOT NULL,
    question_text TEXT NOT NULL,
    question_type ENUM('multiple_choice', 'true_false', 'essay') DEFAULT 'multiple_choice',
    points INT DEFAULT 1,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- Tabel Question Options
CREATE TABLE question_options (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_id INT NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    order_index INT DEFAULT 0,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Tabel Enrollments
CREATE TABLE enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE KEY unique_enrollment (user_id, course_id)
);

-- Tabel Quiz Attempts
CREATE TABLE quiz_attempts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    quiz_id INT NOT NULL,
    score DECIMAL(5,2) DEFAULT 0.00,
    total_questions INT DEFAULT 0,
    correct_answers INT DEFAULT 0,
    time_taken_minutes INT DEFAULT 0,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

-- Insert sample data
INSERT INTO users (username, email, password, full_name, role) VALUES
('admin', 'admin@lms.com', '$2b$10$example', 'Administrator', 'admin'),
('instructor1', 'instructor@lms.com', '$2b$10$example', 'John Instructor', 'instructor'),
('student1', 'student@lms.com', '$2b$10$example', 'Jane Student', 'student');

INSERT INTO courses (title, description, instructor_id, thumbnail_url, duration_hours, difficulty_level, price, is_published) VALUES
('React.js Fundamentals', 'Pelajari dasar-dasar React.js dari nol hingga mahir', 2, 'https://via.placeholder.com/400x300', 20, 'beginner', 0.00, TRUE),
('Advanced JavaScript', 'Konsep JavaScript tingkat lanjut untuk developer berpengalaman', 2, 'https://via.placeholder.com/400x300', 30, 'intermediate', 150000.00, TRUE),
('Node.js Backend Development', 'Membangun aplikasi backend dengan Node.js dan Express', 2, 'https://via.placeholder.com/400x300', 25, 'intermediate', 200000.00, TRUE);

INSERT INTO lessons (course_id, title, content, video_url, duration_minutes, order_index, is_published) VALUES
(1, 'Pengenalan React', 'Materi pengenalan React.js dan konsep dasar', 'https://example.com/video1', 30, 1, TRUE),
(1, 'Components dan Props', 'Belajar membuat komponen dan menggunakan props', 'https://example.com/video2', 45, 2, TRUE),
(1, 'State dan Lifecycle', 'Mengelola state dan lifecycle komponen', 'https://example.com/video3', 40, 3, TRUE);

INSERT INTO quizzes (course_id, title, description, time_limit_minutes, passing_score, is_published) VALUES
(1, 'Quiz React Fundamentals', 'Evaluasi pemahaman dasar React.js', 30, 70, TRUE),
(2, 'Quiz Advanced JavaScript', 'Tes kemampuan JavaScript tingkat lanjut', 45, 80, TRUE);

INSERT INTO questions (quiz_id, question_text, question_type, points, order_index) VALUES
(1, 'Apa itu React.js?', 'multiple_choice', 1, 1),
(1, 'React menggunakan Virtual DOM', 'true_false', 1, 2),
(1, 'Jelaskan perbedaan antara state dan props', 'essay', 3, 3);

INSERT INTO question_options (question_id, option_text, is_correct, order_index) VALUES
(1, 'Library JavaScript untuk membangun UI', TRUE, 1),
(1, 'Framework untuk backend', FALSE, 2),
(1, 'Database management system', FALSE, 3),
(1, 'Operating system', FALSE, 4),
(2, 'Benar', TRUE, 1),
(2, 'Salah', FALSE, 2);
