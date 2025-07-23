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
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>適用症狀</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {product.conditions.map((condition, index) => (
              <span 
                key={index}
                style={{
                  backgroundColor: '#fff3e0',
                  color: '#f57c00',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '14px'
                }}
              >
                {condition}
              </span>
            ))}
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
          用戶見證
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
            <p>還沒有用戶見證</p>
            <p style={{ fontSize: '14px' }}>成為第一個分享使用心得的人吧！</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;