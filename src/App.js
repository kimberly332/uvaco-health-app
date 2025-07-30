// App.js - Clean version without any styling
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

// Main App Content Component (needs to be inside AuthProvider)
function AppContent() {
  const { isAuthenticated, user, login, logout, isAdmin, getRoleDisplayName } = useAuth();
  const [currentView, setCurrentView] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  // Search and filter states
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [testimonialSearchTerm, setTestimonialSearchTerm] = useState('');
  const [selectedProductFilter, setSelectedProductFilter] = useState('');
  const [productSortBy, setProductSortBy] = useState('default');
  
  // Initialization state control
  const [hasInitialized, setHasInitialized] = useState(false);

  const { documents: products, loading: productsLoading, addDocument: addProduct } = useProducts();
  const { documents: testimonials, loading: testimonialsLoading, addDocument: addTestimonial } = useTestimonials();

  // Utility functions
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

  const getTestimonialsForProduct = useCallback((productId) => {
    return testimonials.filter(testimonial => 
      testimonial.productIds?.includes(productId)
    );
  }, [testimonials]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = removeDuplicateProducts(products);
    
    if (productSearchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
        (product.series && product.series.toLowerCase().includes(productSearchTerm.toLowerCase()))
      );
    }
    
    switch (productSortBy) {
      case 'name':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case 'series':
        return [...filtered].sort((a, b) => (a.series || '').localeCompare(b.series || ''));
      case 'testimonials':
        return [...filtered].sort((a, b) => {
          const aTestimonials = getTestimonialsForProduct(a.id).length;
          const bTestimonials = getTestimonialsForProduct(b.id).length;
          return bTestimonials - aTestimonials;
        });
      default:
        return filtered;
    }
  }, [products, productSearchTerm, productSortBy, getTestimonialsForProduct, removeDuplicateProducts]);

  // Filter testimonials
  const filteredTestimonials = useMemo(() => {
    let filtered = testimonials;
    
    if (testimonialSearchTerm) {
      filtered = filtered.filter(testimonial =>
        (testimonial.story && testimonial.story.toLowerCase().includes(testimonialSearchTerm.toLowerCase())) ||
        (testimonial.userName && testimonial.userName.toLowerCase().includes(testimonialSearchTerm.toLowerCase())) ||
        (testimonial.productName && testimonial.productName.toLowerCase().includes(testimonialSearchTerm.toLowerCase())) ||
        (testimonial.productNames && testimonial.productNames.some(name => 
          name.toLowerCase().includes(testimonialSearchTerm.toLowerCase())
        ))
      );
    }
    
    if (selectedProductFilter) {
      filtered = filtered.filter(testimonial => {
        if (testimonial.productIds && Array.isArray(testimonial.productIds)) {
          return testimonial.productIds.includes(selectedProductFilter);
        }
        if (testimonial.productId) {
          return testimonial.productId === selectedProductFilter;
        }
        return false;
      });
    }
    
    return filtered.sort((a, b) => {
      const aTime = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
      const bTime = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
      return bTime - aTime;
    });
  }, [testimonials, testimonialSearchTerm, selectedProductFilter]);

  // Event handlers
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setCurrentView('products');
  };

  const handleAddTestimonial = (product = null) => {
    if (product) {
      setSelectedProduct(product);
    }
    setCurrentView('add-testimonial');
  };

  const handleTestimonialSubmit = async (testimonialData) => {
    try {
      const processedData = {
        ...testimonialData,
        createdAt: new Date(),
        status: 'approved'
      };
      
      await addTestimonial(processedData);
      
      if (selectedProduct) {
        setCurrentView('product-detail');
      } else {
        setCurrentView('testimonials');
      }
      
      alert('心得分享提交成功！感謝您的分享。');
    } catch (error) {
      console.error('提交心得時發生錯誤：', error);
      alert('提交失敗，請稍後再試。');
    }
  };

  const handleClearProductSearch = () => {
    setProductSearchTerm('');
  };

  const handleClearTestimonialFilters = () => {
    setTestimonialSearchTerm('');
    setSelectedProductFilter('');
  };

  const handleLoginSuccess = (userData) => {
    login(userData);
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginComponent onLoginSuccess={handleLoginSuccess} />;
  }

  // Loading screen
  if (productsLoading || testimonialsLoading) {
    return (
      <div>
        <div>⏳</div>
        <p>載入中...</p>
      </div>
    );
  }

  return (
    <div>
      <header>
        <div>
          <img src="/logo.svg" alt="Logo" />
          <h1>UVACO 健康專區</h1>
        </div>
        
        {isAdmin() && (
          <div>
            <button onClick={() => setShowAdminPanel(true)}>
              ⚙️ 管理
            </button>
            <button onClick={logout}>
              登出 ({getRoleDisplayName()})
            </button>
          </div>
        )}
      </header>

      <main>
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
              totalCount={products.length}
              filteredCount={filteredAndSortedProducts.length}
              searchTerm={productSearchTerm}
              type="產品"
            />

            {filteredAndSortedProducts.length > 0 ? (
              <div>
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
              <div>
                <div>📦</div>
                <h3>找不到符合條件的產品</h3>
                <p>試試其他關鍵字</p>
                {productSearchTerm && (
                  <button onClick={handleClearProductSearch}>
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
                <button onClick={() => handleAddTestimonial()}>
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
                </div>
              ) : (
                <div>
                  <div>💭</div>
                  <h3>尚無心得分享</h3>
                  <p>成為第一個分享使用體驗的人吧！</p>
                  <ProtectedComponent permission="submit_testimonial">
                    <button onClick={() => handleAddTestimonial()}>
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
      
      <nav>
        <button 
          onClick={() => setCurrentView('products')}
        >
          📦 產品介紹
        </button>
        <ProtectedComponent permission="view_testimonials">
          <button 
            onClick={() => setCurrentView('testimonials')}
          >
            💬 心得分享
          </button>
        </ProtectedComponent>
      </nav>

      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </div>
  );
}

// Main App Component (wraps AuthProvider)
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;