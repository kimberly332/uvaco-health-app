import React from 'react';

// 產品搜尋組件
export const ProductSearch = ({ searchTerm, onSearchChange, onClearSearch }) => {
  return (
    <div style={{ 
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="搜尋產品名稱、系列或適用症狀..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 40px 12px 40px',
            border: '1px solid #ddd',
            borderRadius: '25px',
            fontSize: '16px',
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#8fbc8f'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        
        {/* 搜尋圖標 */}
        <div style={{
          position: 'absolute',
          left: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#999',
          pointerEvents: 'none',
          fontSize: '16px'
        }}>
          🔍
        </div>

        {/* 清除按鈕 */}
        {searchTerm && (
          <button
            onClick={onClearSearch}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#f0f0f0',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              fontSize: '14px',
              cursor: 'pointer',
              color: '#666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e0e0e0'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#f0f0f0'}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

// 見證篩選組件
export const TestimonialFilter = ({ 
  searchTerm, 
  onSearchChange, 
  selectedProduct, 
  onProductChange, 
  products, 
  onClearFilters 
}) => {
  return (
    <div style={{ 
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* 搜尋框 */}
      <div style={{ position: 'relative', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="搜尋見證內容、用戶姓名..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 40px 12px 40px',
            border: '1px solid #ddd',
            borderRadius: '25px',
            fontSize: '16px',
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#8fbc8f'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        
        <div style={{
          position: 'absolute',
          left: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#999',
          pointerEvents: 'none',
          fontSize: '16px'
        }}>
          🔍
        </div>
      </div>

      {/* 產品篩選下拉選單 */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          fontSize: '14px', 
          color: '#666',
          fontWeight: 'bold'
        }}>
          📦 按產品篩選：
        </label>
        <select
          value={selectedProduct}
          onChange={(e) => onProductChange(e.target.value)}
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
          <option value="">🌟 所有產品</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name} ({product.series})
            </option>
          ))}
        </select>
      </div>

      {/* 活動篩選條件顯示和清除按鈕 */}
      {(searchTerm || selectedProduct) && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          backgroundColor: '#f8f9fa',
          padding: '10px',
          borderRadius: '6px'
        }}>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {searchTerm && (
              <span style={{ 
                backgroundColor: '#e3f2fd', 
                color: '#1976d2', 
                padding: '2px 8px', 
                borderRadius: '12px',
                marginRight: '8px',
                fontSize: '11px'
              }}>
                搜尋: "{searchTerm}"
              </span>
            )}
            {selectedProduct && (
              <span style={{ 
                backgroundColor: '#e8f5e8', 
                color: '#2e7d32', 
                padding: '2px 8px', 
                borderRadius: '12px',
                fontSize: '11px'
              }}>
                產品: {products.find(p => p.id === selectedProduct)?.name}
              </span>
            )}
          </div>
          
          <button
            onClick={onClearFilters}
            style={{
              padding: '6px 12px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              fontSize: '11px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
          >
            清除篩選
          </button>
        </div>
      )}
    </div>
  );
};

// 搜尋結果統計組件
export const SearchResults = ({ totalCount, filteredCount, searchTerm, type = '產品' }) => {
  // 確保數值有效
  const safeTotal = totalCount || 0;
  const safeFiltered = filteredCount || 0;
  
  // 如果數據還在載入中
  if (safeTotal === 0) {
    return (
      <div style={{
        padding: '10px 15px',
        backgroundColor: '#f8f9fa',
        color: '#6c757d',
        borderRadius: '6px',
        marginBottom: '15px',
        fontSize: '14px',
        border: '1px solid #dee2e6',
        textAlign: 'center'
      }}>
        ⏳ 載入中...
      </div>
    );
  }

  return (
    <div style={{
      padding: '10px 15px',
      backgroundColor: safeFiltered > 0 ? '#e3f2fd' : '#fff3cd',
      color: safeFiltered > 0 ? '#1976d2' : '#856404',
      borderRadius: '6px',
      marginBottom: '15px',
      fontSize: '14px',
      border: `1px solid ${safeFiltered > 0 ? '#bbdefb' : '#ffeaa7'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div>
        {searchTerm && searchTerm !== '篩選條件' ? (
          <span>
            🔍 搜尋 "<strong>{searchTerm}</strong>" 找到 <strong>{safeFiltered}</strong> 個{type}
          </span>
        ) : (
          <span>
            📊 總共顯示：<strong>{safeFiltered}</strong> / {safeTotal} 個{type}
          </span>
        )}
      </div>
      
      {safeFiltered === 0 && searchTerm && (
        <div style={{ fontSize: '20px' }}>😅</div>
      )}
    </div>
  );
};