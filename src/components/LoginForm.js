// src/components/LoginForm.js
import React, { useState, useEffect } from 'react';
import { validatePassword, checkPasswordExpiry } from '../services/passwordConfig';

const LoginForm = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [expiryInfo, setExpiryInfo] = useState(null);

  useEffect(() => {
    // 檢查密碼過期情況
    const checkExpiry = async () => {
      try {
        const expiry = await checkPasswordExpiry();
        setExpiryInfo(expiry);
      } catch (error) {
        console.error('Error checking expiry:', error);
      }
    };
    
    checkExpiry();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('請輸入密碼');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await validatePassword(password);
      
      if (result.isValid) {
        // 登入成功
        onLogin({
          role: result.role,
          permissions: result.permissions,
          expiryDate: result.expiryDate
        });
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('登入時發生錯誤，請稍後再試');
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    padding: '20px'
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e9ecef',
    borderRadius: '8px',
    fontSize: '16px',
    marginBottom: '16px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#8fbc8f',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    opacity: isLoading ? 0.7 : 1,
    transition: 'all 0.3s ease'
  };

  const errorStyle = {
    color: '#dc3545',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    borderRadius: '6px',
    padding: '12px',
    marginBottom: '16px',
    fontSize: '14px'
  };

  const warningStyle = {
    color: '#856404',
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '6px',
    padding: '12px',
    marginBottom: '16px',
    fontSize: '14px'
  };

  const infoStyle = {
    color: '#0c5460',
    backgroundColor: '#d1ecf1',
    border: '1px solid #bee5eb',
    borderRadius: '6px',
    padding: '12px',
    marginBottom: '16px',
    fontSize: '14px'
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        {/* Logo 區域 */}
        <div style={{ marginBottom: '30px' }}>
          <img 
            src="/logo.svg" 
            alt="UVACO" 
            style={{ height: '60px', marginBottom: '16px' }}
          />
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: '700', 
            color: '#333',
            marginBottom: '8px'
          }}>
            UVACO 健康科技
          </h1>
          <p style={{ 
            color: '#666', 
            fontSize: '14px',
            margin: '0'
          }}>
            會員專屬使用
          </p>
        </div>

        {/* 密碼過期提醒 */}
        {expiryInfo && expiryInfo.isExpiringSoon && (
          <div style={warningStyle}>
            <strong>⚠️ 密碼即將過期</strong>
            <div style={{ marginTop: '4px' }}>
              還有 {expiryInfo.daysUntilExpiry} 天過期
              {expiryInfo.nextPassword && (
                <div style={{ fontSize: '12px', marginTop: '4px' }}>
                  新密碼：{expiryInfo.nextPassword}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 使用說明 */}
        <div style={infoStyle}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            💡 密碼說明
          </div>
          <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
            • 一般會員：每月更新密碼<br/>
            • 管理員：固定密碼，可編輯內容<br/>
            • 請妥善保管密碼，避免外流
          </div>
        </div>

        {/* 錯誤訊息 */}
        {error && (
          <div style={errorStyle}>
            {error}
          </div>
        )}

        {/* 密碼輸入 */}
        <input
          type="password"
          placeholder="請輸入存取密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            ...inputStyle,
            borderColor: error ? '#dc3545' : '#e9ecef'
          }}
          onFocus={(e) => e.target.style.borderColor = '#8fbc8f'}
          onBlur={(e) => e.target.style.borderColor = error ? '#dc3545' : '#e9ecef'}
        />

        {/* 登入按鈕 */}
        <button
          type="submit"
          disabled={isLoading}
          style={buttonStyle}
          onMouseOver={(e) => {
            if (!isLoading) {
              e.target.style.backgroundColor = '#7ba57b';
            }
          }}
          onMouseOut={(e) => {
            if (!isLoading) {
              e.target.style.backgroundColor = '#8fbc8f';
            }
          }}
        >
          {isLoading ? '驗證中...' : '進入應用'}
        </button>

        {/* 底部說明 */}
        <div style={{
          marginTop: '20px',
          fontSize: '12px',
          color: '#666',
          lineHeight: '1.4'
        }}>
          <div style={{ marginBottom: '4px' }}>
            🔒 此為內部會員專用系統
          </div>
          <div>
            如需協助，請聯繫管理員
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;