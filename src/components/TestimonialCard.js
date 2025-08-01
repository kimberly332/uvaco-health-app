// src/components/TestimonialCard.js - 在原有基礎上添加分享鏈接功能
import React, { useState } from 'react';

const TestimonialCard = ({ testimonial }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  // 處理產品名稱顯示（支援單一產品和多產品）- 保留原有邏輯
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

  // 新增：生成見證的分享鏈接
  const generateShareLink = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}?testimonial=${testimonial.id}`;
  };

  // 新增：複製分享鏈接到剪貼板
  const copyShareLink = async () => {
    try {
      const shareLink = generateShareLink();
      await navigator.clipboard.writeText(shareLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('複製失敗:', error);
      // 備用方案：使用選取複製
      const textArea = document.createElement('textarea');
      textArea.value = generateShareLink();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

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
          {/* 產品名稱區域 - 保留原有樣式 */}
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
          
          {/* 分享者資訊 - 保留原有樣式 */}
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
            👤 {displayName}
          </div>
        </div>

        {/* 新增：分享鏈接按鈕 */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '8px'
        }}>
          <button
            onClick={copyShareLink}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              backgroundColor: copySuccess ? '#8fbc8f' : '#f0f0f0',
              color: copySuccess ? 'white' : '#666',
              border: 'none',
              borderRadius: '15px',
              fontSize: '11px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {copySuccess ? (
              <>
                <span style={{ fontSize: '10px' }}>✓</span>
                <span>已複製</span>
              </>
            ) : (
              <>
                <span style={{ fontSize: '10px' }}>🔗</span>
                <span>分享</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* 使用時間 - 保留原有樣式 */}
      <div style={{ fontSize: '14px', color: '#555' }}>
        <strong>使用時間：</strong>{testimonial.duration || '未指定'}
      </div>

      {testimonial.system && (
        <div style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>
          <strong>體系：</strong>{testimonial.system}
        </div>
      )}
      
      {/* 個人體驗標籤 - 保留原有樣式 */}
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
      
      {/* 心得內容 - 保留原有樣式 */}
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
      
      {/* 分享時間 - 保留原有樣式 */}
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