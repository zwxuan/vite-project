
import request, {ApiRes,requestWithProgress } from '../request'
import { CustomerIndustryItemProps } from "@/types/basic_manage/customer_industry";
import Mock from "mockjs";
//
const customerIndustryItems:CustomerIndustryItemProps[] = [
  {
    "Code": "A01",
    "ChineseName": "农业",
    "EnglishName": "Agriculture",
    "Remarks": "指农作物种植、园艺作物种植等相关活动"
  },
  {
    "Code": "A02",
    "ChineseName": "林业",
    "EnglishName": "Forestry",
    "Remarks": "涉及林木培育、种植、采伐及相关管理活动"
  },
  {
    "Code": "A03",
    "ChineseName": "畜牧业",
    "EnglishName": "Animal Husbandry",
    "Remarks": "包括家畜、家禽的饲养、繁殖等生产活动"
  },
  {
    "Code": "A04",
    "ChineseName": "渔业",
    "EnglishName": "Fishing",
    "Remarks": "水生动物和植物的养殖、捕捞相关活动"
  },
  {
    "Code": "A05",
    "ChineseName": "农、林、牧、渔专业及辅助性活动",
    "EnglishName": "Professional and Auxiliary Activities in Agriculture, Forestry, Animal Husbandry, and Fishing",
    "Remarks": "支持农林牧渔业的技术服务、农业机械服务等"
  },
  {
    "Code": "B06",
    "ChineseName": "煤炭开采和洗选业",
    "EnglishName": "Coal Mining and Washing",
    "Remarks": "原煤开采及后续筛选、洗选加工"
  },
  {
    "Code": "B07",
    "ChineseName": "石油和天然气开采业",
    "EnglishName": "Petroleum and Natural Gas Extraction",
    "Remarks": "石油、天然气的勘探与开采活动"
  },
  {
    "Code": "B08",
    "ChineseName": "黑色金属矿采选业",
    "EnglishName": "Ferrous Metal Ore Mining and Dressing",
    "Remarks": "铁矿石等黑色金属矿产的采选加工"
  },
  {
    "Code": "B09",
    "ChineseName": "有色金属矿采选业",
    "EnglishName": "Nonferrous Metal Ore Mining and Dressing",
    "Remarks": "如铜、铝等有色金属矿的采选加工"
  },
  {
    "Code": "B10",
    "ChineseName": "非金属矿采选业",
    "EnglishName": "Nonmetal Ore Mining and Dressing",
    "Remarks": "如石灰石、粘土等非金属矿物的采选"
  },
  {
    "Code": "B11",
    "ChineseName": "开采专业及辅助性活动",
    "EnglishName": "Professional and Auxiliary Mining Activities",
    "Remarks": "提供采矿相关的技术服务和支持活动"
  },
  {
    "Code": "B12",
    "ChineseName": "其他采矿业",
    "EnglishName": "Other Mining Industries",
    "Remarks": "不属于上述分类的其他矿产资源开采活动"
  },
  {
    "Code": "C13",
    "ChineseName": "农副食品加工业",
    "EnglishName": "Processing of Agricultural and sideline Products",
    "Remarks": "对农产品进行初加工制成食品或半成品"
  },
  {
    "Code": "C14",
    "ChineseName": "食品制造业",
    "EnglishName": "Food Manufacturing",
    "Remarks": "各类食品制造和深加工行业"
  },
  {
    "Code": "C15",
    "ChineseName": "酒、饮料和精制茶制造业",
    "EnglishName": "Manufacturing of Wine, Beverages and Refined Tea",
    "Remarks": "酒类、饮料、茶叶精制加工"
  },
  {
    "Code": "C16",
    "ChineseName": "烟草制品业",
    "EnglishName": "Tobacco Products Industry",
    "Remarks": "卷烟、雪茄、烟丝等烟草制品生产"
  },
  {
    "Code": "C17",
    "ChineseName": "纺织业",
    "EnglishName": "Textile Industry",
    "Remarks": "纺纱、织布及纤维材料加工"
  },
  {
    "Code": "C18",
    "ChineseName": "纺织服装、服饰业",
    "EnglishName": "Textile and Apparel Industry",
    "Remarks": "服装制造、服饰品制作"
  },
  {
    "Code": "C19",
    "ChineseName": "皮革、毛皮、羽毛及其制品和制鞋业",
    "EnglishName": "Leather, Fur, Feather Products and Footwear Industry",
    "Remarks": "制革、皮具、羽绒制品及鞋类制造"
  },
  {
    "Code": "C20",
    "ChineseName": "木材加工和木、竹、藤、棕、草制品业",
    "EnglishName": "Wood Processing and Products of Wood, Bamboo, Rattan, Palm and Grass",
    "Remarks": "木材加工及各类天然材料制品生产"
  },
  {
    "Code": "C21",
    "ChineseName": "家具制造业",
    "EnglishName": "Furniture Manufacturing",
    "Remarks": "木质、金属等各类家具制造"
  },
  {
    "Code": "C22",
    "ChineseName": "造纸和纸制品业",
    "EnglishName": "Papermaking and Paper Product Industry",
    "Remarks": "纸张制造以及纸制品加工"
  },
  {
    "Code": "C23",
    "ChineseName": "印刷和记录媒介复制业",
    "EnglishName": "Printing and Recording Media Replication",
    "Remarks": "图书、报纸、音像制品印刷与复制"
  },
  {
    "Code": "C24",
    "ChineseName": "文教、工美、体育和娱乐用品制造业",
    "EnglishName": "Manufacturing of Cultural, Educational, Sports and Entertainment Products",
    "Remarks": "学习、文化、体育、娱乐器具制造"
  },
  {
    "Code": "C25",
    "ChineseName": "石油、煤炭及其他燃料加工业",
    "EnglishName": "Processing of Petroleum, Coal and Other Fuels",
    "Remarks": "石油炼制、煤化工等能源产品加工"
  },
  {
    "Code": "C26",
    "ChineseName": "化学原料和化学制品制造业",
    "EnglishName": "Chemical Raw Materials and Chemical Products Manufacturing",
    "Remarks": "各种基础化学原料及衍生品制造"
  },
  {
    "Code": "C27",
    "ChineseName": "医药制造业",
    "EnglishName": "Pharmaceutical Manufacturing",
    "Remarks": "药品制剂及生物制药"
  },
  {
    "Code": "C28",
    "ChineseName": "化学纤维制造业",
    "EnglishName": "Chemical Fiber Manufacturing",
    "Remarks": "合成纤维制造，如涤纶、锦纶等"
  },
  {
    "Code": "C29",
    "ChineseName": "橡胶和塑料制品业",
    "EnglishName": "Rubber and Plastic Products Industry",
    "Remarks": "橡胶、塑料原材料及其制品加工"
  },
  {
    "Code": "C30",
    "ChineseName": "非金属矿物制品业",
    "EnglishName": "Non-metallic Mineral Products Industry",
    "Remarks": "如水泥、玻璃、陶瓷等非金属材料制品"
  },
  {
    "Code": "C31",
    "ChineseName": "黑色金属冶炼和压延加工业",
    "EnglishName": "Smelting and Rolling Processing of Ferrous Metals",
    "Remarks": "铁、锰、铬等金属冶炼和板材轧制加工"
  },
  {
    "Code": "C32",
    "ChineseName": "有色金属冶炼和压延加工业",
    "EnglishName": "Smelting and Rolling Processing of Nonferrous Metals",
    "Remarks": "铜、铝等金属的冶炼与加工"
  },
  {
    "Code": "C33",
    "ChineseName": "金属制品业",
    "EnglishName": "Metal Products Industry",
    "Remarks": "金属结构件、工具、容器等制造"
  },
  {
    "Code": "C34",
    "ChineseName": "通用设备制造业",
    "EnglishName": "General Purpose Equipment Manufacturing",
    "Remarks": "泵、电机、机床等通用机械制造"
  },
  {
    "Code": "C35",
    "ChineseName": "专用设备制造业",
    "EnglishName": "Specialized Equipment Manufacturing",
    "Remarks": "工程机械、农业机械等定制化设备制造"
  },
  {
    "Code": "C36",
    "ChineseName": "汽车制造业",
    "EnglishName": "Automotive Manufacturing",
    "Remarks": "汽车整车制造及关键零部件生产"
  },
  {
    "Code": "C37",
    "ChineseName": "铁路、船舶、航空航天和其他运输设备制造业",
    "EnglishName": "Railway, Ship, Aerospace and Other Transportation Equipment Manufacturing",
    "Remarks": "火车、轮船、飞机等交通工具制造"
  },
  {
    "Code": "C38",
    "ChineseName": "电气机械和器材制造业",
    "EnglishName": "Electrical Machinery and Equipment Manufacturing",
    "Remarks": "发电设备、输配电设备制造"
  },
  {
    "Code": "C39",
    "ChineseName": "计算机、通信和其他电子设备制造业",
    "EnglishName": "Computer, Communication and Other Electronic Equipment Manufacturing",
    "Remarks": "计算机硬件、手机、智能终端制造"
  },
  {
    "Code": "C40",
    "ChineseName": "仪器仪表制造业",
    "EnglishName": "Instrument and Meter Manufacturing",
    "Remarks": "测量、控制用精密仪器制造"
  },
  {
    "Code": "C41",
    "ChineseName": "其他制造业",
    "EnglishName": "Other Manufacturing Industries",
    "Remarks": "不属于以上分类的制造业"
  },
  {
    "Code": "C42",
    "ChineseName": "废弃资源综合利用业",
    "EnglishName": "Comprehensive Utilization of Waste Resources",
    "Remarks": "回收再利用废弃物资进行资源化处理"
  },
  {
    "Code": "C43",
    "ChineseName": "金属制品、机械和设备修理业",
    "EnglishName": "Repair Industry of Metal Products, Machinery and Equipment",
    "Remarks": "设备维修、维护和再制造"
  },
  {
    "Code": "D44",
    "ChineseName": "电力、热力生产和供应业",
    "EnglishName": "Electricity and Heat Production and Supply",
    "Remarks": "发电、供热、蒸汽和热水供应"
  },
  {
    "Code": "D45",
    "ChineseName": "燃气生产和供应业",
    "EnglishName": "Gas Production and Supply",
    "Remarks": "天然气、液化气等燃气生产与输送"
  },
  {
    "Code": "D46",
    "ChineseName": "水的生产和供应业",
    "EnglishName": "Water Production and Supply",
    "Remarks": "自来水生产、污水处理、水资源供给"
  },
  {
    "Code": "E47",
    "ChineseName": "房屋建筑业",
    "EnglishName": "Housing Construction",
    "Remarks": "各类住宅、办公楼等房屋建筑施工"
  },
  {
    "Code": "E48",
    "ChineseName": "土木工程建筑业",
    "EnglishName": "Civil Engineering Construction",
    "Remarks": "道路、桥梁、隧道等基础设施建设"
  },
  {
    "Code": "E49",
    "ChineseName": "建筑安装业",
    "EnglishName": "Building Installation",
    "Remarks": "建筑物内部管道、线路安装工程"
  },
  {
    "Code": "E50",
    "ChineseName": "建筑装饰、装修和其他建筑业",
    "EnglishName": "Building Decoration, Renovation and Other Construction Industries",
    "Remarks": "室内外装修、幕墙安装等"
  },
  {
    "Code": "F51",
    "ChineseName": "批发业",
    "EnglishName": "Wholesale Trade",
    "Remarks": "商品的大宗销售和流通"
  },
  {
    "Code": "F52",
    "ChineseName": "零售业",
    "EnglishName": "Retail Trade",
    "Remarks": "面向最终消费者的商品零售"
  },
  {
    "Code": "G53",
    "ChineseName": "铁路运输业",
    "EnglishName": "Railway Transport",
    "Remarks": "铁路客运和货运运输服务"
  },
  {
    "Code": "G54",
    "ChineseName": "道路运输业",
    "EnglishName": "Road Transport",
    "Remarks": "公路运输，含货车、客车运营"
  },
  {
    "Code": "G55",
    "ChineseName": "水上运输业",
    "EnglishName": "Water Transport",
    "Remarks": "航运、内河运输等水上物流服务"
  },
  {
    "Code": "G56",
    "ChineseName": "航空运输业",
    "EnglishName": "Air Transport",
    "Remarks": "民航客货运输及航空快递"
  },
  {
    "Code": "G57",
    "ChineseName": "管道运输业",
    "EnglishName": "Pipeline Transport",
    "Remarks": "石油、天然气等通过管道运输"
  },
  {
    "Code": "G58",
    "ChineseName": "多式联运和运输代理业",
    "EnglishName": "Multimodal Transport and Freight Agency",
    "Remarks": "综合多种运输方式的物流代理服务"
  },
  {
    "Code": "G59",
    "ChineseName": "装卸搬运和仓储业",
    "EnglishName": "Loading, Unloading and Warehousing",
    "Remarks": "货物装卸、搬运及存储服务"
  },
  {
    "Code": "G60",
    "ChineseName": "邮政业",
    "EnglishName": "Postal Services",
    "Remarks": "信件、包裹等邮政服务"
  },
  {
    "Code": "H61",
    "ChineseName": "住宿业",
    "EnglishName": "Accommodation Services",
    "Remarks": "提供短期住宿服务，如酒店、旅馆"
  },
  {
    "Code": "H62",
    "ChineseName": "餐饮业",
    "EnglishName": "Catering Industry",
    "Remarks": "提供餐饮服务，餐馆、快餐店等"
  },
  {
    "Code": "I63",
    "ChineseName": "电信、广播电视和卫星传输服务",
    "EnglishName": "Telecommunications, Broadcasting and Satellite Transmission Services",
    "Remarks": "通信网络、广电信号传输服务"
  },
  {
    "Code": "I64",
    "ChineseName": "互联网和相关服务",
    "EnglishName": "Internet and Related Services",
    "Remarks": "网络接入、数据中心、云计算服务"
  },
  {
    "Code": "I65",
    "ChineseName": "软件和信息技术服务业",
    "EnglishName": "Software and Information Technology Services",
    "Remarks": "软件开发、系统集成、IT运维服务"
  },
  {
    "Code": "J66",
    "ChineseName": "货币金融服务",
    "EnglishName": "Monetary Financial Services",
    "Remarks": "银行业务、贷款、支付结算等"
  },
  {
    "Code": "J67",
    "ChineseName": "资本市场服务",
    "EnglishName": "Capital Market Services",
    "Remarks": "证券、基金、投资银行等金融服务"
  },
  {
    "Code": "J68",
    "ChineseName": "保险业",
    "EnglishName": "Insurance Industry",
    "Remarks": "财产险、人身险、再保险等业务"
  },
  {
    "Code": "J69",
    "ChineseName": "其他金融业",
    "EnglishName": "Other Financial Industries",
    "Remarks": "其他金融中介服务，如小贷公司、典当行"
  },
  {
    "Code": "K70",
    "ChineseName": "房地产业",
    "EnglishName": "Real Estate Industry",
    "Remarks": "房地产开发、租赁、经纪等"
  },
  {
    "Code": "L71",
    "ChineseName": "租赁业",
    "EnglishName": "Leasing Industry",
    "Remarks": "设备、车辆、办公场所等租赁服务"
  },
  {
    "Code": "L72",
    "ChineseName": "商务服务业",
    "EnglishName": "Business Services",
    "Remarks": "咨询、广告、会展、人力资源服务等"
  },
  {
    "Code": "M73",
    "ChineseName": "研究和试验发展",
    "EnglishName": "Research and Experimental Development",
    "Remarks": "科研机构从事的基础研究和应用研究"
  },
  {
    "Code": "M74",
    "ChineseName": "专业技术服务业",
    "EnglishName": "Professional Technical Services",
    "Remarks": "工程勘察、设计、检测、法律、会计等"
  },
  {
    "Code": "M75",
    "ChineseName": "科技推广和应用服务业",
    "EnglishName": "Technology Promotion and Application Services",
    "Remarks": "技术转让、科技成果转化、技术培训等"
  },
  {
    "Code": "N76",
    "ChineseName": "水利管理业",
    "EnglishName": "Water Conservancy Management",
    "Remarks": "水资源调配、防洪抗旱、水库管理等"
  },
  {
    "Code": "N77",
    "ChineseName": "生态保护和环境治理业",
    "EnglishName": "Ecological Conservation and Environmental Governance",
    "Remarks": "环境保护、污染治理、生态修复"
  },
  {
    "Code": "N78",
    "ChineseName": "公共设施管理业",
    "EnglishName": "Public Facilities Management",
    "Remarks": "市政公共设施运行维护管理"
  },
  {
    "Code": "N79",
    "ChineseName": "土地管理业",
    "EnglishName": "Land Management",
    "Remarks": "土地规划、土地征收、出让管理"
  },
  {
    "Code": "O80",
    "ChineseName": "居民服务业",
    "EnglishName": "Residential Services",
    "Remarks": "家政、洗衣、美容美发等生活服务"
  },
  {
    "Code": "O81",
    "ChineseName": "机动车、电子产品和日用产品修理业",
    "EnglishName": "Repair of Motor Vehicles, Electronic Products and Daily Necessities",
    "Remarks": "车辆、家电、日用品维修服务"
  },
  {
    "Code": "O82",
    "ChineseName": "其他服务业",
    "EnglishName": "Other Service Industries",
    "Remarks": "其他未归类的生活性服务"
  },
  {
    "Code": "P83",
    "ChineseName": "教育",
    "EnglishName": "Education",
    "Remarks": "各级各类教育机构提供的教学服务"
  },
  {
    "Code": "Q84",
    "ChineseName": "卫生",
    "EnglishName": "Healthcare",
    "Remarks": "医疗机构提供的诊疗、防疫等服务"
  },
  {
    "Code": "Q85",
    "ChineseName": "社会工作",
    "EnglishName": "Social Work",
    "Remarks": "社区服务、社会救助、慈善组织等"
  },
  {
    "Code": "R86",
    "ChineseName": "新闻和出版业",
    "EnglishName": "News and Publishing Industry",
    "Remarks": "报刊、出版、编辑、发行服务"
  },
  {
    "Code": "R87",
    "ChineseName": "广播、电视、电影和录音制作业",
    "EnglishName": "Radio, TV, Film and Audio Production",
    "Remarks": "影视节目制作、广播电视台运营"
  },
  {
    "Code": "R88",
    "ChineseName": "文化艺术业",
    "EnglishName": "Cultural and Artistic Industry",
    "Remarks": "文艺演出、美术展览、艺术创作"
  },
  {
    "Code": "R89",
    "ChineseName": "体育",
    "EnglishName": "Sports",
    "Remarks": "体育赛事、健身休闲、训练培训"
  },
  {
    "Code": "R90",
    "ChineseName": "娱乐业",
    "EnglishName": "Entertainment Industry",
    "Remarks": "KTV、游乐园、夜总会等娱乐场所"
  },
  {
    "Code": "S91",
    "ChineseName": "中国共产党机关",
    "EnglishName": "Communist Party of China Organs",
    "Remarks": "中共各级党委、纪检机关等"
  },
  {
    "Code": "S92",
    "ChineseName": "国家机构",
    "EnglishName": "State Institutions",
    "Remarks": "政府机关、法院、检察院等"
  },
  {
    "Code": "S93",
    "ChineseName": "人民政协、民主党派",
    "EnglishName": "CPPCC and Democratic Parties",
    "Remarks": "政协组织及各民主党派机构"
  },
  {
    "Code": "S94",
    "ChineseName": "社会保障",
    "EnglishName": "Social Security",
    "Remarks": "养老、失业、工伤等社会保障管理"
  },
  {
    "Code": "S95",
    "ChineseName": "群众团体、社会团体和其他成员组织",
    "EnglishName": "Mass Organizations, Social Groups and Other Member Organizations",
    "Remarks": "工会、妇联、工商联等社会团体"
  },
  {
    "Code": "S96",
    "ChineseName": "基层群众自治组织",
    "EnglishName": "Grassroots Mass Autonomous Organizations",
    "Remarks": "村委会、居委会等基层自治单位"
  }
];


// 获取账单管理台账列表
export const getCustomerIndustryList = async (): Promise<CustomerIndustryItemProps[]> => {
  return customerIndustryItems;
}

// 保存账单管理
export const saveCustomerIndustry = async (data: CustomerIndustryItemProps, onUploadProgress?: (progress: number) => void): Promise<CustomerIndustryItemProps> => {
  // 模拟上传进度
  if (onUploadProgress) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      onUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 1000);
  }
  return data;
}


/*
// 获取币制信息
export const getCustomerIndustryList = async (): Promise<CustomerIndustryItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/customer_industry"
  })
  const responseData = response?.data as ApiRes<CustomerIndustryItemProps[]>;
  return responseData.data || [];
}

export const saveCustomerIndustry = (data:CustomerIndustryItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/customer_industry/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
