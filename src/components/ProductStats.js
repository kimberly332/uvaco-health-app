// src/components/ProductStats.js - 完整修復版本
import React from 'react';

// 產品排序組件 - 只處理純粹的排序功能
export const ProductSort = ({ sortBy, onSortChange }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <label style={{
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
        color: '#666',
        fontWeight: 'bold'
      }}>
        📋 排序方式：
      </label>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 15px',
          border: '1px solid #ddd',
          borderRadius: '6px',
          fontSize: '14px',
          backgroundColor: 'white',
          cursor: 'pointer',
          outline: 'none'
        }}
      >
        <option value="default">🔸 預設排序</option>
        <option value="name">🔤 按名稱排序</option>
        <option value="series">📦 按系列分組</option>
        <option value="price">💰 按價格排序</option>
        <option value="testimonials">💬 按見證數排序</option>
      </select>
    </div>
  );
};

// 新增：產品系列篩選組件
export const ProductFilter = ({ selectedSeries, onSeriesChange, products }) => {
  // 獲取所有可用的系列
  const availableSeries = [...new Set(products.map(p => p.series).filter(Boolean))].sort();
  
  // 系列圖標映射
  const getSeriesIcon = (series) => {
    const icons = {
      '基本保養系列': '🟢',
      '清除系列': '⚫',
      '調理系列': '🔵',
      '活力丰采系列': '🔴',
      '寵物食品系列': '🟡',
      '生活保養系列': '🟣',
      '全身調理系列': '🟤'
    };
    return icons[series] || '📦';
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <label style={{
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
        color: '#666',
        fontWeight: 'bold'
      }}>
        📦 按系列篩選：
      </label>
      <select
        value={selectedSeries}
        onChange={(e) => onSeriesChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 15px',
          border: '1px solid #ddd',
          borderRadius: '6px',
          fontSize: '14px',
          backgroundColor: 'white',
          cursor: 'pointer',
          outline: 'none'
        }}
      >
        <option value="">🌟 所有系列</option>
        {availableSeries.map(series => (
          <option key={series} value={series}>
            {getSeriesIcon(series)} {series}
          </option>
        ))}
      </select>
    </div>
  );
};

// 產品統計組件（可選，用於顯示統計資訊）
export const ProductStats = ({ products, testimonials }) => {
  // 計算各系列的產品數量
  const seriesStats = products.reduce((acc, product) => {
    const series = product.series || '未分類';
    acc[series] = (acc[series] || 0) + 1;
    return acc;
  }, {});

  // 計算見證相關統計
  const productsWithTestimonials = products.filter(product => 
    testimonials.some(testimonial => 
      testimonial.productIds?.includes(product.id)
    )
  ).length;

  const totalTestimonials = testimonials.length;

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{
        margin: '0 0 15px 0',
        fontSize: '18px',
        color: '#333',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '10px'
      }}>
        📊 產品統計概覽
      </h3>
      
      {/* 總體統計 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#007bff',
            marginBottom: '5px'
          }}>
            {products.length}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            總產品數
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#28a745',
            marginBottom: '5px'
          }}>
            {Object.keys(seriesStats).length}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            產品系列
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ffc107',
            marginBottom: '5px'
          }}>
            {productsWithTestimonials}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            有見證產品
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#dc3545',
            marginBottom: '5px'
          }}>
            {totalTestimonials}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            總見證數
          </div>
        </div>
      </div>

      {/* 系列分布 */}
      <div>
        <h4 style={{
          margin: '15px 0 10px 0',
          fontSize: '16px',
          color: '#333'
        }}>
          各系列產品分布：
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px'
        }}>
          {Object.entries(seriesStats).map(([series, count]) => (
            <div key={series} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              border: '1px solid #dee2e6'
            }}>
              <span style={{ fontSize: '14px', color: '#333' }}>
                {series}
              </span>
              <span style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#007bff',
                backgroundColor: 'white',
                padding: '2px 6px',
                borderRadius: '12px'
              }}>
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};