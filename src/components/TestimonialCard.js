import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  // 處理產品名稱顯示（支援單一產品和多產品）
  const getProductDisplay = () => {
    // 新版本：支援多產品
    if (testimonial.productNames && Array.isArray(testimonial.productNames)) {
      return testimonial.productNames;
    }
    
    // 舊版本兼容：單一產品
    if (testimonial.productName) {
      return [testimonial.productName];
    }
    
    return ['未指定產品'];
  };

  const productNames = getProductDisplay();
  const displayName = testimonial.displayName || (testimonial.isNamePublic ? testimonial.userName : '匿名用戶');

  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '15px', 
      borderRadius: '8px', 
      marginBottom: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderLeft: '4px solid #a8956f'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '12px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ flex: 1 }}>
          {/* 產品名稱區域 - 支援多產品顯示 */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ 
              fontSize: '14px', 
              color: '#666', 
              marginBottom: '4px',
              fontWeight: 'bold'
            }}>
              📦 使用產品：
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {productNames.map((productName, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: '#e8f5e8',
                    color: '#2e7d32',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    border: '1px solid #c8e6c9'
                  }}
                >
                  {productName}
                </span>
              ))}
              {productNames.length > 1 && (
                <span style={{
                  backgroundColor: '#fff3e0',
                  color: '#f57c00',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  綜合搭配
                </span>
              )}
            </div>
          </div>
          
          {/* 分享者資訊 */}
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
            👤 {displayName}
          </div>
        </div>
        
        {/* 使用時間 */}
        <div style={{ fontSize: '14px', color: '#555' }}>
          <strong>使用時間：</strong>{testimonial.duration || '未指定'}
        </div>
      </div>

      {testimonial.system && (
        <div style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>
          <strong>體系：</strong>{testimonial.system}
        </div>
      )}
      
      {/* 個人體驗標籤 */}
      <div style={{
        display: 'inline-block',
        backgroundColor: '#e3f2fd',
        color: '#1976d2',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
        marginBottom: '10px'
      }}>
        個人體驗分享
      </div>
      
      {/* 心得內容 */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '12px', 
        borderRadius: '6px',
        borderLeft: '4px solid #a8956f',
        position: 'relative'
      }}>
        {/* 引號裝飾 */}
        <div style={{
          position: 'absolute',
          top: '5px',
          left: '5px',
          fontSize: '20px',
          color: '#a8956f',
          opacity: 0.3
        }}>
          "
        </div>
        
        <div style={{ 
          fontSize: '14px', 
          lineHeight: '1.5', 
          color: '#333',
          paddingLeft: '15px',
          fontStyle: 'italic'
        }}>
          {testimonial.story || '無使用心得'}
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: '5px',
          right: '8px',
          fontSize: '20px',
          color: '#a8956f',
          opacity: 0.3
        }}>
          "
        </div>
      </div>
      
      {/* 分享時間 */}
      <div style={{
        marginTop: '8px',
        fontSize: '11px',
        color: '#999',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>
          分享時間：{testimonial.createdAt || '未知'}
        </span>
        <span style={{ fontStyle: 'italic' }}>
          * 個人使用體驗，效果因人而異
        </span>
      </div>
    </div>
  );
};

export default TestimonialCard;