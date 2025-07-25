import React, { useState } from 'react';

const TestimonialForm = ({ selectedProduct, products, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    productId: selectedProduct?.id || '',
    userName: '',
    isNamePublic: true,
    system: '',
    duration: '',
    story: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.productId || !formData.userName || !formData.story || !formData.duration) {
      alert('請填寫所有必填欄位');
      return;
    }

    if (formData.story.length > 500) {
      alert('使用心得不能超過500字');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const selectedProductData = products.find(p => p.id === formData.productId);
      
      const testimonialData = {
        ...formData,
        productName: selectedProductData?.name || '未知產品',
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      await onSubmit(testimonialData);
      alert('見證提交成功！感謝您的分享。');
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
    <div style={{ 
      backgroundColor: 'white', 
      padding: '20px', 
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>分享使用心得</h2>
      
      {/* 新增：用詞提醒區塊 */}
      <div style={{
        backgroundColor: '#e3f2fd',
        border: '1px solid #2196f3',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h4 style={{ color: '#1976d2', marginBottom: '10px', fontSize: '16px' }}>
          📝 分享注意事項
        </h4>
        <ul style={{ 
          margin: '0',
          paddingLeft: '20px',
          fontSize: '14px',
          color: '#1565c0',
          lineHeight: '1.6'
        }}>
          <li>請真實分享您的使用體驗，避免誇大描述</li>
          <li>建議用詞：「改善」、「幫助」、「感覺」、「體驗到」</li>
          <li>避免用詞：「有效」、「治療」、「治好」、「神奇」</li>
          <li>您的分享將幫助其他用戶了解產品特性</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>選擇產品 <span style={{ color: '#dc3545' }}>*</span></label>
          <select
            value={formData.productId}
            onChange={(e) => setFormData({...formData, productId: e.target.value})}
            style={inputStyle}
          >
            <option value="">請選擇產品</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
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
            <label style={{ fontSize: '14px', color: '#666' }}>
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
          <label style={labelStyle}>體系（選填）</label>
          <input 
            type="text"
            value={formData.system}
            onChange={(e) => setFormData({...formData, system: e.target.value})}
            placeholder="例：xx體系"
            style={inputStyle}
          />
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
            placeholder="請分享您的使用體驗，例如：使用後感覺精神改善了、生活品質有幫助等..."
            rows="6"
            style={{
              ...inputStyle,
              resize: 'vertical',
              minHeight: '120px'
            }}
          />
          <div style={{ 
            fontSize: '12px', 
            color: formData.story.length > 500 ? '#dc3545' : '#666', 
            marginTop: '5px' 
          }}>
            {formData.story.length}/500 字
            {formData.story.length > 500 && <span style={{ color: '#dc3545' }}> (超出字數限制)</span>}
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '10px',
          marginTop: '30px'
        }}>
          <button 
            type="submit"
            disabled={isSubmitting || formData.story.length > 500}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: (isSubmitting || formData.story.length > 500) ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: (isSubmitting || formData.story.length > 500) ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? '提交中...' : '✓ 提交見證'}
          </button>
          <button 
            type="button"
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
      </form>
      
      {/* 修改後的溫馨提醒 */}
      <div style={{ 
        marginTop: '20px', 
        padding: '15px',
        backgroundColor: '#fff3cd',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#856404',
        border: '1px solid #ffeaa7'
      }}>
        <strong>📢 重要聲明：</strong>
        <ul style={{ margin: '8px 0', paddingLeft: '20px', lineHeight: '1.5' }}>
          <li>您的分享為個人使用體驗，僅供其他用戶參考</li>
          <li>使用感受因個人體質及生活習慣不同而有差異</li>
          <li>本產品為食品，不具醫療效果，無法替代醫師診斷</li>
          <li>如有健康疑慮，請諮詢專業醫療人員</li>
        </ul>
      </div>
    </div>
  );
};

export default TestimonialForm;