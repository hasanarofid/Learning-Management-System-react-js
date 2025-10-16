import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        navigate('/courses');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Selamat Datang</h1>
            <p>Masuk ke akun Anda untuk melanjutkan pembelajaran</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username">Username atau Email</label>
              <div className="input-group">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Masukkan username atau email"
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-login"
            >
              {loading ? (
                <>
                  <div className="loading-spinner small"></div>
                  Masuk...
                </>
              ) : (
                'Masuk'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Belum punya akun?{' '}
              <Link to="/register" className="register-link">
                Daftar di sini
              </Link>
            </p>
            <Link to="/forgot-password" className="forgot-link">
              Lupa password?
            </Link>
          </div>
        </div>

        <div className="login-info">
          <div className="info-content">
            <h2>Platform Pembelajaran Terbaik</h2>
            <p>
              Bergabunglah dengan ribuan pelajar yang telah meraih kesuksesan 
              melalui platform pembelajaran online kami.
            </p>
            <div className="info-features">
              <div className="feature-item">
                <div className="feature-icon">📚</div>
                <div className="feature-text">
                  <h3>Kursus Berkualitas</h3>
                  <p>Akses ribuan kursus dari instruktur berpengalaman</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🏆</div>
                <div className="feature-text">
                  <h3>Sertifikat Resmi</h3>
                  <p>Dapatkan sertifikat setelah menyelesaikan kursus</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">👥</div>
                <div className="feature-text">
                  <h3>Komunitas Aktif</h3>
                  <p>Bergabung dengan komunitas pelajar yang saling mendukung</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
