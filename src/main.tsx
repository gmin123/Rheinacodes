import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { AuthProvider, consumeAuthHandoff } from './contexts/AuthContext'
import { JourneyProvider } from './contexts/JourneyContext'
import { NavBar } from './components/NavBar'
import { WelcomePage } from './pages/WelcomePage'
import { EmotionPage } from './pages/EmotionPage'
import { ResultPage } from './pages/ResultPage'
import { LoginPage } from './pages/LoginPage'
import { UploadPage } from './pages/UploadPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { AdminPage } from './pages/AdminPage'
import { PageViewTracker } from './components/PageViewTracker'
import { DomainGuard } from './components/DomainGuard'
import './styles/globals.css'
import './firebase' // Initialize Firebase

// MeM 에서 넘어온 로그인 정보를 먼저 저장
consumeAuthHandoff()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <PageViewTracker />
        <JourneyProvider>
          <DomainGuard>
            <Routes>
              {/* 감정 분석 여정: 환영 → 상황·감정 선택 → 추천 결과 */}
              <Route path="/" element={<WelcomePage />} />
              <Route path="/emotion" element={<EmotionPage />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              {/* 작품 데이터 업로드 / 내부 전용 관리자 페이지 (비밀번호 인증) */}
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </DomainGuard>
        </JourneyProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
