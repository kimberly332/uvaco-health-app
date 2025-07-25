// 根據最新分類要求重新整理的葡眾產品系列

export const INITIAL_PRODUCTS = [
  // 基本保養系列
  {
    id: '10011',
    series: '基本保養系列',
    name: '995生技營養品',
    image: '/assets/995生技營養品.png',
    nutrients: [
      '黃豆發酵液', '全脂奶粉', '乳酸菌濃縮液(Lactobacillus brevis)', 
      'Lentix乳酸菌濃縮液(Bifidobacterium longum)', '香菇菌絲體發酵濃縮液(Lentinus edodes)', 
      '靈芝菌絲體發酵濃縮液(Ganoderma lucidum)', '異麥芽寡醣漿', '脂肪酸蔗糖酯', 
      '小麥胚芽水解物', '酵母菌粉(Saccharomyces cerevisiae)', '蔗糖素', '麥芽糊精',
      '20種游離胺基酸', '短鏈胜肽', '多醣體', '膳食纖維', '卵磷脂', '核酸', 
      '去醣基異黃酮', '維生素', '礦物質'
    ],
    description: '995生技營養品採用黃豆、小麥胚芽等天然原料，經高科技生物工程技術，將優質植物蛋白與嚴選菇菌及乳酸菌進行液態發酵熟成，生產出富含多種游離胺基酸、短鏈胜肽、多醣體、膳食纖維、卵磷脂、核酸、去醣基異黃酮、維生素、礦物質等營養成分，有助於營養補給、健康維持，尤其對病後之補養有良好幫助。(服用抗凝血藥品(Warfarin等)期間，不宜食用本品)',
    conditions: ['免疫力調節', '營養補充', '體力增強', '抗氧化', '新陳代謝', '血液循環', '病後補養'],
    price: 'NT$ 5,980',
    specifications: '180ml；24瓶／箱',
    productCode: '10011',
    ingredients: {
      main: [
        '黃豆發酵液',
        '全脂奶粉', 
        '乳酸菌濃縮液(Lactobacillus brevis)',
        'Lentix [乳酸菌濃縮液(Bifidobacterium longum)、香菇菌絲體發酵濃縮液(Lentinus edodes)]',
        '靈芝菌絲體發酵濃縮液(Ganoderma lucidum)'
      ],
      additives: [
        '異麥芽寡醣漿',
        '脂肪酸蔗糖酯(棕櫚酸蔗糖酯)',
        '小麥胚芽水解物',
        '酵母菌粉(Saccharomyces cerevisiae)',
        '蔗糖素(甜味劑)',
        '麥芽糊精'
      ]
    },
    healthBenefits: [
      '營養補給',
      '健康維持', 
      '病後補養',
      '免疫力調節',
      '抗氧化保護',
      '新陳代謝促進'
    ],
    warnings: [
      '服用抗凝血藥品(Warfarin等)期間，不宜食用本品'
    ]
  },
  {
    id: '10020',
    series: '基本保養系列',
    name: '永生福朗膠囊',
    image: '/assets/永生福朗膠囊.png',
    nutrients: [
      '黃豆發酵物', '靈芝菌絲體發酵液粉(Ganoderma lucidum)', '微結晶纖維素', 
      '硬脂酸鎂', '酵母菌粉(Saccharomyces cerevisiae)', '乳酸菌凍乾品(Lactobacillus brevis)',
      '小麥胚芽水解物', '二氧化矽', '麥芽糊精', '游離胺基酸', '短鏈胜肽', '多醣體', 
      '膳食纖維', '卵磷脂', '核酸', '去醣基異黃酮', '維生素', '礦物質'
    ],
    description: '本品採用黃豆、小麥胚芽等天然原料，經高科技生物工程技術，將優質植物蛋白與嚴選菇菌及乳酸菌進行發酵熟成，生產出富含多種游離胺基酸、短鏈胜肽、多醣體、膳食纖維、卵磷脂、核酸、去醣基異黃酮、維生素、礦物質等營養成分，有助於營養補給、健康維持，尤其對病後之補養有良好幫助。(服用抗凝血藥品(Warfarin等)期間，不宜食用本品)',
    conditions: ['免疫力調節', '營養補充', '體力增強', '抗氧化', '新陳代謝', '病後補養'],
    price: 'NT$ 1,770',
    specifications: '120粒／瓶',
    productCode: '10020',
    capsuleIngredients: ['明膠', '純水', '硫酸月桂酯鈉', '甘油'],
    warnings: ['服用抗凝血藥品(Warfarin等)期間，不宜食用本品']
  },
  {
    id: '10040',
    series: '基本保養系列',
    name: '樟芝益菌絲體生技營養品',
    image: '/assets/樟芝益菌絲體生技營養品.png',
    nutrients: [
      '樟芝菌絲體發酵液(Antrodia cinnamomea)', '舞茸子實體萃取液(Grifola frondosa)', 
      '巴西蘑菇菌絲體發酵濃縮液(Agaricus blazei Murill)', '桑黃子實體萃取液(Phellinus linteus)', 
      '雲芝菌絲體發酵濃縮液(Coriolus versicolor)', '蔗糖素', '多醣體', '腺苷(adenosine)', 
      '菌絲纖維', '維生素', '天然菸鹼酸', 'γ-胺基丁酸(GABA)', '必需胺基酸'
    ],
    description: '葡萄王生物科技研究所率先研發樟芝菌絲體液態發酵培育技術，開發出嶄新生技產品，並榮獲多項專利及肯定。本品內含樟芝、雲芝、舞茸、桑黃及巴西蘑菇五種珍貴菇類多醣體、腺苷(adenosine)、菌絲纖維、維生素、天然菸鹼酸、γ-胺基丁酸(GABA)、必需胺基酸，能滋補強身、平衡體質，為效果極佳的保健食品。',
    conditions: ['肝臟保健', '免疫調節', '抗疲勞', '解毒清肝', '抗癌防護', '滋補強身'],
    price: 'NT$ 5,980',
    specifications: '180ml；24瓶／箱',
    productCode: '10040',
    warnings: ['嬰幼兒、孕婦、哺餵母乳者如需食用本產品，請洽詢醫師或醫療專業人員']
  },
  {
    id: '10050',
    series: '基本保養系列',
    name: '康爾喜乳酸菌顆粒',
    image: '/assets/康爾喜乳酸菌顆粒.png',
    nutrients: [
      '乳糖', '玉米澱粉', '果糖粉', '乳酸菌凍乾品', '麥芽糊精', '聚糊精', 
      '異麥芽寡醣漿', '乙醇', '綜合水果香料', '檸檬酸', 'β-胡蘿蔔素',
      '13種複合式乳酸菌'
    ],
    description: '複合式乳酸菌配方，結合13株菌種優勢，並以專利包埋技術替益生菌穿上防護衣，降低胃酸及膽鹼的破壞，保持乳酸菌的酸化作用及胜肽水解活性，可改變細菌叢生態，調整體質及生理機能，有助於維持健康。',
    conditions: ['消化改善', '腸道保健', '營養吸收', '免疫調節', '體質調整'],
    price: 'NT$ 1,890',
    specifications: '90條／盒',
    productCode: '10050',
    bacteriaStrains: [
      'Lactococcus lactis', 'Bifidobacterium lactis', 'Lactobacillus acidophilus',
      'Bifidobacterium bifidum', 'Lactobacillus casei', 'Bifidobacterium breve',
      'Lactobacillus johnsonii', 'Lactobacillus plantarum', 'Lactobacillus rhamnosus GG',
      'Lactobacillus reuteri', 'Bifidobacterium longum', 'Lactobacillus fermentum',
      'Lactobacillus paracasei'
    ]
  },
  {
    id: '10060',
    series: '基本保養系列',
    name: '康爾喜(N)乳酸菌顆粒',
    image: '/assets/康爾喜(N)乳酸菌顆粒.png',
    nutrients: [
      '乳糖', '玉米澱粉', '乳酸菌凍乾品', '果糖粉', '木瓜酵素', '聚糊精', 
      '麥芽糊精', '異麥芽寡醣漿', '乙醇', '香料', '半乳寡糖', '二氧化矽', 
      '檸檬酸', '鳳梨酵素', '乳酸菌發酵濾液凍乾品(Bifidobacterium lactis)', 'β-胡蘿蔔素'
    ],
    description: '特選13種優質益生菌，對消化液深具耐受度，可通過胃酸及膽鹼的破壞，保持乳酸菌的酸化作用及胜肽水解活性，並加入生物工程中心發酵之後生元，創造有利益生菌存活環境，有助改變細菌叢生態，讓您輕鬆維持消化道機能。',
    conditions: ['消化改善', '腸道保健', '營養吸收', '免疫調節', '消化道機能'],
    price: 'NT$ 1,960',
    specifications: '90條／盒',
    productCode: '10060',
    bacteriaStrains: [
      'Bifidobacterium lactis', 'Lactobacillus rhamnosus GG', 'Lactobacillus plantarum',
      'Lactobacillus reuteri', 'Leuconostoc mesenteroides subsp. cremoris', 'Bifidobacterium longum',
      'Bifidobacterium infantis', 'Pediococcus pentosaceus', 'Lactobacillus casei',
      'Lactobacillus brevis', 'Lactobacillus acidophilus', 'Bifidobacterium bifidum',
      'Bifidobacterium adolescentis'
    ]
  },
  {
    id: '30010',
    series: '基本保養系列',
    name: '葡眾餐包沖泡飲',
    image: '/assets/葡眾餐包沖泡飲.png',
    nutrients: [
      '燕麥粉', '蔗糖', '大豆蛋白', '玉米澱粉', '蓮子雪花片', '草莓果汁粉', 
      '靈芝菌絲體發酵液粉(Ganoderma lucidum)', '亞麻仁種子粉', '紅棗萃取物', 
      '香料', '刺五加(西伯利亞人參)'
    ],
    description: '本品由天然大豆等植物性蛋白質及多種草本植物複方組成，能促進人體新陳代謝，並提供成長發育、恢復體力所需的營養，提供我們健康活力的一天，適合所有年齡層沖泡飲用。',
    conditions: ['營養補充', '體力增強', '成長發育', '新陳代謝', '健康活力'],
    price: 'NT$ 1,344',
    specifications: '30包／盒',
    productCode: '30010'
  },
  {
    id: '30020',
    series: '基本保養系列',
    name: '葡眾原味餐包沖泡飲',
    image: '/assets/葡眾原味餐包沖泡飲.png',
    nutrients: [
      '燕麥粉', '豆漿粉', '大豆蛋白', '蓮子雪花片', '紅棗萃取物', '草莓果汁粉',
      '靈芝菌絲體發酵液粉(Ganoderma lucidum)', '亞麻仁種子粉', '塔拉膠',
      '香料', '刺五加(西伯利亞人參)', '蔗糖素'
    ],
    description: '本品由天然大豆等植物性蛋白質及多種草本植物複方組成，降低碳水化合物的比例，能促進人體新陳代謝，並提供成長發育、恢復體力所需的均衡營養，使我們擁有健康活力的一天，適合所有年齡層沖泡飲用。',
    conditions: ['營養補充', '體力增強', '成長發育', '新陳代謝', '均衡營養'],
    price: 'NT$ 1,344',
    specifications: '30包／盒',
    productCode: '30020'
  },
  {
    id: '30030',
    series: '基本保養系列',
    name: '葡眾銀燦餐包沖泡飲',
    image: '/assets/葡眾銀燦餐包沖泡飲.png',
    nutrients: [
      '燕麥粉', '麥芽糊精', '綜合穀粉(黑豆、糙米、黃豆、米豆、黑芝麻、玉米、黑糯米、白芝麻、花豆)', 
      '黑芝麻粉', '塔拉膠', '二氧化矽', '香料', '柿子萃取物', '大豆蛋白', 
      '啤酒酵母(含維生素B群)(Saccharomyces cerevisiae)', 
      '巴西蘑菇菌絲體發酵液粉(Agaricus blazei Murill)', '蔗糖素'
    ],
    description: '本品嚴選綜合穀粉、黑芝麻粉與柿子精華等複方，輔以葡萄王生物科技研究所液態發酵之巴西蘑菇菌絲體，能調節生理機能、促進人體新陳代謝，特別適合中年及銀髮族群沖泡飲用，提供您健康活力、精力旺盛的一天。',
    conditions: ['中老年保健', '新陳代謝', '免疫機能', '抗病毒能力', '生理機能調節'],
    price: 'NT$ 1,480',
    specifications: '30包／盒',
    productCode: '30030'
  },

  // 清除系列
  {
    id: '20020',
    series: '清除系列',
    name: '迪康沖泡飲',
    image: '/assets/迪康沖泡飲.png',
    nutrients: [
      '麥芽糊精', '山楂', '陳皮', '炒麥芽', '枸杞', '丹參', '熟地', '人參', 
      '麥門冬', '藏紅花', '檸檬', '焦糖色素', '檸檬酸', '蔗糖素'
    ],
    description: '專為愛吃炸物、飲食油膩的外食族，以及喜愛大吃大喝聚餐紓壓的上班族所貼心設計的保健良方。由葡萄王生物科技研究所獨家研發，含人參、陳皮及枸杞等數種天然草本互助搭配，能促進新陳代謝、調整體質。每日沖泡1至2包，為您的忙碌生活增添元氣與活力。',
    conditions: ['血管清潔', '循環改善', '毒素排除', '心血管保護', '新陳代謝', '體質調整'],
    price: 'NT$ 1,764',
    specifications: '30包／盒',
    productCode: '20020',
    warnings: ['不建議孕婦食用']
  },
  {
    id: '20030',
    series: '清除系列',
    name: '力盛沖泡飲',
    image: '/assets/力盛沖泡飲.png',
    nutrients: [
      '麥芽糊精', '草決明', '黃耆', '枸杞', '桑椹', '羅漢果', 
      '靈芝子實體(Ganoderma lucidum)', '香菇子實體(Lentinus edodes)', 
      '蘆筍', '焦糖色素', '蔗糖素'
    ],
    description: '針對常吃加工與精緻食品的外食族，以及戒不掉重口味習慣者獨家研發設計。葡萄王生物科技研究所以靈芝子實體、草決明及桑椹等數種天然植萃素材調配，能促進新陳代謝、調整體質。每日沖泡1至2包，替您的健康生活做最佳營養後盾。',
    conditions: ['泌尿保健', '新陳代謝', '體內循環', '頻尿改善', '體質調整'],
    price: 'NT$ 1,764',
    specifications: '30包／盒',
    productCode: '20030'
  },
  {
    id: '50040',
    series: '清除系列',
    name: '欣悅康沖泡飲',
    image: '/assets/欣悅康沖泡飲.png',
    nutrients: [
      '糙薏仁', '黑糖', '大麦仁', '二砂糖', '紅豆', '老薑粉', '小米', 
      '乳酸菌凍乾品(Lactobacillus plantarum)', '酵母菌(Saccharomyces cerevisiae)', 
      '山藥粉', '天貝發酵物', '鳳梨酵素', '氯化鈣', '胺基乙酸'
    ],
    description: '葡萄王生物科技研究所貼心研發，添加多種調節女性生理機能之明星素材：糙薏仁、黑糖、老薑粉及紅豆等，天天飲用可溫和滋補，有助健康維持與青春美麗，是您養顏美容最佳營養補給選擇。',
    conditions: ['女性調理', '生理機能調節', '體質改善', '排毒養顏', '溫和滋補'],
    price: 'NT$ 3,100',
    specifications: '30包／盒',
    productCode: '50040',
    warnings: ['不建議懷孕期間食用']
  },
  {
    id: '40090',
    series: '清除系列',
    name: '葡眾寧康福膠囊',
    image: '/assets/葡眾寧康福膠囊.png',
    nutrients: [
      '桑黃菌絲體發酵液粉(Phellinus linteus)', '蛹蟲草菌絲體發酵液粉(Cordyceps militaris)',
      '初乳粉', '微結晶狀α-纖維素', '綠茶萃取物', '硬脂酸鎂', '二氧化矽', '墨角藻萃取粉'
    ],
    description: '現代人總是愛盯平板電腦追劇、看新聞配飯菜，滑手機聊天逛臉書，許多電子通訊產品、醫療設備及基地台等，都無聲無息存在於日常生活中。在享受便利先進的高科技生活同時，您需要特別的保健品來幫助您滋補健體。葡萄王生物科技研究所特選桑黃菌絲體、蛹蟲草粉等植萃素材，調節您的生理機能，為您的健康生活加分。',
    conditions: ['神經安定', '睡眠改善', '情緒調節', '電磁波防護', '生理機能調節'],
    price: 'NT$ 2,890',
    specifications: '120粒／瓶',
    productCode: '40090',
    capsuleIngredients: ['明膠', '純水', '硫酸月桂酯鈉', '甘油'],
    warnings: ['不建議嬰幼兒、兒童、孕婦、哺乳婦女與真菌過敏者使用']
  },

  // 調理系列
  {
    id: '40010',
    series: '調理系列',
    name: '衛傑膠囊',
    image: '/assets/衛傑膠囊.png',
    nutrients: [
      '鼠李糖乳酸菌粉(Lactobacillus rhamnosus GG)', '加氏乳酸菌粉(Lactobacillus gasseri)',
      '山藥粉', '硬脂酸鎂', '玉米澱粉', '猴頭菇子實體粉(Hericium erinaceus)', '茯苓粉',
      '黏性多醣', '消化酵素'
    ],
    description: '猴頭菇、山藥、茯苓富含黏性多醣及消化酵素，自古便是著名的滋補養生食材。以天然複方食材，搭配用最新菌種分離技術篩選之LG及LR乳酸菌，運用乳酸菌高活性培養技術，提取高純度與活性的乳酸菌，發揮最佳保健效果。經人體實驗證實，獲得衛生福利部健康食品認證。',
    conditions: ['男性保健', '體力增強', '精神旺盛', '消化系統保健', '胃部保健'],
    price: 'NT$ 1,260',
    specifications: '100粒／瓶',
    productCode: '40010',
    capsuleIngredients: ['明膠', '純水', '硫酸月桂酯鈉', '甘油'],
    healthClaim: '經人體食用研究結果：「有助於減少胃幽門螺旋桿菌之數量」',
    bacteriaCount: '每份衛傑膠囊出廠時菌數可達三十億以上'
  },
  {
    id: '40040',
    series: '調理系列',
    name: '百克斯膠囊',
    image: '/assets/百克斯膠囊.png',
    nutrients: [
      '蝙蝠蛾擬青黴菌絲體發酵液粉(Paecilomyces hepiali)', '玉米澱粉', '黑棗萃取物',
      '黨參萃取物', '薄荷萃取物', '靈芝液態發酵菌絲體萃取物(Ganoderma lucidum)',
      '甘草萃取物', '冬蟲夏草菌絲體發酵液凍乾粉(中華被毛孢 Hirsutella sinensis)',
      '硬脂酸鎂', '菊花萃取物'
    ],
    description: '都市生活中有許多您看不見的隱形殺手，研發團隊特別將珍貴的冬蟲夏草菌絲體(中華被毛孢)搭配蝙蝠蛾擬青黴，以傳統漢方常用的保健成分，輔以黨參、靈芝、甘草等複方，可滋補強身、調整體質，是現代人生活之必備良伴。',
    conditions: ['呼吸系統保健', '抗空汙', '免疫提升', '滋補強身', '體質調整'],
    price: 'NT$ 1,386',
    specifications: '100粒／瓶',
    productCode: '40040',
    capsuleIngredients: ['明膠', '純水', '硫酸月桂酯鈉', '甘油'],
    warnings: ['本產品非中藥材冬蟲夏草之製品']
  },
  {
    id: '40050',
    series: '調理系列',
    name: '康貝寧膠囊',
    image: '/assets/康貝寧膠囊.png',
    nutrients: [
      '蜜環菌菌絲體發酵液粉(Armillaria mellea)', '玉米澱粉', 'L-色胺酸', '茯苓粉',
      '紅棗萃取物', '當歸萃取物', '麩胺酸發酵物粉', '五味子萃取物', '桔梗萃取物',
      '生地萃取物', '熟地萃取物', '人參萃取物', '二氧化矽', '硬脂酸鎂'
    ],
    description: '面對龐大的生活壓力、工作煩惱等因素，容易影響睡眠品質，若身體未得到充分的休息，對健康也連帶造成影響，因此貼心研發幫助入睡、促進新陳代謝、調整體質及生理機能的保健食品。',
    conditions: ['兒童發育', '學習力提升', '腸道健康', '睡眠品質', '壓力調節'],
    price: 'NT$ 1,880',
    specifications: '100粒／瓶',
    productCode: '40050',
    capsuleIngredients: ['明膠', '純水', '硫酸月桂酯鈉', '甘油'],
    warnings: ['不建議懷孕及哺乳期食用']
  },
  {
    id: '40060',
    series: '調理系列',
    name: '葡眾貝納Q10膠囊',
    image: '/assets/葡眾貝納Q10膠囊.png',
    nutrients: [
      '微結晶狀α-纖維素', '紅麴粉(Monascus purpureus)', '薑黃萃取物',
      '樟芝菌絲體發酵液粉(Antrodia cinnamomea)', '納豆菌發酵物(含納豆激酶)',
      '麥芽糊精', '硬脂酸鎂', '輔酵素Q10', '油橄欖果實渣萃取物(含羥基酪醇)', '磷酸鈣'
    ],
    description: '現代人由於生活步調緊湊，三餐為求方便，常常無法選擇營養均衡的食物來源，讓不正常的飲食習慣漸漸加重身體負擔。本品運用納豆、薑黃及輔酵素Q10，幫助促進新陳代謝、維持正常生理機能。',
    conditions: ['心血管保護', '抗氧化', '能量代謝', '新陳代謝', '生理機能維持'],
    price: 'NT$ 3,180',
    specifications: '120粒／瓶',
    productCode: '40060',
    capsuleIngredients: ['明膠', '純水', '硫酸月桂酯鈉', '甘油'],
    warnings: [
      '15歲以下小孩、懷孕或哺乳期間婦女及服用抗凝血藥品(Warfarin)之病患不宜食用',
      '嬰幼兒、孕婦、哺餵母乳者需食用本產品，請洽詢醫師或醫療專業人員'
    ]
  },
  {
    id: '40070',
    series: '調理系列',
    name: '貝力耐膠囊',
    image: '/assets/貝力耐膠囊.png',
    nutrients: [
      '葡萄糖胺鹽酸鹽', '碳酸鈣', '大豆酪梨油萃取物', '軟骨素', '膠原蛋白',
      '碳酸鎂', '微結晶狀α-纖維素', '酪蛋白水解物', '葡萄糖酸鋅', '麥芽糊精',
      '啤酒酵母(Saccharomyces cerevisiae)', '硬脂酸鎂', '葡萄糖酸錳', '葡萄糖酸銅', '納豆菌發酵物'
    ],
    description: '本品以高純度的葡萄糖胺，特別添加大豆酪梨油萃取物、酪蛋白水解物及微量元素，複合配方設計更能發揮協同作用。食用貝力耐膠囊再配合良好的生活習慣及正確運動，可有效提升您的生活品質。',
    conditions: ['關節保健', '骨骼強化', '軟骨修復', '運動保健', '活動力提升'],
    price: 'NT$ 2,646',
    specifications: '120粒／瓶',
    productCode: '40070',
    capsuleIngredients: ['明膠', '純水', '硫酸月桂酯鈉', '甘油']
  },
  {
    id: '40080',
    series: '調理系列',
    name: '清明亮膠囊',
    image: '/assets/清明亮膠囊.png',
    nutrients: [
      '熟地萃取物', '玉米澱粉', '枸杞萃取物', '葡萄籽萃取物',
      '山桑子萃取物', '綠花椰菜苗萃取物', '葉黃素(金盞花萃取物)',
      '二氧化矽', '硬脂酸鎂', '菊花萃取物', '花青素', '葡萄多酚', '玉米黃素'
    ],
    description: '利用高科技生物工程技術，萃取金盞花中的葉黃素及玉米黃素，提供人體無法自行合成之營養素。輔以菊花、枸杞、熟地等中藥萃取物外，特別添加素有「歐洲藍莓」之稱的山桑子，含有珍貴的花青素成分，以及自葡萄籽中珍貴的葡萄多酚，特別推薦長時間使用3C產品的大小朋友食用。',
    conditions: ['眼睛保健', '視力保護', '抗藍光', '3C護眼', '視覺保健'],
    price: 'NT$ 3,500',
    specifications: '120粒／瓶',
    productCode: '40080',
    capsuleIngredients: ['明膠', '純水', '硫酸月桂酯鈉', '甘油']
  },
  {
    id: '40100',
    series: '調理系列',
    name: '葡眾活逸康猴頭菇菌絲體顆粒',
    image: '/assets/葡眾活逸康猴頭菇菌絲體顆粒.png',
    nutrients: [
      'D-甘露醇(甜味劑)', '猴頭菇液態發酵菌絲體凍乾粉(Hericium erinaceus)',
      '乳糖', '丹參萃取物', '玉米澱粉', '麥芽糊精', '乙醇', '桂圓萃取液',
      '甘草萃取物', '米萃取物(γ-穀維素、米麩粉)', '綠茶萃取物', '薑黃萃取物',
      '猴頭菇素A(Erinacine A)'
    ],
    description: '本品是葡萄王生物科技研究所運用優良猴頭菇菌種(Hericium erinaceus)，以頂尖液態發酵深層培育法，培養出菌絲體特殊有效成分 - 猴頭菇素A(Erinacine A)，藉此榮獲專利及多國競賽的肯定！添加丹參萃取物、薑黃萃取物及米萃取物(含γ-Oryzanol)等成分，為滋補養生最佳食品。',
    conditions: ['腦部保健', '神經保護', '記憶力提升', '認知功能', '滋補養生'],
    price: 'NT$ 5,796',
    specifications: '90條／盒',
    productCode: '40100',
    warnings: ['不建議懷孕期間食用']
  },
  {
    id: '40110',
    series: '調理系列',
    name: '葡眾樂優乳酸菌顆粒',
    image: '/assets/葡眾樂優乳酸菌顆粒.png',
    nutrients: [
      '玉米澱粉', '乳糖', '白芝麻粉', '麥芽糊精', '杏仁粉', 
      '乳酸菌凍乾品(Lactobacillus plantarum GK05、Lactobacillus rhamnosus GG、Lactobacillus fermentum GK33、Lactobacillus acidophilus GKSW)',
      '五味子萃取物', '芝麻萃取物', '薑黃萃取物', '生薑萃取物', '蔗糖素'
    ],
    description: '本品嚴選優質益生菌種，為產學合作創新研發之新時代商品，因應國人應酬頻繁且飲食不均之現況，為外食族維持正常生理機能之保健首選。',
    conditions: ['膳食纖維', '益生菌', '消化酵素', '應酬保健', '外食族保健'],
    price: 'NT$ 2,100',
    specifications: '90條／盒',
    productCode: '40110'
  },
  {
    id: '40120',
    series: '調理系列',
    name: '扶百生膠囊',
    image: '/assets/扶百生膠囊.png',
    nutrients: [
      '玉米澱粉', '馬卡萃取物', '微結晶狀α-纖維素', '黃精萃取物', '杜仲葉萃取物',
      '管花肉蓯蓉萃取物', '冬蟲夏草菌絲體發酵液凍乾粉(中華被毛孢 Hirsutella sinensis)',
      '生地萃取物', '透納葉萃取物', '硬脂酸鎂', '二氧化矽', '阿拉伯膠', '羧甲基纖維素鈉'
    ],
    description: '本品運用馬卡、管花肉蓯蓉、冬蟲夏草及透納葉的黃金組合，輔以多種草本素材，可滋補強身、增強體力，幫助您精神旺盛，充滿青春活力，是為男性貼心研發的營養補充品。',
    conditions: ['免疫調節', '抗疲勞', '精神提振', '男性保健', '滋補強身'],
    price: 'NT$ 2,005',
    specifications: '100粒／瓶',
    productCode: '40120',
    capsuleIngredients: ['明膠', '純水', '硫酸月桂酯鈉', '甘油'],
    warnings: [
      '本產品非中藥材冬蟲夏草之製品',
      '嬰幼兒、孕婦、哺乳期婦女及服用抗凝血功能藥物者不宜食用'
    ]
  },
  {
    id: '40130',
    series: '調理系列',
    name: '醣利佳膠囊',
    image: '/assets/醣利佳膠囊.png',
    nutrients: [
      '微結晶狀α-纖維素', '桑黃菌絲體發酵液粉(Phellinus linteus)',
      '乳酸菌凍乾品(Lactobacillus reuteri GKD2、Lactobacillus plantarum GKM3)',
      '白腎豆抽出物', '硬脂酸鎂', '蘋果萃取物', '苦瓜萃取粉(含胜肽)',
      '二氧化矽', '阿拉伯膠', '紫米萃取物', '麥芽糊精'
    ],
    description: '現代人愛以聚餐及享受美食的方式紓壓，本品專門嚴選由生物科技研究所培育之桑黃菌絲體及活性乳酸菌等，能調節生理機能、促進新陳代謝，是您健康維持的最佳營養補給來源。',
    conditions: ['血糖調節', '新陳代謝', '體重管理', '生理機能調節'],
    price: 'NT$ 2,330',
    specifications: '100粒／瓶',
    productCode: '40130',
    capsuleIngredients: ['明膠', '純水', '硫酸月桂酯鈉', '甘油'],
    warnings: ['本品含桑黃菌絲體，嬰幼兒、孕婦及哺乳婦女不宜食用']
  },
  {
    id: '40140',
    series: '調理系列',
    name: '暢且利膠囊',
    image: '/assets/暢且利膠囊.png',
    nutrients: [
      '微結晶狀α-纖維素', '亞麻籽萃取物', '麥芽糊精', '南瓜籽萃取物',
      '二氧化矽', '蛹蟲草菌絲體發酵液粉(Cordyceps militaris)', '牛蒡萃取粉',
      '硬脂酸鎂', '鋅酵母', '硒酵母', '沙棘果萃取物'
    ],
    description: '選用亞麻籽、南瓜籽及蛹蟲草等男性補充良方，幫助調節生理機能，滋補強身。搭配微量元素鋅，為胰島素及多種酵素的成分之一，有助於維持生長發育與生殖機能，是為男性貼心研發的營養補充品。',
    conditions: ['男性保健', '生殖機能', '泌尿保健', '滋補強身'],
    price: 'NT$ 1,764',
    specifications: '100粒／瓶',
    productCode: '40140',
    capsuleIngredients: ['明膠', '純水', '硫酸月桂酯鈉', '甘油'],
    warnings: ['不建議嬰幼兒、兒童、孕婦與真菌過敏者使用']
  },
  {
    id: '40150',
    series: '調理系列',
    name: '康悅兒乳酸菌顆粒',
    image: '/assets/康悅兒乳酸菌顆粒.png',
    nutrients: [
      '乳糖', '玉米澱粉', '乳酸菌凍乾品(Lactobacillus brevis GKJOY、Lactobacillus fermentum GKF3)',
      '果糖粉', '麥芽糊精', '乙醇', '異麥芽寡醣漿', '聚糊精', '香料',
      '檸檬酸', '二氧化矽', 'β-胡蘿蔔素', '甜橙萃取物'
    ],
    description: '經葡萄王生物科技研究所研發團隊，多次實驗而得的陽光益生菌，其活力配方專為家庭操勞、為工作奉獻心力，以及求學努力奮鬥的族群設計。每天3條為您的健康補給快樂與正向營養。',
    conditions: ['兒童腸道健康', '營養吸收', '免疫提升', '陽光益生菌'],
    price: 'NT$ 1,764',
    specifications: '90條／盒',
    productCode: '40150'
  },
  {
    id: '40160',
    series: '調理系列',
    name: '小悅光飲',
    image: '/assets/小悅光飲.png',
    nutrients: [
      '水', '蔗糖', '藍莓發酵液', '藍莓濃縮汁', '乳酸鈣', '西印度櫻桃粉',
      '葉黃素(金盞花萃取物)', '金盞花萃取物(含玉米黃素)', '香料', '檸檬酸',
      '玉米糖膠', '維生素C', '維生素K2', '檸檬酸鈉', '結蘭膠',
      '啤酒酵母(含維生素D)(Saccharomyces cerevisiae)'
    ],
    description: '葡萄王生技最新研發出的複方葉黃素精純飲品，嚴選自食物提煉的維生素及礦物質，以清爽柑橘風味調配，適合1歲以上小朋友、學齡兒童、青少年及成人日常營養補給。選用輕便好攜帶的軟袋包裝，搭配吸睛玩偶塗鴉設計，撕開即飲，特別推薦給孩童及有膠囊吞嚥障礙的族群。',
    conditions: ['眼睛保健', '兒童營養', '維生素補充', '護眼飲品'],
    price: 'NT$ 1,400',
    specifications: '20ml；15包／盒',
    productCode: '40160',
    suitableAge: '適合1歲以上兒童及成人飲用'
  },
  {
    id: '40170',
    series: '調理系列',
    name: '青采孅膠囊',
    image: '/assets/青采孅膠囊.png',
    nutrients: [
      '幾丁聚糖', '微結晶狀α-纖維素', '藤黃果抽出物', '綠茶萃取物',
      '啤酒酵母(含維生素B群)(Saccharomyces cerevisiae)', 
      '乳酸菌凍乾品(Lactobacillus paracasei GKS6)', '硬脂酸鎂', '二氧化矽'
    ],
    description: '精選配方專給餐餐外食的您，優選植萃搭配活性乳酸菌，在享用美食的同時，提供調整體質的優質營養素，促進新陳代謝，讓飽足感UPUP。搭配正確飲食觀念及良好生活與運動習慣，是您健康維持不可或缺的最佳營養補給選擇。',
    conditions: ['體重管理', '新陳代謝', '體質調整', '外食族保健'],
    price: 'NT$ 2,180',
    specifications: '100粒／瓶',
    productCode: '40170',
    capsuleIngredients: ['明膠', '純水', '硫酸月桂酯鈉', '甘油'],
    warnings: [
      '不建議孕婦、授乳者及嬰幼兒食用',
      '有服用慢性病藥物者，應諮詢醫師後，方可食用'
    ]
  },
  {
    id: '40180',
    series: '調理系列',
    name: '艾逸膠囊',
    image: '/assets/艾逸膠囊.png',
    nutrients: [
      '微結晶狀α-纖維素', '靈芝菌絲體發酵液粉(Ganoderma lucidum)', '陳皮萃取物',
      '桑椹萃取物', '麥芽糊精', '玉米澱粉', '珍珠粉', '亞麻仁種子粉',
      '硬脂酸鎂', '亞麻籽萃取物', '二氧化矽', '黃耆萃取物', '當歸萃取物', '黨參萃取物'
    ],
    description: '配方額外添加珍珠粉、當歸、亞麻仁與桑椹等珍貴機能性成分，補充養顏美容所需營養素，更強調體質調整；多項漢方草本元素，為您注入元氣、使您常保容光煥發之姿，青春美麗。',
    conditions: ['女性保健', '生理調節', '美容護膚', '體質調整', '養顏美容'],
    price: 'NT$ 1,344',
    specifications: '100粒／瓶',
    productCode: '40180',
    capsuleIngredients: ['明膠', '純水', '硫酸月桂酯鈉', '甘油']
  },
  {
    id: '40190',
    series: '調理系列',
    name: '禾玥膠囊',
    image: '/assets/禾玥膠囊.png',
    nutrients: [
      '微結晶狀α-纖維素', '玉米澱粉', '紅棗萃取物', '山楂萃取物',
      '紅葡萄葉萃取物', '靈芝菌絲體發酵液粉(Ganoderma lucidum)', '生薑萃取物',
      '硬脂酸鎂', '二氧化矽', '葡萄糖', '山竹果抽出物', '甜橙萃取物', '糊精'
    ],
    description: '特選紅葡萄葉、生薑、山竹果及甜橙等植物萃取，含靈芝多醣等多種營養素，調節生理機能、強化促進新陳代謝，有助您日常健康維持。',
    conditions: ['綜合保健', '體質調理', '營養補給', '新陳代謝', '生理機能調節'],
    price: 'NT$ 1,276',
    specifications: '100粒／瓶',
    productCode: '40190',
    capsuleIngredients: ['明膠', '純水', '硫酸月桂酯鈉', '甘油']
  },
  {
    id: '40200',
    series: '調理系列',
    name: '衛傑膠囊(奶素)',
    image: '/assets/衛傑膠囊.png',
    nutrients: [
      '鼠李糖乳酸菌粉(Lactobacillus rhamnosus GG)', '加氏乳酸菌粉(Lactobacillus gasseri)',
      '山藥粉', '硬脂酸鎂', '玉米澱粉', '猴頭菇子實體粉(Hericium erinaceus)', '茯苓粉'
    ],
    description: '猴頭菇、山藥、茯苓富含黏性多醣及消化酵素，自古便是著名的滋補養生食材。以天然複方食材，搭配用最新菌種分離技術篩選之LG及LR 乳酸菌，運用乳酸菌高活性培養技術，提取高純度與活性的乳酸菌，發揮最佳保健效果。',
    conditions: ['男性保健', '體力增強', '精神旺盛', '消化系統保健', '胃部保健'],
    price: 'NT$ 1,260',
    specifications: '90粒／瓶',
    productCode: '40200',
    capsuleIngredients: ['羥丙基甲基纖維素', '純水', '鹿角菜膠', '氯化鉀']
  },
  {
    id: '40210',
    series: '調理系列',
    name: '百克斯膠囊(純素)',
    image: '/assets/百克斯膠囊.png',
    nutrients: [
      '蝙蝠蛾擬青黴菌絲體發酵液粉(Paecilomyces hepiali)', '玉米澱粉', '黑棗萃取物',
      '黨參萃取物', '薄荷萃取物', '靈芝液態發酵菌絲體萃取物(Ganoderma lucidum)',
      '甘草萃取物', '冬蟲夏草菌絲體發酵液凍乾粉(中華被毛孢 Hirsutella sinensis)',
      '硬脂酸鎂', '菊花萃取物'
    ],
    description: '都市生活中有許多您看不見的隱形殺手，研發團隊特別將珍貴的冬蟲夏草菌絲體( 中華被毛孢) 搭配蝙蝠蛾擬青黴，以傳統漢方常用的保健成分，輔以黨參、靈芝等複方，可滋補強身、調整體質，是現代人生活之必備良伴。',
    conditions: ['呼吸系統保健', '抗空汙', '免疫提升', '滋補強身', '體質調整'],
    price: 'NT$ 1,386',
    specifications: '90粒／瓶',
    productCode: '40210',
    warnings: ['本產品非中藥材冬蟲夏草之製品']
  },
  {
    id: '40220',
    series: '調理系列',
    name: '清明亮膠囊(純素)',
    image: '/assets/清明亮膠囊.png',
    nutrients: [
      '熟地萃取物', '玉米澱粉', '枸杞萃取物', '葡萄籽萃取物',
      '山桑子萃取物', '綠花椰菜苗萃取物', '葉黃素(金盞花萃取物)',
      '二氧化矽', '硬脂酸鎂', '菊花萃取物'
    ],
    description: '利用高科技生物工程技術，萃取金盞花中的葉黃素及玉米黃素，提供人體無法自行合成之營養素。輔以菊花、枸杞、熟地等中藥萃取物外，特別添加素有「歐洲藍莓」之稱的山桑子，含有珍貴的花青素成分，以及自葡萄籽中珍貴的葡萄多酚，特別推薦長時間使用3C 產品的大小朋友食用。素食膠囊選用植物纖維素及鹿角菜膠所製成的，讓素食夥伴們更方便食用。',
    conditions: ['眼睛保健', '視力保護', '抗藍光', '3C護眼', '視覺保健'],
    price: 'NT$ 3,500',
    specifications: '115粒／瓶',
    productCode: '40220',
    capsuleIngredients: ['羥丙基甲基纖維素', '純水', '鹿角菜膠', '氯化鉀']
  },
  {
    id: '40230',
    series: '調理系列',
    name: '艾逸膠囊(純素)',
    image: '/assets/艾逸膠囊.png',
    nutrients: [
      '微結晶狀α-纖維素', '靈芝菌絲體發酵液粉(Ganoderma lucidum)', '陳皮萃取物',
      '桑椹萃取物', '麥芽糊精', '玉米澱粉', '亞麻仁種子粉', '硬脂酸鎂',
      '亞麻籽萃取物', '二氧化矽', '余甘子萃取物', '黃耆萃取物', '當歸萃取物', '黨參萃取物'
    ],
    description: '配方額外添加余甘子、當歸、亞麻仁與桑椹等珍貴機能性成分，補充養顏美容所需營養素，更強調體質調整；多項漢方草本元素，為您注入元氣、使您常保容光煥發之姿，青春美麗。素食膠囊選用植物纖維素及鹿角菜膠所製成的，並以純素的余甘子取代珍珠粉，讓素食夥伴們更方便食用。',
    conditions: ['女性保健', '生理調節', '美容護膚', '體質調整', '養顏美容'],
    price: 'NT$ 1,344',
    specifications: '90粒／瓶',
    productCode: '40230',
    capsuleIngredients: ['羥丙基甲基纖維素', '純水', '鹿角菜膠', '氯化鉀']
  },
  {
    id: '40240',
    series: '調理系列',
    name: '葡眾猴頭菇菌絲體膠囊',
    image: '/assets/葡眾猴頭菇菌絲體膠囊.png',
    nutrients: [
      '猴頭菇菌絲體粉(Hericium erinaceus)', '二氧化矽', '硬脂酸鎂',
      '猴頭素A(Erinacine A)'
    ],
    description: '葡萄王生物科技研究所多年來持續不懈地發掘、鑽研與培育許多特殊菌種並改良精進，將特有素材執行功效驗證。本品中的優質猴頭菇菌種(Hericium erinaceus)，獲多國專利及數十項國內外發明展競賽肯定。',
    conditions: ['腦部保健', '神經保護', '記憶力提升', '認知功能', '延緩衰老'],
    price: 'NT$ 3,700',
    specifications: '90粒／瓶',
    productCode: '40240',
    capsuleIngredients: ['羥丙基甲基纖維素', '純水', '鹿角菜膠', '氯化鉀'],
    healthClaim: '經基因遺傳型老化動物模式實驗結果顯示，本產品有助於延緩衰老之功效',
    activeIngredient: '含猴頭素A (Erinacine A) 1.32-1.98 mg/粒'
  },
  {
    id: '40250',
    series: '調理系列',
    name: '紓衛菓軟糖',
    image: '/assets/紓衛菓軟糖.png',
    nutrients: [
      '麥芽糖醇糖漿(甜味劑)', '巴糖醇(甜味劑)', '棕櫚核仁油',
      '仙人掌橄欖葉複合萃取物', '複方甜味劑', 'D-山梨醇液70%(甜味劑)',
      '明膠', '香料', '檸檬酸', 'DL-蘋果酸', '脂肪酸蔗糖酯',
      '猴頭菇液態發酵菌絲體凍乾粉(Hericium erinaceus)'
    ],
    description: '以特殊的軟糖型態將保養素材包覆其中，本品選用專利素材仙人掌及橄欖葉萃取及猴頭菇菌絲體，雙重搭配，適合壓力大、且喜歡食用甜食、濃茶或其他刺激物者，有助於維持消化道機能。選用代糖配方，無額外加糖不必擔心熱量負擔。',
    conditions: ['消化道保健', '壓力調節', '腸胃保健', '代糖配方'],
    price: 'NT$ 700',
    specifications: '15顆／袋',
    productCode: '40250'
  },
  {
    id: '40260',
    series: '調理系列',
    name: '康爾暢乳酸菌菌球顆粒',
    image: '/assets/康爾暢乳酸菌菌球顆粒.png',
    nutrients: [
      '康爾暢乳酸菌凍乾品(Lactobacillus plantarum GKM3、Lactobacillus rhamnosus GKLC1、Lactobacillus reuteri GKR12、Lactobacillus brevis GKL93、Lactobacillus casei GKC15、Lactobacillus acidophilus GKA72、Pediococcus pentosaceus GKP4、Bifidobacterium longum GKL74、Bifidobacterium lactis GKK26、Bifidobacterium bifidum GKB2、Bifidobacterium adolescentis GKA5、Bacillus mesentericus GKM7、Clostridium butyricum GKB71)'
    ],
    description: '採用全菌體劑型，無任何添加物及賦形劑，顆粒型態減少嗆噎及吞嚥困難問題，並以高規格菌數問市，每日一條即可達到保健需求。讓您最寶貝的親友家人可以輕鬆食用，幫助消化，以及維持消化道機能。',
    conditions: ['腸道健康', '消化改善', '排便順暢', '全家保健'],
    price: 'NT$ 2,050',
    specifications: '30條／盒',
    productCode: '40260'
  },
  {
    id: '40270',
    series: '調理系列',
    name: '康爾動乳酸菌菌球顆粒',
    image: '/assets/康爾動乳酸菌菌球顆粒.png',
    nutrients: [
      '康爾動乳酸菌凍乾品(Lactobacillus plantarum GKM3、Lactobacillus brevis GKEX、Bifidobacterium lactis GKK24、Clostridium butyricum GKB7)',
      '桑黃菌絲體發酵液粉(Sanghuangporus sanghuang)'
    ],
    description: '採用全菌體劑型，無任何添加物及賦形劑，顆粒型態減少嗆噎及吞嚥困難問題，並以高規格菌數問市，每日一條即可達到保健需求。專為愛好運動族群打造，適合欲提升運動表現及追求精實線條者選用。',
    conditions: ['關節保健', '骨骼強化', '活動力提升', '運動保健'],
    price: 'NT$ 1,950',
    specifications: '30條／盒',
    productCode: '40270',
    warnings: ['本品含桑黃菌絲體，嬰幼兒、孕婦及哺乳婦女不宜食用']
  },

  // 活力丰采系列
  {
    id: '50030',
    series: '活力丰采系列',
    name: '葡眾靚妍飲',
    image: '/assets/葡眾靚妍飲.png',
    nutrients: [
      '水', '金針菇乳酸菌菁華液', '蘋果濃縮汁', 'N-乙醯基-D-葡萄糖胺',
      '蔓越莓濃縮汁', '乳酸菌麩胺酸發酵物(含GABA)', '洛神花萼萃取物',
      '檸檬酸', '維生素C', '多磷酸鈉', 'L-穀胱甘肽', '玉米糖膠',
      '茶胺酸', '米胚芽萃取物', '乙醇', '異抗壞血酸鈉', '蔗糖素', '香料'
    ],
    description: '葡萄王生物科技研究所以數十年專研的菇蕈醱酵技術，提煉出獨特菁純成分，搭配多種美容濃縮精華與呵護女性素材－洛神花萼萃取及蔓越莓濃縮汁，讓您擁有青春自信。特別添加維生素C，能促進膠原蛋白的形成、有助於維持細胞排列的緊密性並具抗氧化作用，兼具養顏美容機能及酸甜美味口感，青春配方升級，是現代女性最佳日常保健聖品。',
    conditions: ['美容養顏', '女性調理', '抗氧化', '生理機能調節', '膠原蛋白促進'],
    price: 'NT$ 2,150',
    specifications: '20ml；15包／盒',
    productCode: '50030',
    warnings: ['對穀胱甘肽過敏者、孕婦、哺乳婦女、嬰幼兒及對本品成分過敏者應避免食用']
  },
  {
    id: '50050',
    series: '活力丰采系列',
    name: '芯潤飲',
    image: '/assets/芯潤飲.png',
    nutrients: [
      '水', '西印度櫻桃粉', '蘋果濃縮汁', '桃濃縮汁', '香料',
      '越桔萃取物', '檸檬酸', '胺基乙酸', 'DL-蘋果酸', '玉米糖膠',
      '檸檬酸鈉', '洋菜薊抽出物', '乳酸菌發酵液(Bifidobacterium breve GKV1)', '蔗糖素'
    ],
    description: '以葡萄王生物科技研究所專業研發－Bifidobacterium breve GKV1乳酸菌發酵液為特色素材，輔以多種養顏美容精華成分－洋菜薊抽出物及越桔萃取等，是您維持青春美麗的雪亮秘訣。獨特玫瑰與水蜜桃風味，選用輕巧好攜帶的質感軟袋包裝，讓您隨時即飲美麗不中斷。',
    conditions: ['美容保健', '抗氧化', '青春美麗', '女性保養', '眼部保健'],
    price: 'NT$ 2,150',
    specifications: '20ml；15包／盒',
    productCode: '50050'
  },

  // 生活保養系列
  {
    id: '80030',
    series: '生活保養系列',
    name: '蘆露蘆薈膠',
    image: '/assets/蘆露蘆薈膠.png',
    nutrients: ['四大自然植物萃取', '庫拉索蘆薈', '金盞花', '神聖藻', '克拉瑪湖藍綠藻'],
    description: '含有大量多醣體的庫拉索蘆薈，可幫助皮膚補水保濕舒緩肌膚乾燥，結合生物科技精華原料。',
    conditions: ['肌膚修復', '保濕舒緩', '抗敏修復'],
    price: 'NT$ 700',
    specifications: '50g；3支／盒',
    productCode: '80030'
  },
  {
    id: '80040',
    series: '生活保養系列',
    name: 'Hi Kiss+平衡洗面乳',
    image: '/assets/HiKiss平衡洗面乳.png',
    nutrients: ['神聖藻萃取', 'GKM3發酵液', '透明質酸', '仙人掌花萃取物'],
    description: '添加神聖藻、透明質酸及仙人掌花萃取物等保濕成分，在溫和洗淨臉部多餘皮脂及髒汙時，還能滋潤肌膚。',
    conditions: ['肌膚清潔', '保濕滋潤', '溫和潔淨'],
    price: 'NT$ 700',
    specifications: '130g；1支／盒',
    productCode: '80040'
  },
  {
    id: '80050',
    series: '生活保養系列',
    name: '蟬花護手霜',
    image: '/assets/蟬花護手霜.png',
    nutrients: ['蟬花萃取', '保濕成分'],
    description: '蟬花護手霜提供手部肌膚深層滋潤與保護。',
    conditions: ['手部保養', '肌膚滋潤'],
    price: 'NT$ 840',
    specifications: '30g；3支／盒',
    productCode: '80050'
  },
  {
    id: '80060',
    series: '生活保養系列',
    name: '蘆露180g',
    image: '/assets/蘆露蘆薈膠.png',
    nutrients: ['庫拉索蘆薈', '天然植物萃取'],
    description: '大容量蘆薈膠，全家適用的肌膚保養聖品。',
    conditions: ['肌膚修復', '保濕舒緩'],
    price: 'NT$ 840',
    specifications: '180g；1支／盒',
    productCode: '80060'
  },
  {
    id: '80070',
    series: '生活保養系列',
    name: '淨膚皂',
    image: '/assets/淨膚皂.png',
    nutrients: ['天然植物皂基', '溫和清潔成分'],
    description: '溫和天然的植物皂基配方，適合全家使用。',
    conditions: ['肌膚清潔', '溫和洗淨'],
    price: 'NT$ 870',
    specifications: '95g；3盒／組',
    productCode: '80070'
  },
  {
    id: '90020',
    series: '生活保養系列',
    name: 'Ya Ya Mini舒緩膏',
    image: '/assets/YaYaMini舒緩膏.png',
    nutrients: ['樟芝菌絲體發酵液粉', '尤加利', '丁香', '茶樹精油', '輔酶Q10', '凡士林'],
    description: '精選植物精華，以複合草本花香精油調配，氣味清爽怡人，輕鬆塗抹於肌膚能舒緩壓力。',
    conditions: ['舒緩壓力', '肌膚修護', '提神醒腦'],
    price: 'NT$ 1,400',
    specifications: '7g；6瓶／盒',
    productCode: '90020'
  },
  {
    id: '90030',
    series: '生活保養系列',
    name: 'Hi Spray清新噴霧',
    image: '/assets/HiSpray清新噴霧.png',
    nutrients: ['乳酸菌發酵液', '百里香', '薄荷'],
    description: '添加葡萄王生物科技研究所特製乳酸菌發酵液素材，溫和薄荷味，能去除口中異味，保持口氣清新及維護口腔健康。',
    conditions: ['口腔清新', '去除異味', '維護口腔健康'],
    price: 'NT$ 570',
    specifications: '10ml；3瓶／盒',
    productCode: '90030'
  },
  {
    id: '90040',
    series: '生活保養系列',
    name: '貝益潔護效牙膏',
    image: '/assets/貝益潔護效牙膏.png',
    nutrients: ['乳酸菌發酵液', '木醣醇', '氟化鈉', '山梨醇', '百里香'],
    description: '葡萄王生物科技研究所特製-獨家特有乳酸菌發酵液GK4，對高達13種口腔壞菌有抑制生長效果。',
    conditions: ['預防蛀牙', '口腔保健', '牙齦護理', '口氣清新'],
    price: 'NT$ 700',
    specifications: '140g；3盒／組',
    productCode: '90040'
  },

  // 全身調理系列
  {
    id: '60010',
    series: '全身調理系列',
    name: '葡眾360計劃',
    image: '/assets/葡眾360計劃.png',
    nutrients: [
      '葡眾原味餐包2包', '康爾喜乳酸菌顆粒3條', '迪康1包', '葡眾全身調理膠囊2包',
      '黃豆發酵物', '靈芝子實體萃取粉(Ganoderma lucidum)', '紅麴粉(Monascus peurpureus)',
      '冬蟲夏草菌絲體發酵液凍乾粉(中華被毛孢Hirsutella sinensis)'
    ],
    description: '以美味營養兼具的葡眾原味餐包搭配益生菌康爾喜、促進新陳代謝的迪康及全身調理膠囊，為您的健康打造全方面保健計劃，一盒套裝內含三十天份單日包裝，符合忙碌現代人之營養需求。攜帶方便、食用簡易，每天一份，有助營養補充、增強體力、維持健康。',
    conditions: ['全面營養', '免疫提升', '抗衰老', '養顏美容', '綜合調理'],
    price: 'NT$ 11,088',
    specifications: '30包／盒',
    productCode: '60010',
    packageContents: {
      '葡眾原味餐包': '2包',
      '康爾喜乳酸菌顆粒': '3條',
      '迪康': '1包',
      '葡眾全身調理膠囊': '2包(每包6粒)'
    },
    warnings: ['本產品非中藥材冬蟲夏草之製品', '懷孕期間不建議食用迪康']
  },

  // 寵物食品系列
  {
    id: 'P10030',
    series: '寵物食品系列',
    name: '奇芮愛犬專用益生菌粉',
    image: '/assets/奇芮愛犬專用益生菌粉.png',
    nutrients: [
      '膠原蛋白', '葡萄糖', '海藻糖', '乳酸菌凍乾品',
      'Lactobacillus rhamnosus GG鼠李糖乳酸桿菌', 'Lactobacillus paracasei GKS6',
      'Lactobacillus plantarum GKM3', 'Bifidobacterium lactis GKK2', 'Lactobacillus brevis GK3'
    ],
    description: '專為您愛犬設計的益生菌食物配方，可沖泡或直接食用，幫助皮膚健康，使毛髮柔軟亮麗。',
    conditions: ['寵物腸道健康', '皮膚保健', '毛髮亮麗', '眼睛保健'],
    price: 'NT$ 900',
    specifications: '75條／盒',
    productCode: 'P10030'
  }
];

// 最終分類的產品系列
export const PRODUCT_SERIES = [
  '基本保養系列',
  '清除系列',
  '調理系列',
  '活力丰采系列',
  '寵物食品系列',
  '生活保養系列',
  '全身調理系列'
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
  '寵物保健',
  '泌尿保健',
  '肌膚保健',
  '口腔保健',
  '體重管理',
  '素食營養',
  '全面營養',
  '病後補養',
  '滋補強身',
  '體質調整',
  '電磁波防護',
  '運動保健',
  '3C護眼',
  '陽光益生菌',
  '應酬保健',
  '外食族保健',
  '血糖調節',
  '生殖機能',
  '腦部保健',
  '神經保護',
  '記憶力提升',
  '認知功能',
  '延緩衰老',
  '消化道保健',
  '壓力調節',
  '代糖配方',
  '全家保健',
  '膠原蛋白促進',
  '眼部保健',
  '手部保養',
  '溫和洗淨',
  '舒緩壓力',
  '提神醒腦',
  '去除異味',
  '預防蛀牙',
  '牙齦護理',
  '維護口腔健康',
  '綜合調理'
];