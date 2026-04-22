export interface VisaPolicy {
  type: string;
  duration: string;
  validity: string;
  entries: string;
  fee: string;
  processingTime: string;
}

export interface VisaRequirement {
  item: string;
  description: string;
  required: boolean;
}

/** 单个领区的签证要求 */
export interface ConsulateZone {
  /** 领区名称，如 "北京" */
  name: string;
  /** 所辖省市 */
  provinces: string[];
  /** 领事馆/使馆地址 */
  address: string;
  /** 预约电话或说明 */
  contact: string;
  /** 官方预约网址 */
  appointmentUrl: string;
  /** 该领区特有或额外材料要求（在通用要求之上） */
  extraRequirements: VisaRequirement[];
  /** 该领区的特别说明/注意事项 */
  notes: string[];
  /** 办理时长（领区可能略有差异） */
  processingTime?: string;
}

export interface VisaGuide {
  id: string;
  country: string;
  countryEn: string;
  flag: string;
  region: string;
  continent: string;
  visaFreeForChinese: boolean;
  eVisaAvailable: boolean;
  policies: VisaPolicy[];
  requirements: VisaRequirement[];
  tips: string[];
  officialWebsite: string;
  lastUpdated: string;
  difficulty: "简单" | "中等" | "较难";
  popularityRank: number;
  coverImage: string;
  tags: string[];
  applicationProcess: string[];
  /** 国内各领区信息（免签国家可为空数组） */
  consulateZones: ConsulateZone[];
}

export type Continent = "全部" | "亚洲" | "欧洲" | "美洲" | "非洲" | "大洋洲" | "中东";
export type VisaType = "全部" | "免签" | "落地签" | "电子签" | "贴纸签";
export type Difficulty = "全部" | "简单" | "中等" | "较难";
