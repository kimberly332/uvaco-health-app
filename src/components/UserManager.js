// src/components/UserManager.js - 簡單的用戶管理
import React, { useState, useEffect } from 'react';

const UserManager = ({ onUserChange, currentUser }) => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // 從 localStorage 讀取用戶名
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      onUserChange(savedUser);
    }
  }, [onUserChange]);

  const handleLogin = () => {
    if (!userName.trim()) {
      alert('請輸入您的姓名');
      return;
    }
    
    // 儲存到 localStorage
    localStorage.setItem('currentUser', userName.trim());
    onUserChange(userName.trim());
    setShowUserForm(false);
    setUserName('');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    onUserChange(null);
  };

  if (!currentUser) {
    return (
      <div style={{
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        margin: '10px 0',
        textAlign: 'center'
      }}>
        {!showUserForm ? (
          <div>
            <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
              請登錄以管理您的見證
            </p>
            <button
              onClick={() => setShowUserForm(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#a8956f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              登錄
            </button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="請輸入您的姓名"
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginRight: '8px',
                fontSize: '14px'
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              onClick={handleLogin}
              style={{
                padding: '8px 12px',
                backgroundColor: '#a8956f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '8px'
              }}
            >
              確認
            </button>
            <button
              onClick={() => setShowUserForm(false)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              取消
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{
      padding: '10px',
      backgroundColor: '#e8f5e8',
      borderRadius: '6px',
      margin: '10px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span style={{ fontSize: '14px', color: '#155724' }}>
        👤 歡迎，{currentUser}
      </span>
      <button
        onClick={handleLogout}
        style={{
          padding: '4px 8px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        登出
      </button>
    </div>
  );
};

export default UserManager;