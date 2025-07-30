import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const TestimonialForm = ({ selectedProduct, products, onSubmit, onCancel }) => {
  // 必須先調用所有的 useState Hook
  const [formData, setFormData] = useState({
    productIds: selectedProduct ? [selectedProduct.id] : [], // 改為陣列支援多選
    productNames: selectedProduct ? [selectedProduct.name] : [], // 對應的產品名稱陣列
    userName: '',
    namePrefix: '', // 新增：姓名前綴（如：我的夥伴、朋友等）
    isNamePublic: true,
    duration: '',
    story: '',
    system: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [warningWords, setWarningWords] = useState([]);
  const [productSearchTerm, setProductSearchTerm] = useState(''); // 產品搜尋功能

  // 權限檢查 Hook（在所有useState之後）
  const { checkPermission, getRoleDisplayName } = useAuth();
  
  // 權限檢查移到useState之後
  const hasPermission = checkPermission('submit_testimonial');
  
  // 如果沒有權限，返回權限不足提示（保持簡潔的UI風格）
  if (!hasPermission) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <div style={{ 
          textAlign: 'center', 
          padding: '50px 20px',
          backgroundColor: '#fff3cd',
          borderRadius: '8px',
          border: '1px solid #ffeaa7'
        }}>
          <h3 style={{ color: '#856404', marginBottom: '15px' }}>
            ⚠️ 權限不足
          </h3>
          <p style={{ color: '#856404', marginBottom: '20px' }}>
            您當前的身份（{getRoleDisplayName()}）沒有提交見證的權限
          </p>
          <button
            onClick={onCancel}
            style={{
              padding: '12px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  // 敏感詞彙檢測（擴展版，包含傳銷相關詞彙）
  const sensitiveWords = [
    '有效', '無效', '治療', '治好', '治癒', '療效', '藥效', '痊癒', '康復', 
    '根治', '徹底解決', '預防疾病', '診斷', '減輕症狀', '消除病症', 
    '醫療級', '臨床證實', '100%', '完全', '立即見效', '保證', '確保', 
    '永久', '終身',
    // 新增傳銷相關敏感詞
    '下線', '上線', '推薦獎金', '分潤', '佣金', '代理', '加盟',
    '拉人頭', '多層次', '傳銷', '直銷'
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

    // 檢查是否有敏感詞彙（加強版警告）
    const foundSensitiveWords = checkSensitiveWords(formData.story);
    if (foundSensitiveWords.length > 0) {
      const confirmSubmit = window.confirm(
        `⚠️ 內容審核提醒\n\n您的內容中包含以下詞彙：${foundSensitiveWords.join('、')}\n\n為符合法規要求，建議修改為個人體驗描述，例如：\n• "感受到身體有改善"\n• "使用後覺得比較舒服"\n• "個人覺得有幫助"\n\n您確定要繼續提交嗎？\n（提交後將由管理員進行內容審核）`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitting(true);

    try {
      const testimonial = {
        // id: Date.now(),
        ...formData,
        displayName: formData.namePrefix || (formData.isNamePublic ? formData.userName : '匿名用戶'),
        // 新增權限相關欄位
        submittedBy: getRoleDisplayName(), // 記錄提交者身份
        needsReview: foundSensitiveWords.length > 0, // 標記是否需要審核
        sensitiveWords: foundSensitiveWords, // 記錄檢測到的敏感詞
        isApproved: foundSensitiveWords.length === 0 // 無敏感詞彙的自動通過
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
      
      {/* 身份識別提醒（新增，但保持簡潔風格） */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '12px',
        backgroundColor: '#e8f4f8',
        border: '1px solid #bee5eb',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#0c5460'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
          👤 當前身份：{getRoleDisplayName()}
        </div>
        <div style={{ fontSize: '13px' }}>
          您的見證將記錄提交者身份，便於內容管理
        </div>
      </div>
      
      {/* 法規提醒區塊（保持原樣） */}
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
          <li>支援多種產品組合搭配的見證分享</li>
          <li><strong>含敏感詞彙的內容將進入審核流程</strong></li>
        </ul>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        
        {/* 產品多選區塊（保持原來的UI） */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>
            搭配產品組合 <span style={{ color: '#dc3545' }}>*</span>
            <span style={{ fontSize: '14px', color: '#666', fontWeight: 'normal' }}>
              （可選擇多個產品）
            </span>
          </label>
          
          {/* 產品搜尋 - 簡潔版 */}
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

          {/* 已選擇的產品顯示 - 簡潔版 */}
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
                  <span style={{ color: '#007bff', marginLeft: '8px' }}>（綜合搭配）</span>
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
          
          {/* 產品選擇清單 - 移除懸停效果版 */}
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
                        <span style={{ color: '#28a745', fontWeight: '500' }}>
                          {product.price}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <span style={{ color: '#28a745', fontSize: '18px' }}>✓</span>
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

        {/* 姓名輸入優化 - 根據分享類型調整（保持原UI） */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>分享者資訊 <span style={{ color: '#dc3545' }}>*</span></label>
          
          {/* 分享類型選擇 */}
          <div style={{ marginBottom: '10px' }}>
            <select
              value={formData.namePrefix}
              onChange={(e) => {
                setFormData({
                  ...formData, 
                  namePrefix: e.target.value,
                  userName: '' // 清空姓名，重新輸入
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

          {/* 只有本人分享才需要輸入姓名 */}
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

          {/* 其他分享類型的說明 */}
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
            <span>{formData.story.length}/1000 字</span>
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
            disabled={isSubmitting || formData.productIds.length === 0 || !formData.story || (formData.namePrefix === '' && !formData.userName)}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: (isSubmitting || formData.productIds.length === 0 || !formData.story || (formData.namePrefix === '' && !formData.userName)) ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: (isSubmitting || formData.productIds.length === 0 || !formData.story || (formData.namePrefix === '' && !formData.userName)) ? 'not-allowed' : 'pointer'
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
      
      {/* 更新後的法規聲明（保持原樣，只加了一行） */}
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
          <li>支援多種產品搭配使用的綜合見證分享</li>
          <li><strong>包含敏感詞彙的內容將由管理員審核後發布</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default TestimonialForm;