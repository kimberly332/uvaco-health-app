import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../services/firebase';

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
                // 確保 createdAt 有正確的格式
                createdAt: data.createdAt || new Date()
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