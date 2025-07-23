import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  const formatDate = (dateString) => {
    // 處理各種可能的日期格式
    if (!dateString) return '未知日期';
    
    try {
      let date;
      
      // 如果是 Firebase Timestamp 物件
      if (dateString && typeof dateString.toDate === 'function') {
        date = dateString.toDate();
      }
      // 如果是 Firestore Timestamp 的 seconds 格式
      else if (dateString && dateString.seconds) {
        date = new Date(dateString.seconds * 1000);
      }
      // 如果是普通的日期字串或 Date 物件
      else {
        date = new Date(dateString);
      }
      
      // 檢查日期是否有效
      if (isNaN(date.getTime())) {
        return '未知日期';
      }
      
      // 格式化為台灣日期格式
      return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (error) {
      console.error('日期格式化錯誤:', error);
      return '未知日期';
    }
  };

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '15px', 
      margin: '10px 0', 
      borderRadius: '8px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <span style={{ 
            backgroundColor: '#e3f2fd', 
            color: '#1976d2', 
            padding: '4px 8px', 
            borderRadius: '12px', 
            fontSize: '12px' 
          }}>
            {testimonial.productName || '未知產品'}
          </span>
          <span style={{ fontSize: '12px', color: '#999' }}>
            {formatDate(testimonial.createdAt)}
          </span>
        </div>
        
        <div style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
          <strong>用戶：</strong>
          {testimonial.isNamePublic ? testimonial.userName : '匿名用戶'}
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
      
      {testimonial.imageUrl && (
        <div style={{ marginTop: '10px' }}>
          <img 
            src={testimonial.imageUrl} 
            alt="見證圖片" 
            style={{ 
              width: '100%', 
              maxWidth: '200px', 
              borderRadius: '4px',
              border: '1px solid #ddd'
            }} 
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;