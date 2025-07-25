import React, { useState } from 'react';

const TestimonialForm = ({ selectedProduct, products, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    productId: selectedProduct?.id || '',
    productName: selectedProduct?.name || '',
    userName: '',
    isNamePublic: true,
    duration: '',
    story: '',
    system: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [warningWords, setWarningWords] = useState([]);

  // 敏感詞彙檢測
  const sensitiveWords = [
    '有效', '無效', '治療', '治好', '治癒', '療效', '藥效', '痊癒', '康復', 
    '根治', '徹底解決', '預防疾病', '診斷', '減輕症狀', '消除病症', 
    '醫療級', '臨床證實', '100%', '完全', '立即見效', '保證', '確保', 
    '永久', '終身'
  ];

  // 檢測文字中的敏感詞彙
  const checkSensitiveWords = (text) => {
    const foundWords = sensitiveWords.filter(word => text.includes(word));
    setWarningWords(foundWords);
    return foundWords;
  };

  const handleStoryChange = (e) => {
    const newStory = e.target.value;
    setFormData({...formData, story: newStory});
    checkSensitiveWords(newStory);
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#333'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    boxSizing: 'border-box',
    outline: 'none'
  };

  const handleSubmit = async () => {
    if (!formData.productId || !formData.userName || !formData.story || !formData.duration) {
      alert('請填寫所有必填欄位');
      return;
    }

    if (formData.story.length > 500) {
      alert('使用心得不能超過500字');
      return;
    }

    // 檢查是否有敏感詞彙
    const foundSensitiveWords = checkSensitiveWords(formData.story);
    if (foundSensitiveWords.length > 0) {
      const confirmSubmit = window.confirm(
        `您的內容中包含以下詞彙：${foundSensitiveWords.join('、')}\n\n為避免法規問題，建議修改為個人體驗描述。\n\n您確定要繼續提交嗎？`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitting(true);

    try {
      const testimonial = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      await onSubmit(testimonial);
    } catch (error) {
      console.error('提交見證時發生錯誤:', error);
      alert('提交失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        分享使用心得
      </h2>
      
      {/* 法規提醒區塊 */}
      <div style={{ 
        marginBottom: '25px', 
        padding: '15px',
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#856404'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
          ⚠️ 重要提醒
        </div>
        <ul style={{ margin: '5px 0', paddingLeft: '20px', lineHeight: '1.5' }}>
          <li>請分享您的個人使用體驗和感受</li>
          <li>請避免使用醫療功效相關詞彙（如：有效、治療、療效等）</li>
          <li>建議使用「個人感受」、「使用體驗」、「有改善」等詞彙</li>
          <li>您的分享將幫助其他使用者了解產品體驗</li>
        </ul>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>選擇產品 <span style={{ color: '#dc3545' }}>*</span></label>
          <select 
            value={formData.productId}
            onChange={(e) => {
              const selectedProd = products.find(p => p.id === parseInt(e.target.value));
              setFormData({
                ...formData, 
                productId: e.target.value,
                productName: selectedProd ? selectedProd.name : ''
              });
            }}
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
          <div style={{ marginTop: '8px' }}>
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
            onChange={handleStoryChange}
            placeholder="請詳細分享您的使用體驗，包括使用前後的感受變化等...（請避免使用醫療功效詞彙）"
            rows="6"
            style={{
              ...inputStyle,
              resize: 'vertical',
              minHeight: '120px',
              borderColor: warningWords.length > 0 ? '#ffc107' : '#ddd'
            }}
          />
          <div style={{ 
            fontSize: '12px', 
            color: '#666', 
            marginTop: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{formData.story.length}/500 字</span>
            {warningWords.length > 0 && (
              <span style={{ color: '#e67e22' }}>
                ⚠️ 建議避免使用：{warningWords.join('、')}
              </span>
            )}
          </div>
          
          {/* 詞彙建議 */}
          {warningWords.length > 0 && (
            <div style={{ 
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#fff3cd',
              borderRadius: '4px',
              fontSize: '13px',
              color: '#856404'
            }}>
              <strong>建議替代詞彙：</strong><br/>
              • 「有效」→「有改善」、「感受到變化」<br/>
              • 「治療」→「使用後感覺」、「個人體驗」<br/>
              • 「療效」→「使用心得」、「個人感受」
            </div>
          )}
        </div>
        
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
            {isSubmitting ? '提交中...' : '✓ 提交心得分享'}
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
      
      {/* 更新後的法規聲明 */}
      <div style={{ 
        marginTop: '20px', 
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        fontSize: '13px',
        color: '#666',
        lineHeight: '1.5'
      }}>
        <strong>法規聲明：</strong>
        <ul style={{ margin: '8px 0', paddingLeft: '18px' }}>
          <li>以上為個人使用體驗分享，不代表產品功效</li>
          <li>每個人使用感受可能不同，實際效果因人而異</li>
          <li>本產品不具醫療功效，不可取代正規醫療</li>
          <li>如有健康疑慮，請諮詢專業醫師</li>
          <li>如不希望公開姓名，可選擇匿名分享</li>
        </ul>
      </div>
    </div>
  );
};

export default TestimonialForm;