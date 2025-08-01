// src/components/ProductStats.js - 簡化版，整合見證排序到原有篩選
import React from 'react';

// 產品系列篩選組件 - 整合見證排序功能
export const ProductFilter = ({ 
  selectedSeries, 
  onSeriesChange, 
  products, 
  testimonialSortBy, 
  onTestimonialSortChange,
  getTestimonialsForProduct 
}) => {
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

  // 處理篩選變更
  const handleFilterChange = (value) => {
    if (value === 'testimonials-desc' || value === 'testimonials-asc') {
      // 如果選擇的是見證排序，清除系列篩選，設置排序
      onSeriesChange('');
      onTestimonialSortChange(value === 'testimonials-desc' ? 'desc' : 'asc');
    } else {
      // 如果選擇的是系列篩選，清除排序，設置系列
      onTestimonialSortChange('');
      onSeriesChange(value);
    }
  };

  // 獲取當前選中的值
  const getCurrentValue = () => {
    if (testimonialSortBy === 'desc') return 'testimonials-desc';
    if (testimonialSortBy === 'asc') return 'testimonials-asc';
    return selectedSeries;
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
        value={getCurrentValue()}
        onChange={(e) => handleFilterChange(e.target.value)}
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
        
        {/* 系列篩選選項 */}
        {availableSeries.map(series => (
          <option key={series} value={series}>
            {getSeriesIcon(series)} {series}
          </option>
        ))}
        
        {/* 分隔線（視覺上的分組） */}
        <option disabled>────────────────</option>
        
        {/* 見證排序選項 */}
        <option value="testimonials-desc">💬 見證多到少</option>
        <option value="testimonials-asc">💭 見證少到多</option>
      </select>
    </div>
  );
};

// 產品統計組件保持不變
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
        📊 產品統計
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px',
        marginBottom: '20px'
      }}>
        <div style={{
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
            {products.length}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>總產品數</div>
        </div>
        
        <div style={{
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
            {productsWithTestimonials}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>有見證產品</div>
        </div>
        
        <div style={{
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
            {totalTestimonials}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>總見證數</div>
        </div>
      </div>

      <div>
        <h4 style={{ 
          fontSize: '16px', 
          color: '#333', 
          marginBottom: '10px',
          borderLeft: '3px solid #007bff',
          paddingLeft: '10px'
        }}>
          各系列產品數量
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {Object.entries(seriesStats).map(([series, count]) => (
            <span 
              key={series}
              style={{
                display: 'inline-block',
                padding: '6px 12px',
                backgroundColor: '#e9ecef',
                borderRadius: '15px',
                fontSize: '13px',
                color: '#495057'
              }}
            >
              {series}: {count}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};