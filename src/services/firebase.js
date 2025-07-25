import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// 將這裡的設定替換為你的 Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyCoByQhCG5WllT01ybUdQ3En_CoC7-1kQc",
  authDomain: "uvaco-health.firebaseapp.com",
  projectId: "uvaco-health",
  storageBucket: "uvaco-health.firebasestorage.app",
  messagingSenderId: "603820339752",
  appId: "1:603820339752:web:99c09ce4a0e4625325bb1d",
  measurementId: "G-DEJ53Q0M61"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 初始化服務
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;