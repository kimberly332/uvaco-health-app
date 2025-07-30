// SearchComponents.js - Clean version without styling
import React from 'react';

// Product search component
export const ProductSearch = ({ searchTerm, onSearchChange, onClearSearch }) => {
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="搜尋產品名稱、系列或適用症狀..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        
        {/* Search icon */}
        <div>🔍</div>

        {/* Clear button */}
        {searchTerm && (
          <button onClick={onClearSearch}>✕</button>
        )}
      </div>
    </div>
  );
};

// Testimonial filter component
export const TestimonialFilter = ({ 
  searchTerm, 
  onSearchChange, 
  selectedProduct, 
  onProductChange, 
  products, 
  onClearFilters 
}) => {
  return (
    <div>
      {/* Search box */}
      <div>
        <input
          type="text"
          placeholder="搜尋見證內容、用戶姓名..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        
        <div>🔍</div>
      </div>

      {/* Product filter dropdown */}
      <div>
        <label>📦 按產品篩選：</label>
        <select
          value={selectedProduct}
          onChange={(e) => onProductChange(e.target.value)}
        >
          <option value="">🌟 所有產品</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name} ({product.series})
            </option>
          ))}
        </select>
      </div>

      {/* Active filter display and clear button */}
      {(searchTerm || selectedProduct) && (
        <div>
          <div>
            {searchTerm && (
              <span>搜尋: "{searchTerm}"</span>
            )}
            {selectedProduct && (
              <span>
                產品: {products.find(p => p.id === selectedProduct)?.name}
              </span>
            )}
          </div>
          
          <button onClick={onClearFilters}>清除篩選</button>
        </div>
      )}
    </div>
  );
};

// Search results statistics component
export const SearchResults = ({ totalCount, filteredCount, searchTerm, type = '產品' }) => {
  // Ensure valid values
  const safeTotal = totalCount || 0;
  const safeFiltered = filteredCount || 0;
  
  // If data is still loading
  if (safeTotal === 0) {
    return (
      <div>⏳ 載入中...</div>
    );
  }

  return (
    <div>
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
        <div>😅</div>
      )}
    </div>
  );
};