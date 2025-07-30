// scripts/initializeFirebase.js
// 這是一個一次性執行的腳本，用於初始化Firebase配置

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// 你的Firebase配置
const firebaseConfig = {
  apiKey: "AIzaSyCoByQhCG5WllT01ybUdQ3En_CoC7-1kQc",
  authDomain: "uvaco-health.firebaseapp.com",
  projectId: "uvaco-health",
  storageBucket: "uvaco-health.firebasestorage.app",
  messagingSenderId: "603820339752",
  appId: "1:603820339752:web:99c09ce4a0e4625325bb1d",
  measurementId: "G-DEJ53Q0M61"
};

// 初始化Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 生成下個月第一天
const getNextMonthFirstDay = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1, 1);
  return date.toISOString().split('T')[0];
};

// 生成當前月密碼
const generateCurrentPassword = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `UV${year}M${month}A`;
};

// 生成下個月密碼
const generateNextPassword = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `UV${year}M${month}A`;
};

// 初始化系統配置
async function initializeSystemConfig() {
  try {
    console.log('🔧 開始初始化系統配置...');

    const configDocRef = doc(db, 'system_config', 'password_config');
    const configDoc = await getDoc(configDocRef);

    if (configDoc.exists()) {
      console.log('⚠️ 配置已存在，跳過初始化');
      console.log('現有配置:', configDoc.data());
      return;
    }

    // 創建初始密碼配置
    const initialConfig = {
      memberPassword: generateCurrentPassword(), // 當前會員密碼
      nextMemberPassword: generateNextPassword(), // 下個月密碼
      previousMemberPassword: null, // 前一個密碼（用於緩衝期）
      adminPassword: 'ADMIN_2025_UV', // 管理員密碼
      superAdminPassword: 'SUPER_ADMIN_2025_UV', // 超級管理員密碼
      passwordUpdateDate: new Date().toISOString().split('T')[0], // 上次更新日期
      nextUpdateDate: getNextMonthFirstDay(), // 下次更新日期
      isPasswordExpired: false,
      
      // 添加一些元數據
      createdAt: new Date().toISOString(),
      version: '1.0.0',
      description: 'UVACO健康專區密碼管理配置'
    };

    await setDoc(configDocRef, initialConfig);

    console.log('✅ 系統配置初始化完成！');
    console.log('📋 初始密碼信息：');
    console.log(`   當前會員密碼: ${initialConfig.memberPassword}`);
    console.log(`   下期會員密碼: ${initialConfig.nextMemberPassword}`);
    console.log(`   管理員密碼: ${initialConfig.adminPassword}`);
    console.log(`   超級管理員密碼: ${initialConfig.superAdminPassword}`);
    console.log(`   下次更新日期: ${initialConfig.nextUpdateDate}`);

  } catch (error) {
    console.error('❌ 初始化失敗:', error);
  }
}

// 創建示例見證數據（可選）
async function createSampleTestimonials() {
  try {
    console.log('📝 創建示例見證數據...');

    const sampleTestimonials = [
      {
        id: Date.now() + 1,
        productIds: ['10050'],
        productNames: ['康爾喜乳酸菌顆粒'],
        story: '使用康爾喜一段時間後，覺得消化比較順暢，個人感受很不錯。早上空腹使用，搭配溫水，口感也很好。',
        displayName: '家人的分享',
        namePrefix: '家人的',
        userName: '',
        isNamePublic: false,
        submittedBy: '會員',
        needsReview: false,
        sensitiveWords: [],
        isApproved: true,
        createdAt: new Date().toISOString().split('T')[0]
      },
      {
        id: Date.now() + 2,
        productIds: ['30010', '10050'],
        productNames: ['葡眾餐包沖泡飲', '康爾喜乳酸菌顆粒'],
        story: '搭配使用餐包和康爾喜，個人覺得營養比較均衡，體力也有改善的感受。特別是下午比較不會累，整體使用體驗很滿意。',
        displayName: '朋友的分享',
        namePrefix: '朋友的',
        userName: '',
        isNamePublic: false,
        submittedBy: '會員',
        needsReview: false,
        sensitiveWords: [],
        isApproved: true,
        createdAt: new Date().toISOString().split('T')[0]
      }
    ];

    // 這裡可以添加到Firestore，但由於我們已經有addDocument方法，建議在App中處理
    console.log('✅ 示例見證數據準備完成（需要在App中添加）');
    
  } catch (error) {
    console.error('❌ 創建示例數據失敗:', error);
  }
}

// 驗證配置
async function verifyConfiguration() {
  try {
    console.log('🔍 驗證配置...');

    const configDocRef = doc(db, 'system_config', 'password_config');
    const configDoc = await getDoc(configDocRef);

    if (configDoc.exists()) {
      const config = configDoc.data();
      console.log('✅ 配置驗證成功');
      console.log('📊 當前配置狀態：');
      console.log(`   會員密碼: ${config.memberPassword}`);
      console.log(`   密碼狀態: ${config.isPasswordExpired ? '已過期' : '正常'}`);
      console.log(`   下次更新: ${config.nextUpdateDate}`);
      
      // 檢查密碼是否即將過期
      const today = new Date().toISOString().split('T')[0];
      const daysUntilExpiry = Math.ceil((new Date(config.nextUpdateDate) - new Date(today)) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry <= 7) {
        console.log(`⚠️ 警告: 密碼將在 ${daysUntilExpiry} 天後過期`);
      }
      
    } else {
      console.log('❌ 配置不存在，請先運行初始化');
    }

  } catch (error) {
    console.error('❌ 驗證失敗:', error);
  }
}

// 主執行函數
async function main() {
  console.log('🚀 UVACO健康專區 - Firebase初始化腳本');
  console.log('==========================================');

  await initializeSystemConfig();
  await createSampleTestimonials();
  await verifyConfiguration();

  console.log('==========================================');
  console.log('🎉 初始化完成！');
  console.log('');
  console.log('📝 後續步驟：');
  console.log('1. 將新的組件文件添加到您的項目中');
  console.log('2. 更新 App.js 使用新的權限系統');
  console.log('3. 測試登入功能和權限控制');
  console.log('4. 配置會員密碼並通知用戶');
  console.log('');
  console.log('🔐 默認密碼（請妥善保管）：');
  console.log(`   當前會員密碼: ${generateCurrentPassword()}`);
  console.log('   管理員密碼: ADMIN_2025_UV');
  console.log('   超級管理員密碼: SUPER_ADMIN_2025_UV');
}

// 運行腳本
main().catch(console.error);

export { initializeSystemConfig, verifyConfiguration };