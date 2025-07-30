// ProductDetail.js - Clean version without styling
import React, { useState } from 'react';
import TestimonialCard from './TestimonialCard';
import { useAuth, ProtectedComponent } from '../hooks/useAuth';

const ProductDetail = ({ product, testimonials, onBack, onAddTestimonial }) => {
  const [imageError, setImageError] = useState(false);
  
  if (!product) {
    return (
      <div>
        <button onClick={onBack}>← 返回</button>
        <p>產品不存在或已被移除</p>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack}>← 返回產品列表</button>
      
      <div>
        <div>
          {!imageError ? (
            <img 
              src={product.image} 
              alt={product.name}
              onError={() => setImageError(true)}
            />
          ) : (
            <div>
              <div>📦</div>
              <p>圖片載入失敗</p>
            </div>
          )}
        </div>
        
        <div>
          <h1>{product.name}</h1>
          
          <div>
            <div>
              <strong>📦 產品系列：</strong>
              <span>{product.series || '未分類'}</span>
            </div>
            
            <div>
              <strong>💰 建議售價：</strong>
              <span>{product.price}</span>
            </div>
          </div>

          {/* Bacteria composition */}
          {product.bacteriaDetails && product.bacteriaDetails.length > 0 && (
            <div>
              <h3>🦠 益生菌成分詳情</h3>
              <div>
                {product.bacteriaDetails.map((bacteria, index) => (
                  <div key={index}>
                    <div>
                      <span>{index + 1}</span>
                      <div>
                        <h4>{bacteria.chineseName}</h4>
                        <p>{bacteria.scientificName}</p>
                        <p>
                          <strong>功能：</strong>
                          {bacteria.function}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legacy bacteria support */}
          {product.bacteria && product.bacteria.length > 0 && (
            <div>
              <h3>🦠 益生菌成分</h3>
              <div>
                {product.bacteria.map((bacteria, index) => (
                  <div key={index}>
                    <div>
                      <span>{index + 1}</span>
                      <div>
                        <h4>{bacteria.name}</h4>
                        <p>{bacteria.scientificName}</p>
                        <p>
                          <strong>功能：</strong>
                          {bacteria.function}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product features */}
          {product.productFeatures && product.productFeatures.length > 0 && (
            <div>
              <h4>✨ 產品特色</h4>
              <div>
                {product.productFeatures.map((feature, index) => (
                  <span key={index}>{feature}</span>
                ))}
              </div>
            </div>
          )}

          {/* Product description */}
          {product.description && (
            <div>
              <h3>📋 產品說明</h3>
              <div>{product.description}</div>
            </div>
          )}
        </div>
      </div>
      
      <ProtectedComponent permission="submit_testimonial">
        <button onClick={() => onAddTestimonial(product)}>
          ✍️ 分享使用心得
        </button>
      </ProtectedComponent>
      
      <div>
        <h3>💬 用戶心得分享 ({testimonials.length})</h3>
        {testimonials.length > 0 ? (
          testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))
        ) : (
          <div>
            <div>💭</div>
            <h4>還沒有人分享此產品的使用心得</h4>
            <p>成為第一個分享使用體驗的人吧！</p>
            <ProtectedComponent permission="submit_testimonial">
              <button onClick={() => onAddTestimonial(product)}>
                ✍️ 成為第一個分享者
              </button>
            </ProtectedComponent>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;