// src/hooks/useAuth.js - 修復版本，改善登入跳轉處理
import { useState, useEffect, createContext, useContext } from 'react';
import { USER_ROLES, hasPermission } from '../services/authService';

// 創建認證上下文
const AuthContext = createContext();

// 用戶狀態管理Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth 必須在 AuthProvider 內使用');
  }
  return context;
};

// 認證提供者組件
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化時檢查本地存儲的認證狀態
  useEffect(() => {
    const checkAuthStatus = () => {
      const savedAuth = localStorage.getItem('uvaco_auth');
      if (savedAuth) {
        try {
          const authData = JSON.parse(savedAuth);
          // 檢查認證是否過期（24小時）
          const loginTime = new Date(authData.loginTime);
          const now = new Date();
          const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
          
          if (hoursDiff < 24) {
            setUser(authData.user);
            setIsAuthenticated(true);
          } else {
            // 認證過期，清除本地存儲
            localStorage.removeItem('uvaco_auth');
          }
        } catch (error) {
          console.error('解析認證數據失敗:', error);
          localStorage.removeItem('uvaco_auth');
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // 🔧 修復：改善登入函數，確保狀態更新是同步的
  const login = (userData) => {
    const authData = {
      user: userData,
      loginTime: new Date().toISOString()
    };
    
    // 立即更新狀態
    setUser(userData);
    setIsAuthenticated(true);
    
    // 保存到本地存儲（24小時有效）
    localStorage.setItem('uvaco_auth', JSON.stringify(authData));
    
    console.log('登入成功:', userData); // 調試用
  };

  // 登出函數
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('uvaco_auth');
    
    // 🔧 登出時清除URL參數（如果有的話）
    const currentUrl = new URL(window.location);
    if (currentUrl.searchParams.has('testimonial')) {
      currentUrl.searchParams.delete('testimonial');
      window.history.replaceState({}, document.title, currentUrl.pathname);
    }
  };

  // 檢查權限
  const checkPermission = (permission) => {
    if (!user || !user.role) return false;
    return hasPermission(user.role, permission);
  };

  // 獲取角色顯示名稱
  const getRoleDisplayName = () => {
    if (!user || !user.role) return '訪客';
    
    switch (user.role) {
      case USER_ROLES.MEMBER: return '會員';
      case USER_ROLES.ADMIN: return '管理員';
      case USER_ROLES.SUPER_ADMIN: return '超級管理員';
      default: return '訪客';
    }
  };

  // 檢查是否為管理員（返回布林值）
  const isAdmin = user && (user.role === USER_ROLES.ADMIN || user.role === USER_ROLES.SUPER_ADMIN);

  // 檢查是否為超級管理員（返回布林值）
  const isSuperAdmin = user && user.role === USER_ROLES.SUPER_ADMIN;

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkPermission,
    getRoleDisplayName,
    isAdmin,
    isSuperAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔧 修復：改善權限保護組件，更好地處理未登入狀態
export const ProtectedComponent = ({ 
  permission, 
  children, 
  fallback = null,
  requireAuth = true 
}) => {
  const { isAuthenticated, checkPermission, isLoading } = useAuth();

  // 如果還在加載中，顯示加載狀態
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '20px',
        color: '#666'
      }}>
        載入中...
      </div>
    );
  }

  // 如果需要認證但用戶未登入
  if (requireAuth && !isAuthenticated) {
    return fallback;
  }

  // 如果指定了權限但用戶沒有該權限
  if (permission && !checkPermission(permission)) {
    return fallback;
  }

  return children;
};

// 角色保護組件
export const RoleProtectedComponent = ({ 
  allowedRoles = [], 
  children, 
  fallback = null 
}) => {
  const { user, isLoading } = useAuth();

  // 如果還在加載中，顯示加載狀態
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '20px',
        color: '#666'
      }}>
        載入中...
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return fallback;
  }

  return children;
};