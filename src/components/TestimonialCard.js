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
      
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '12px', 
        borderRadius: '6px',
        borderLeft: '4px solid #28a745'
      }}>
        <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#333' }}>
          {testimonial.story || '無使用心得'}
        </div>
      </div>
      
      {/* 已完全移除圖片顯示區塊 */}
    </div>
  );
};

export default TestimonialCard;