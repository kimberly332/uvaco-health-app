// src/App.js - 完整版本，在原有基礎上新增見證排序功能和突出的分享心得按鈕
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useProducts, useTestimonials } from './hooks/useFirestore';
import { INITIAL_PRODUCTS } from './utils/constants';
import ProductCard from './components/ProductCard';
import TestimonialCard from './components/TestimonialCard';
import ProductDetail from './components/ProductDetail';
import TestimonialForm from './components/TestimonialForm';
import { ProductSearch, TestimonialFilter, SearchResults } from './components/SearchComponents';
import { ProductFilter } from './components/ProductStats'; // 更新後的 ProductFilter
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
  const [selectedSeries, setSelectedSeries] = useState(''); // 系列篩選狀態
  const [testimonialSortBy, setTestimonialSortBy] = useState(''); // 新增：見證排序狀態
  
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

  // 產品篩選和排序邏輯 - 新增見證排序功能
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
    
    // 新增：見證數量排序
    if (testimonialSortBy) {
      filtered = filtered.sort((a, b) => {
        const aTestimonialCount = getTestimonialsForProduct(a.id).length;
        const bTestimonialCount = getTestimonialsForProduct(b.id).length;
        
        if (testimonialSortBy === 'desc') {
          return bTestimonialCount - aTestimonialCount; // 多到少
        } else if (testimonialSortBy === 'asc') {
          return aTestimonialCount - bTestimonialCount; // 少到多
        }
        return 0;
      });
    }
    
    return filtered;
  }, [products, productSearchTerm, selectedSeries, testimonialSortBy, removeDuplicateProducts, getTestimonialsForProduct]);

  // 見證篩選邏輯 - 保持原有功能
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

  // 清除篩選條件 - 新增清除見證排序
  const clearFilters = () => {
    setProductSearchTerm('');
    setTestimonialSearchTerm('');
    setSelectedProductFilter('');
    setSelectedSeries('');
    setTestimonialSortBy(''); // 新增：清除見證排序
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
      await addTestimonial(testimonialData);
      
      if (selectedProduct) {
        setCurrentView('product-detail');
      } else {
        setCurrentView('testimonials');
      }
    } catch (error) {
      console.error('提交見證失敗:', error);
      alert('提交失敗，請稍後再試');
    }
  };

  // 如果用戶未登入，顯示登入頁面
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
                管理
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

      {/* 新增：CSS動畫樣式 */}
      <style jsx>{`
        @keyframes gentle-pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.9;
          }
        }
      `}</style>

      {/* 主要內容 */}
      <main className="app-main">
        {/* 產品頁面 */}
        {currentView === 'products' && (
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              <h2 style={{ margin: 0 }}>產品介紹</h2>
            </div>
            
            {/* 搜尋和篩選區域 */}
            <div style={{ marginBottom: '20px' }}>
              <ProductSearch 
                searchTerm={productSearchTerm}
                onSearchChange={setProductSearchTerm}
                onClearSearch={() => setProductSearchTerm('')}
              />
              
              {/* 更新後的產品篩選器 - 包含見證排序功能 */}
              <ProductFilter 
                selectedSeries={selectedSeries}
                onSeriesChange={setSelectedSeries}
                products={removeDuplicateProducts(products || [])}
                testimonialSortBy={testimonialSortBy}
                onTestimonialSortChange={setTestimonialSortBy}
                getTestimonialsForProduct={getTestimonialsForProduct}
              />
            </div>

            {/* 結果統計 */}
            {(productSearchTerm || selectedSeries || testimonialSortBy) && (
              <SearchResults 
                searchTerm={productSearchTerm}
                filteredCount={filteredAndSortedProducts.length}
                totalCount={removeDuplicateProducts(products || []).length}
                type="產品"
                isLoading={productsLoading}
              />
            )}

            {/* 產品網格 */}
            {productsLoading ? (
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

        {/* 見證頁面 - 保持原有功能 */}
        {currentView === 'testimonials' && (
          <ProtectedComponent permission="view_testimonials">
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '15px'
              }}>
                <h2 style={{ margin: 0 }}>心得分享</h2>
                
                {/* 新增：見證頁面的分享心得按鈕 */}
                <ProtectedComponent permission="submit_testimonial">
                  <button
                    onClick={() => handleAddTestimonial()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',

                      padding: '12px',
                      margin: '0',
                      backgroundColor: 'rgb(168, 149, 111)',
                      color: 'white',
                      border: 'none',
                      borderRadius:'6px',
                      fontSize: '16px',
                      cursor: 'pointer',
                    }}
                  >
                   💬 分享我的使用心得
                  </button>
                </ProtectedComponent>
              </div>
              
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

        {/* 產品詳細頁面 - 保持原有功能 */}
        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            testimonials={getTestimonialsForProduct(selectedProduct.id)}
            onBack={handleBackToProducts}
            onAddTestimonial={handleAddTestimonial}
          />
        )}

        {/* 新增見證頁面 - 保持原有功能 */}
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
      
      {/* 底部導航 - 保持原有設計 */}
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

      {/* 管理員控制台模態框 - 保持原有功能 */}
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