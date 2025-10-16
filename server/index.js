const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hasanitki',
  database: 'db_lis'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// JWT Secret
const JWT_SECRET = 'your-secret-key';

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const [users] = await db.promise().execute(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, username]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Courses routes
app.get('/api/courses', async (req, res) => {
  try {
    const [courses] = await db.promise().execute(`
      SELECT c.*, u.full_name as instructor_name 
      FROM courses c 
      LEFT JOIN users u ON c.instructor_id = u.id 
      WHERE c.is_published = 1
      ORDER BY c.created_at DESC
    `);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/courses/:id', async (req, res) => {
  try {
    const [courses] = await db.promise().execute(`
      SELECT c.*, u.full_name as instructor_name 
      FROM courses c 
      LEFT JOIN users u ON c.instructor_id = u.id 
      WHERE c.id = ? AND c.is_published = 1
    `, [req.params.id]);

    if (courses.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(courses[0]);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Lessons routes
app.get('/api/courses/:courseId/lessons', async (req, res) => {
  try {
    const [lessons] = await db.promise().execute(`
      SELECT * FROM lessons 
      WHERE course_id = ? AND is_published = 1 
      ORDER BY order_index ASC
    `, [req.params.courseId]);
    res.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Quizzes routes
app.get('/api/courses/:courseId/quizzes', async (req, res) => {
  try {
    const [quizzes] = await db.promise().execute(`
      SELECT * FROM quizzes 
      WHERE course_id = ? AND is_published = 1 
      ORDER BY created_at ASC
    `, [req.params.courseId]);
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/quizzes/:id', async (req, res) => {
  try {
    const [quizzes] = await db.promise().execute(
      'SELECT * FROM quizzes WHERE id = ? AND is_published = 1',
      [req.params.id]
    );

    if (quizzes.length === 0) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const [questions] = await db.promise().execute(`
      SELECT q.*, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', qo.id,
            'option_text', qo.option_text,
            'is_correct', qo.is_correct,
            'order_index', qo.order_index
          )
        ) as options
      FROM questions q
      LEFT JOIN question_options qo ON q.id = qo.question_id
      WHERE q.quiz_id = ?
      GROUP BY q.id
      ORDER BY q.order_index ASC
    `, [req.params.id]);

    res.json({
      ...quizzes[0],
      questions
    });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Enrollments routes
app.post('/api/enrollments', authenticateToken, async (req, res) => {
  try {
    const { course_id } = req.body;
    const user_id = req.user.id;

    // Check if already enrolled
    const [existing] = await db.promise().execute(
      'SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?',
      [user_id, course_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    await db.promise().execute(
      'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)',
      [user_id, course_id]
    );

    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    console.error('Error enrolling:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/enrollments', authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id;
    const [enrollments] = await db.promise().execute(`
      SELECT e.*, c.title, c.description, c.thumbnail_url, c.duration_hours,
             u.full_name as instructor_name
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      LEFT JOIN users u ON c.instructor_id = u.id
      WHERE e.user_id = ?
      ORDER BY e.enrolled_at DESC
    `, [user_id]);
    res.json(enrollments);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Quiz attempts routes
app.post('/api/quiz-attempts', authenticateToken, async (req, res) => {
  try {
    const { quiz_id, answers, time_taken_minutes } = req.body;
    const user_id = req.user.id;

    // Get quiz questions and correct answers
    const [questions] = await db.promise().execute(`
      SELECT q.id, q.points, qo.id as option_id, qo.is_correct
      FROM questions q
      LEFT JOIN question_options qo ON q.id = qo.question_id
      WHERE q.quiz_id = ?
    `, [quiz_id]);

    // Calculate score
    let correctAnswers = 0;
    let totalQuestions = 0;
    let totalPoints = 0;

    questions.forEach(question => {
      if (question.option_id) {
        totalQuestions++;
        totalPoints += question.points;
        
        const userAnswer = answers[question.id];
        if (userAnswer && question.is_correct) {
          correctAnswers++;
        }
      }
    });

    const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    // Save attempt
    await db.promise().execute(`
      INSERT INTO quiz_attempts (user_id, quiz_id, score, total_questions, correct_answers, time_taken_minutes)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [user_id, quiz_id, score, totalQuestions, correctAnswers, time_taken_minutes]);

    res.json({
      score: Math.round(score),
      correct_answers: correctAnswers,
      total_questions: totalQuestions,
      passed: score >= 70
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
