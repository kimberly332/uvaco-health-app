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
    
    // 再進行排序
    const sortedProducts = [...filtered];
    switch (productSortBy) {
      case 'name':
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case 'series':
        return sortedProducts.sort((a, b) => a.series.localeCompare(b.series));
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
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
        <div>載入中...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Uvaco 健康生活</h1>
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
              filteredAndSortedProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onViewDetails={handleViewProductDetails}
                  testimonialCount={getTestimonialCountForProduct(product.id)}
                />
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                color: '#666'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔍</div>
                <h3>找不到符合條件的產品</h3>
                <p>試試其他關鍵字或清除搜尋條件</p>
                {productSearchTerm && (
                  <button
                    onClick={handleClearProductSearch}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      marginTop: '10px'
                    }}
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
            <h2>用戶見證</h2>
            
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
              className="add-testimonial-btn"
              style={{ marginBottom: '15px' }}
            >
              + 分享我的見證
            </button>

            {/* 搜尋結果統計 */}
            <SearchResults
              totalCount={testimonials.length}
              filteredCount={filteredTestimonials.length}
              searchTerm={testimonialSearchTerm || (selectedProductFilter ? '篩選條件' : '')}
              type="見證"
            />

            {/* 見證列表 */}
            {filteredTestimonials.length > 0 ? (
              filteredTestimonials.map(testimonial => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                color: '#666'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>💭</div>
                <h3>找不到符合條件的見證</h3>
                <p>試試其他關鍵字或清除篩選條件</p>
                {(testimonialSearchTerm || selectedProductFilter) && (
                  <button
                    onClick={handleClearTestimonialFilters}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      marginTop: '10px'
                    }}
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
          用戶見證
        </button>
      </nav>
    </div>
  );
}

export default App;