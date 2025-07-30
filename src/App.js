// src/App.js - 完整版本
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useProducts, useTestimonials } from './hooks/useFirestore';
import { INITIAL_PRODUCTS } from './utils/constants';
import ProductCard from './components/ProductCard';
import TestimonialCard from './components/TestimonialCard';
import ProductDetail from './components/ProductDetail';
import TestimonialForm from './components/TestimonialForm';
import { ProductSearch, TestimonialFilter, SearchResults } from './components/SearchComponents';
import { ProductSort } from './components/ProductStats';
import LoginComponent from './components/LoginComponent';
import AdminPanel from './components/AdminPanel';
import { AuthProvider, useAuth, ProtectedComponent, RoleProtectedComponent } from './hooks/useAuth';
import { USER_ROLES } from './services/authService';
import './App.css';

// 主App內容組件（需要在AuthProvider內部）
function AppContent() {
  const { isAuthenticated, user, login, logout, isAdmin, getRoleDisplayName } = useAuth();
  const [currentView, setCurrentView] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  // 搜尋和篩選狀態
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [testimonialSearchTerm, setTestimonialSearchTerm] = useState('');
  const [selectedProductFilter, setSelectedProductFilter] = useState('');
  const [productSortBy, setProductSortBy] = useState('default');
  
  // 初始化狀態控制
  const [hasInitialized, setHasInitialized] = useState(false);

  const { documents: products, loading: productsLoading, addDocument: addProduct } = useProducts();
  const { documents: testimonials, loading: testimonialsLoading, addDocument: addTestimonial } = useTestimonials();

  // 產品去重工具函數
  const removeDuplicateProducts = useCallback((products) => {
    const uniqueProducts = [];
    const seenIds = new Set();
    
    for (const product of products) {
      if (!seenIds.has(product.id)) {
        seenIds.add(product.id);
        uniqueProducts.push(product);
      }
    }
    
    return uniqueProducts;
  }, []);

  // 初始化產品資料
  useEffect(() => {
    const initializeProducts = async () => {
      if (!productsLoading && !hasInitialized && isAuthenticated) {
        console.log('檢查產品資料初始化狀態...');
        
        const uniqueExistingProducts = removeDuplicateProducts(products);
        
        if (uniqueExistingProducts.length === 0) {
          console.log('初始化產品資料...');
          try {
            for (const product of INITIAL_PRODUCTS) {
              await addProduct(product);
            }
            console.log('產品資料初始化完成');
          } catch (error) {
            console.error('初始化產品資料失敗:', error);
          }
        }
        setHasInitialized(true);
      }
    };

    initializeProducts();
  }, [products, productsLoading, hasInitialized, addProduct, removeDuplicateProducts, isAuthenticated]);

  // 產品搜尋和排序邏輯
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = removeDuplicateProducts(products);
    
    // 搜尋過濾
    if (productSearchTerm) {
      const searchLower = productSearchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.series.toLowerCase().includes(searchLower) ||
        product.conditions.some(condition => 
          condition.toLowerCase().includes(searchLower)
        )
      );
    }

    // 排序
    filtered.sort((a, b) => {
      switch (productSortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'series':
          return a.series.localeCompare(b.series);
        case 'price':
          const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
          const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
          return priceA - priceB;
        case 'testimonials':
          const countA = getTestimonialsForProduct(a.id).length;
          const countB = getTestimonialsForProduct(b.id).length;
          return countB - countA;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, productSearchTerm, productSortBy, testimonials, removeDuplicateProducts]);

  // 見證搜尋和篩選邏輯
  const filteredTestimonials = useMemo(() => {
    let filtered = testimonials;

    if (testimonialSearchTerm) {
      const searchLower = testimonialSearchTerm.toLowerCase();
      filtered = filtered.filter(testimonial =>
        testimonial.story.toLowerCase().includes(searchLower) ||
        testimonial.displayName.toLowerCase().includes(searchLower) ||
        testimonial.productNames?.some(name => 
          name.toLowerCase().includes(searchLower)
        )
      );
    }

    if (selectedProductFilter) {
      filtered = filtered.filter(testimonial =>
        testimonial.productIds?.includes(selectedProductFilter)
      );
    }

    return filtered;
  }, [testimonials, testimonialSearchTerm, selectedProductFilter]);

  // 根據產品ID獲取見證
  const getTestimonialsForProduct = useCallback((productId) => {
    return testimonials.filter(testimonial => 
      testimonial.productIds?.includes(productId)
    );
  }, [testimonials]);

  // 事件處理函數
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleAddTestimonial = (product = null) => {
    setSelectedProduct(product);
    setCurrentView('add-testimonial');
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setCurrentView('products');
  };

  const handleSubmitTestimonial = async (testimonialData) => {
    try {
      await addTestimonial(testimonialData);
      alert('感謝您的分享！您的使用心得已成功提交。');
      setSelectedProduct(null);
      setCurrentView('testimonials');
    } catch (error) {
      alert('分享失敗，請稍後再試');
    }
  };

  const handleCancelTestimonial = () => {
    setSelectedProduct(null);
    setCurrentView('products');
  };

  const handleClearProductSearch = () => {
    setProductSearchTerm('');
  };

  const handleClearTestimonialFilters = () => {
    setTestimonialSearchTerm('');
    setSelectedProductFilter('');
  };

  // 如果未登入，顯示登入頁面
  if (!isAuthenticated) {
    return (
      <LoginComponent 
        onLoginSuccess={(userData) => {
          console.log('🎉 App收到登入成功事件:', userData);
          login(userData);
        }} 
      />
    );
  }

  if (productsLoading || testimonialsLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">⏳</div>
        <div>載入中...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <img 
            src="/assets/logo.svg" 
            alt="Uvaco Logo" 
            className="logo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1>葡眾健康生活</h1>
          
          {/* 用戶信息和按鈕 - 柔和顏色設計 */}
          <div style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            {/* 用戶角色顯示 - 深灰藍色 */}
            <span style={{
              backgroundColor: isAdmin() ? '#34495e' : '#5a6c7d',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '500',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span>{isAdmin() ? '👑' : '👤'}</span>
              {getRoleDisplayName()}
            </span>

            {/* 管理員控制台按鈕 - 淡雅藍色 */}
            <RoleProtectedComponent 
              allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN]}
            >
              <button
                onClick={() => setShowAdminPanel(true)}
                style={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500',
                  boxShadow: '0 2px 4px rgba(52, 152, 219, 0.2)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#2980b9';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#3498db';
                  e.target.style.transform = 'translateY(0)';
                }}
                title="管理員控制台"
              >
                🛡️ 管理
              </button>
            </RoleProtectedComponent>

            {/* 登出按鈕 - 柔和灰色 */}
            <button
              onClick={logout}
              style={{
                backgroundColor: '#95a5a6',
                color: 'white',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(149, 165, 166, 0.2)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#7f8c8d';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#95a5a6';
                e.target.style.transform = 'translateY(0)';
              }}
              title="登出"
            >
              🚪 登出
            </button>
          </div>
        </div>
      </header>
      
      <main className="app-main">
        {currentView === 'products' && (
          <div>
            <h2>產品介紹</h2>
            
            <ProductSearch
              searchTerm={productSearchTerm}
              onSearchChange={setProductSearchTerm}
              onClearSearch={handleClearProductSearch}
            />

            <ProductSort
              sortBy={productSortBy}
              onSortChange={setProductSortBy}
            />

            <SearchResults
              totalCount={removeDuplicateProducts(products).length}
              filteredCount={filteredAndSortedProducts.length}
              searchTerm={productSearchTerm}
              type="產品"
            />

            {filteredAndSortedProducts.length > 0 ? (
              <div className="products-grid">
                {filteredAndSortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewDetails}
                    testimonialCount={getTestimonialsForProduct(product.id).length}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📦</div>
                <h3>找不到符合條件的產品</h3>
                <p>試試其他關鍵字</p>
                {productSearchTerm && (
                  <button
                    onClick={handleClearProductSearch}
                    className="btn btn-primary btn-sm"
                  >
                    清除搜尋
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {currentView === 'testimonials' && (
          <ProtectedComponent permission="view_testimonials">
            <div>
              <h2>用戶心得分享</h2>
              
              <ProtectedComponent permission="submit_testimonial">
                <button 
                  onClick={() => handleAddTestimonial()}
                  className="btn btn-success btn-add-testimonial btn-full"
                >
                  ✍️ 分享我的使用心得
                </button>
              </ProtectedComponent>

              <TestimonialFilter
                searchTerm={testimonialSearchTerm}
                onSearchChange={setTestimonialSearchTerm}
                selectedProduct={selectedProductFilter}
                onProductChange={setSelectedProductFilter}
                products={removeDuplicateProducts(products)}
                onClearFilters={handleClearTestimonialFilters}
              />

              <SearchResults
                totalCount={testimonials.length}
                filteredCount={filteredTestimonials.length}
                searchTerm={testimonialSearchTerm || selectedProductFilter ? 
                  (testimonialSearchTerm + ' ' + (selectedProductFilter ? '篩選條件' : '')).trim() : ''}
                type="心得分享"
              />

              {filteredTestimonials.length > 0 ? (
                <div>
                  {filteredTestimonials.map(testimonial => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                  ))}
                  
                  <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '12px',
                    borderRadius: '6px',
                    marginTop: '20px',
                    textAlign: 'center',
                    fontSize: '13px',
                    color: '#6c757d'
                  }}>
                    以上為用戶個人使用體驗分享，效果因人而異
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">💭</div>
                  <h3>找不到符合條件的心得分享</h3>
                  <p>試試其他關鍵字或清除篩選條件</p>
                  {(testimonialSearchTerm || selectedProductFilter) && (
                    <button
                      onClick={handleClearTestimonialFilters}
                      className="btn btn-primary btn-sm"
                    >
                      清除篩選
                    </button>
                  )}
                </div>
              )}
            </div>
          </ProtectedComponent>
        )}
        
        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            testimonials={getTestimonialsForProduct(selectedProduct.id)}
            onBack={handleBackToProducts}
            onAddTestimonial={handleAddTestimonial}
          />
        )}
        
        {currentView === 'add-testimonial' && (
          <ProtectedComponent permission="submit_testimonial">
            <TestimonialForm 
              selectedProduct={selectedProduct}
              products={removeDuplicateProducts(products)}
              onSubmit={handleSubmitTestimonial}
              onCancel={handleCancelTestimonial}
            />
          </ProtectedComponent>
        )}
      </main>
      
      <nav className="app-nav">
        <button 
          onClick={() => setCurrentView('products')}
          className={currentView === 'products' || currentView === 'product-detail' ? 'active' : ''}
        >
          📦 產品介紹
        </button>
        <ProtectedComponent permission="view_testimonials">
          <button 
            onClick={() => setCurrentView('testimonials')}
            className={currentView === 'testimonials' || currentView === 'add-testimonial' ? 'active' : ''}
          >
            💬 心得分享
          </button>
        </ProtectedComponent>
      </nav>

      {/* 管理員控制台模態框 */}
      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </div>
  );
}

// 主App組件（包裝AuthProvider）
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;