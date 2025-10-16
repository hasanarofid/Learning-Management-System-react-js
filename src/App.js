import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Learning from './pages/Learning';
import Quiz from './pages/Quiz';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/learning/:courseId" element={<Learning />} />
            <Route path="/quiz/:quizId" element={<Quiz />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
