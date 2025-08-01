// src/App.js - 完整修復版本
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useProducts, useTestimonials } from './hooks/useFirestore';
import { INITIAL_PRODUCTS } from './utils/constants';
import ProductCard from './components/ProductCard';
import TestimonialCard from './components/TestimonialCard';
import ProductDetail from './components/ProductDetail';
import TestimonialForm from './components/TestimonialForm';
import { ProductSearch, TestimonialFilter, SearchResults } from './components/SearchComponents';
import { ProductFilter } from './components/ProductStats'; // 只導入 ProductFilter
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
  
  // 見證分享功能狀態
  const [sharedTestimonialId, setSharedTestimonialId] = useState(null);
  const [showSharedTestimonial, setShowSharedTestimonial] = useState(false);
  
  // 搜尋和篩選狀態
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [testimonialSearchTerm, setTestimonialSearchTerm] = useState('');
  const [selectedProductFilter, setSelectedProductFilter] = useState('');
  const [selectedSeries, setSelectedSeries] = useState(''); // 新增：系列篩選狀態
  
  // 初始化狀態控制
  const [hasInitialized, setHasInitialized] = useState(false);

  const { documents: products, loading: productsLoading, addDocument: addProduct } = useProducts();
  const { documents: testimonials, loading: testimonialsLoading, addDocument: addTestimonial } = useTestimonials();

  // 檢測URL參數中的見證分享
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const testimonialId = urlParams.get('testimonial');
    
    if (testimonialId) {
      setSharedTestimonialId(testimonialId);
      setShowSharedTestimonial(true);
    }
  }, []);

  // 工具函數
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

  // 獲取產品的見證數量
  const getTestimonialsForProduct = useCallback((productId) => {
    return testimonials.filter(testimonial => 
      testimonial.productIds?.includes(productId)
    );
  }, [testimonials]);

  // 產品篩選邏輯 - 移除排序功能
  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];
    
    let filtered = removeDuplicateProducts(products);
    
    // 產品搜尋篩選
    if (productSearchTerm) {
      const searchLower = productSearchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchLower) ||
        product.series?.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower)
      );
    }
    
    // 系列篩選
    if (selectedSeries) {
      filtered = filtered.filter(product => product.series === selectedSeries);
    }
    
    return filtered; // 只返回篩選結果，不做排序
  }, [products, productSearchTerm, selectedSeries, removeDuplicateProducts]);

  // 見證篩選邏輯
  const filteredTestimonials = useMemo(() => {
    if (!testimonials) return [];
    
    let filtered = [...testimonials];
    
    // 文字搜尋
    if (testimonialSearchTerm) {
      const searchLower = testimonialSearchTerm.toLowerCase();
      filtered = filtered.filter(testimonial =>
        testimonial.story?.toLowerCase().includes(searchLower) ||
        testimonial.userName?.toLowerCase().includes(searchLower) ||
        testimonial.displayName?.toLowerCase().includes(searchLower) ||
        testimonial.productNames?.some(name => 
          name?.toLowerCase().includes(searchLower)
        )
      );
    }
    
    // 產品篩選
    if (selectedProductFilter) {
      if (selectedProductFilter.startsWith('series-')) {
        const targetSeries = selectedProductFilter.replace('series-', '');
        filtered = filtered.filter(testimonial =>
          testimonial.productIds?.some(productId => {
            const product = products.find(p => p.id === productId);
            return product?.series === targetSeries;
          })
        );
      } else {
        filtered = filtered.filter(testimonial =>
          testimonial.productIds?.includes(selectedProductFilter)
        );
      }
    }
    
    return filtered.sort((a, b) => 
      new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
  }, [testimonials, testimonialSearchTerm, selectedProductFilter, products]);

  // 事件處理函數
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setCurrentView('products');
  };

  const handleAddTestimonial = (product = null) => {
    setSelectedProduct(product);
    setCurrentView('add-testimonial');
  };

  // 清除篩選條件
  const clearFilters = () => {
    setProductSearchTerm('');
    setTestimonialSearchTerm('');
    setSelectedProductFilter('');
    setSelectedSeries(''); // 清除系列篩選
  };

  // 關閉分享見證頁面
  const closeSharedTestimonial = () => {
    setShowSharedTestimonial(false);
    setSharedTestimonialId(null);
    // 清除URL參數
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  // 初始化產品資料
  useEffect(() => {
    const initializeProducts = async () => {
      if (!productsLoading && products && !hasInitialized && isAuthenticated) {
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

  // 處理見證提交
  const handleTestimonialSubmit = async (testimonialData) => {
    try {
      const testimonialWithTimestamp = {
        ...testimonialData,
        submittedBy: getRoleDisplayName(),
        createdAt: new Date().toISOString(),
        isApproved: true
      };
      
      await addTestimonial(testimonialWithTimestamp);
      setCurrentView('testimonials');
    } catch (error) {
      console.error('提交見證失敗:', error);
      alert('提交失敗，請稍後再試');
    }
  };

  // 載入狀態
  const isProductsLoading = productsLoading || !products;

  // 如果有分享的見證且未登入，顯示特殊的見證查看界面
  if (showSharedTestimonial && !isAuthenticated) {
    const sharedTestimonial = testimonials.find(t => t.id === sharedTestimonialId);
    
    return (
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <img src="/logo.svg" alt="UVACO 標誌" className="logo" />
            <h1>UVACO</h1>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => setShowSharedTestimonial(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#9bb8c4',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                進入完整系統
              </button>
            </div>
          </div>
        </header>

        <main className="app-main">
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <div style={{
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <h2 style={{ color: '#856404', marginBottom: '10px' }}>
                💬 用戶見證分享
              </h2>
              <p style={{ color: '#856404', fontSize: '14px', margin: 0 }}>
                以下為用戶個人使用體驗分享，僅供參考，效果因人而異
              </p>
            </div>

            {sharedTestimonial ? (
              <TestimonialCard testimonial={sharedTestimonial} />
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px',
                color: '#666'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>😕</div>
                <p>找不到此見證內容</p>
                <p style={{ fontSize: '14px' }}>此見證可能已被移除或連結有誤</p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // 如果有分享見證但已登入，顯示見證並提示
  if (showSharedTestimonial && isAuthenticated) {
    const sharedTestimonial = testimonials.find(t => t.id === sharedTestimonialId);
    
    return (
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <img src="/logo.svg" alt="UVACO 標誌" className="logo" />
            <h1>UVACO</h1>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ 
                fontSize: '14px', 
                color: '#666',
                padding: '5px 10px',
                backgroundColor: '#f0f0f0',
                borderRadius: '15px'
              }}>
                👤 {getRoleDisplayName()}
              </span>
              
              <button
                onClick={closeSharedTestimonial}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#9bb8c4',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                title="返回系統"
              >
                返回系統
              </button>
              
              <button
                onClick={logout}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#9ca3af',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                title="登出"
              >
                登出
              </button>
            </div>
          </div>
        </header>

        <main className="app-main">
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <div style={{
              backgroundColor: '#e8f4f8',
              border: '1px solid #bee5eb',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ color: '#0c5460', margin: '0 0 5px 0' }}>
                  🎯 分享的見證
                </h3>
                <p style={{ color: '#0c5460', fontSize: '14px', margin: 0 }}>
                  您正在查看通過分享鏈接訪問的見證
                </p>
              </div>
              <button
                onClick={closeSharedTestimonial}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                返回系統
              </button>
            </div>

            {sharedTestimonial ? (
              <TestimonialCard testimonial={sharedTestimonial} />
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px',
                color: '#666'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>😕</div>
                <p>找不到此見證內容</p>
                <p style={{ fontSize: '14px' }}>此見證可能已被移除或連結有誤</p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // 如果未登入，顯示登入組件
  if (!isAuthenticated) {
    return <LoginComponent onLoginSuccess={login} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <img src="/logo.svg" alt="UVACO 標誌" className="logo" />
          <h1>UVACO</h1>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ 
              fontSize: '14px', 
              color: '#666',
              padding: '5px 10px',
              backgroundColor: '#f0f0f0',
              borderRadius: '15px'
            }}>
              👤 {getRoleDisplayName()}
            </span>
            
            {isAdmin && (
              <button
                onClick={() => setShowAdminPanel(true)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#9bb8c4',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                title="管理員控制台"
              >
                ⚙️ 管理
              </button>
            )}
            
            <button
              onClick={logout}
              style={{
                padding: '8px 12px',
                backgroundColor: '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              title="登出"
            >
              登出
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        {/* 產品頁面 - 修復版 */}
        {currentView === 'products' && (
          <div>
            {/* 搜尋和篩選區域 */}
            <div style={{ marginBottom: '20px' }}>
              <ProductSearch 
                searchTerm={productSearchTerm}
                onSearchChange={setProductSearchTerm}
                onClearSearch={() => setProductSearchTerm('')}
              />
              
              <ProductFilter 
                selectedSeries={selectedSeries}
                onSeriesChange={setSelectedSeries}
                products={removeDuplicateProducts(products || [])}
              />
              

            </div>

            {/* 結果統計 */}
            {(productSearchTerm || selectedSeries) && (
              <SearchResults 
                searchTerm={productSearchTerm}
                filteredCount={filteredAndSortedProducts.length}
                totalCount={removeDuplicateProducts(products || []).length}
                type="產品"
                isLoading={isProductsLoading}
              />
            )}

            {/* 產品網格 */}
            {isProductsLoading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>⏳</div>
                <p>載入產品中...</p>
              </div>
            ) : filteredAndSortedProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>😕</div>
                <p>找不到符合條件的產品</p>
                <button
                  onClick={clearFilters}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}
                >
                  清除所有篩選條件
                </button>
              </div>
            ) : (
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
            )}
          </div>
        )}

        {/* 見證頁面 */}
        {currentView === 'testimonials' && (
          <ProtectedComponent permission="view_testimonials">
            <div>
              <div style={{ marginBottom: '20px' }}>
                <TestimonialFilter 
                  searchTerm={testimonialSearchTerm}
                  onSearchChange={setTestimonialSearchTerm}
                  selectedProduct={selectedProductFilter}
                  onProductChange={setSelectedProductFilter}
                  products={removeDuplicateProducts(products)}
                  onClearFilters={clearFilters}
                />
              </div>

              <SearchResults 
                searchTerm={testimonialSearchTerm}
                filteredCount={filteredTestimonials.length}
                totalCount={testimonials?.length || 0}
                type="心得分享"
              />

              {filteredTestimonials.length > 0 ? (
                <div>
                  {filteredTestimonials.map(testimonial => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">💭</div>
                  <h3>尚無心得分享</h3>
                  <p>成為第一個分享使用體驗的人吧！</p>
                  <ProtectedComponent permission="submit_testimonial">
                    <button
                      onClick={() => handleAddTestimonial()}
                      className="btn btn-success btn-sm"
                    >
                      分享我的心得
                    </button>
                  </ProtectedComponent>
                </div>
              )}
            </div>
          </ProtectedComponent>
        )}

        {/* 產品詳細頁面 */}
        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            testimonials={getTestimonialsForProduct(selectedProduct.id)}
            onBack={handleBackToProducts}
            onAddTestimonial={handleAddTestimonial}
          />
        )}

        {/* 新增見證頁面 */}
        {currentView === 'add-testimonial' && (
          <ProtectedComponent permission="submit_testimonial">
            <TestimonialForm
              selectedProduct={selectedProduct}
              products={removeDuplicateProducts(products)}
              onSubmit={handleTestimonialSubmit}
              onCancel={() => {
                if (selectedProduct) {
                  setCurrentView('product-detail');
                } else {
                  setCurrentView('testimonials');
                }
              }}
            />
          </ProtectedComponent>
        )}
      </main>
      
      {/* 底部導航 */}
      <nav className="app-nav">
        <button 
          onClick={() => setCurrentView('products')}
          className={currentView === 'products' || currentView === 'product-detail' ? 'active' : ''}
        >
          產品介紹
        </button>
        <ProtectedComponent permission="view_testimonials">
          <button 
            onClick={() => setCurrentView('testimonials')}
            className={currentView === 'testimonials' || currentView === 'add-testimonial' ? 'active' : ''}
          >
            心得分享
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