// 葡眾產品資料
export const INITIAL_PRODUCTS = [
  // 基本保養系列
  {
    series: '基本保養系列',
    name: '995營養液',
    image: 'https://via.placeholder.com/300x200?text=995營養液',
    nutrients: ['螺旋藻', '小麥胚芽', '維生素B群', '胺基酸'],
    description: '995是螺旋藻膠體，經由大豆、小麥胚芽、不須經過機械轉換，直接由動腦吸收，減輕肝臟合成負擔100%吸收者考驗膠體試驗，證實995有助於提高免疫能力近4年來的數據。',
    conditions: ['免疫力提升', '營養補充', '體力增強'],
    price: 'NT$ 2,800'
  },
  {
    series: '基本保養系列',
    name: '永生福明',
    image: 'https://via.placeholder.com/300x200?text=永生福明',
    nutrients: ['抗氧化物質', '維生素A', '葉黃素'],
    description: '含有抗癌五大天王，檸檬酸酵素能化出的馬來酸防生物可以抑制癌症細胞生長，身邊有痛症患者一定要告訴他們這個好消息。',
    conditions: ['眼睛保健', '抗癌防護', '視力保護'],
    price: 'NT$ 3,200'
  },
  {
    series: '基本保養系列',
    name: '樟芝益',
    image: 'https://via.placeholder.com/300x200?text=樟芝益',
    nutrients: ['樟芝萃取', '多醣體', '三萜類化合物'],
    description: '俗話說「腦袋好，人不老」，人體有約70%林巴在腸道，補充益生菌可以維持腸道菌相均衡健康腸道有13種菌，日一小條菌數約有700億。',
    conditions: ['肝臟保健', '免疫調節', '抗疲勞'],
    price: 'NT$ 4,500'
  },
  {
    series: '基本保養系列',
    name: '康爾喜',
    image: 'https://via.placeholder.com/300x200?text=康爾喜',
    nutrients: ['乳酸菌', '益生菌', '維生素B群'],
    description: '腸道健康的關鍵，含有13種優質益生菌，每一小條含有700億個益生菌，有效維持腸道菌叢平衡。',
    conditions: ['腸道健康', '便秘改善', '免疫力提升'],
    price: 'NT$ 1,800'
  },
  {
    series: '基本保養系列',
    name: '康爾喜(N)',
    image: 'https://via.placeholder.com/300x200?text=康爾喜N',
    nutrients: ['新一代乳酸菌', '益生元', '消化酵素'],
    description: '特選13種優質益生菌，對消化液深具耐受度，可通過胃酸及膽酸的破壞性條件，創造有利益生菌存活環境。',
    conditions: ['消化改善', '腸道保健', '營養吸收'],
    price: 'NT$ 2,000'
  },

  // 調理系列
  {
    series: '調理系列',
    name: '衛萃樂優',
    image: 'https://via.placeholder.com/300x200?text=衛萃樂優',
    nutrients: ['膳食纖維', '益生菌', '消化酵素'],
    description: '抑制脂肪肝保護肝臟，降低腦溢血素的好幫手，常聚餐腦溢又不愛運動的你有福了。',
    conditions: ['脂肪肝改善', '血管保護', '消化促進'],
    price: 'NT$ 2,200'
  },
  {
    series: '調理系列',
    name: '活適康',
    image: 'https://via.placeholder.com/300x200?text=活適康',
    nutrients: ['薑黃素', '抗氧化物', '消炎因子'],
    description: '促進循環，降低發炎反應，有效緩解關節不適，提升活動力。',
    conditions: ['關節保健', '消炎止痛', '循環改善'],
    price: 'NT$ 2,600'
  },
  {
    series: '調理系列',
    name: '衛萃萃頭菇菌絲體膠囊',
    image: 'https://via.placeholder.com/300x200?text=衛萃萃頭菇',
    nutrients: ['萜頭菇萃取', '多醣體', 'β-葡聚醣'],
    description: '來自大自然的珍貴菇類，含豐富多醣體，有助調節生理機能。',
    conditions: ['免疫調節', '抗氧化', '滋補強身'],
    price: 'NT$ 3,800'
  },

  // 美容保健系列
  {
    series: '美容保健系列',
    name: '紓衡菜',
    image: 'https://via.placeholder.com/300x200?text=紓衡菜',
    nutrients: ['胺基酸', '維生素群', '礦物質'],
    description: '以特殊的軟膠型態嚴保養素材包覆其中，本品運用專利素材仙人掌及檸檬菜金收成蔬菜酵素',
    conditions: ['美容養顏', '抗氧化', '新陳代謝'],
    price: 'NT$ 2,400'
  },
  {
    series: '美容保健系列',
    name: '衛傑',
    image: 'https://via.placeholder.com/300x200?text=衛傑',
    nutrients: ['男性專用配方', '鋅', '維生素E'],
    description: '消化系統的守護神，肝臟腸胃腎臟出問題都能幫它，其中最手糖乳酸菌和鍼穴中藥材',
    conditions: ['男性保健', '體力增強', '精神旺盛'],
    price: 'NT$ 2,800'
  },
  {
    series: '美容保健系列',
    name: '不羽',
    image: 'https://via.placeholder.com/300x200?text=不羽',
    nutrients: ['女性專用配方', '大豆異黃酮', '膠原蛋白'],
    description: '小血管的守護神，有強心作用，增加血管擴張力及心血管彈性，適合體虛無力、心律不整。',
    conditions: ['女性保健', '心血管保護', '美容養顏'],
    price: 'NT$ 3,000'
  },

  // 營養補充系列
  {
    series: '營養補充系列',
    name: '艾逸',
    image: 'https://via.placeholder.com/300x200?text=艾逸',
    nutrients: ['艾草萃取', '維生素群', '礦物質'],
    description: '人容光煥發保持美好身材，增進夫妻感情，青春痘、關節痛、甲狀腺元進、不孕、氣虛腦等',
    conditions: ['婦女保健', '生理調節', '美容護膚'],
    price: 'NT$ 2,600'
  },
  {
    series: '營養補充系列',
    name: '百克斯',
    image: 'https://via.placeholder.com/300x200?text=百克斯',
    nutrients: ['綜合維生素', '礦物質', '抗氧化物'],
    description: '呼吸系統的救星，膜疾應是的會痊癒！百克斯添加靈芝可以阻擋PM2.5等霧霾混進人血液',
    conditions: ['呼吸系統保健', '抗空汙', '免疫提升'],
    price: 'NT$ 2,200'
  },
  {
    series: '營養補充系列',
    name: '康貝兒',
    image: 'https://via.placeholder.com/300x200?text=康貝兒',
    nutrients: ['12種乳酸菌', '寡糖', '維生素B群'],
    description: '現代人生活壓力和工作壓慢對健康造成影響，記憶力學習力都下降，康貝兒是幫助平穩思緒的好幫手。',
    conditions: ['兒童發育', '學習力提升', '腸道健康'],
    price: 'NT$ 1,600'
  },
  {
    series: '營養補充系列',
    name: '貝納Q10',
    image: 'https://via.placeholder.com/300x200?text=貝納Q10',
    nutrients: ['輔酶Q10', '維生素E', '抗氧化物'],
    description: '淨化血液的好幫手，有心血管疾病的你絕對需要它，由於生活忙碌難外食而增加身體負擔',
    conditions: ['心血管保護', '抗氧化', '能量代謝'],
    price: 'NT$ 3,500'
  },

  // 特殊保健系列
  {
    series: '特殊保健系列',
    name: '清明亮',
    image: 'https://via.placeholder.com/300x200?text=清明亮',
    nutrients: ['葉黃素', '花青素', '維生素A'],
    description: '護眼專業國知名大廠聯合的專利護萃素，讓22國共33個專利，游離型葉黃素素護入體更好吸收',
    conditions: ['眼睛保健', '視力保護', '抗藍光'],
    price: 'NT$ 2,800'
  },
  {
    series: '特殊保健系列',
    name: '貝力耐',
    image: 'https://via.placeholder.com/300x200?text=貝力耐',
    nutrients: ['蛋白質', '胺基酸', '維生素群'],
    description: '軟硬兼施的救星，葡萄糖胺、軟骨、飲食等、膠原蛋白、白內障、眼睛退落、現年耐疾有重要鈣質的幫助',
    conditions: ['關節保健', '骨骼強化', '軟骨修復'],
    price: 'NT$ 3,200'
  },
  {
    series: '特殊保健系列',
    name: '扶百生',
    image: 'https://via.placeholder.com/300x200?text=扶百生',
    nutrients: ['多醣體', '免疫調節因子', '抗氧化物'],
    description: '到了中年精神體力皆部份始下坡，這時就要來點扶百生讓身已品嘗關步，平常工作太操',
    conditions: ['免疫調節', '抗疲勞', '精神提振'],
    price: 'NT$ 4,200'
  },
  {
    series: '特殊保健系列',
    name: '60嚼利佳',
    image: 'https://via.placeholder.com/300x200?text=60嚼利佳',
    nutrients: ['鈣質', '維生素D', '鎂'],
    description: '現代人愛以鑑餐及愛美食的方式紓壓，本品專門嚴選中生物科技研究所培育之素養細菌體及',
    conditions: ['骨骼保健', '鈣質補充', '牙齒健康'],
    price: 'NT$ 1,800'
  },

  // 調理系列 - 婦女保健
  {
    series: '調理系列',
    name: '康爾咖',
    image: 'https://via.placeholder.com/300x200?text=康爾咖',
    nutrients: ['黑豆萃取', '大豆異黃酮', '維生素E'],
    description: '專為女性調理體質市研發，解決現代女性健康上的問題，並可促進子宮收縮，排除體內毒素',
    conditions: ['女性調理', '荷爾蒙平衡', '生理期調節'],
    price: 'NT$ 2,400'
  },
  {
    series: '調理系列',
    name: '康爾咖',
    image: 'https://via.placeholder.com/300x200?text=康爾咖飲品',
    nutrients: ['黑豆', '紅棗', '枸杞'],
    description: '現在又新病趕超越受，都是環境及飲食造成，很受人都以為現代人體重過重，但其實是錯誤觀念',
    conditions: ['體重控制', '新陳代謝', '排毒養顏'],
    price: 'NT$ 1,200'
  },

  // 清除系列
  {
    series: '清除系列',
    name: '欣悅康',
    image: 'https://via.placeholder.com/300x200?text=欣悅康',
    nutrients: ['膳食纖維', '益生菌', '酵素'],
    description: '針對女性調理體質市研發，解決現代女性健康上的問題，並可促進子宮收縮',
    conditions: ['腸道清潔', '排毒', '便秘改善'],
    price: 'NT$ 2,000'
  },
  {
    series: '清除系列',
    name: '迪康',
    image: 'https://via.placeholder.com/300x200?text=迪康',
    nutrients: ['天然草本', '消化酵素', '益生元'],
    description: '心血管的清道夫，淨心血管疾病讓身的你一定要吃，手腳易疲倦，身體毒素太多',
    conditions: ['血管清潔', '循環改善', '毒素排除'],
    price: 'NT$ 2,800'
  },

  // 活力系列
  {
    series: '活力系列',
    name: '力蓋',
    image: 'https://via.placeholder.com/300x200?text=力蓋',
    nutrients: ['鈣質', '維生素D3', '鎂'],
    description: '泌尿系統的清道夫，長期吃藥的朋友身體累積很多毒素，協助營養代謝，預防腎功能退化',
    conditions: ['骨骼強化', '鈣質補充', '成長發育'],
    price: 'NT$ 1,800'
  },
  {
    series: '活力系列',
    name: '寧康福',
    image: 'https://via.placeholder.com/300x200?text=寧康福',
    nutrients: ['天然草本', '鎮靜因子', '維生素B群'],
    description: '可以幫助平靜心含量腦清神像身體者，以及身體多項感應障礙發炎，提化性膻防災',
    conditions: ['神經安定', '睡眠改善', '情緒調節'],
    price: 'NT$ 2,600'
  }
];

// 產品系列分類
export const PRODUCT_SERIES = [
  '基本保養系列',
  '調理系列', 
  '美容保健系列',
  '營養補充系列',
  '特殊保健系列',
  '清除系列',
  '活力系列'
];

// 適用症狀分類
export const HEALTH_CONDITIONS = [
  '免疫力提升',
  '腸道健康',
  '心血管保護',
  '肝臟保健',
  '眼睛保健',
  '關節保健',
  '骨骼強化',
  '女性保健',
  '男性保健',
  '兒童發育',
  '美容養顏',
  '抗氧化',
  '消化改善',
  '排毒清潔',
  '神經安定',
  '呼吸系統保健'
];