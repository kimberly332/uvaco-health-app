// src/components/SingleTestimonialPage.js - 單一見證展示頁面
import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';

const SingleTestimonialPage = ({ testimonialId, testimonials, products, onBack }) => {
  const [testimonial, setTestimonial] = useState(null);
  const [relatedTestimonials, setRelatedTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (testimonialId && testimonials.length > 0) {
      // 找到目標見證
      const targetTestimonial = testimonials.find(t => t.id === testimonialId);
      setTestimonial(targetTestimonial);

      if (targetTestimonial && targetTestimonial.productIds) {
        // 找到相關的見證（使用相同產品的其他見證）
        const related = testimonials
          .filter(t => 
            t.id !== testimonialId && 
            t.productIds?.some(pid => targetTestimonial.productIds.includes(pid))
          )
          .slice(0, 3); // 只顯示最多3個相關見證
        setRelatedTestimonials(related);
      }
      
      setLoading(false);
    }
  }, [testimonialId, testimonials]);

  // 獲取產品資訊
  const getProductInfo = (productIds) => {
    if (!productIds || !Array.isArray(productIds)) return [];
    return productIds
      .map(id => products.find(p => p.id === id))
      .filter(Boolean);
  };

  const copyCurrentPageLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('頁面鏈接已複製到剪貼板！');
    } catch (error) {
      console.error('複製失敗:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #a8956f',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ color: '#666' }}>載入見證內容中...</p>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (!testimonial) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '60px 20px',
        color: '#666'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>😕</div>
        <h2 style={{ color: '#333', marginBottom: '10px' }}>找不到此見證</h2>
        <p style={{ marginBottom: '30px' }}>此見證可能已被移除或鏈接有誤</p>
        <button
          onClick={onBack}
          style={{
            padding: '12px 24px',
            backgroundColor: '#a8956f',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            textDecoration: 'none'
          }}
        >
          返回見證列表
        </button>
      </div>
    );
  }

  const productInfo = getProductInfo(testimonial.productIds);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* 頁面標題和導航 */}
      <header style={{ 
        marginBottom: '30px',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '20px'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '15px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <h1 style={{ 
            color: '#333', 
            fontSize: '24px',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span>💬</span>
            用戶見證分享
          </h1>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={copyCurrentPageLink}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f8f9fa',
                color: '#666',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span>🔗</span>
              複製鏈接
            </button>
            
            {onBack && (
              <button
                onClick={onBack}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#a8956f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                ← 返回列表
              </button>
            )}
          </div>
        </div>

        {/* 產品資訊預覽 */}
        {productInfo.length > 0 && (
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '8px',
            marginTop: '15px'
          }}>
            <h3 style={{ 
              color: '#666', 
              fontSize: '16px', 
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>📦</span>
              相關產品
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '15px'
            }}>
              {productInfo.map(product => (
                <div
                  key={product.id}
                  style={{
                    backgroundColor: 'white',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #e9ecef',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                  <div>
                    <div style={{ 
                      fontWeight: 'bold', 
                      fontSize: '14px',
                      color: '#333',
                      marginBottom: '2px'
                    }}>
                      {product.name}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#666'
                    }}>
                      {product.series}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* 主要見證內容 */}
      <main style={{ marginBottom: '40px' }}>
        <div style={{
          backgroundColor: '#fff3e0',
          border: '1px solid #ffe0b2',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            marginBottom: '8px'
          }}>
            <span>⭐</span>
            <strong style={{ color: '#f57c00' }}>精選見證</strong>
          </div>
          <p style={{ 
            margin: 0, 
            fontSize: '14px', 
            color: '#e65100',
            lineHeight: '1.5'
          }}>
            以下為真實用戶的個人使用體驗分享，內容僅供參考，效果因人而異。
            本見證不代表產品功效，請理性參考。
          </p>
        </div>

        <TestimonialCard 
          testimonial={testimonial} 
          showShareLink={true}
        />
      </main>

      {/* 相關見證推薦 */}
      {relatedTestimonials.length > 0 && (
        <section>
          <h2 style={{ 
            color: '#333', 
            fontSize: '20px',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '2px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span>🔍</span>
            相關見證推薦
          </h2>
          
          <div style={{ 
            display: 'grid',
            gap: '20px'
          }}>
            {relatedTestimonials.map(relatedTestimonial => (
              <TestimonialCard 
                key={relatedTestimonial.id} 
                testimonial={relatedTestimonial}
                showShareLink={true}
              />
            ))}
          </div>
        </section>
      )}

      {/* 頁腳資訊 */}
      <footer style={{
        marginTop: '60px',
        padding: '30px 0',
        borderTop: '1px solid #e9ecef',
        textAlign: 'center',
        color: '#666'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <img 
            src="/logo.svg" 
            alt="UVACO 標誌" 
            style={{ width: '40px', height: '40px', marginBottom: '10px' }}
          />
          <h3 style={{ margin: '0 0 5px 0', color: '#a8956f' }}>
            UVACO 葡眾健康生活
          </h3>
        </div>
        
        <p style={{ 
          fontSize: '12px', 
          lineHeight: '1.5',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          本網站所有見證均為用戶真實分享，僅供參考。個人體驗因人而異，
          不保證相同效果。如有健康疑慮，請諮詢專業醫療人員。
        </p>
        
        <div style={{ 
          marginTop: '20px',
          fontSize: '12px',
          color: '#999'
        }}>
          © 2025 UVACO Health. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SingleTestimonialPage;