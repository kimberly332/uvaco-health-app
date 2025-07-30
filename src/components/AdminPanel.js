// src/components/AdminPanel.js - Clean version without styling
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getPasswordStatus, updateMemberPassword } from '../services/authService';
import { collection, doc, updateDoc, deleteDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

const AdminPanel = ({ onClose }) => {
  const { user, getRoleDisplayName, isSuperAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('testimonials');
  const [testimonials, setTestimonials] = useState([]);
  const [passwordStatus, setPasswordStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [newMemberPassword, setNewMemberPassword] = useState('');

  // Format Firebase timestamp
  const formatFirebaseTimestamp = (timestamp) => {
    if (!timestamp) return '未知時間';
    
    try {
      // If it's a Firebase Timestamp object
      if (timestamp && typeof timestamp === 'object' && timestamp.seconds) {
        const date = new Date(timestamp.seconds * 1000);
        return date.toISOString().split('T')[0];
      }
      
      // If it's a JavaScript Date object
      if (timestamp instanceof Date) {
        return timestamp.toISOString().split('T')[0];
      }
      
      // If it's a string, return directly
      if (typeof timestamp === 'string') {
        return timestamp;
      }
      
      return '未知時間';
    } catch (error) {
      console.error('時間格式化錯誤:', error);
      return '時間格式錯誤';
    }
  };

  // Load testimonial data
  useEffect(() => {
    const q = query(
      collection(db, 'testimonials'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        docs.push({ 
          id: doc.id, 
          ...data,
          // Ensure correct time format
          createdAt: formatFirebaseTimestamp(data.createdAt),
          lastModified: data.lastModified ? formatFirebaseTimestamp(data.lastModified) : undefined
        });
      });
      setTestimonials(docs);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Load password status (super admin only)
  useEffect(() => {
    if (isSuperAdmin()) {
      loadPasswordStatus();
    }
  }, []);

  const loadPasswordStatus = async () => {
    try {
      const status = await getPasswordStatus();
      setPasswordStatus(status);
    } catch (error) {
      console.error('加載密碼狀態失敗:', error);
    }
  };

  // Edit testimonial
  const handleEditTestimonial = async (testimonialId, newContent) => {
    try {
      await updateDoc(doc(db, 'testimonials', testimonialId), {
        story: newContent,
        lastModified: new Date().toISOString().split('T')[0], // Use string format
        modifiedBy: getRoleDisplayName()
      });
      setEditingTestimonial(null);
      alert('見證內容已更新');
    } catch (error) {
      console.error('更新見證失敗:', error);
      alert('更新失敗，請稍後再試');
    }
  };

  // Delete testimonial
  const handleDeleteTestimonial = async (testimonialId) => {
    if (!window.confirm('確定要刪除這則見證嗎？此操作無法復原。')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'testimonials', testimonialId));
      alert('見證已刪除');
    } catch (error) {
      console.error('刪除見證失敗:', error);
      alert('刪除失敗，請稍後再試');
    }
  };

  // Update member password
  const handleUpdateMemberPassword = async () => {
    if (!newMemberPassword.trim()) {
      alert('請輸入新密碼');
      return;
    }

    if (!window.confirm('確定要更新會員密碼嗎？所有會員需要使用新密碼登入。')) {
      return;
    }

    try {
      await updateMemberPassword(newMemberPassword.trim());
      setNewMemberPassword('');
      loadPasswordStatus();
      alert('會員密碼已更新');
    } catch (error) {
      console.error('更新密碼失敗:', error);
      alert('更新失敗，請稍後再試');
    }
  };

  // Detect sensitive content
  const checkSensitiveContent = (content) => {
    const sensitiveWords = [
      '治療', '療效', '有效', '治癒', '根治', '醫學', '疾病', '藥物', 
      '症狀', '病症', '診斷', '處方', '臨床', '醫院', '痊癒', '康復'
    ];
    
    const foundWords = sensitiveWords.filter(word => content.includes(word));
    return foundWords;
  };

  if (isLoading) {
    return (
      <div>
        <div>加載中...</div>
      </div>
    );
  }

  return (
    <div>
      <div>
        {/* Title bar */}
        <div>
          <div>
            <h2>🛡️ 管理員控制台</h2>
            <p>當前身份：{getRoleDisplayName()}</p>
          </div>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div>
          <button onClick={() => setActiveTab('testimonials')}>
            📝 見證管理 ({testimonials.length})
          </button>
          
          {isSuperAdmin() && (
            <button onClick={() => setActiveTab('passwords')}>
              🔐 密碼管理
            </button>
          )}
        </div>

        {/* Content area */}
        <div>
          {activeTab === 'testimonials' && (
            <div>
              <h3>見證內容管理</h3>
              
              {testimonials.length === 0 ? (
                <div>暫無見證內容</div>
              ) : (
                <div>
                  {testimonials.map(testimonial => {
                    const sensitiveWords = checkSensitiveContent(testimonial.story);
                    const hasSensitiveContent = sensitiveWords.length > 0;
                    
                    return (
                      <div key={testimonial.id}>
                        {/* Testimonial title info */}
                        <div>
                          <div>
                            <strong>{testimonial.displayName}</strong>
                            <span>{formatFirebaseTimestamp(testimonial.createdAt)}</span>
                            {testimonial.lastModified && (
                              <span>(已修改: {formatFirebaseTimestamp(testimonial.lastModified)})</span>
                            )}
                          </div>
                          
                          {hasSensitiveContent && (
                            <span>⚠️ 含敏感詞彙</span>
                          )}
                        </div>

                        {/* Product info */}
                        <div>
                          使用產品：{testimonial.productNames?.join('、') || '未指定'}
                        </div>

                        {/* Testimonial content */}
                        {editingTestimonial === testimonial.id ? (
                          <div>
                            <textarea
                              defaultValue={testimonial.story}
                              ref={(textarea) => {
                                if (textarea) {
                                  textarea.focus();
                                  textarea.setSelectionRange(textarea.value.length, textarea.value.length);
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.ctrlKey) {
                                  handleEditTestimonial(testimonial.id, e.target.value);
                                }
                                if (e.key === 'Escape') {
                                  setEditingTestimonial(null);
                                }
                              }}
                            />
                            <div>
                              <button
                                onClick={(e) => {
                                  const textarea = e.target.parentElement.previousElementSibling;
                                  handleEditTestimonial(testimonial.id, textarea.value);
                                }}
                              >
                                💾 保存 (Ctrl+Enter)
                              </button>
                              <button onClick={() => setEditingTestimonial(null)}>
                                ❌ 取消 (Esc)
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p>{testimonial.story}</p>
                            
                            {/* Sensitive word warning */}
                            {hasSensitiveContent && (
                              <div>
                                <strong>⚠️ 檢測到敏感詞彙：</strong>
                                <span>{sensitiveWords.join('、')}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Action buttons */}
                        <div>
                          <button
                            onClick={() => setEditingTestimonial(
                              editingTestimonial === testimonial.id ? null : testimonial.id
                            )}
                          >
                            ✏️ {editingTestimonial === testimonial.id ? '取消編輯' : '編輯'}
                          </button>
                          
                          <button onClick={() => handleDeleteTestimonial(testimonial.id)}>
                            🗑️ 刪除
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'passwords' && isSuperAdmin() && (
            <div>
              <h3>密碼管理</h3>
              
              {passwordStatus && (
                <div>
                  {/* Password status card */}
                  <div>
                    <h4>📊 密碼狀態</h4>
                    <div>
                      <div>
                        <strong>當前會員密碼：</strong>
                        <div>{passwordStatus.currentPassword}</div>
                      </div>
                      <div>
                        <strong>下期密碼：</strong>
                        <div>{passwordStatus.nextPassword}</div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <strong>下次更新日期：</strong> {passwordStatus.nextUpdateDate}
                      </div>
                      <div>
                        <strong>剩餘天數：</strong> {passwordStatus.daysUntilExpiry} 天
                        {passwordStatus.isExpiringSoon && ' ⚠️ 即將到期'}
                      </div>
                    </div>
                  </div>

                  {/* Manual password update */}
                  <div>
                    <h4>🔄 手動更新會員密碼</h4>
                    <div>
                      <div>
                        <label>新密碼</label>
                        <input
                          type="text"
                          value={newMemberPassword}
                          onChange={(e) => setNewMemberPassword(e.target.value)}
                          placeholder="例如：UV2025M08B"
                        />
                      </div>
                      <button
                        onClick={handleUpdateMemberPassword}
                        disabled={!newMemberPassword.trim()}
                      >
                        🔄 更新密碼
                      </button>
                    </div>
                    <p>⚠️ 更新後所有會員需使用新密碼登入</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;