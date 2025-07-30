// ProductCard.js - Clean version without styling
import React from 'react';

const ProductCard = ({ product, onViewDetails, testimonialCount = 0 }) => {
  return (
    <div>
      {/* Testimonial count badge */}
      {testimonialCount > 0 && (
        <div>
          <span>💬</span>
          <span>{testimonialCount}</span>
        </div>
      )}

      <img 
        src={product.image} 
        alt={product.name}
      />
      
      <div>
        <h3>{product.name}</h3>
      </div>
      
      <p>{product.series}</p>
      <p>{product.price}</p>

      {/* Testimonial stats */}
      <div>
        <div>
          <span>👥 用戶見證</span>
        </div>
        <div>
          {testimonialCount > 0 ? (
            <span>{testimonialCount} 則分享</span>
          ) : (
            <span>暫無見證</span>
          )}
        </div>
      </div>

      {/* Popular product badge */}
      {testimonialCount >= 3 && (
        <div>🔥 熱門產品</div>
      )}

      <button onClick={() => onViewDetails(product)}>
        <span>查看詳情</span>
        {testimonialCount > 0 && (
          <span>+{testimonialCount}見證</span>
        )}
      </button>
    </div>
  );
};

export default ProductCard;