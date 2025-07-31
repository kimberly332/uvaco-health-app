// src/App.js - 完整修正版本
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

  // ✅ 1. 首先定義工具函數
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

  // ✅ 2. 然後定義 getTestimonialsForProduct（在 filteredAndSortedProducts 之前）
  const getTestimonialsForProduct = useCallback((productId) => {
    return testimonials.filter(testimonial => 
      testimonial.productIds?.includes(productId)
    );
  }, [testimonials]);

  // ✅ 3. 事件處理函數
  const handleClearProductSearch = () => {
    console.log('清除產品搜尋');
    setProductSearchTerm('');
  };

  const handleClearTestimonialFilters = () => {
    setTestimonialSearchTerm('');
    setSelectedProductFilter('');
  };

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

  const handleBackToTestimonials = () => {
    setSelectedProduct(null);
    setCurrentView('testimonials');
  };

  // ✅ 4. 產品搜尋和排序邏輯（修正版）
  const filteredAndSortedProducts = useMemo(() => {
  console.log('🔍 篩選邏輯執行中...', {
    原始產品數量: products.length,
    搜尋詞: productSearchTerm,
    排序方式: productSortBy
  });

  let filtered = removeDuplicateProducts(products);
  console.log('去重後產品數量:', filtered.length);
  
  // 搜尋過濾
  if (productSearchTerm && productSearchTerm.trim()) {
    const searchLower = productSearchTerm.toLowerCase().trim();
    console.log('開始篩選，搜尋詞:', searchLower);
    
    filtered = filtered.filter(product => {
      const nameMatch = product.name && 
        product.name.toLowerCase().includes(searchLower);
      
      const seriesMatch = product.series && 
        product.series.toLowerCase().includes(searchLower);
      
      const conditionsMatch = product.conditions && 
        Array.isArray(product.conditions) &&
        product.conditions.some(condition => 
          condition && condition.toLowerCase().includes(searchLower)
        );
      
      const isMatch = nameMatch || seriesMatch || conditionsMatch;
      
      if (isMatch) {
        console.log('✅ 符合條件的產品:', product.name);
      }
      
      return isMatch;
    });
    
    console.log('篩選後產品數量:', filtered.length);
  }

  // ✅ 修正的排序和系列篩選邏輯
  if (productSortBy.startsWith('series-')) {
    // 處理特定系列篩選
    const targetSeries = productSortBy.replace('series-', '');
    console.log('🎯 篩選特定系列:', targetSeries);
    
    filtered = filtered.filter(product => {
      const matches = product.series === targetSeries;
      if (matches) {
        console.log('✅ 符合系列的產品:', product.name, '系列:', product.series);
      }
      return matches;
    });
    
    console.log('系列篩選後產品數量:', filtered.length);
    
    // 系列內按名稱排序
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    
  } else {
    // 其他排序方式
    filtered.sort((a, b) => {
      switch (productSortBy) {
        case 'default':
          return 0; // 保持原順序
          
        case 'series':
          // 按系列分組，同系列內按名稱排序
          const seriesCompare = a.series.localeCompare(b.series);
          return seriesCompare !== 0 ? seriesCompare : a.name.localeCompare(b.name);
          
        case 'name':
          return a.name.localeCompare(b.name);
          
        case 'price-asc':
          const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
          const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
          return priceA - priceB;
          
        case 'price-desc':
          const priceA2 = parseInt(a.price.replace(/[^\d]/g, ''));
          const priceB2 = parseInt(b.price.replace(/[^\d]/g, ''));
          return priceB2 - priceA2;
          
        case 'testimonials-desc':
          const countA = getTestimonialsForProduct(a.id).length;
          const countB = getTestimonialsForProduct(b.id).length;
          return countB - countA;
          
        case 'testimonials-asc':
          const countA2 = getTestimonialsForProduct(a.id).length;
          const countB2 = getTestimonialsForProduct(b.id).length;
          return countA2 - countB2;
          
        default:
          return 0;
      }
    });
  }

  console.log('最終結果產品數量:', filtered.length);
  console.log('最終產品列表:', filtered.map(p => `${p.name} (${p.series})`));
  
  return filtered;
}, [products, productSearchTerm, productSortBy, testimonials, removeDuplicateProducts, getTestimonialsForProduct]);
  // 見證搜尋和篩選邏輯
  // 見證搜尋和篩選邏輯 - 修正版
const filteredTestimonials = useMemo(() => {
  console.log('🔍 見證篩選邏輯執行中...', {
    原始見證數量: testimonials.length,
    搜尋詞: testimonialSearchTerm,
    產品篩選: selectedProductFilter
  });

  let filtered = testimonials;

  // 搜尋過濾
  if (testimonialSearchTerm) {
    const searchLower = testimonialSearchTerm.toLowerCase();
    filtered = filtered.filter(testimonial =>
      testimonial.story.toLowerCase().includes(searchLower) ||
      testimonial.displayName.toLowerCase().includes(searchLower) ||
      testimonial.productNames?.some(name => 
        name.toLowerCase().includes(searchLower)
      )
    );
    console.log('搜尋篩選後見證數量:', filtered.length);
  }

  // 🔥 關鍵修正：產品篩選 - 支援系列篩選
  if (selectedProductFilter) {
    if (selectedProductFilter.startsWith('series-')) {
      // 系列篩選：找出該系列的所有產品ID
      const targetSeries = selectedProductFilter.replace('series-', '');
      console.log('🎯 見證系列篩選:', targetSeries);
      
      const seriesProductIds = products
        .filter(product => product.series === targetSeries)
        .map(product => product.id);
      
      console.log('🔍 該系列產品IDs:', seriesProductIds);
      
      // 篩選包含該系列任一產品的見證
      filtered = filtered.filter(testimonial => {
        const hasSeriesProduct = testimonial.productIds?.some(productId => 
          seriesProductIds.includes(productId)
        );
        if (hasSeriesProduct) {
          console.log('✅ 符合系列的見證:', testimonial.displayName);
        }
        return hasSeriesProduct;
      });
    } else {
      // 具體產品篩選
      filtered = filtered.filter(testimonial => {
        const hasProduct = testimonial.productIds?.includes(selectedProductFilter);
        if (hasProduct) {
          console.log('✅ 符合產品的見證:', testimonial.displayName);
        }
        return hasProduct;
      });
    }
    console.log('產品篩選後見證數量:', filtered.length);
  }

  console.log('最終見證數量:', filtered.length);
  return filtered;
}, [testimonials, testimonialSearchTerm, selectedProductFilter, products]);

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
      
      <main className="app-main">
        {currentView === 'products' && (
          <div>
            {/* <h2>產品介紹</h2> */}
            
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
              {/* <h2>用戶心得分享</h2> */}
              
              <ProtectedComponent permission="submit_testimonial">
                <button 
                  onClick={() => handleAddTestimonial()}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#a8956f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    marginBottom: '20px'
                  }}
                >
                  💬 分享我的使用心得
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