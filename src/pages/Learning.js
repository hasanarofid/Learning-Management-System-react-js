import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiPlay, FiCheck, FiClock, FiBookOpen, FiAward, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';
import './Learning.css';

const Learning = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState(new Set());

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      const [courseResponse, lessonsResponse] = await Promise.all([
        axios.get(`/api/courses/${courseId}`),
        axios.get(`/api/courses/${courseId}/lessons`)
      ]);
      
      setCourse(courseResponse.data);
      setLessons(lessonsResponse.data);
      
      if (lessonsResponse.data.length > 0) {
        setCurrentLesson(lessonsResponse.data[0]);
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonComplete = (lessonId) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  const handleNextLesson = () => {
    const currentIndex = lessons.findIndex(lesson => lesson.id === currentLesson.id);
    if (currentIndex < lessons.length - 1) {
      setCurrentLesson(lessons[currentIndex + 1]);
    }
  };

  const handlePrevLesson = () => {
    const currentIndex = lessons.findIndex(lesson => lesson.id === currentLesson.id);
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1]);
    }
  };

  const getProgressPercentage = () => {
    if (lessons.length === 0) return 0;
    return Math.round((completedLessons.size / lessons.length) * 100);
  };

  if (loading) {
    return (
      <div className="learning-loading">
        <div className="loading-spinner"></div>
        <p>Memuat konten pembelajaran...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="learning-error">
        <h2>Kursus tidak ditemukan</h2>
        <Link to="/courses" className="btn btn-primary">
          <FiArrowLeft />
          Kembali ke Kursus
        </Link>
      </div>
    );
  }

  return (
    <div className="learning">
      <div className="learning-container">
        <div className="learning-sidebar">
          <div className="course-info">
            <div className="course-header">
              <h2>{course.title}</h2>
              <p>Oleh: {course.instructor_name}</p>
            </div>
            
            <div className="progress-section">
              <div className="progress-header">
                <span>Progress</span>
                <span>{getProgressPercentage()}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="lessons-list">
            <h3>Daftar Pelajaran</h3>
            <div className="lessons">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`lesson-item ${
                    currentLesson?.id === lesson.id ? 'active' : ''
                  } ${completedLessons.has(lesson.id) ? 'completed' : ''}`}
                  onClick={() => setCurrentLesson(lesson)}
                >
                  <div className="lesson-number">
                    {completedLessons.has(lesson.id) ? (
                      <FiCheck className="check-icon" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="lesson-info">
                    <h4>{lesson.title}</h4>
                    <div className="lesson-meta">
                      <span className="lesson-duration">
                        <FiClock />
                        {lesson.duration_minutes} menit
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="learning-content">
          {currentLesson ? (
            <div className="lesson-content">
              <div className="lesson-header">
                <h1>{currentLesson.title}</h1>
                <div className="lesson-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={handlePrevLesson}
                    disabled={lessons.findIndex(l => l.id === currentLesson.id) === 0}
                  >
                    <FiArrowLeft />
                    Sebelumnya
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleLessonComplete(currentLesson.id)}
                    disabled={completedLessons.has(currentLesson.id)}
                  >
                    {completedLessons.has(currentLesson.id) ? (
                      <>
                        <FiCheck />
                        Selesai
                      </>
                    ) : (
                      <>
                        <FiCheck />
                        Tandai Selesai
                      </>
                    )}
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={handleNextLesson}
                    disabled={lessons.findIndex(l => l.id === currentLesson.id) === lessons.length - 1}
                  >
                    Selanjutnya
                    <FiArrowRight />
                  </button>
                </div>
              </div>

              <div className="lesson-video">
                {currentLesson.video_url ? (
                  <iframe
                    src={currentLesson.video_url}
                    title={currentLesson.title}
                    className="video-iframe"
                    allowFullScreen
                  />
                ) : (
                  <div className="video-placeholder">
                    <FiPlay className="play-icon" />
                    <p>Video tidak tersedia</p>
                  </div>
                )}
              </div>

              <div className="lesson-text">
                <h3>Materi Pembelajaran</h3>
                <div className="content-text">
                  {currentLesson.content ? (
                    <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                  ) : (
                    <p>Konten pembelajaran akan segera tersedia.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="no-lesson">
              <FiBookOpen className="no-lesson-icon" />
              <h2>Pilih pelajaran untuk memulai</h2>
              <p>Klik pada salah satu pelajaran di sidebar untuk memulai pembelajaran</p>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Section */}
      {course && (
        <div className="quiz-section">
          <div className="container">
            <div className="quiz-card">
              <div className="quiz-content">
                <FiAward className="quiz-icon" />
                <div className="quiz-info">
                  <h3>Uji Pemahaman Anda</h3>
                  <p>Ikuti kuis untuk menguji pemahaman Anda tentang materi yang telah dipelajari</p>
                </div>
                <Link to={`/quiz/${courseId}`} className="btn btn-primary">
                  Mulai Kuis
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learning;
