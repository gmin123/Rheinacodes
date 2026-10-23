import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

// Rheina 작품·공간 데이터와 MeM 감정 기록은 모두 yournest-today 프로젝트의 'mydb' 데이터베이스에 있음
const firebaseConfig = {
  apiKey: "AIzaSyDQgm4ey4FKH2ieB7LmLxoWwAdA3jLg-sc",
  authDomain: "yournest-today-d2a73.firebaseapp.com",
  projectId: "yournest-today-d2a73",
  storageBucket: "yournest-today-d2a73.firebasestorage.app",
  messagingSenderId: "360692815974",
  appId: "1:360692815974:web:7b4cadbedd6abf0752f5a7",
  measurementId: "G-T15X7HCWHW"
};

export const app = initializeApp(firebaseConfig);

// Use HTTP long polling when the browser/network cannot keep Firestore's QUIC stream alive.
export const db = initializeFirestore(app, { experimentalForceLongPolling: true }, "mydb");

// 이메일/비밀번호 로그인용
export const auth = getAuth(app);

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
