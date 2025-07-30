// LoginComponent.js - Clean version without styling
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
        // Login successful, pass user info to parent component
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
    <div>
      <div>
        {/* Logo area */}
        <div>
          <img 
            src="/logo.svg" 
            alt="Logo"
          />
          <h1>UVACO 健康專區</h1>
          <p>請輸入密碼以繼續使用</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin}>
          <div>
            <label>存取密碼</label>
            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="請輸入密碼"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div>❌ {error}</div>
          )}

          {/* Login button */}
          <button
            type="submit"
            disabled={isLoading || !password.trim()}
          >
            {isLoading ? '登入中...' : '登入'}
          </button>
        </form>

        {/* Role explanation */}
        <div>
          <div>
            <strong>🔐 三種身份等級：</strong>
          </div>
          <ul>
            <li><strong>會員：</strong>可查看產品和心得，可分享使用心得</li>
            <li><strong>管理員：</strong>具備會員權限，可管理心得審核</li>
            <li><strong>超級管理員：</strong>具備完整系統管理權限</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;