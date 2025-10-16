import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiClock, FiStar, FiUsers, FiPlay, FiBookOpen } from 'react-icons/fi';
import axios from 'axios';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || course.difficulty_level === selectedDifficulty;
    
    return matchesSearch && matchesDifficulty;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.created_at) - new Date(a.created_at);
      case 'oldest':
        return new Date(a.created_at) - new Date(b.created_at);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'duration':
        return b.duration_hours - a.duration_hours;
      default:
        return 0;
    }
  });

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'difficulty-beginner';
      case 'intermediate':
        return 'difficulty-intermediate';
      case 'advanced':
        return 'difficulty-advanced';
      default:
        return 'difficulty-beginner';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'Pemula';
      case 'intermediate':
        return 'Menengah';
      case 'advanced':
        return 'Lanjutan';
      default:
        return 'Pemula';
    }
  };

  const formatPrice = (price) => {
    if (price === 0) return 'Gratis';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="courses-loading">
        <div className="loading-spinner"></div>
        <p>Memuat kursus...</p>
      </div>
    );
  }

  return (
    <div className="courses">
      <div className="container">
        {/* Header */}
        <div className="courses-header">
          <h1>Kursus Tersedia</h1>
          <p>Temukan kursus yang sesuai dengan minat dan kebutuhan Anda</p>
        </div>

        {/* Filters */}
        <div className="courses-filters">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Cari kursus..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <div className="filter-item">
              <label>Kesulitan:</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="filter-select"
              >
                <option value="all">Semua Level</option>
                <option value="beginner">Pemula</option>
                <option value="intermediate">Menengah</option>
                <option value="advanced">Lanjutan</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Urutkan:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
                <option value="title">Judul A-Z</option>
                <option value="duration">Durasi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <p>
            Menampilkan {sortedCourses.length} dari {courses.length} kursus
          </p>
        </div>

        {/* Courses Grid */}
        {sortedCourses.length > 0 ? (
          <div className="courses-grid">
            {sortedCourses.map((course) => (
              <div key={course.id} className="course-card fade-in">
                <div className="course-thumbnail">
                  <img 
                    src={course.thumbnail_url || 'https://via.placeholder.com/400x300/667eea/ffffff?text=Course'} 
                    alt={course.title}
                  />
                  <div className="course-overlay">
                    <FiPlay className="play-icon" />
                  </div>
                  <div className="course-badge">
                    <span className={getDifficultyClass(course.difficulty_level)}>
                      {getDifficultyText(course.difficulty_level)}
                    </span>
                  </div>
                </div>

                <div className="course-content">
                  <div className="course-meta">
                    <div className="course-stats">
                      <span className="course-duration">
                        <FiClock />
                        {course.duration_hours} jam
                      </span>
                      <span className="course-students">
                        <FiUsers />
                        1,234 siswa
                      </span>
                    </div>
                    <div className="course-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className="star filled" />
                        ))}
                      </div>
                      <span className="rating-text">4.8</span>
                    </div>
                  </div>

                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  
                  <div className="course-instructor">
                    <span>Oleh: {course.instructor_name}</span>
                  </div>

                  <div className="course-footer">
                    <div className="course-price">
                      {formatPrice(course.price)}
                    </div>
                    <Link 
                      to={`/learning/${course.id}`} 
                      className="btn btn-primary"
                    >
                      <FiBookOpen />
                      Mulai Belajar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-courses">
            <FiBookOpen className="no-courses-icon" />
            <h3>Tidak ada kursus ditemukan</h3>
            <p>Coba ubah filter pencarian Anda</p>
          </div>
        )}

        {/* Load More Button */}
        {sortedCourses.length > 0 && (
          <div className="load-more">
            <button className="btn btn-secondary">
              Muat Lebih Banyak
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
