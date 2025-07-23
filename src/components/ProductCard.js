import React from 'react';

const ProductCard = ({ product, onViewDetails, testimonialCount = 0 }) => {
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '15px', 
      margin: '10px 0', 
      borderRadius: '8px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }}
    >
      {/* 見證數量徽章 */}
      {testimonialCount > 0 && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: '#28a745',
          color: 'white',
          borderRadius: '20px',
          padding: '4px 10px',
          fontSize: '12px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          boxShadow: '0 2px 4px rgba(40, 167, 69, 0.3)',
          zIndex: 1
        }}>
          <span>💬</span>
          <span>{testimonialCount}</span>
        </div>
      )}

      <img 
        src={product.image} 
        alt={product.name} 
        style={{ 
          width: '100%', 
          height: '150px', 
          objectFit: 'cover',
          borderRadius: '4px',
          marginBottom: '10px'
        }} 
      />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
        <h3 style={{ margin: '0', color: '#333', flex: 1, paddingRight: '10px' }}>
          {product.name}
        </h3>
      </div>
      
      <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>
        📦 {product.series}
      </p>
      
      <p style={{ 
        margin: '0 0 15px 0', 
        color: '#007bff', 
        fontSize: '16px', 
        fontWeight: 'bold' 
      }}>
        {product.price}
      </p>

      {/* 見證統計區域 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
        padding: '8px 12px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        fontSize: '12px'
      }}>
        <div style={{ color: '#666' }}>
          <span>👥 用戶見證</span>
        </div>
        <div style={{ 
          color: testimonialCount > 0 ? '#28a745' : '#999',
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
        <div style={{
          display: 'inline-block',
          backgroundColor: '#ff6b6b',
          color: 'white',
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '10px',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>
          🔥 熱門產品
        </div>
      )}

      <button 
        onClick={() => onViewDetails(product)}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
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