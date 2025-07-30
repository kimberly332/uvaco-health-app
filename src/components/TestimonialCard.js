// TestimonialCard.js - Clean version without styling
import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  // Handle product name display (supports single and multiple products)
  const getProductDisplay = () => {
    // New version: supports multiple products
    if (testimonial.productNames && Array.isArray(testimonial.productNames)) {
      return testimonial.productNames;
    }
    
    // Old version compatibility: single product
    if (testimonial.productName) {
      return [testimonial.productName];
    }
    
    return ['未指定產品'];
  };

  const productNames = getProductDisplay();
  const displayName = testimonial.displayName || (testimonial.isNamePublic ? testimonial.userName : '匿名用戶');

  return (
    <div>
      <div>
        <div>
          {/* Product names area - supports multiple product display */}
          <div>
            <div>📦 使用產品：</div>
            <div>
              {productNames.map((productName, index) => (
                <span key={index}>{productName}</span>
              ))}
              {productNames.length > 1 && (
                <span>綜合搭配</span>
              )}
            </div>
          </div>
          
          {/* Sharer info */}
          <div>👤 {displayName}</div>
        </div>
        
        {/* Usage duration */}
        <div>
          <strong>使用時間：</strong>{testimonial.duration || '未指定'}
        </div>
      </div>

      {testimonial.system && (
        <div>
          <strong>體系：</strong>{testimonial.system}
        </div>
      )}
      
      {/* Personal experience tag */}
      <div>個人體驗分享</div>
      
      {/* Experience content */}
      <div>
        {/* Quote decoration */}
        <div>"</div>
        
        <div>{testimonial.story || '無使用心得'}</div>
        
        <div>"</div>
      </div>
      
      {/* Share time */}
      <div>
        <span>分享時間：{testimonial.createdAt || '未知'}</span>
        <span>* 個人使用體驗，效果因人而異</span>
      </div>
    </div>
  );
};

export default TestimonialCard;