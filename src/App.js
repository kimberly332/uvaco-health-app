// src/App.js - 修復分享連結登入後跳轉問題
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useProducts, useTestimonials } from './hooks/useFirestore';
import { INITIAL_PRODUCTS } from './utils/constants';
import ProductCard from './components/ProductCard';
import TestimonialCard from './components/TestimonialCard';
import ProductDetail from './components/ProductDetail';
import TestimonialForm from './components/TestimonialForm';
import { ProductSearch, TestimonialFilter, SearchResults } from './components/SearchComponents';
import { ProductFilter } from './components/ProductStats';
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
  const [pendingRedirect, setPendingRedirect] = useState(null); // 新增：待處理的重定向
  
  // 搜尋和篩選狀態
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [testimonialSearchTerm, setTestimonialSearchTerm] = useState('');
  const [selectedProductFilter, setSelectedProductFilter] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [testimonialSortBy, setTestimonialSortBy] = useState('');
  
  // 初始化狀態控制
  const [hasInitialized, setHasInitialized] = useState(false);

  const { documents: products, loading: productsLoading, addDocument: addProduct } = useProducts();
  const { documents: testimonials, loading: testimonialsLoading, addDocument: addTestimonial } = useTestimonials();

  // 修復：URL參數檢測和持久化處理
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const testimonialId = urlParams.get('testimonial');
    
    if (testimonialId) {
      console.log('檢測到分享見證ID:', testimonialId);
      setSharedTestimonialId(testimonialId);
      
      if (isAuthenticated) {
        // 如果已登入，直接顯示分享見證
        setShowSharedTestimonial(true);
        setCurrentView('testimonials');
      } else {
        // 如果未登入，保存待處理的重定向信息
        setPendingRedirect({
          type: 'testimonial',
          testimonialId: testimonialId,
          timestamp: Date.now()
        });
        console.log('用戶未登入，保存重定向信息');
      }
    }
  }, [isAuthenticated]); // 依賴於登入狀態變化

  // 新增：處理登入成功後的重定向
  useEffect(() => {
    if (isAuthenticated && pendingRedirect && !hasInitialized) {
      console.log('處理登入後重定向:', pendingRedirect);
      
      // 檢查重定向信息是否還有效（避免過期的重定向）
      const isValid = pendingRedirect.timestamp && 
                     (Date.now() - pendingRedirect.timestamp) < 5 * 60 * 1000; // 5分鐘內有效
      
      if (isValid && pendingRedirect.type === 'testimonial') {
        setSharedTestimonialId(pendingRedirect.testimonialId);
        setShowSharedTestimonial(true);
        setCurrentView('testimonials');
        
        // 清除待處理的重定向
        setPendingRedirect(null);
        console.log('成功重定向到分享見證');
      }
      
      setHasInitialized(true);
    }
  }, [isAuthenticated, pendingRedirect, hasInitialized]);

  // 工具函數
  const removeDuplicateProducts = useCallback((products) => {
    if (!Array.isArray(products)) return [];
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
    if (!testimonials || !Array.isArray(testimonials)) return [];
    return testimonials.filter(testimonial => {
      if (testimonial.productIds && Array.isArray(testimonial.productIds)) {
        return testimonial.productIds.includes(productId);
      }
      return testimonial.productId === productId;
    });
  }, [testimonials]);

  // 產品篩選和排序邏輯 - 新增見證排序功能
  const filteredAndSortedProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    
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
    } else {
      // 預設按見證數量排序（多到少）
      filtered = filtered.sort((a, b) => {
        const aTestimonials = getTestimonialsForProduct(a.id).length;
        const bTestimonials = getTestimonialsForProduct(b.id).length;
        return bTestimonials - aTestimonials;
      });
    }
    
    return filtered;
  }, [products, productSearchTerm, selectedSeries, testimonialSortBy, removeDuplicateProducts, getTestimonialsForProduct]);

  // 見證篩選和搜尋邏輯
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
      alert('見證提交成功！感謝您的分享。');
      
      if (selectedProduct) {
        setCurrentView('product-detail');
      } else {
        setCurrentView('testimonials');
      }
      setSelectedProduct(null);
    } catch (error) {
      console.error('提交見證失敗:', error);
      alert('提交失敗，請稍後再試');
    }
  };

  // 清除篩選條件 - 新增清除見證排序
  const clearFilters = () => {
    setProductSearchTerm('');
    setTestimonialSearchTerm('');
    setSelectedProductFilter('');
    setSelectedSeries('');
    setTestimonialSortBy(''); // 新增：清除見證排序
  };

  // 修復：關閉分享見證頁面
  const closeSharedTestimonial = () => {
    setShowSharedTestimonial(false);
    setSharedTestimonialId(null);
    setPendingRedirect(null); // 清除待處理重定向
    // 清除URL參數
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  // 如果用戶未登入，顯示登入頁面
  if (!isAuthenticated) {
    return (
      <div>
        <LoginComponent onLoginSuccess={login} />
        {/* 修復：顯示等待重定向的提示 */}
        {pendingRedirect && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '8px',
            fontSize: '14px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            zIndex: 1000
          }}>
            💡 登入後將自動跳轉到分享的見證
          </div>
        )}
      </div>
    );
  }

  // 修復：單一見證分享頁面組件
  const SingleTestimonialPage = ({ testimonialId, onBack }) => {
    const testimonial = testimonials?.find(t => t.id === testimonialId);
    
    const getProductInfo = (productIds) => {
      if (!productIds || !Array.isArray(productIds)) return [];
      return productIds.map(id => products?.find(p => p.id === id)).filter(Boolean);
    };

    if (testimonialsLoading || productsLoading) {
      return (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: '#666'
        }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f0f0f0', 
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            margin: '0 auto 20px',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ color: '#666' }}>載入見證內容中...</p>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      );
    }

    if (!testimonial) {
      return (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: '#666'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>😕</div>
          <h2 style={{ color: '#333', marginBottom: '10px' }}>找不到此見證</h2>
          <p style={{ marginBottom: '30px' }}>此見證可能已被移除或鏈接有誤</p>
          <button
            onClick={onBack}
            style={{
              padding: '12px 24px',
              backgroundColor: '#a8956f',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            返回見證列表
          </button>
        </div>
      );
    }

    const productInfo = getProductInfo(testimonial.productIds);

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        {/* 頁面標題和導航 */}
        <header style={{ 
          marginBottom: '30px',
          borderBottom: '2px solid #f0f0f0',
          paddingBottom: '20px'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '15px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <h1 style={{ 
              color: '#333', 
              fontSize: '24px',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>💬</span>
              用戶見證分享
            </h1>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                onClick={onBack}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'rgb(156, 163, 175)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                返回列表
              </button>
            </div>
          </div>
          
          <div style={{ 
            padding: '12px',
            backgroundColor: '#e8f4f8',
            borderRadius: '6px',
            fontSize: '14px',
            color: '#0c5460'
          }}>
            📤 此見證已透過分享連結開啟，您可以查看完整內容
          </div>
        </header>

        {/* 見證卡片 */}
        <TestimonialCard testimonial={testimonial} />
      </div>
    );
  };

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

      {/* 主要內容 */}
      <main className="app-main">
        {/* 修復：分享見證頁面優先顯示 */}
        {showSharedTestimonial && sharedTestimonialId ? (
          <SingleTestimonialPage 
            testimonialId={sharedTestimonialId}
            onBack={closeSharedTestimonial}
          />
        ) : currentView === 'products' && (
          <div>
            <h2>產品介紹</h2>
            
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
        {currentView === 'testimonials' && !showSharedTestimonial && (
          <ProtectedComponent permission="view_testimonials">
            <div>
              <h2>心得分享</h2>
              
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
          onClick={() => {
            // 修復：切換到產品頁面時清除分享見證狀態
            if (showSharedTestimonial) {
              closeSharedTestimonial();
            }
            setCurrentView('products');
          }}
          className={currentView === 'products' || currentView === 'product-detail' ? 'active' : ''}
        >
          產品介紹
        </button>
        <ProtectedComponent permission="view_testimonials">
          <button 
            onClick={() => {
              // 修復：切換到見證頁面時清除分享見證狀態
              if (showSharedTestimonial) {
                closeSharedTestimonial();
              }
              setCurrentView('testimonials');
            }}
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