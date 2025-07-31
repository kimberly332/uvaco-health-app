// src/components/AdminPanel.js
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

  // 格式化Firebase時間戳記
  const formatFirebaseTimestamp = (timestamp) => {
    if (!timestamp) return '未知時間';
    
    try {
      // 如果是Firebase Timestamp物件
      if (timestamp && typeof timestamp === 'object' && timestamp.seconds) {
        const date = new Date(timestamp.seconds * 1000);
        return date.toISOString().split('T')[0];
      }
      
      // 如果是JavaScript Date物件
      if (timestamp instanceof Date) {
        return timestamp.toISOString().split('T')[0];
      }
      
      // 如果是字串，直接返回
      if (typeof timestamp === 'string') {
        return timestamp;
      }
      
      return '未知時間';
    } catch (error) {
      console.error('時間格式化錯誤:', error);
      return '時間格式錯誤';
    }
  };

  // 加載見證數據
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
          // 確保時間格式正確
          createdAt: formatFirebaseTimestamp(data.createdAt),
          lastModified: data.lastModified ? formatFirebaseTimestamp(data.lastModified) : undefined
        });
      });
      setTestimonials(docs);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 加載密碼狀態（僅超級管理員）
  useEffect(() => {
    if (isSuperAdmin) {
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

  // 編輯見證
  const handleEditTestimonial = async (testimonialId, newContent) => {
    try {
      await updateDoc(doc(db, 'testimonials', testimonialId), {
        story: newContent,
        lastModified: new Date().toISOString().split('T')[0], // 使用字串格式
        modifiedBy: getRoleDisplayName()
      });
      setEditingTestimonial(null);
      alert('見證內容已更新');
    } catch (error) {
      console.error('更新見證失敗:', error);
      alert('更新失敗，請稍後再試');
    }
  };

  // 刪除見證
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

  // 更新會員密碼
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

  // 檢測敏感內容
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
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div>加載中...</div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '1000px',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* 標題列 */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f8f9fa'
        }}>
          <div>
            <h2 style={{ margin: 0, color: '#333' }}>🛡️ 管理員控制台</h2>
            <p style={{ margin: '5px 0 0', color: '#666', fontSize: '14px' }}>
              當前身份：{getRoleDisplayName()}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#999'
            }}
          >
            ✕
          </button>
        </div>

        {/* 標籤頁 */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #eee',
          backgroundColor: '#fff'
        }}>
          <button
            onClick={() => setActiveTab('testimonials')}
            style={{
              padding: '15px 20px',
              border: 'none',
              backgroundColor: activeTab === 'testimonials' ? '#007bff' : 'transparent',
              color: activeTab === 'testimonials' ? 'white' : '#666',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            📝 見證管理 ({testimonials.length})
          </button>
          
          {isSuperAdmin && (
            <button
              onClick={() => setActiveTab('passwords')}
              style={{
                padding: '15px 20px',
                border: 'none',
                backgroundColor: activeTab === 'passwords' ? '#007bff' : 'transparent',
                color: activeTab === 'passwords' ? 'white' : '#666',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              🔐 密碼管理
            </button>
          )}
        </div>

        {/* 內容區域 */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '20px'
        }}>
          {activeTab === 'testimonials' && (
            <div>
              <h3 style={{ marginBottom: '20px' }}>見證內容管理</h3>
              
              {testimonials.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
                  暫無見證內容
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {testimonials.map(testimonial => {
                    const sensitiveWords = checkSensitiveContent(testimonial.story);
                    const hasSensitiveContent = sensitiveWords.length > 0;
                    
                    return (
                      <div
                        key={testimonial.id}
                        style={{
                          border: `2px solid ${hasSensitiveContent ? '#ff6b6b' : '#e9ecef'}`,
                          borderRadius: '8px',
                          padding: '15px',
                          backgroundColor: hasSensitiveContent ? '#fff5f5' : 'white'
                        }}
                      >
                        {/* 見證標題信息 */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '10px'
                        }}>
                          <div>
                            <strong>{testimonial.displayName}</strong>
                            <span style={{ color: '#666', fontSize: '12px', marginLeft: '10px' }}>
                              {formatFirebaseTimestamp(testimonial.createdAt)}
                            </span>
                            {testimonial.lastModified && (
                              <span style={{ color: '#999', fontSize: '11px', marginLeft: '10px' }}>
                                (已修改: {formatFirebaseTimestamp(testimonial.lastModified)})
                              </span>
                            )}
                          </div>
                          
                          {hasSensitiveContent && (
                            <span style={{
                              backgroundColor: '#ff6b6b',
                              color: 'white',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '12px'
                            }}>
                              ⚠️ 含敏感詞彙
                            </span>
                          )}
                        </div>

                        {/* 產品信息 */}
                        <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
                          使用產品：{testimonial.productNames?.join('、') || '未指定'}
                        </div>

                        {/* 見證內容 */}
                        {editingTestimonial === testimonial.id ? (
                          <div>
                            <textarea
                              defaultValue={testimonial.story}
                              style={{
                                width: '100%',
                                minHeight: '100px',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                resize: 'vertical'
                              }}
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
                            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                              <button
                                onClick={(e) => {
                                  const textarea = e.target.parentElement.previousElementSibling;
                                  handleEditTestimonial(testimonial.id, textarea.value);
                                }}
                                style={{
                                  padding: '5px 15px',
                                  backgroundColor: '#28a745',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '12px'
                                }}
                              >
                                💾 保存 (Ctrl+Enter)
                              </button>
                              <button
                                onClick={() => setEditingTestimonial(null)}
                                style={{
                                  padding: '5px 15px',
                                  backgroundColor: '#6c757d',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '12px'
                                }}
                              >
                                ❌ 取消 (Esc)
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p style={{ 
                              margin: '10px 0',
                              lineHeight: '1.5',
                              backgroundColor: '#f8f9fa',
                              padding: '10px',
                              borderRadius: '4px'
                            }}>
                              {testimonial.story}
                            </p>
                            
                            {/* 敏感詞彙警告 */}
                            {hasSensitiveContent && (
                              <div style={{
                                backgroundColor: '#fff3cd',
                                border: '1px solid #ffeaa7',
                                borderRadius: '4px',
                                padding: '8px',
                                marginBottom: '10px',
                                fontSize: '12px'
                              }}>
                                <strong>⚠️ 檢測到敏感詞彙：</strong>
                                <span style={{ color: '#d63384' }}>
                                  {sensitiveWords.join('、')}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* 操作按鈕 */}
                        <div style={{
                          display: 'flex',
                          gap: '10px',
                          marginTop: '15px',
                          paddingTop: '10px',
                          borderTop: '1px solid #eee'
                        }}>
                          <button
                            onClick={() => setEditingTestimonial(
                              editingTestimonial === testimonial.id ? null : testimonial.id
                            )}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#007bff',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            ✏️ {editingTestimonial === testimonial.id ? '取消編輯' : '編輯'}
                          </button>
                          
                          <button
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
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

          {activeTab === 'passwords' && isSuperAdmin && (
            <div>
              <h3 style={{ marginBottom: '20px' }}>密碼管理</h3>
              
              {passwordStatus && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* 密碼狀態卡片 */}
                  <div style={{
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: passwordStatus.isExpiringSoon ? '#fff3cd' : '#f8f9fa'
                  }}>
                    <h4 style={{ margin: '0 0 15px', color: '#333' }}>
                      📊 密碼狀態
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <div>
                        <strong>當前會員密碼：</strong>
                        <div style={{ 
                          fontFamily: 'monospace', 
                          backgroundColor: 'white', 
                          padding: '8px', 
                          borderRadius: '4px',
                          border: '1px solid #ddd',
                          marginTop: '5px'
                        }}>
                          {passwordStatus.currentPassword}
                        </div>
                      </div>
                      <div>
                        <strong>下期密碼：</strong>
                        <div style={{ 
                          fontFamily: 'monospace', 
                          backgroundColor: 'white', 
                          padding: '8px', 
                          borderRadius: '4px',
                          border: '1px solid #ddd',
                          marginTop: '5px'
                        }}>
                          {passwordStatus.nextPassword}
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: '15px' }}>
                      <div>
                        <strong>下次更新日期：</strong> {passwordStatus.nextUpdateDate}
                      </div>
                      <div style={{ 
                        color: passwordStatus.isExpiringSoon ? '#d63384' : '#28a745',
                        fontWeight: '500'
                      }}>
                        <strong>剩餘天數：</strong> {passwordStatus.daysUntilExpiry} 天
                        {passwordStatus.isExpiringSoon && ' ⚠️ 即將到期'}
                      </div>
                    </div>
                  </div>

                  {/* 手動更新密碼 */}
                  <div style={{
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: 'white'
                  }}>
                    <h4 style={{ margin: '0 0 15px', color: '#333' }}>
                      🔄 手動更新會員密碼
                    </h4>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'end' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                          新密碼
                        </label>
                        <input
                          type="text"
                          value={newMemberPassword}
                          onChange={(e) => setNewMemberPassword(e.target.value)}
                          placeholder="例如：UV2025M08B"
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontFamily: 'monospace'
                          }}
                        />
                      </div>
                      <button
                        onClick={handleUpdateMemberPassword}
                        disabled={!newMemberPassword.trim()}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: newMemberPassword.trim() ? '#28a745' : '#ccc',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: newMemberPassword.trim() ? 'pointer' : 'not-allowed',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        🔄 更新密碼
                      </button>
                    </div>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#666', 
                      margin: '10px 0 0',
                      lineHeight: '1.4'
                    }}>
                      ⚠️ 更新後所有會員需使用新密碼登入
                    </p>
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