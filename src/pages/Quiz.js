import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCheck, FiClock, FiArrowLeft, FiArrowRight, FiAward, FiRefreshCw } from 'react-icons/fi';
import axios from 'axios';
import './Quiz.css';

const Quiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quiz && !quizCompleted) {
      handleSubmitQuiz();
    }
  }, [timeLeft, quiz, quizCompleted]);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`/api/quizzes/${quizId}`);
      setQuiz(response.data);
      setQuestions(response.data.questions || []);
      setTimeLeft(response.data.time_limit_minutes * 60);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (submitting) return;
    
    setSubmitting(true);
    try {
      const timeTaken = Math.floor((quiz.time_limit_minutes * 60 - timeLeft) / 60);
      const response = await axios.post('/api/quiz-attempts', {
        quiz_id: quizId,
        answers,
        time_taken_minutes: timeTaken
      });
      
      setResult(response.data);
      setQuizCompleted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  };

  if (loading) {
    return (
      <div className="quiz-loading">
        <div className="loading-spinner"></div>
        <p>Memuat kuis...</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="quiz-error">
        <h2>Kuis tidak ditemukan</h2>
        <Link to="/courses" className="btn btn-primary">
          <FiArrowLeft />
          Kembali ke Kursus
        </Link>
      </div>
    );
  }

  if (quizCompleted && result) {
    return (
      <div className="quiz-result">
        <div className="container">
          <div className="result-card">
            <div className="result-header">
              <FiAward className="result-icon" />
              <h1>Kuis Selesai!</h1>
              <p>Berikut adalah hasil kuis Anda</p>
            </div>

            <div className="result-stats">
              <div className="stat-item">
                <div className="stat-value">{result.score}%</div>
                <div className="stat-label">Skor</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{result.correct_answers}</div>
                <div className="stat-label">Benar</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{result.total_questions}</div>
                <div className="stat-label">Total Soal</div>
              </div>
            </div>

            <div className={`result-status ${result.passed ? 'passed' : 'failed'}`}>
              {result.passed ? (
                <>
                  <FiCheck className="status-icon" />
                  <h2>Selamat! Anda Lulus</h2>
                  <p>Skor Anda memenuhi syarat kelulusan (≥70%)</p>
                </>
              ) : (
                <>
                  <FiRefreshCw className="status-icon" />
                  <h2>Belum Lulus</h2>
                  <p>Skor Anda belum memenuhi syarat kelulusan. Coba lagi!</p>
                </>
              )}
            </div>

            <div className="result-actions">
              <Link to="/courses" className="btn btn-secondary">
                <FiArrowLeft />
                Kembali ke Kursus
              </Link>
              {!result.passed && (
                <button 
                  onClick={() => window.location.reload()} 
                  className="btn btn-primary"
                >
                  <FiRefreshCw />
                  Coba Lagi
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz">
      <div className="quiz-container">
        {/* Quiz Header */}
        <div className="quiz-header">
          <div className="quiz-info">
            <h1>{quiz.title}</h1>
            <p>{quiz.description}</p>
          </div>
          <div className="quiz-timer">
            <FiClock className="timer-icon" />
            <span className="timer-text">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="quiz-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <div className="progress-text">
            Soal {currentQuestionIndex + 1} dari {questions.length}
          </div>
        </div>

        {/* Question Navigation */}
        <div className="question-nav">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`nav-btn ${index === currentQuestionIndex ? 'active' : ''} ${
                answers[questions[index].id] ? 'answered' : ''
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Question Content */}
        {currentQuestion && (
          <div className="question-card">
            <div className="question-header">
              <h2>Soal {currentQuestionIndex + 1}</h2>
              <div className="question-meta">
                <span className="question-type">
                  {currentQuestion.question_type === 'multiple_choice' ? 'Pilihan Ganda' :
                   currentQuestion.question_type === 'true_false' ? 'Benar/Salah' : 'Esai'}
                </span>
                <span className="question-points">{currentQuestion.points} poin</span>
              </div>
            </div>

            <div className="question-content">
              <h3 className="question-text">{currentQuestion.question_text}</h3>

              {currentQuestion.question_type === 'multiple_choice' && (
                <div className="options-list">
                  {currentQuestion.options?.map((option) => (
                    <label
                      key={option.id}
                      className={`option-item ${
                        answers[currentQuestion.id] === option.id ? 'selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question_${currentQuestion.id}`}
                        value={option.id}
                        checked={answers[currentQuestion.id] === option.id}
                        onChange={() => handleAnswerChange(currentQuestion.id, option.id)}
                        className="option-radio"
                      />
                      <span className="option-text">{option.option_text}</span>
                    </label>
                  ))}
                </div>
              )}

              {currentQuestion.question_type === 'true_false' && (
                <div className="options-list">
                  <label
                    className={`option-item ${
                      answers[currentQuestion.id] === 'true' ? 'selected' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question_${currentQuestion.id}`}
                      value="true"
                      checked={answers[currentQuestion.id] === 'true'}
                      onChange={() => handleAnswerChange(currentQuestion.id, 'true')}
                      className="option-radio"
                    />
                    <span className="option-text">Benar</span>
                  </label>
                  <label
                    className={`option-item ${
                      answers[currentQuestion.id] === 'false' ? 'selected' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question_${currentQuestion.id}`}
                      value="false"
                      checked={answers[currentQuestion.id] === 'false'}
                      onChange={() => handleAnswerChange(currentQuestion.id, 'false')}
                      className="option-radio"
                    />
                    <span className="option-text">Salah</span>
                  </label>
                </div>
              )}

              {currentQuestion.question_type === 'essay' && (
                <div className="essay-input">
                  <textarea
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    placeholder="Tulis jawaban Anda di sini..."
                    className="essay-textarea"
                    rows={6}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="quiz-navigation">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="btn btn-secondary"
          >
            <FiArrowLeft />
            Sebelumnya
          </button>

          <div className="nav-center">
            <button
              onClick={handleSubmitQuiz}
              disabled={submitting}
              className="btn btn-primary btn-submit"
            >
              {submitting ? (
                <>
                  <div className="loading-spinner small"></div>
                  Mengirim...
                </>
              ) : (
                <>
                  <FiCheck />
                  Selesai
                </>
              )}
            </button>
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            className="btn btn-secondary"
          >
            Selanjutnya
            <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
