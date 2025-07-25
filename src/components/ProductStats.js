import React from 'react';

// 產品排序組件
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
        <option value="series">📦 按系列分組</option>
        <option value="series-基本保養系列">🟢 基本保養系列</option>
        <option value="series-清除系列">⚫ 清除系列</option>
        <option value="series-調理系列">🔵 調理系列</option>
        <option value="series-活力丰采系列">🔴 活力丰采系列</option>
        <option value="series-寵物食品系列">🟡 寵物食品系列</option>
        <option value="series-生活保養系列">🟣 生活保養系列</option>
        <option value="series-全身調理系列">🟤 全身調理系列</option>
        <option value="testimonials-desc">💬 見證數量（多到少）</option>
        <option value="testimonials-asc">🤍 見證數量（少到多）</option>
        <option value="price-desc">💰 價格（高到低）</option>
        <option value="price-asc">💸 價格（低到高）</option>
      </select>
    </div>
  );
};