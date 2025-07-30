import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../services/firebase';

// 輔助函數：轉換 Firestore 時間戳記為可讀字串
const formatFirestoreTimestamp = (timestamp) => {
  if (!timestamp) return new Date().toISOString().split('T')[0];
  
  // 如果是 Firestore Timestamp 物件
  if (timestamp && typeof timestamp === 'object' && timestamp.seconds) {
    const date = new Date(timestamp.seconds * 1000);
    return date.toISOString().split('T')[0];
  }
  
  // 如果是 JavaScript Date 物件
  if (timestamp instanceof Date) {
    return timestamp.toISOString().split('T')[0];
  }
  
  // 如果是字串，直接返回
  if (typeof timestamp === 'string') {
    return timestamp;
  }
  
  // 默認返回今天的日期
  return new Date().toISOString().split('T')[0];
};

export const useFirestore = (collectionName) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe = () => {};
    
    const setupListener = async () => {
      try {
        const q = query(
          collection(db, collectionName), 
          orderBy('createdAt', 'desc')
        );
        
        unsubscribe = onSnapshot(q, 
          (snapshot) => {
            const docs = [];
            snapshot.forEach(doc => {
              const data = doc.data();
              docs.push({ 
                id: doc.id, 
                ...data,
                // 修復：正確處理 Firestore 時間戳記
                createdAt: formatFirestoreTimestamp(data.createdAt),
                // 如果有其他時間欄位，也要處理
                updatedAt: data.updatedAt ? formatFirestoreTimestamp(data.updatedAt) : undefined
              });
            });
            setDocuments(docs);
            setLoading(false);
            setError(null);
          },
          (err) => {
            console.error('Firestore error:', err);
            setError(err.message);
            setLoading(false);
          }
        );
      } catch (err) {
        console.error('Setup error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    setupListener();

    return () => unsubscribe();
  }, [collectionName]);

  const addDocument = async (doc) => {
    try {
      setError(null);
      await addDoc(collection(db, collectionName), {
        ...doc,
        // 使用 Firebase 的伺服器時間戳，確保一致性
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Add document error:', err);
      setError(err.message);
      throw err;
    }
  };

  return { documents, loading, error, addDocument };
};

export const useProducts = () => useFirestore('products');
export const useTestimonials = () => useFirestore('testimonials');