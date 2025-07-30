// src/components/LoginComponent.js
import React, { useState } from 'react';
import { authenticateUser, USER_ROLES } from '../services/authService';

const LoginComponent = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('請輸入密碼');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await authenticateUser(password.trim());
      
      if (result.success) {
        // 登入成功，傳遞用戶信息給父組件
        onLoginSuccess({
          role: result.role,
          message: result.message
        });
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('登入過程發生錯誤，請稍後再試');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case USER_ROLES.MEMBER: return '會員';
      case USER_ROLES.ADMIN: return '管理員';
      case USER_ROLES.SUPER_ADMIN: return '超級管理員';
      default: return '訪客';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        {/* Logo區域 */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img 
            src="/logo.svg" 
            alt="Logo" 
            style={{ height: '60px', marginBottom: '15px' }}
          />
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#333',
            margin: '0 0 8px 0'
          }}>
            UVACO 健康專區
          </h1>
          <p style={{ 
            color: '#666', 
            fontSize: '14px',
            margin: 0 
          }}>
            請輸入密碼以繼續使用
          </p>
        </div>

        {/* 登入表單 */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600',
              color: '#333' 
            }}>
              存取密碼
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="請輸入密碼"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px 45px 12px 15px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                  backgroundColor: isLoading ? '#f8f9fa' : 'white',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: '#666'
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* 錯誤訊息 */}
          {error && (
            <div style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '12px',
              borderRadius: '6px',
              marginBottom: '20px',
              fontSize: '14px',
              border: '1px solid #f5c6cb'
            }}>
              ❌ {error}
            </div>
          )}

          {/* 登入按鈕 */}
          <button
            type="submit"
            disabled={isLoading || !password.trim()}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: (isLoading || !password.trim()) ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: (isLoading || !password.trim()) ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            {isLoading ? '驗證中...' : '🔐 進入系統'}
          </button>
        </form>

        {/* 說明文字 */}
        <div style={{
          marginTop: '30px',
          padding: '15px',
          backgroundColor: '#e8f4f8',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#5a6c7d'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '8px' }}>
            📋 權限說明
          </div>
          <div style={{ lineHeight: '1.5' }}>
            • <strong>會員密碼</strong>：每月更新，可瀏覽產品和見證<br/>
            • <strong>管理員密碼</strong>：可編輯/刪除見證內容<br/>
            • <strong>超級管理員</strong>：完整系統管理權限
          </div>
        </div>

        {/* 聯絡資訊 */}
        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '12px',
          color: '#999'
        }}>
          如需協助請聯絡系統管理員
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;