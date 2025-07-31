// components/TestimonialEditForm.js
import React, { useState, useEffect } from 'react';

const TestimonialEditForm = ({ testimonial, products, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    productIds: [],
    productNames: [],
    userName: '',
    namePrefix: '',
    isNamePublic: true,
    duration: '',
    story: '',
    system: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [warningWords, setWarningWords] = useState([]);
  const [productSearchTerm, setProductSearchTerm] = useState('');

  // 敏感詞彙檢測
  const sensitiveWords = [
    '有效', '無效', '治療', '治好', '治癒', '療效', '藥效', '痊癒', '康復', 
    '根治', '徹底解決', '預防疾病', '診斷', '減輕症狀', '消除病症', 
    '醫療級', '臨床證實', '100%', '完全', '立即見效', '保證', '確保', 
    '永久', '終身'
  ];

  // 常用的姓名前綴選項
  const namePrefixOptions = [
    { value: '', label: '本人分享' },
    { value: '我的夥伴', label: '我的夥伴' },
    { value: '我的朋友', label: '我的朋友' },
    { value: '我的家人', label: '我的家人' },
    { value: '我的客戶', label: '我的客戶' },
    { value: '我的同事', label: '我的同事' },
    { value: '長輩', label: '長輩' },
    { value: '朋友的朋友', label: '朋友的朋友' }
  ];

  // 初始化表單資料
  useEffect(() => {
    if (testimonial) {
      // 解析顯示名稱
      let namePrefix = '';
      let userName = '';
      
      if (testimonial.displayName) {
        const prefixOptions = namePrefixOptions.map(opt => opt.value).filter(val => val !== '');
        const foundPrefix = prefixOptions.find(prefix => testimonial.displayName.startsWith(prefix));
        
        if (foundPrefix) {
          namePrefix = foundPrefix;
          userName = testimonial.displayName.replace(foundPrefix, '').trim();
        } else {
          userName = testimonial.displayName;
        }
      } else {
        userName = testimonial.userName || '';
      }

      setFormData({
        productIds: testimonial.productIds || (testimonial.productId ? [testimonial.productId] : []),
        productNames: testimonial.productNames || (testimonial.productName ? [testimonial.productName] : []),
        userName: userName,
        namePrefix: namePrefix,
        isNamePublic: testimonial.isNamePublic !== false,
        duration: testimonial.duration || '',
        story: testimonial.story || '',
        system: testimonial.system || ''
      });
    }
  }, [testimonial]);

  // 過濾產品（根據搜尋詞）
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    product.series.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

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

  // 處理產品多選
  const handleProductChange = (productId, isChecked) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (isChecked) {
      // 添加產品
      setFormData({
        ...formData,
        productIds: [...formData.productIds, productId],
        productNames: [...formData.productNames, product.name]
      });
    } else {
      // 移除產品
      const index = formData.productIds.indexOf(productId);
      if (index > -1) {
        const newProductIds = [...formData.productIds];
        const newProductNames = [...formData.productNames];
        newProductIds.splice(index, 1);
        newProductNames.splice(index, 1);
        setFormData({
          ...formData,
          productIds: newProductIds,
          productNames: newProductNames
        });
      }
    }
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
    // 基本必填驗證
    if (formData.productIds.length === 0) {
      alert('請至少選擇一個產品');
      return;
    }

    if (!formData.story) {
      alert('請填寫使用心得');
      return;
    }

    // 本人分享時需要姓名
    if (formData.namePrefix === '' && !formData.userName) {
      alert('本人分享時請填寫姓名');
      return;
    }

    if (formData.story.length > 1000) {
      alert('使用心得不能超過1000字');
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
      const updatedTestimonial = {
        ...formData,
        displayName: formData.namePrefix || (formData.isNamePublic ? formData.userName : '匿名用戶'),
      };
      
      await onSubmit(testimonial.id, updatedTestimonial);
    } catch (error) {
      console.error('更新見證時發生錯誤:', error);
      alert('更新失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        ✏️ 編輯使用心得
      </h2>
      
      {/* 編輯提醒區塊 */}
      <div style={{ 
        marginBottom: '25px', 
        padding: '15px',
        backgroundColor: '#e3f2fd',
        border: '1px solid #bbdefb',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#1565c0'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
          ✏️ 編輯模式
        </div>
        <ul style={{ margin: '5px 0', paddingLeft: '20px', lineHeight: '1.5' }}>
          <li>您正在編輯現有的使用心得</li>
          <li>請確認資料的準確性</li>
          <li>編輯後將顯示「已編輯」標記</li>
          <li>請繼續避免使用醫療功效相關詞彙</li>
        </ul>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        
        {/* 產品多選區塊 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>
            搭配產品組合 <span style={{ color: '#dc3545' }}>*</span>
          </label>
          
          {/* 產品搜尋 */}
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="搜尋產品名稱或系列..."
              value={productSearchTerm}
              onChange={(e) => setProductSearchTerm(e.target.value)}
              style={{
                ...inputStyle,
                borderColor: '#ddd',
                backgroundColor: '#fff'
              }}
            />
            {productSearchTerm && (
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                找到 {filteredProducts.length} 個產品
              </div>
            )}
          </div>

          {/* 已選擇的產品顯示 */}
          {formData.productIds.length > 0 && (
            <div style={{ 
              marginBottom: '20px',
              padding: '12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              border: '1px solid #dee2e6'
            }}>
              <div style={{ 
                fontSize: '14px', 
                color: '#666', 
                marginBottom: '8px',
                fontWeight: '500'
              }}>
                已選擇 {formData.productIds.length} 個產品
                {formData.productIds.length > 1 && (
                  <span style={{ color: '#8fbc8f', marginLeft: '8px' }}>（綜合搭配）</span>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {formData.productNames.map((name, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: '#e8f5e8',
                      color: '#2e7d32',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      border: '1px solid #c8e6c9'
                    }}
                  >
                    {name}
                    <button
                      onClick={() => handleProductChange(formData.productIds[index], false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '0',
                        marginLeft: '2px'
                      }}
                      title="移除"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* 產品選擇清單 */}
          <div style={{ 
            maxHeight: '300px', 
            overflowY: 'auto', 
            border: '1px solid #ddd', 
            borderRadius: '6px',
            backgroundColor: 'white'
          }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => {
                const isSelected = formData.productIds.includes(product.id);
                return (
                  <label
                    key={product.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px',
                      borderBottom: '1px solid #f0f0f0',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#f8f9fa' : 'white'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleProductChange(product.id, e.target.checked)}
                      style={{ 
                        marginRight: '12px',
                        transform: 'scale(1.2)'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontWeight: '500', 
                        color: '#333',
                        fontSize: '15px',
                        marginBottom: '3px'
                      }}>
                        {product.name}
                      </div>
                      <div style={{ 
                        fontSize: '13px', 
                        color: '#666',
                        display: 'flex',
                        gap: '12px'
                      }}>
                        <span>{product.series}</span>
                        <span style={{ color: '#a8956f', fontWeight: '500' }}>
                          {product.price}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <span style={{ color: '#a8956f', fontSize: '18px' }}>✓</span>
                    )}
                  </label>
                );
              })
            ) : (
              <div style={{ 
                padding: '30px 20px', 
                textAlign: 'center', 
                color: '#666'
              }}>
                {productSearchTerm ? '找不到符合條件的產品' : '暫無產品'}
              </div>
            )}
          </div>
        </div>

        {/* 姓名輸入 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>分享者資訊 <span style={{ color: '#dc3545' }}>*</span></label>
          
          <div style={{ marginBottom: '10px' }}>
            <select
              value={formData.namePrefix}
              onChange={(e) => {
                setFormData({
                  ...formData, 
                  namePrefix: e.target.value,
                  userName: e.target.value === '' ? formData.userName : ''
                });
              }}
              style={{
                ...inputStyle,
                marginBottom: '8px'
              }}
            >
              {namePrefixOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {formData.namePrefix === '' && (
            <div>
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
          )}

          {formData.namePrefix !== '' && (
            <div style={{ 
              padding: '12px', 
              backgroundColor: '#e8f4f8', 
              borderRadius: '6px',
              fontSize: '14px',
              color: '#555'
            }}>
              <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                顯示名稱：{formData.namePrefix}
              </div>
              <div style={{ fontSize: '13px', color: '#666' }}>
                代替他人分享時無需填寫具體姓名
              </div>
            </div>
          )}
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>使用時間</label>
          <input 
            type="text"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            placeholder="例：3個月、半年、1年、持續使用中（可選填）"
            style={inputStyle}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>使用心得 <span style={{ color: '#dc3545' }}>*</span></label>
          <textarea 
            value={formData.story}
            onChange={handleStoryChange}
            placeholder="請詳細分享您的使用體驗..."
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
            <span>{formData.story.length}/1000 字</span>
            {warningWords.length > 0 && (
              <span style={{ color: '#e67e22' }}>
                ⚠️ 建議避免使用：{warningWords.join('、')}
              </span>
            )}
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '10px',
          marginTop: '30px'
        }}>
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
            取消編輯
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialEditForm;