// 葡眾產品資料
export const INITIAL_PRODUCTS = [
  // 基本保養系列
  {
    series: '基本保養系列',
    name: '995生技營養品',
    image: '/assets/995生技營養品.png',
    nutrients: ['螺旋藻', '小麥胚芽', '酵母菌', '20種游離胺基酸', '香菇多醣', '數百種短鏈胜肽', '卵磷脂', '核酸', '膳食纖維', '多醣體', '維生素', '礦物質', '酸菌菌', '龍根菌'],
    description: '995生技營養品採用大豆、小麥胚芽等天然原料，經高科技生物工程技術，將優質植物蛋白質嚴選菌質及乳酸菌進行液態發酵熟成，生產出富含多種游離胺基酸、短鏈胜肽、多醣體、膳食纖維、卵磷脂、核酸、去關基異黃酮、維生素、礦物質等營養成分，有助於營養補給、健康維持，尤其對病後之補養有良好幫助。',
    conditions: ['免疫力調節', '營養補充', '體力增強', '抗氧化', '新陳代謝', '血液循環', 'SARS病毒預防'],
    price: 'NT$ 5,980',
    specifications: '180ml/瓶，24瓶/箱',
    awards: ['2022年非洲國際發明展銀牌', '香港創新科技國際發明展金牌'],
    certifications: ['國家生技醫療品質入圍獎', '營養保健食品自製類']
  },
  {
    series: '基本保養系列',
    name: '永生福朗',
    image: '/assets/永生福朗膠囊.png',
    nutrients: ['抗氧化物質', '維生素A', '葉黃素', '抗癌五大天王'],
    description: '含有抗癌五大天王，檸檬酸酵素能化出的馬來酸防生物可以抑制癌症細胞生長，身邊有癌症患者一定要告訴他們這個好消息，檸檬本身也是很棒肝臟藥之王。',
    conditions: ['眼睛保健', '抗癌防護', '視力保護', '肝臟保健'],
    price: 'NT$ 1,770',
    specifications: '120粒/瓶'
  },
  {
    series: '基本保養系列',
    name: '樟芝益',
    image: '/assets/樟芝益菌絲體生技營養品.png',
    nutrients: ['樟芝菌絲體發酵液', '舞茸子實體萃取液', '巴西蘑菇菌絲體發酵濃縮液', '桑黃子實體萃取液', '雲芝菌絲體發酵濃縮液', '異麥芽寡醣'],
    description: '台灣網紅級珍稀菇類、抗癌五大天王、解毒之王、肝臟清道夫。葡眾王生物科技研究所率先研發成功樟芝菌絲體液態發酵培育技術，開發出新的生技食品，並榮獲多項專利及肯定。',
    conditions: ['肝臟保健', '免疫調節', '抗疲勞', '解毒清肝', '抗癌防護'],
    price: 'NT$ 5,980',
    specifications: '180ml/瓶，24瓶/箱',
    awards: ['2023年香港創新科技國際發明展2金1特別獎'],
    certifications: ['多項台灣專利認證']
  },
  {
    series: '基本保養系列',
    name: '康爾喜',
    image: '/assets/康爾喜乳酸菌顆粒.png',
    nutrients: ['13種乳酸菌', '益生菌', 'β-胡蘿蔔素'],
    description: '腸道健康的關鍵，含有13種優質益生菌，每一小條含有700億個益生菌，有效維持腸道菌叢平衡。乳酸菌的酸化作用及胜肽水解活性，可改變細菌叢生態，維持消化道功能，以達調節生理機能之作用。',
    conditions: ['腸道健康', '便秘改善', '免疫力提升', '消化改善'],
    price: 'NT$ 1,890',
    specifications: '90條/盒'
  },
  {
    series: '基本保養系列',
    name: '康爾喜(N)',
    image: '/assets/康爾喜(N)乳酸菌顆粒.png',
    nutrients: ['13種優質益生菌', '益生元', '消化酵素', '乳糖', '玉米澱粉', '木瓜酵素', '鳳梨酵素'],
    description: '特選13種優質益生菌，對消化液深具耐受度，可通過胃酸及膽酸的破壞，保持乳酸菌的酸化作用及胜肽水解活性，並加入生物工程中心發酵之後生元，創造有利益生菌存活環境，有助改變細菌叢生態，讓您輕鬆維持消化道機能。',
    conditions: ['消化改善', '腸道保健', '營養吸收', '免疫調節'],
    price: 'NT$ 1,960',
    specifications: '90條/盒'
  },

  // 營養補充系列
  {
    series: '營養補充系列',
    name: '葡眾餐包',
    image: '/assets/葡眾餐包沖泡飲.png',
    nutrients: ['燕麥粉', '大豆蛋白', '刺五加', '亞麻仁種子粉', '蓮子', '靈芝菌絲體發酵液粉', '紅棗萃取物', '草莓果汁粉'],
    description: '本品由天然大豆等植物性蛋白質及多種草本植物複方組成，能提供人體新陳代謝，並提供成長發育，依復體力所需的均衡營養，提供我們健康活力的一天，適合所有年齡層沖泡飲用。',
    conditions: ['營養補充', '體力增強', '成長發育', '新陳代謝'],
    price: 'NT$ 1,344',
    specifications: '30包/盒'
  },
  {
    series: '營養補充系列',
    name: '葡眾原味餐包',
    image: '/assets/葡眾原味餐包沖泡飲.png',
    nutrients: ['燕麥粉', '大豆蛋白', '亞麻仁種子粉'],
    description: '含豐富礦質與鈣質，促進成長中孩子的發育。提供人體60-80兆細胞所需五大營養素。補足三餐攝取不均的營養。',
    conditions: ['兒童發育', '營養補充', '體質調整'],
    price: 'NT$ 1,344',
    specifications: '30包/盒'
  },
  {
    series: '營養補充系列',
    name: '銀燦餐包',
    image: '/assets/葡眾銀燦餐包沖泡飲.png',
    nutrients: ['柿子萃取物', '巴西蘑菇菌絲體發酵液粉', '啤酒酵母', '燕麥粉', '大豆蛋白', '綜合穀粉', '黑芝麻粉'],
    description: '本品嚴選綜合穀粉、黑芝麻粉與柿子精華等複方，藉以葡眾王生物科技研究所液態發酵之巴西蘑菇菌絲體，能調節生理機能，促進人體新陳代謝，特別適合中年及銀髮族群沖泡飲用，提供您健康活力，精力旺盛的一天。',
    conditions: ['中老年保健', '新陳代謝', '免疫機能', '抗病毒能力'],
    price: 'NT$ 1,480',
    specifications: '30包/盒'
  },

  // 調理系列
  {
    series: '調理系列',
    name: '迪康沖泡飲',
    image: '/assets/迪康沖泡飲.png',
    nutrients: ['山楂', '陳皮', '炒麥芽', '枸杞', '丹參', '熟地', '人參', '麥門冬', '藏紅花'],
    description: '心血管的清道夫，針對飲食油膩的外食族群精心設計的養生保健食品，促進新陳代謝，調整體質，讓您健康加分，天天擁有好氣色。',
    conditions: ['血管清潔', '循環改善', '毒素排除', '心血管保護'],
    price: 'NT$ 1,764',
    specifications: '30包/盒'
  },
  {
    series: '調理系列',
    name: '力盛沖泡飲',
    image: '/assets/力盛沖泡飲.png',
    nutrients: ['草決明', '黃耆', '枸杞', '桑椹', '羅漢果', '靈芝', '香菇', '蘆筍'],
    description: '泌尿系統的清道夫，促進新陳代謝，調節我們的生理機能。除了幫助體內循環，汗腺發達也可幫助水份代謝，亦可維持良好的體態。',
    conditions: ['泌尿保健', '新陳代謝', '體內循環', '頻尿改善'],
    price: 'NT$ 1,764',
    specifications: '30包/盒'
  },

  // 特殊保健系列
  {
    series: '特殊保健系列',
    name: '衛傑',
    image: '/assets/衛傑膠囊.png',
    nutrients: ['男性專用配方', '鋅', '維生素E'],
    description: '消化系統的守護神，肝臟腸胃腎臟出問題都能幫它，其中最手糖乳酸菌和鍼穴中藥材',
    conditions: ['男性保健', '體力增強', '精神旺盛'],
    price: 'NT$ 1,260',
    specifications: '100粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '百克斯',
    image: '/assets/百克斯膠囊.png',
    nutrients: ['綜合維生素', '礦物質', '抗氧化物'],
    description: '呼吸系統的救星，膜疾應是的會痊癒！百克斯添加靈芝可以阻擋PM2.5等霧霾混進人血液',
    conditions: ['呼吸系統保健', '抗空汙', '免疫提升'],
    price: 'NT$ 1,386',
    specifications: '100粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '康貝兒',
    image: '/assets/康貝寧膠囊.png',
    nutrients: ['12種乳酸菌', '寡糖', '維生素B群'],
    description: '現代人生活壓力和工作壓慢對健康造成影響，記憶力學習力都下降，康貝兒是幫助平穩思緒的好幫手。',
    conditions: ['兒童發育', '學習力提升', '腸道健康'],
    price: 'NT$ 1,880',
    specifications: '100粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '貝納Q10',
    image: '/assets/葡眾貝納Q10膠囊.png',
    nutrients: ['輔酶Q10', '維生素E', '抗氧化物'],
    description: '淨化血液的好幫手，有心血管疾病的你絕對需要它，由於生活忙碌難外食而增加身體負擔',
    conditions: ['心血管保護', '抗氧化', '能量代謝'],
    price: 'NT$ 3,180',
    specifications: '120粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '貝力耐',
    image: '/assets/貝力耐膠囊.png',
    nutrients: ['蛋白質', '胺基酸', '維生素群'],
    description: '軟硬兼施的救星，葡萄糖胺、軟骨、飲食等、膠原蛋白、白內障、眼睛退落、現年耐疾有重要鈣質的幫助',
    conditions: ['關節保健', '骨骼強化', '軟骨修復'],
    price: 'NT$ 2,646',
    specifications: '120粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '清明亮',
    image: '/assets/清明亮膠囊.png',
    nutrients: ['葉黃素', '花青素', '維生素A'],
    description: '護眼專業國知名大廠聯合的專利護萃素，讓22國共33個專利，游離型葉黃素素護入體更好吸收',
    conditions: ['眼睛保健', '視力保護', '抗藍光'],
    price: 'NT$ 3,500',
    specifications: '120粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '寧康福',
    image: '/assets/葡眾寧康福膠囊.png',
    nutrients: ['天然草本', '鎮靜因子', '維生素B群'],
    description: '可以幫助平靜心含量腦清神像身體者，以及身體多項感應障礙發炎，提化性膻防災',
    conditions: ['神經安定', '睡眠改善', '情緒調節'],
    price: 'NT$ 2,890',
    specifications: '120粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '樂優',
    image: '/assets/葡眾樂優乳酸菌顆粒.png',
    nutrients: ['膳食纖維', '益生菌', '消化酵素'],
    description: '針對現代人生活忙碌，常有腸胃不適的問題，樂優能幫助消化，促進腸道蠕動，維持腸道健康。',
    conditions: ['腸道保健', '消化改善', '排便順暢'],
    price: 'NT$ 2,100',
    specifications: '90條/盒'
  },
  {
    series: '特殊保健系列',
    name: '扶百生',
    image: '/assets/扶百生膠囊.png',
    nutrients: ['多醣體', '免疫調節因子', '抗氧化物'],
    description: '到了中年精神體力皆開始走下坡，這時就要來點扶百生讓身體重新振作，平常工作太操勞的人更需要。',
    conditions: ['免疫調節', '抗疲勞', '精神提振'],
    price: 'NT$ 2,005',
    specifications: '100粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '醣利佳',
    image: '/assets/醣利佳膠囊.png',
    nutrients: ['鈣質', '維生素D', '鎂'],
    description: '現代人愛以聚餐及美食的方式紓壓，本品專門針對中老年人骨骼保健需求而設計。',
    conditions: ['骨骼保健', '鈣質補充', '牙齒健康'],
    price: 'NT$ 2,330',
    specifications: '100粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '暢旦利',
    image: '/assets/暢且利膠囊.png',
    nutrients: ['膳食纖維', '益生菌', '酵素'],
    description: '幫助腸道健康，促進消化機能，是現代人腸胃保健的好選擇。',
    conditions: ['腸道健康', '消化促進', '排便順暢'],
    price: 'NT$ 1,764',
    specifications: '100粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '康悅兒',
    image: '/assets/康悅兒乳酸菌顆粒.png',
    nutrients: ['13種乳酸菌', '益生元', '維生素'],
    description: '專為兒童設計的益生菌產品，幫助維持腸道健康，促進營養吸收。',
    conditions: ['兒童腸道健康', '營養吸收', '免疫提升'],
    price: 'NT$ 1,764',
    specifications: '90條/盒'
  },
  {
    series: '特殊保健系列',
    name: '小悅光飲',
    image: '/assets/小悅光飲.png',
    nutrients: ['葉黃素', '花青素', '維生素A', '抗氧化物'],
    description: '專為現代人護眼需求設計，含有豐富的葉黃素和花青素，有助於維護眼睛健康。',
    conditions: ['眼睛保健', '視力保護', '抗藍光', '眼睛疲勞'],
    price: 'NT$ 1,400',
    specifications: '20ml/包，15包/盒'
  },
  {
    series: '特殊保健系列',
    name: '青采孅',
    image: '/assets/青采孅膠囊.png',
    nutrients: ['綠茶萃取', '藤黃果', '維生素群'],
    description: '結合多種天然植物萃取，幫助新陳代謝，是體重管理的好幫手。',
    conditions: ['體重管理', '新陳代謝', '脂肪代謝'],
    price: 'NT$ 2,180',
    specifications: '100粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '艾逸',
    image: '/assets/艾逸膠囊.png',
    nutrients: ['艾草萃取', '維生素群', '礦物質'],
    description: '專為女性調理體質而研發，幫助女性維持生理機能平衡。',
    conditions: ['女性保健', '生理調節', '美容護膚'],
    price: 'NT$ 1,344',
    specifications: '100粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '禾玥',
    image: '/assets/禾玥膠囊.png',
    nutrients: ['天然草本', '維生素', '礦物質'],
    description: '結合傳統草本智慧與現代科技，提供全方位的健康呵護。',
    conditions: ['綜合保健', '體質調理', '營養補給'],
    price: 'NT$ 1,276',
    specifications: '100粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '衛傑(奶素)',
    image: '/assets/衛傑膠囊(奶素).png',
    nutrients: ['男性專用配方', '鋅', '維生素E', '奶素配方'],
    description: '奶素版本的衛傑，專為素食男性設計，提供完整的營養補給。',
    conditions: ['男性保健', '體力增強', '素食營養'],
    price: 'NT$ 1,260',
    specifications: '90粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '百克斯(純素)',
    image: '/assets/百克斯膠囊(純素).png',
    nutrients: ['綜合維生素', '礦物質', '抗氧化物', '純素配方'],
    description: '純素版本的百克斯，專為純素食者設計的綜合維生素。',
    conditions: ['呼吸系統保健', '抗空汙', '免疫提升', '素食營養'],
    price: 'NT$ 1,386',
    specifications: '90粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '清明亮(純素)',
    image: '/assets/清明亮膠囊(純素).png',
    nutrients: ['葉黃素', '花青素', '維生素A', '純素配方'],
    description: '純素版本的清明亮，專為素食者護眼需求設計。',
    conditions: ['眼睛保健', '視力保護', '抗藍光', '素食營養'],
    price: 'NT$ 3,500',
    specifications: '115粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '艾逸(純素)',
    image: '/assets/艾逸膠囊(純素).png',
    nutrients: ['艾草萃取', '維生素群', '礦物質', '純素配方'],
    description: '純素版本的艾逸，專為素食女性調理體質而設計。',
    conditions: ['女性保健', '生理調節', '美容護膚', '素食營養'],
    price: 'NT$ 1,344',
    specifications: '90粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '猴頭菇菌絲體膠囊',
    image: '/assets/葡眾猴頭菇菌絲體膠囊.png',
    nutrients: ['猴頭菇菌絲體', '多醣體', 'β-葡聚醣'],
    description: '珍貴的猴頭菇菌絲體，含豐富多醣體，有助於調節生理機能，提升免疫力。',
    conditions: ['免疫調節', '腸胃保健', '神經保護'],
    price: 'NT$ 3,700',
    specifications: '90粒/瓶'
  },
  {
    series: '特殊保健系列',
    name: '紓衛菓',
    image: '/assets/紓衛菓軟糖.png',
    nutrients: ['天然果蔬精華', '維生素C', '抗氧化物'],
    description: '結合多種天然蔬果精華，提供豐富的維生素和抗氧化物質。',
    conditions: ['抗氧化', '免疫提升', '營養補充'],
    price: 'NT$ 700',
    specifications: '15顆/袋'
  },
  {
    series: '特殊保健系列',
    name: '康爾暢',
    image: '/assets/康爾暢乳酸菌菌球顆粒.png',
    nutrients: ['膳食纖維', '益生菌', '消化酵素'],
    description: '專為腸道健康設計，幫助維持腸道機能，促進消化吸收。',
    conditions: ['腸道健康', '消化改善', '排便順暢'],
    price: 'NT$ 2,050',
    specifications: '30條/盒'
  },
  {
    series: '特殊保健系列',
    name: '康爾動',
    image: '/assets/康爾動乳酸菌菌球顆粒.png',
    nutrients: ['關節保健成分', '葡萄糖胺', '軟骨素'],
    description: '專為關節保健設計，幫助維持關節靈活度，適合中老年人使用。',
    conditions: ['關節保健', '骨骼強化', '活動力提升'],
    price: 'NT$ 1,950',
    specifications: '30條/盒'
  },

  // 活力丰采系列
  {
    series: '活力丰采系列',
    name: '活逸康',
    image: '/assets/葡眾活逸康猴頭菇菌絲體顆粒.png',
    nutrients: ['天然草本', '抗氧化物', '維生素群'],
    description: '到了中年精神體力皆部份始下坡，這時就要來點活逸康讓身已品嘗關步，平常工作太操',
    conditions: ['抗疲勞', '精神提振', '體力恢復'],
    price: 'NT$ 5,796',
    specifications: '90條/盒'
  },
  {
    series: '活力丰采系列',
    name: '葡眾靚妍飲',
    image: '/assets/葡眾靚妍飲.png',
    nutrients: ['金針菇萃取液', '殼脫甘肽', '米胚芽萃取物', 'N-乙醯基', 'D-葡萄糖胺', '洛神花萃萃取物', '蔓越莓濃縮汁', '蘋果濃縮汁'],
    description: '本品為葡眾王生物工程中心多年研發之菇菌類獨特青純成分，搭配多種美容精華讓您養顏美容，並輔以洛神花萃萃取物及蔓越莓濃縮汁製助女性調理生理機能，維持最佳狀態，讓您擁有青春自信，是現代女性最佳日常美容保健飲品。',
    conditions: ['美容養顏', '女性調理', '抗氧化', '生理機能調節'],
    price: 'NT$ 2,150',
    specifications: '20ml/包，15包/盒'
  },
  {
    series: '活力丰采系列',
    name: '欣悅康沖泡飲',
    image: '/assets/欣悅康沖泡飲.png',
    nutrients: ['糖意仁', '黑糖', '大麥仁', '紅豆', '老薑粉', '小米', '乳酸菌', '酵母菌', '山藥粉', '天貝發酵物', '鳳梨酵素'],
    description: '針對女性調理體質而研發，天天飲用，可滋潤和滋潤，調節生理機能，解決現代女性健康上的問題，並可排除內老廢物後滋補營養很有幫助。',
    conditions: ['女性調理', '生理機能調節', '體質改善', '排毒養顏'],
    price: 'NT$ 3,100',
    specifications: '30包/盒'
  },
  {
    series: '活力丰采系列',
    name: '芯潤飲',
    image: '/assets/芯潤飲.png',
    nutrients: ['葡眾王獨家後生元GKV1乳酸菌發酵液', '越桔萃取物', '西印度櫻桃', '洋菜劑抽出物'],
    description: '以葡眾王生物科技研究所專業研發－Bifidobacterium breve GKV1乳酸菌發酵液為特色素材，洋菜劑抽出物及越桔萃取等，是您維持青春美麗的雪亮祕訣，獨特玫瑰與水蜜桃風味，選用輕巧好攜帶的質感軟袋包裝，讓您隨時即飲美麗不中斷。',
    conditions: ['美容保健', '抗氧化', '青春美麗', '女性保養'],
    price: 'NT$ 2,150',
    specifications: '20ml/包，15包/盒'
  },

  // 生活保養系列
  {
    series: '生活保養系列',
    name: 'Hi Kiss+平衡洗面乳',
    image: '/assets/HiKiss平衡洗面乳.png',
    nutrients: ['神聖藻萃取', 'GKM3發酵液', '透明質酸', '仙人掌花萃取物'],
    description: '添加神聖藻、透明質酸及仙人掌花萃取物等保濕成分，在溫和洗淨臉部多餘皮脂及髒汙時，還能滋潤肌膚，讓您洗後清爽柔嫩不緊繃，配合獨特的乳酸菌發酵液，含有機酸等成分幫助維持肌膚健康，展現肌膚自然光澤。',
    conditions: ['肌膚清潔', '保濕滋潤', '溫和潔淨'],
    price: 'NT$ 700',
    specifications: '130g/盒'
  },
  {
    series: '生活保養系列',
    name: '蘆露蕁麻膏',
    image: '/assets/蘆露蕁麻膏.png',
    nutrients: ['四大自然植物萃取', '庫拉索蘆薈', '金盞花', '神聖藻', '克拉瑪湖藍綠藻'],
    description: '含有大量多醣體的庫拉索蘆薈，可幫助皮膚補水保茲舒緩肌膚乾燥，結合生物科技精華原料－蟬花及黑酵母輔以玻尿酸，精雪草及金盞花等萃取精華，給您肌膚水嫩呵護，由內而外散發光澤亮麗。',
    conditions: ['肌膚修復', '保濕舒緩', '抗敏修復'],
    price: 'NT$ 700',
    specifications: '50g*3/盒或180g*1/盒'
  },
  {
    series: '生活保養系列',
    name: '蟬花護手霜',
    image: '/assets/蟬花護手霜.png',
    nutrients: ['蟬花萃取物', '庫拉索蘆薈', '黑酵母萃取', '玻尿酸', '克拉瑪湖藍綠藻', '積雪草萃取物', '金盞花萃取物', '神聖藻'],
    description: '四大自然植物萃取：庫拉索蘆薇、金盞花、神聖藻、克拉瑪湖藍綠藻，含有大量多醣體的庫拉索蘆薇，可幫助皮膚補水保茲舒緩肌膚乾燥，結合生物科技精華原料－蟬花及黑酵母輔以玻尿酸。',
    conditions: ['手部保養', '肌膚修復', '保濕滋潤'],
    price: 'NT$ 840',
    specifications: '30g*3支/盒'
  },
  {
    series: '生活保養系列',
    name: '淨膚皂',
    image: '/assets/淨膚皂.png',
    nutrients: ['天然植物油脂', '甘油', '保濕因子'],
    description: '溫和清潔肌膚，不含化學添加物，適合全家人使用。',
    conditions: ['肌膚清潔', '溫和潔淨', '全家適用'],
    price: 'NT$ 870',
    specifications: '95g*3盒/組'
  },
  {
    series: '生活保養系列',
    name: 'YaYa Mini舒緩膏',
    image: '/assets/YaYaMini舒緩膏.png',
    nutrients: ['樟芝菌絲體發酵液粉', '尤加利', '丁香', '茶樹精油', '輔酶Q10', '凡士林'],
    description: '精選植物精華，以複合草本花香精油調配，氣味清爽怡人，輕鬆塗抹於肌膚能舒緩壓力；升級添加樟芝發酵萃取，結合輔酶Q10與凡士林，能在肌膚上形成一層保護膜，發揮草本精油提煉的最佳效用。',
    conditions: ['舒緩壓力', '肌膚修護', '提神醒腦'],
    price: 'NT$ 1,400',
    specifications: '7g*6瓶/盒'
  },
  {
    series: '生活保養系列',
    name: 'Hi Spray清新噴霧',
    image: '/assets/HiSpray清新噴霧.png',
    nutrients: ['乳酸菌發酵液', '百里香', '薄荷'],
    description: '添加葡眾王生物科技研究所特製乳酸菌發酵液素材，溫和薄荷味，能去除口中異味，保持口氣清新及維護口腔健康。輕巧設計，方便攜帶，是您約會外出時尚單品，讓您增添自信。',
    conditions: ['口腔清新', '去除異味', '維護口腔健康'],
    price: 'NT$ 570',
    specifications: '10ml*3瓶/盒'
  },
  {
    series: '生活保養系列',
    name: '貝益潔護效牙膏',
    image: '/assets/貝益潔護效牙膏.png',
    nutrients: ['乳酸菌發酵液', '木醣醇', '氟化鈉', '山梨醇', '百里香'],
    description: '葡眾王生物科技研究所特製-獨家特有乳酸菌發酵液GK4，對高達13種口腔壞菌有抑制生長效果，且對造成成人蛀牙菌斑及蛀菌的主要細菌Streptococcus mutans，能夠抑制其生物膜的形成，抑制其此壞菌生長，就不易蛀牙！',
    conditions: ['預防蛀牙', '口腔保健', '牙齦護理', '口氣清新'],
    price: 'NT$ 700',
    specifications: '140g*3盒/組'
  },

  // 全身調理系列
  {
    series: '全身調理系列',
    name: '葡眾360計劃',
    image: '/assets/葡眾360計劃.png',
    nutrients: ['995凍乾品', '蛋草', '靈芝', '紅麴', '葡眾全身調理膠囊內容物'],
    description: '一盒套裝內含三十天份，是符合忙碌現代人營養完整，攝取方便需求的一套營養補助食品，攜帶方便，食用簡易，適合全家人一起使用，每天一包可補充營養，增加體力，維持健康，讓您保持最佳狀態。',
    conditions: ['全面營養', '免疫提升', '抗衰老', '養顏美容', '綜合調理'],
    price: 'NT$ 11,088',
    specifications: '30大包/套盒',
    awards: ['多項國際獲獎認證'],
    certifications: ['全方位營養補給認證']
  },

  // 寵物食品系列
  {
    series: '寵物食品系列',
    name: '奇芮(犬)愛犬專用益生菌粉',
    image: '/assets/奇芮愛犬專用益生菌粉.png',
    nutrients: ['膠原蛋白', '葡萄糖', '海藻糖', '乳酸菌凍乾品', 'Lactobacillus rhamnosus GG鼠李糖乳酸桿菌', 'Lactobacillus paracasei GKS6', 'Lactobacillus plantarum GKM3', 'Bifidobacterium lactis GKK2', 'Lactobacillus brevis GK3'],
    description: '專為您愛犬設計的益生菌食物配方，可沖泡或直接食用，幫助皮膚健康，使毛髮柔軟亮麗；添加葡眾王生物科技研究所多年研發的蟬花精華－能保持眼睛明亮，有益腎臟保健；特選五益菌，增進腸內菌叢平衡，幫助維持消化道機能，是毛小孩的入門保健品首選。',
    conditions: ['寵物腸道健康', '皮膚保健', '毛髮亮麗', '眼睛保健'],
    price: 'NT$ 900',
    specifications: '1.2g*75條/盒'
  }
];

// 產品系列分類
export const PRODUCT_SERIES = [
  '基本保養系列',
  '營養補充系列',
  '調理系列', 
  '特殊保健系列',
  '活力丰采系列',
  '生活保養系列',
  '全身調理系列',
  '寵物食品系列'
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
  '呼吸系統保健',
  '新陳代謝',
  '體力增強',
  '抗疲勞',
  '生理調節',
  '寵物保健'
];