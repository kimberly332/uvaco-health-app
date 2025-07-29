import React from 'react';
import TestimonialCard from './TestimonialCard';

const ProductDetail = ({ product, testimonials, onBack, onAddTestimonial }) => {
  return (
    <div>
      <button 
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '18px',
          cursor: 'pointer',
          marginBottom: '15px',
          color: '#007bff'
        }}
      >
        ← 返回產品列表
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
          color: '#007bff', 
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

        {/* 新增菌株詳細資訊區塊 - 只有康爾喜系列產品顯示 */}
        {product.bacteriaDetails && product.bacteriaDetails.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              color: '#333', 
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
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

            {/* 菌株詳細列表 - 優化版面 */}
            <div style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              padding: '12px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '8px'
            }}>
              {product.bacteriaDetails.map((bacteria, index) => (
                <div 
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    padding: '10px',
                    border: '1px solid #e0e0e0',
                    transition: 'box-shadow 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'}
                  onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px'
                  }}>
                    <span style={{
                      backgroundColor: '#4caf50',
                      color: 'white',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      {index + 1}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                      }}>
                        <h4 style={{
                          margin: '0',
                          color: '#2e7d32',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          lineHeight: '1.2'
                        }}>
                          {bacteria.chineseName}
                        </h4>
                        <p style={{
                          margin: '0',
                          color: '#666',
                          fontSize: '11px',
                          fontStyle: 'italic',
                          lineHeight: '1.2',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {bacteria.scientificName}
                        </p>
                        <p style={{
                          margin: '4px 0 0 0',
                          color: '#555',
                          fontSize: '12px',
                          lineHeight: '1.3',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {bacteria.function}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 產品特色 - 優化版面 */}
            {product.productFeatures && product.productFeatures.length > 0 && (
              <div style={{ 
                marginTop: '12px',
                padding: '8px',
                backgroundColor: '#fff8e1',
                borderRadius: '6px',
                border: '1px solid #ffe082'
              }}>
                <h4 style={{ 
                  color: '#f57c00', 
                  marginBottom: '6px',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  ✨ 產品特色
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {product.productFeatures.slice(0, 6).map((feature, index) => (
                    <span 
                      key={index}
                      style={{
                        backgroundColor: 'white',
                        color: '#f57c00',
                        padding: '2px 6px',
                        borderRadius: '10px',
                        fontSize: '11px',
                        border: '1px solid #ffcc02',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                  {product.productFeatures.length > 6 && (
                    <span style={{
                      color: '#f57c00',
                      fontSize: '11px',
                      padding: '2px 4px'
                    }}>
                      +{product.productFeatures.length - 6} 更多特色
                    </span>
                  )}
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
            backgroundColor: '#28a745',
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
            backgroundColor: '#007bff',
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