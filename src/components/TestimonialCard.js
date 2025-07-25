import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '15px', 
      borderRadius: '8px', 
      marginBottom: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderLeft: '4px solid #28a745'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '10px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
            {testimonial.productName}
          </div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
            👤 {testimonial.isNamePublic ? testimonial.userName : '匿名用戶'}
          </div>
        </div>
        
        {testimonial.system && (
          <div style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
            <strong>體系：</strong>{testimonial.system}
          </div>
        )}
        
        <div style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>
          <strong>使用時間：</strong>{testimonial.duration || '未指定'}
        </div>
      </div>
      
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
      
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '12px', 
        borderRadius: '6px',
        borderLeft: '4px solid #28a745',
        position: 'relative'
      }}>
        {/* 引號裝飾 */}
        <div style={{
          position: 'absolute',
          top: '5px',
          left: '5px',
          fontSize: '20px',
          color: '#28a745',
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
          color: '#28a745',
          opacity: 0.3
        }}>
          "
        </div>
      </div>
      
      {/* 底部免責說明 */}
      <div style={{
        marginTop: '8px',
        fontSize: '11px',
        color: '#999',
        textAlign: 'right',
        fontStyle: 'italic'
      }}>
        * 個人使用體驗，效果因人而異
      </div>
    </div>
  );
};

export default TestimonialCard;