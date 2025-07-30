// src/services/authService.js
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// 權限配置
export const USER_ROLES = {
  GUEST: 'guest',        // 訪客
  MEMBER: 'member',      // 一般會員
  ADMIN: 'admin',        // 管理員
  SUPER_ADMIN: 'super_admin' // 超級管理員
};

// 權限映射
export const PERMISSIONS = {
  [USER_ROLES.GUEST]: ['view_products'],
  [USER_ROLES.MEMBER]: ['view_products', 'view_testimonials', 'submit_testimonial'],
  [USER_ROLES.ADMIN]: ['view_products', 'view_testimonials', 'submit_testimonial', 'edit_testimonial', 'delete_testimonial', 'moderate_content'],
  [USER_ROLES.SUPER_ADMIN]: ['*'] // 所有權限
};

// 密碼配置文檔ID
const PASSWORD_CONFIG_DOC_ID = 'password_config';

// 獲取當前密碼配置
export const getPasswordConfig = async () => {
  try {
    const configDoc = await getDoc(doc(db, 'system_config', PASSWORD_CONFIG_DOC_ID));
    
    if (configDoc.exists()) {
      return configDoc.data();
    } else {
      // 如果不存在，創建默認配置
      const defaultConfig = {
        memberPassword: 'UV2025M08A', // 當前會員密碼
        nextMemberPassword: 'UV2025M09A', // 下個月密碼
        adminPassword: 'ADMIN_2025_UV', // 管理員密碼
        superAdminPassword: 'SUPER_ADMIN_2025_UV', // 超級管理員密碼
        passwordUpdateDate: new Date().toISOString().split('T')[0], // 上次更新日期
        nextUpdateDate: getNextMonthFirstDay(), // 下次更新日期
        isPasswordExpired: false
      };
      
      await setDoc(doc(db, 'system_config', PASSWORD_CONFIG_DOC_ID), defaultConfig);
      return defaultConfig;
    }
  } catch (error) {
    console.error('獲取密碼配置失敗:', error);
    throw error;
  }
};

// 驗證密碼並返回用戶角色
export const authenticateUser = async (password) => {
  try {
    const config = await getPasswordConfig();
    
    // 檢查密碼是否過期
    const today = new Date().toISOString().split('T')[0];
    if (today >= config.nextUpdateDate && !config.isPasswordExpired) {
      // 密碼已過期，更新配置
      await updatePasswordConfig();
      // 重新獲取配置
      const updatedConfig = await getPasswordConfig();
      return checkPassword(password, updatedConfig);
    }
    
    return checkPassword(password, config);
  } catch (error) {
    console.error('認證失敗:', error);
    return { success: false, role: null, message: '認證服務出錯' };
  }
};

// 檢查密碼
const checkPassword = (password, config) => {
  if (password === config.superAdminPassword) {
    return { success: true, role: USER_ROLES.SUPER_ADMIN, message: '超級管理員登入成功' };
  }
  
  if (password === config.adminPassword) {
    return { success: true, role: USER_ROLES.ADMIN, message: '管理員登入成功' };
  }
  
  // 檢查當前會員密碼和前一個月的密碼（3天緩衝期）
  if (password === config.memberPassword || password === config.previousMemberPassword) {
    return { success: true, role: USER_ROLES.MEMBER, message: '會員登入成功' };
  }
  
  return { success: false, role: null, message: '密碼錯誤' };
};

// 更新密碼配置（每月自動執行）
export const updatePasswordConfig = async () => {
  try {
    const config = await getPasswordConfig();
    const newConfig = {
      ...config,
      previousMemberPassword: config.memberPassword, // 保留舊密碼3天
      memberPassword: config.nextMemberPassword, // 啟用新密碼
      nextMemberPassword: generateNextPassword(), // 生成下個月密碼
      passwordUpdateDate: new Date().toISOString().split('T')[0],
      nextUpdateDate: getNextMonthFirstDay(),
      isPasswordExpired: false
    };
    
    await updateDoc(doc(db, 'system_config', PASSWORD_CONFIG_DOC_ID), newConfig);
    return newConfig;
  } catch (error) {
    console.error('更新密碼配置失敗:', error);
    throw error;
  }
};

// 檢查用戶權限
export const hasPermission = (userRole, permission) => {
  if (!userRole) return false;
  
  const userPermissions = PERMISSIONS[userRole] || [];
  return userPermissions.includes('*') || userPermissions.includes(permission);
};

// 生成下個月密碼
const generateNextPassword = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 2); // 下下個月
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `UV${year}M${month}A`;
};

// 獲取下個月第一天
const getNextMonthFirstDay = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1, 1);
  return date.toISOString().split('T')[0];
};

// 手動更新會員密碼（Admin專用）
export const updateMemberPassword = async (newPassword) => {
  try {
    const config = await getPasswordConfig();
    const updatedConfig = {
      ...config,
      previousMemberPassword: config.memberPassword,
      memberPassword: newPassword,
      passwordUpdateDate: new Date().toISOString().split('T')[0]
    };
    
    await updateDoc(doc(db, 'system_config', PASSWORD_CONFIG_DOC_ID), updatedConfig);
    return updatedConfig;
  } catch (error) {
    console.error('更新會員密碼失敗:', error);
    throw error;
  }
};

// 獲取密碼狀態信息（給Admin看的）
export const getPasswordStatus = async () => {
  try {
    const config = await getPasswordConfig();
    const today = new Date().toISOString().split('T')[0];
    const daysUntilExpiry = Math.ceil((new Date(config.nextUpdateDate) - new Date(today)) / (1000 * 60 * 60 * 24));
    
    return {
      currentPassword: config.memberPassword,
      nextPassword: config.nextMemberPassword,
      nextUpdateDate: config.nextUpdateDate,
      daysUntilExpiry,
      isExpiringSoon: daysUntilExpiry <= 7
    };
  } catch (error) {
    console.error('獲取密碼狀態失敗:', error);
    throw error;
  }
};