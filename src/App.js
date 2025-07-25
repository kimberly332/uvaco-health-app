import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useProducts, useTestimonials } from './hooks/useFirestore';
import { INITIAL_PRODUCTS } from './utils/constants';
import ProductCard from './components/ProductCard';
import TestimonialCard from './components/TestimonialCard';
import ProductDetail from './components/ProductDetail';
import TestimonialForm from './components/TestimonialForm';
import { ProductSearch, TestimonialFilter, SearchResults } from './components/SearchComponents';
import { ProductSort } from './components/ProductStats';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // 搜尋和篩選狀態
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [testimonialSearchTerm, setTestimonialSearchTerm] = useState('');
  const [selectedProductFilter, setSelectedProductFilter] = useState('');
  const [productSortBy, setProductSortBy] = useState('default');

  const { documents: products, loading: productsLoading, addDocument: addProduct } = useProducts();
  const { documents: testimonials, loading: testimonialsLoading, addDocument: addTestimonial } = useTestimonials();

  // 初始化產品資料
  useEffect(() => {
    if (!productsLoading && products.length === 0) {
      INITIAL_PRODUCTS.forEach(product => {
        addProduct(product);
      });
    }
  }, [productsLoading, products.length, addProduct]);

  // 獲取特定產品的見證
  const getTestimonialsForProduct = useCallback((productId) => {
    return testimonials.filter(t => t.productId === productId);
  }, [testimonials]);

  // 獲取產品的見證數量
  const getTestimonialCountForProduct = useCallback((productId) => {
    return testimonials.filter(t => t.productId === productId).length;
  }, [testimonials]);

  // 產品搜尋和排序過濾邏輯
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;
    
    // 先進行搜尋過濾
    if (productSearchTerm) {
      const searchLower = productSearchTerm.toLowerCase();
      filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.series.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.conditions.some(condition => 
          condition.toLowerCase().includes(searchLower)
        ) ||
        product.nutrients.some(nutrient => 
          nutrient.toLowerCase().includes(searchLower)
        )
      );
    }
    
    // 再進行排序和篩選
    const sortedProducts = [...filtered];
    switch (productSortBy) {
      case 'series':
        return sortedProducts.sort((a, b) => a.series.localeCompare(b.series));
      
      // 特定系列篩選
      case 'series-基本保養系列':
        return sortedProducts.filter(product => product.series === '基本保養系列');
      case 'series-清除系列':
        return sortedProducts.filter(product => product.series === '清除系列');
      case 'series-調理系列':
        return sortedProducts.filter(product => product.series === '調理系列');
      case 'series-活力丰采系列':
        return sortedProducts.filter(product => product.series === '活力丰采系列');
      case 'series-寵物食品系列':
        return sortedProducts.filter(product => product.series === '寵物食品系列');
      case 'series-生活保養系列':
        return sortedProducts.filter(product => product.series === '生活保養系列');
      case 'series-全身調理系列':
        return sortedProducts.filter(product => product.series === '全身調理系列');
      
      case 'testimonials-desc':
        return sortedProducts.sort((a, b) => {
          const countA = testimonials.filter(t => t.productId === a.id).length;
          const countB = testimonials.filter(t => t.productId === b.id).length;
          return countB - countA;
        });
      case 'testimonials-asc':
        return sortedProducts.sort((a, b) => {
          const countA = testimonials.filter(t => t.productId === a.id).length;
          const countB = testimonials.filter(t => t.productId === b.id).length;
          return countA - countB;
        });
      case 'price-desc':
        return sortedProducts.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
          const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
          return priceB - priceA;
        });
      case 'price-asc':
        return sortedProducts.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
          const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
          return priceA - priceB;
        });
      default:
        return sortedProducts;
    }
  }, [products, productSearchTerm, productSortBy, testimonials]);

  // 見證搜尋和篩選邏輯
  const filteredTestimonials = useMemo(() => {
    let filtered = testimonials;

    // 按產品篩選
    if (selectedProductFilter) {
      filtered = filtered.filter(testimonial => 
        testimonial.productId === selectedProductFilter
      );
    }

    // 按搜尋詞篩選
    if (testimonialSearchTerm) {
      const searchLower = testimonialSearchTerm.toLowerCase();
      filtered = filtered.filter(testimonial =>
        testimonial.story.toLowerCase().includes(searchLower) ||
        testimonial.userName.toLowerCase().includes(searchLower) ||
        testimonial.productName.toLowerCase().includes(searchLower) ||
        (testimonial.system && testimonial.system.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [testimonials, selectedProductFilter, testimonialSearchTerm]);

  const handleViewProductDetails = (product) => {
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

  const handleSubmitTestimonial = async (testimonial) => {
    try {
      await addTestimonial(testimonial);
      alert('見證分享成功！');
      setCurrentView('testimonials');
    } catch (error) {
      alert('分享失敗，請稍後再試');
    }
  };

  const handleCancelTestimonial = () => {
    setSelectedProduct(null);
    setCurrentView('products');
  };

  // 清除搜尋和篩選
  const handleClearProductSearch = () => {
    setProductSearchTerm('');
  };

  const handleClearTestimonialFilters = () => {
    setTestimonialSearchTerm('');
    setSelectedProductFilter('');
  };

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
              // Fallback if logo doesn't load
              e.target.style.display = 'none';
            }}
          />
          <h1>葡眾健康生活</h1>
        </div>
      </header>
      
      <main className="app-main">
        {currentView === 'products' && (
          <div>
            <h2>產品介紹</h2>
            
            {/* 產品搜尋 */}
            <ProductSearch
              searchTerm={productSearchTerm}
              onSearchChange={setProductSearchTerm}
              onClearSearch={handleClearProductSearch}
            />

            {/* 產品排序 */}
            <ProductSort
              sortBy={productSortBy}
              onSortChange={setProductSortBy}
            />

            {/* 搜尋結果統計 */}
            <SearchResults
              totalCount={products.length}
              filteredCount={filteredAndSortedProducts.length}
              searchTerm={productSearchTerm}
              type="產品"
            />

            {/* 產品列表 */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="products-grid">
                {filteredAndSortedProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onViewDetails={handleViewProductDetails}
                    testimonialCount={getTestimonialCountForProduct(product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <h3>找不到符合條件的產品</h3>
                <p>試試其他關鍵字或清除搜尋條件</p>
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
          <div>
            <h2>用戶心得分享</h2>
            
            {/* 法規免責聲明 */}
            <div style={{
              backgroundColor: '#e8f4fd',
              border: '1px solid #bee5eb',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '20px',
              fontSize: '14px',
              color: '#0c5460'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '8px' }}>ℹ️</span>
                重要聲明
              </div>
              <div style={{ lineHeight: '1.5' }}>
                • 以下分享內容為用戶個人使用體驗，不代表產品功效<br/>
                • 每個人使用感受可能不同，實際體驗因人而異<br/>
                • 本產品為食品，不具醫療功效，不可取代正規醫療<br/>
                • 如有健康問題，請諮詢專業醫師
              </div>
            </div>
            
            {/* 見證篩選 */}
            <TestimonialFilter
              searchTerm={testimonialSearchTerm}
              onSearchChange={setTestimonialSearchTerm}
              selectedProduct={selectedProductFilter}
              onProductChange={setSelectedProductFilter}
              products={products}
              onClearFilters={handleClearTestimonialFilters}
            />

            <button 
              onClick={() => handleAddTestimonial()} 
              className="btn btn-add-testimonial btn-full"
            >
              + 分享我的使用心得
            </button>

            {/* 搜尋結果統計 */}
            <SearchResults
              totalCount={testimonials.length}
              filteredCount={filteredTestimonials.length}
              searchTerm={testimonialSearchTerm || (selectedProductFilter ? '篩選條件' : '')}
              type="心得分享"
            />

            {/* 見證列表 */}
            {filteredTestimonials.length > 0 ? (
              <div>
                {filteredTestimonials.map(testimonial => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
                
                {/* 底部再次提醒 */}
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
          <TestimonialForm 
            selectedProduct={selectedProduct}
            products={products}
            onSubmit={handleSubmitTestimonial}
            onCancel={handleCancelTestimonial}
          />
        )}
      </main>
      
     <nav className="app-nav">
      <button 
        onClick={() => setCurrentView('products')}
        className={currentView === 'products' || currentView === 'product-detail' ? 'active' : ''}
      >
        產品介紹
      </button>
      <button 
        onClick={() => setCurrentView('testimonials')}
        className={currentView === 'testimonials' || currentView === 'add-testimonial' ? 'active' : ''}
      >
        心得分享
      </button>
    </nav>
    </div>
  );
}

export default App;