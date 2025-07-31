import React from 'react';

const ProductCard = ({ product, onViewDetails, testimonialCount = 0 }) => {
  return (
    <div className="product-card card card-padding">
      {/* 見證數量徽章 */}
      {testimonialCount > 0 && (
        <div className="product-card-badge">
          <span>💬</span>
          <span>{testimonialCount}</span>
        </div>
      )}

      <img 
        src={product.image} 
        alt={product.name} 
        className="product-card-image"
      />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
        <h3 className="product-card-title">
          {product.name}
        </h3>
      </div>
      
      <p className="product-card-series" data-series={product.series}>
        {product.series}
      </p>
      
      <p className="product-card-price">
        {product.price}
      </p>

      {/* 見證統計區域 */}
      <div className="product-card-stats">
        <div style={{ color: '#666' }}>
          <span>👥 用戶見證</span>
        </div>
        <div style={{ 
          color: testimonialCount > 0 ? '#d4b97a' : '#999',
          fontWeight: 'bold'
        }}>
          {testimonialCount > 0 ? (
            <span>{testimonialCount} 則分享</span>
          ) : (
            <span>暫無見證</span>
          )}
        </div>
      </div>

      {/* 熱門產品標籤 */}
      {testimonialCount >= 3 && (
        <div className="product-card-hot-badge">
          🔥 熱門產品
        </div>
      )}

      <button 
        onClick={() => onViewDetails(product)}
        className="btn btn-primary btn-full"
      >
        <span>查看詳情</span>
        {testimonialCount > 0 && (
          <span style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '2px 6px',
            borderRadius: '10px',
            fontSize: '11px'
          }}>
            +{testimonialCount}見證
          </span>
        )}
      </button>
    </div>
  );
};

export default ProductCard;