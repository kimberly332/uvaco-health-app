import React from 'react';
import TestimonialCard from './TestimonialCard';

const ProductDetail = ({ product, testimonials, onBack, onAddTestimonial }) => {
  return (
    <div>
      <button 
        onClick={onBack}
        style={{
          marginBottom: '20px',
          padding: '10px 15px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        ← 返回產品列表
      </button>
      
      <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>{product.name}</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: '#007bff',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            marginRight: '10px'
          }}>
            {product.series}
          </span>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745' }}>
            {product.price}
          </span>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            color: '#333', 
            marginBottom: '10px',
            borderBottom: '2px solid #f0f0f0',
            paddingBottom: '5px'
          }}>
            產品介紹
          </h3>
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
        
        {/* 新增：見證區塊聲明 */}
        {testimonials.length > 0 && (
          <div style={{
            backgroundColor: '#e8f4fd',
            border: '1px solid #bee5eb',
            borderRadius: '6px',
            padding: '12px',
            marginBottom: '15px',
            fontSize: '13px',
            color: '#0c5460'
          }}>
            💡 以下為用戶使用體驗分享，個人感受可能因體質不同而有差異
          </div>
        )}
        
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