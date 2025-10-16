import React from 'react';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiUsers, FiAward, FiPlay, FiStar, FiClock } from 'react-icons/fi';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <FiBookOpen />,
      title: 'Kursus Berkualitas',
      description: 'Akses ribuan kursus berkualitas tinggi dari instruktur berpengalaman di bidangnya.'
    },
    {
      icon: <FiUsers />,
      title: 'Komunitas Aktif',
      description: 'Bergabung dengan komunitas pelajar yang saling mendukung dan berbagi pengetahuan.'
    },
    {
      icon: <FiAward />,
      title: 'Sertifikat Resmi',
      description: 'Dapatkan sertifikat resmi setelah menyelesaikan kursus dan lulus ujian.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Pelajar Aktif' },
    { number: '500+', label: 'Kursus Tersedia' },
    { number: '50+', label: 'Instruktur Ahli' },
    { number: '95%', label: 'Tingkat Kepuasan' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <h1>Belajar Tanpa Batas</h1>
            <p>
              Tingkatkan keterampilan Anda dengan kursus online berkualitas tinggi. 
              Mulai perjalanan pembelajaran Anda hari ini dan raih impian karier Anda.
            </p>
            <div className="hero-actions">
              <Link to="/courses" className="btn btn-primary">
                <FiPlay />
                Mulai Belajar
              </Link>
              <Link to="/courses" className="btn btn-outline">
                Jelajahi Kursus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item fade-in">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header fade-in">
            <h2>Mengapa Memilih Kami?</h2>
            <p>
              Platform pembelajaran online terdepan dengan fitur-fitur unggulan 
              yang dirancang untuk memberikan pengalaman belajar terbaik.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card fade-in">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Preview */}
      <section className="popular-courses">
        <div className="container">
          <div className="section-header fade-in">
            <h2>Kursus Populer</h2>
            <p>
              Temukan kursus-kursus terpopuler yang dipilih oleh ribuan pelajar
            </p>
          </div>
          <div className="courses-preview">
            <div className="course-card fade-in">
              <div className="course-thumbnail">
                <img 
                  src="https://via.placeholder.com/400x300/667eea/ffffff?text=React.js" 
                  alt="React.js Fundamentals"
                />
                <div className="course-overlay">
                  <FiPlay className="play-icon" />
                </div>
              </div>
              <div className="course-content">
                <div className="course-meta">
                  <span className="course-difficulty difficulty-beginner">Pemula</span>
                  <span className="course-duration">
                    <FiClock />
                    20 jam
                  </span>
                </div>
                <h3 className="course-title">React.js Fundamentals</h3>
                <p className="course-description">
                  Pelajari dasar-dasar React.js dari nol hingga mahir dengan proyek nyata.
                </p>
                <div className="course-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="star filled" />
                    ))}
                  </div>
                  <span className="rating-text">4.8 (1,234 ulasan)</span>
                </div>
                <div className="course-footer">
                  <span className="course-price">Gratis</span>
                  <Link to="/courses" className="btn btn-primary btn-sm">
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>

            <div className="course-card fade-in">
              <div className="course-thumbnail">
                <img 
                  src="https://via.placeholder.com/400x300/764ba2/ffffff?text=JavaScript" 
                  alt="Advanced JavaScript"
                />
                <div className="course-overlay">
                  <FiPlay className="play-icon" />
                </div>
              </div>
              <div className="course-content">
                <div className="course-meta">
                  <span className="course-difficulty difficulty-intermediate">Menengah</span>
                  <span className="course-duration">
                    <FiClock />
                    30 jam
                  </span>
                </div>
                <h3 className="course-title">Advanced JavaScript</h3>
                <p className="course-description">
                  Konsep JavaScript tingkat lanjut untuk developer berpengalaman.
                </p>
                <div className="course-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="star filled" />
                    ))}
                  </div>
                  <span className="rating-text">4.9 (856 ulasan)</span>
                </div>
                <div className="course-footer">
                  <span className="course-price">Rp 150.000</span>
                  <Link to="/courses" className="btn btn-primary btn-sm">
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>

            <div className="course-card fade-in">
              <div className="course-thumbnail">
                <img 
                  src="https://via.placeholder.com/400x300/06b6d4/ffffff?text=Node.js" 
                  alt="Node.js Backend"
                />
                <div className="course-overlay">
                  <FiPlay className="play-icon" />
                </div>
              </div>
              <div className="course-content">
                <div className="course-meta">
                  <span className="course-difficulty difficulty-intermediate">Menengah</span>
                  <span className="course-duration">
                    <FiClock />
                    25 jam
                  </span>
                </div>
                <h3 className="course-title">Node.js Backend Development</h3>
                <p className="course-description">
                  Membangun aplikasi backend dengan Node.js dan Express.
                </p>
                <div className="course-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="star filled" />
                    ))}
                  </div>
                  <span className="rating-text">4.7 (692 ulasan)</span>
                </div>
                <div className="course-footer">
                  <span className="course-price">Rp 200.000</span>
                  <Link to="/courses" className="btn btn-primary btn-sm">
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="section-footer fade-in">
            <Link to="/courses" className="btn btn-secondary">
              Lihat Semua Kursus
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content fade-in">
            <h2>Siap Memulai Perjalanan Belajar Anda?</h2>
            <p>
              Bergabunglah dengan ribuan pelajar yang telah meraih kesuksesan 
              melalui platform pembelajaran kami.
            </p>
            <Link to="/courses" className="btn btn-primary btn-lg">
              <FiPlay />
              Mulai Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
