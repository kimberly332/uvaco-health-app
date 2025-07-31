import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';

const ProductDetail = ({ product, testimonials, onBack, onAddTestimonial }) => {
  // 控制整個菌株資訊區塊的展開/收起
  const [isBacteriaInfoExpanded, setIsBacteriaInfoExpanded] = useState(false);
  // 檢測螢幕寬度
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div>
      <button 
        onClick={onBack}
        style={{
          padding: '12px',
          backgroundColor: '#9ca3af',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        返回產品列表
      </button>
      
      <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ 
            width: '100%', 
            maxWidth: '400px', 
            borderRadius: '8px',
            marginBottom: '15px'
          }} 
        />
        
        <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>{product.name}</h2>
        <p style={{ color: '#666', marginBottom: '5px' }}>
          <strong>系列：</strong>{product.series}
        </p>
        <p style={{ 
          color: '#8fbc8f', 
          fontSize: '20px', 
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
          {product.price}
        </p>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>營養成分</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {product.nutrients.map((nutrient, index) => (
              <span 
                key={index}
                style={{
                  backgroundColor: '#e8f5e8',
                  color: '#2e7d32',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '14px'
                }}
              >
                {nutrient}
              </span>
            ))}
          </div>
        </div>

        {/* 整個菌株資訊區塊 - 摺疊式設計 */}
        {product.bacteriaDetails && product.bacteriaDetails.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            {/* 可點擊的標題列 */}
            <div 
              onClick={() => setIsBacteriaInfoExpanded(!isBacteriaInfoExpanded)}
              style={{
                cursor: 'pointer',
                padding: '12px',
                backgroundColor: isBacteriaInfoExpanded ? '#f0f7ff' : '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                marginBottom: isBacteriaInfoExpanded ? '12px' : '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <h3 style={{ 
                  color: '#333', 
                  margin: '0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                  fontSize: '16px'
                }}>
                  🦠 13種複合式乳酸菌詳細資訊
                  {product.bacteriaCount && (
                    <span style={{
                      backgroundColor: '#ff6b6b',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'normal'
                    }}>
                      1000億菌數
                    </span>
                  )}
                </h3>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '0' }}>
                <span style={{
                  fontSize: '12px',
                  color: '#666',
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap'
                }}>
                  {isBacteriaInfoExpanded ? '點擊收起' : '點擊展開'}
                </span>
                <span style={{
                  fontSize: '14px',
                  color: '#666',
                  transform: isBacteriaInfoExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </span>
              </div>
            </div>
            
            {/* 展開的詳細內容 */}
            {isBacteriaInfoExpanded && (
              <div style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                padding: '15px',
                border: '1px solid #e0e0e0',
                animation: 'fadeIn 0.3s ease'
              }}>
                {/* 菌數資訊 */}
                {product.bacteriaCount && (
                  <div style={{
                    backgroundColor: '#e3f2fd',
                    border: '1px solid #bbdefb',
                    borderRadius: '6px',
                    padding: '12px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    color: '#1976d2'
                  }}>
                    <strong>🔬 菌數資訊：</strong>{product.bacteriaCount}
                  </div>
                )}

                {/* 菌株詳細列表 - 響應式佈局 */}
                <div style={{
                  display: isMobile ? 'flex' : 'grid',
                  flexDirection: isMobile ? 'column' : undefined,
                  gridTemplateColumns: isMobile ? undefined : 'repeat(3, 1fr)',
                  gap: '12px',
                  marginBottom: '15px'
                }}>
                  {product.bacteriaDetails.map((bacteria, index) => (
                    <div 
                      key={index}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        padding: '12px',
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px'
                      }}>
                        <span style={{
                          backgroundColor: '#4caf50',
                          color: 'white',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          flexShrink: 0
                        }}>
                          {index + 1}
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{
                            margin: '0 0 4px 0',
                            color: '#2e7d32',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            lineHeight: '1.2'
                          }}>
                            {bacteria.chineseName}
                          </h4>
                          <p style={{
                            margin: '0 0 8px 0',
                            color: '#666',
                            fontSize: '12px',
                            fontStyle: 'italic',
                            lineHeight: '1.2'
                          }}>
                            {bacteria.scientificName}
                          </p>
                          <p style={{
                            margin: '0',
                            color: '#555',
                            fontSize: '13px',
                            lineHeight: '1.4',
                            wordBreak: 'break-word'
                          }}>
                            <strong style={{ color: '#2e7d32' }}>功能：</strong>
                            {bacteria.function}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 產品特色 */}
                {product.productFeatures && product.productFeatures.length > 0 && (
                  <div style={{ 
                    padding: '10px',
                    backgroundColor: '#fff8e1',
                    borderRadius: '6px',
                    border: '1px solid #ffe082',
                    marginBottom: '10px'
                  }}>
                    <h4 style={{ 
                      color: '#f57c00', 
                      marginBottom: '8px',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      ✨ 產品特色
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {product.productFeatures.map((feature, index) => (
                        <span 
                          key={index}
                          style={{
                            backgroundColor: 'white',
                            color: '#f57c00',
                            padding: '3px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            border: '1px solid #ffcc02'
                          }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 底部總結 */}
                <div style={{
                  padding: '10px',
                  backgroundColor: '#e8f5e8',
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: '#2e7d32',
                  textAlign: 'center',
                  border: '1px solid #c8e6c9'
                }}>
                  💡 以上13種益生菌各具特色，共同維護消化道健康
                </div>
              </div>
            )}
          </div>
        )}
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>保健方向</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {product.conditions.map((condition, index) => (
              <span 
                key={index}
                style={{
                  backgroundColor: '#e3f2fd',
                  color: '#1976d2',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '14px'
                }}
              >
                {condition}
              </span>
            ))}
          </div>
          {/* 加入小提醒 */}
          <div style={{
            fontSize: '12px',
            color: '#666',
            marginTop: '8px',
            fontStyle: 'italic'
          }}>
            * 以上為營養保健參考方向，非醫療用途
          </div>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>產品說明</h3>
          <p style={{ 
            lineHeight: '1.6', 
            color: '#555',
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '6px'
          }}>
            {product.description}
          </p>
        </div>
        
        <button 
          onClick={() => onAddTestimonial(product)}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#a8956f',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          💬 分享我的使用心得
        </button>
      </div>
      
      <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
        <h3 style={{ 
          color: '#333', 
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          用戶心得分享
          <span style={{ 
            backgroundColor: '#8fbc8f',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px'
          }}>
            {testimonials.length} 則
          </span>
        </h3>
        
        {/* 產品頁面的免責聲明 */}
        {testimonials.length > 0 && (
          <div style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '6px',
            padding: '12px',
            marginBottom: '15px',
            fontSize: '13px',
            color: '#856404'
          }}>
            <strong>📝 閱讀提醒：</strong>
            以下為用戶個人使用體驗分享，不代表產品功效，效果因人而異
          </div>
        )}
        
        {testimonials.length > 0 ? (
          <div>
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px 20px',
            color: '#999'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>💭</div>
            <p>還沒有用戶心得分享</p>
            <p style={{ fontSize: '14px' }}>成為第一個分享使用體驗的人吧！</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;