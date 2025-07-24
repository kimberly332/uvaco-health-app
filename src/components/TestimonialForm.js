import React, { useState } from 'react';

const TestimonialForm = ({ selectedProduct, products, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    productId: selectedProduct?.id || '',
    system: '',
    userName: '',
    isNamePublic: true,
    duration: '',
    story: ''
    // 已移除 imageUrl 欄位
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.productId || !formData.userName.trim() || !formData.story.trim()) {
      alert('請填寫必填欄位：產品、姓名、使用心得');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const selectedProd = products.find(p => p.id === formData.productId);
      const testimonial = {
        productId: formData.productId,
        productName: selectedProd?.name || '',
        userName: formData.userName.trim(),
        isNamePublic: formData.isNamePublic,
        system: formData.system.trim(),
        duration: formData.duration.trim(),
        story: formData.story.trim()
        // 已移除 imageUrl
      };
      
      await onSubmit(testimonial);
    } catch (error) {
      alert('提交失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#333'
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>💬 分享使用心得</h2>
      
      <div>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>選擇產品 <span style={{ color: '#dc3545' }}>*</span></label>
          <select 
            value={formData.productId}
            onChange={(e) => setFormData({...formData, productId: e.target.value})}
            style={inputStyle}
          >
            <option value="">請選擇產品...</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>體系 / 上線（選填）</label>
          <input 
            type="text"
            value={formData.system}
            onChange={(e) => setFormData({...formData, system: e.target.value})}
            placeholder="例：xx體系"
            style={inputStyle}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>姓名 <span style={{ color: '#dc3545' }}>*</span></label>
          <input 
            type="text"
            value={formData.userName}
            onChange={(e) => setFormData({...formData, userName: e.target.value})}
            placeholder="請輸入您的姓名"
            style={inputStyle}
          />
          <div style={{ marginTop: '10px' }}>
            <label style={{ fontSize: '14px', color: '#666', cursor: 'pointer' }}>
              <input 
                type="checkbox"
                checked={formData.isNamePublic}
                onChange={(e) => setFormData({...formData, isNamePublic: e.target.checked})}
                style={{ marginRight: '5px' }}
              />
              公開顯示姓名（取消勾選將以匿名方式分享）
            </label>
          </div>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>使用時間 <span style={{ color: '#dc3545' }}>*</span></label>
          <input 
            type="text"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            placeholder="例：3個月、半年、1年"
            style={inputStyle}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>使用心得 <span style={{ color: '#dc3545' }}>*</span></label>
          <textarea 
            value={formData.story}
            onChange={(e) => setFormData({...formData, story: e.target.value})}
            placeholder="請詳細分享您的使用心得，包括使用前後的變化、感受等..."
            rows="6"
            style={{
              ...inputStyle,
              resize: 'vertical',
              minHeight: '120px'
            }}
          />
          <div style={{ 
            fontSize: '12px', 
            color: '#666', 
            marginTop: '5px' 
          }}>
            {formData.story.length}/500 字
          </div>
        </div>
        
        {/* 已完全移除見證圖片欄位 */}
        
        <div style={{ 
          display: 'flex', 
          gap: '10px',
          marginTop: '30px'
        }}>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: isSubmitting ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? '提交中...' : '✓ 提交見證'}
          </button>
          <button 
            onClick={onCancel}
            disabled={isSubmitting}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            取消
          </button>
        </div>
      </div>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#666'
      }}>
        <strong>溫馨提醒：</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>請誠實分享您的真實使用經驗</li>
          <li>您的見證將幫助其他用戶了解產品效果</li>
          <li>如不希望公開姓名，可選擇匿名分享</li>
        </ul>
      </div>
    </div>
  );
};

export default TestimonialForm;