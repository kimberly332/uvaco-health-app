// TestimonialForm.js - Clean version without styling
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const TestimonialForm = ({ selectedProduct, products, onSubmit, onCancel }) => {
  // Must call all useState Hooks first
  const [formData, setFormData] = useState({
    productIds: selectedProduct ? [selectedProduct.id] : [], // Changed to array for multi-select support
    productNames: selectedProduct ? [selectedProduct.name] : [], // Corresponding product names array
    userName: '',
    namePrefix: '', // New: name prefix (like: my partner, friend, etc.)
    isNamePublic: true,
    duration: '',
    story: '',
    system: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [warningWords, setWarningWords] = useState([]);
  const [productSearchTerm, setProductSearchTerm] = useState(''); // Product search functionality

  // Permission check Hook (after all useState)
  const { checkPermission, getRoleDisplayName } = useAuth();
  
  // Permission check moved after useState
  const hasPermission = checkPermission('submit_testimonial');
  
  // If no permission, return insufficient permission prompt (maintain clean UI style)
  if (!hasPermission) {
    return (
      <div>
        <div>
          <h3>⚠️ 權限不足</h3>
          <p>您當前的身份（{getRoleDisplayName()}）沒有提交見證的權限</p>
          <button onClick={onCancel}>返回</button>
        </div>
      </div>
    );
  }

  // Sensitive word detection (expanded version, including MLM-related words)
  const sensitiveWords = [
    '有效', '無效', '治療', '治好', '治癒', '療效', '藥效', '痊癒',
    '醫治', '醫療', '藥物', '藥品', '處方', '診斷', '病症', '疾病',
    '療程', '康復', '根治', '特效', '神效', '立即見效',
    '下線', '上線', '團隊', '領導人', '組織', '系統', '獎金',
    '分潤', '佣金', '回饋', '獎勵', '推薦獎金', '業績', '等級',
    '升級', '晉升', '鑽石', '白金', '金級', '銀級', '銅級',
    '發大財', '致富', '財富自由', '被動收入', '躺著賺',
    '快速致富', '輕鬆賺錢', '一夜致富', '暴富', '賺大錢'
  ];

  // Filtered products (search functionality)
  const filteredProducts = products.filter(product =>
    !productSearchTerm || 
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    (product.series && product.series.toLowerCase().includes(productSearchTerm.toLowerCase()))
  );

  // Check for sensitive words
  const checkSensitiveWords = (text) => {
    if (!text) return [];
    const foundWords = sensitiveWords.filter(word => 
      text.toLowerCase().includes(word.toLowerCase())
    );
    return foundWords;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Real-time sensitive word check
    if (field === 'story') {
      const found = checkSensitiveWords(value);
      setWarningWords(found);
    }
  };

  const handleProductChange = (productId, isChecked) => {
    if (isChecked) {
      // Add product
      const product = products.find(p => p.id === productId);
      if (product) {
        setFormData(prev => ({
          ...prev,
          productIds: [...prev.productIds, productId],
          productNames: [...prev.productNames, product.name]
        }));
      }
    } else {
      // Remove product
      const productIndex = formData.productIds.indexOf(productId);
      if (productIndex > -1) {
        setFormData(prev => ({
          ...prev,
          productIds: prev.productIds.filter(id => id !== productId),
          productNames: prev.productNames.filter((_, index) => index !== productIndex)
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (formData.productIds.length === 0) {
      alert('請至少選擇一個產品');
      return;
    }
    
    if (!formData.userName.trim()) {
      alert('請填寫分享者姓名');
      return;
    }
    
    if (!formData.story.trim()) {
      alert('請填寫使用心得');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare submission data
      const submissionData = {
        ...formData,
        userName: formData.userName.trim(),
        displayName: formData.namePrefix ? 
          `${formData.namePrefix} ${formData.userName.trim()}` : 
          formData.userName.trim(),
        story: formData.story.trim(),
        hasSensitiveWords: warningWords.length > 0,
        sensitiveWords: warningWords,
        submittedAt: new Date(),
        status: warningWords.length > 0 ? 'pending' : 'approved'
      };

      await onSubmit(submissionData);
    } catch (error) {
      console.error('提交失敗：', error);
      alert('提交失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button onClick={onCancel}>← 返回</button>

      <div>
        <h2>✍️ 分享使用心得</h2>
        <p>分享您的真實使用體驗，幫助其他人了解產品效果</p>
      </div>

      {/* Form notice */}
      <div>
        <strong>📋 分享須知：</strong>
        <ul>
          <li>請分享真實的個人使用體驗</li>
          <li>避免使用醫療相關詞彙如「治療」、「療效」等詞彙</li>
          <li>支援多種產品組合搭配的見證分享</li>
          <li><strong>含敏感詞彙的內容將進入審核流程</strong></li>
        </ul>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          {/* Product multi-select block */}
          <div>
            <label>
              搭配產品組合 <span>*</span>
              <span>（可選擇多個產品）</span>
            </label>
            
            {/* Product search - clean version */}
            <div>
              <input
                type="text"
                placeholder="搜尋產品名稱或系列..."
                value={productSearchTerm}
                onChange={(e) => setProductSearchTerm(e.target.value)}
              />
              {productSearchTerm && (
                <div>找到 {filteredProducts.length} 個產品</div>
              )}
            </div>

            {/* Selected products display - clean version */}
            {formData.productIds.length > 0 && (
              <div>
                <div>已選擇 {formData.productIds.length} 個產品</div>
                <div>
                  {formData.productNames.map((name, index) => (
                    <span key={index}>{name}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Product selection list */}
            <div>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => {
                  const isSelected = formData.productIds.includes(product.id);
                  return (
                    <label key={product.id}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleProductChange(product.id, e.target.checked)}
                      />
                      <div>
                        <div>{product.name}</div>
                        <div>
                          <span>{product.series}</span>
                          <span>{product.price}</span>
                        </div>
                      </div>
                      {isSelected && <span>✓</span>}
                    </label>
                  );
                })
              ) : (
                <div>
                  {productSearchTerm ? 
                    '找不到符合條件的產品' : 
                    '沒有可用的產品'
                  }
                </div>
              )}
            </div>
          </div>

          {/* Name fields */}
          <div>
            <label>分享者姓名 <span>*</span></label>
            <div>
              <select
                value={formData.namePrefix}
                onChange={(e) => handleInputChange('namePrefix', e.target.value)}
              >
                <option value="">選擇稱謂（可選）</option>
                <option value="我的朋友">我的朋友</option>
                <option value="我的家人">我的家人</option>
                <option value="我的同事">我的同事</option>
                <option value="我的客戶">我的客戶</option>
                <option value="我認識的">我認識的</option>
              </select>
              <input
                type="text"
                placeholder="請輸入姓名"
                value={formData.userName}
                onChange={(e) => handleInputChange('userName', e.target.value)}
                required
              />
            </div>
            {formData.namePrefix && formData.userName && (
              <div>顯示為：{formData.namePrefix} {formData.userName}</div>
            )}
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={formData.isNamePublic}
                onChange={(e) => handleInputChange('isNamePublic', e.target.checked)}
              />
              公開顯示姓名（取消勾選將顯示為匿名）
            </label>
          </div>

          <div>
            <label>使用時間</label>
            <select
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
            >
              <option value="">選擇使用時間</option>
              <option value="1週內">1週內</option>
              <option value="2-4週">2-4週</option>
              <option value="1-2個月">1-2個月</option>
              <option value="3-6個月">3-6個月</option>
              <option value="6個月-1年">6個月-1年</option>
              <option value="1年以上">1年以上</option>
              <option value="長期使用">長期使用</option>
            </select>
          </div>

          <div>
            <label>體系（選填）</label>
            <input
              type="text"
              placeholder="如：健康管理、美容保養等"
              value={formData.system}
              onChange={(e) => handleInputChange('system', e.target.value)}
            />
          </div>

          <div>
            <label>使用心得 <span>*</span></label>
            <textarea
              placeholder="請分享您的真實使用體驗..."
              value={formData.story}
              onChange={(e) => handleInputChange('story', e.target.value)}
              required
              rows="6"
            />
            <div>
              已輸入 {formData.story.length} 字
              {formData.story.length < 10 && (
                <span>（建議至少10字）</span>
              )}
            </div>
          </div>

          {/* Sensitive word warning */}
          {warningWords.length > 0 && (
            <div>
              <div>⚠️ 內容審核提醒</div>
              <div>
                <p>您的內容包含敏感詞彙，將進入審核流程：</p>
                <div>
                  {warningWords.map((word, index) => (
                    <span key={index}>{word}</span>
                  ))}
                </div>
                <p>建議修改相關詞彙以符合平台規範</p>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting || formData.productIds.length === 0 || !formData.userName.trim() || !formData.story.trim()}
            >
              {isSubmitting ? '提交中...' : (warningWords.length > 0 ? '提交審核' : '立即分享')}
            </button>
            <button type="button" onClick={onCancel} disabled={isSubmitting}>
              取消
            </button>
          </div>
        </form>
      </div>

      {/* Form notice */}
      <div>
        <strong>📝 溫馨提醒：</strong>
        <ul>
          <li>所有分享內容僅供參考，效果因人而異</li>
          <li>請避免使用醫療相關詞彙，以免誤導他人</li>
          <li>我們保留審核和編輯分享內容的權利</li>
          <li>感謝您的真實分享，幫助更多人了解產品</li>
        </ul>
      </div>
    </div>
  );
};

export default TestimonialForm;