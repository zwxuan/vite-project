
import request, {ApiRes,requestWithProgress } from '../request'
import { BaseAmsPortItemProps } from "@/types/basic_manage/base_ams_port/base_ams_port";
import Mock from "mockjs";
//
const baseAmsPortItems:BaseAmsPortItemProps[] = [
    {
        "UsNo":"1601",
        "NameEn":"CHARLESTON,SC",
        "UnNo":"USCHS",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"401",
        "NameEn":"BOSTON, MA",
        "UnNo":"USBOS",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"57073",
        "NameEn":"NANSHA,CHINA",
        "UnNo":"CNNSA",
        "CountryRegion":"CHINA",
        "Remarks":""
    },
    {
        "UsNo":"2811",
        "NameEn":"OAKLAND, CA",
        "UnNo":"USOAK",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"99941",
        "NameEn":"HASLET,TX",
        "UnNo":"USHXC",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"54601",
        "NameEn":"YANGON",
        "UnNo":"MMRGN",
        "CountryRegion":"BURMA",
        "Remarks":""
    },
    {
        "UsNo":"3403",
        "NameEn":"USPQT",
        "UnNo":"3403",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"3001",
        "NameEn":"USSEA",
        "UnNo":"3001",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"1703",
        "NameEn":"SAVANNAH,GA",
        "UnNo":"USSAV",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"3901",
        "NameEn":"CHICAGO, IL",
        "UnNo":"USCHI",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"2006",
        "NameEn":"USMEM",
        "UnNo":"2006",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"1401",
        "NameEn":"NORFOLK",
        "UnNo":"USORF",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"4601",
        "NameEn":"NEWARK,NJ",
        "UnNo":"4601",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"5201",
        "NameEn":"MIAMI",
        "UnNo":"USMIA",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"22519",
        "NameEn":"COLON",
        "UnNo":"PAONX",
        "CountryRegion":"PANAMA",
        "Remarks":""
    },
    {
        "UsNo":"1001",
        "NameEn":"NEW YORK, N.Y.",
        "UnNo":"USNYC",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"2704",
        "NameEn":"LOS ANGLES,CALIF",
        "UnNo":"USLAX",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"2709",
        "NameEn":"LONG BEACH,CA",
        "UnNo":"USLGB",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"97009",
        "NameEn":"Gulf CMC (LA, MS, AL, AR, TN)",
        "UnNo":"AUEXM",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"99910",
        "NameEn":"N ATLANTIC TNKR TRANS PT",
        "UnNo":"USAIO",
        "CountryRegion":"ZHENGZHOU",
        "Remarks":""
    },
    {
        "UsNo":"99940",
        "NameEn":"N. PACIFIC TNKR TRANS PT",
        "UnNo":"FJPHR",
        "CountryRegion":"ZHENGZHOU",
        "Remarks":""
    },
    {
        "UsNo":"97010",
        "NameEn":"East Texas CMC (Gulf ports)",
        "UnNo":"USTXA",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"97008",
        "NameEn":"PR-Virgin Islands CMC",
        "UnNo":"VGNSX",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"92004",
        "NameEn":"MILITARY-GERMERSHEIM",
        "UnNo":"DEGER",
        "CountryRegion":"GERMANY",
        "Remarks":""
    },
    {
        "UsNo":"91160",
        "NameEn":"CRUZ BAY, ST. JOHN ISLAND",
        "UnNo":"VICZB",
        "CountryRegion":"ZHENGZHOU",
        "Remarks":""
    },
    {
        "UsNo":"97006",
        "NameEn":"North Florida CMC",
        "UnNo":"USFOA",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"91145",
        "NameEn":"FREDERIKSTED, VIRGIN ISLANDS",
        "UnNo":"VIFRD",
        "CountryRegion":"ZHENGZHOU",
        "Remarks":""
    },
    {
        "UsNo":"92002",
        "NameEn":"MILITARY-NAHA, GERMANY",
        "UnNo":"JPNHI",
        "CountryRegion":"JAPAN",
        "Remarks":""
    },
    {
        "UsNo":"93501",
        "NameEn":"GUAM ISLAND, GUAM",
        "UnNo":"BRGUA",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"97002",
        "NameEn":"New York CMC  (NYC, NJ)",
        "UnNo":"USASA",
        "CountryRegion":"UNITED STATES",
        "Remarks":""
    },
    {
        "UsNo":"92003",
        "NameEn":"MILITARY-MANNHEIM, GERMANY",
        "UnNo":"DEM HG",
        "CountryRegion":"GERMANY",
        "Remarks":""
    },
    {
        "UsNo":"91149",
        "NameEn":"ALLOTHER ST.CROIX,ST.CROIX VI",
        "UnNo":"VIFRD",
        "CountryRegion":"ZHENGZHOU",
        "Remarks":""
    },
    {
        "UsNo":"92001",
        "NameEn":"MILITARY-YOKOHAMA, JAPAN",
        "UnNo":"JPNGI",
        "CountryRegion":"JAPAN",
        "Remarks":""
    },
    {
        "UsNo":"91115",
        "NameEn":"CHRISTIANSTED, VIRGIN ISLAND",
        "UnNo":"VICTD",
        "CountryRegion":"ZHENGZHOU",
        "Remarks":""
    },
    {
        "UsNo":"91151",
        "NameEn":"PORT PURCELL, VIRGIN ISLANDS",
        "UnNo":"USPUI",
        "CountryRegion":"ZHENGZHOU",
        "Remarks":""
    },
    {
        "UsNo":"91155",
        "NameEn":"CHARLOTTE AMALIE/ST THO,VIR IS",
        "UnNo":"VICHA",
        "CountryRegion":"ZHENGZHOU",
        "Remarks":""
    },
    {
        "UsNo":"78900",
        "NameEn":"ALL COMOROS PORTS",
        "UnNo":"KMMUT",
        "CountryRegion":"COMOROS",
        "Remarks":""
    },
    {
        "UsNo":"79145",
        "NameEn":"PORT ELIZABETH,REP.S.AFR",
        "UnNo":"ZAPLZ",
        "CountryRegion":"SOUTH AFRICA",
        "Remarks":""
    },
    {
        "UsNo":"78701",
        "NameEn":"BEIRA, MOZAMBIQUE",
        "UnNo":"MZBEW",
        "CountryRegion":"MOZAMBIQUE",
        "Remarks":""
    },
    {
        "UsNo":"79052",
        "NameEn":"SAINT DENIS, REUNION",
        "UnNo":"RERUN",
        "CountryRegion":"REUNION",
        "Remarks":""
    },
    {
        "UsNo":"78845",
        "NameEn":"TOAMASINA; TAMATAVE,MADAGASCAR",
        "UnNo":"MGTMM",
        "CountryRegion":"MADAGASCAR",
        "Remarks":""
    },
    {
        "UsNo":"78735",
        "NameEn":"NACALA, MOZAMBIQUE",
        "UnNo":"MZMNC",
        "CountryRegion":"MOZAMBIQUE",
        "Remarks":""
    },
    {
        "UsNo":"79155",
        "NameEn":"RICHARD'S BAY, REP SAF",
        "UnNo":"ZARCB",
        "CountryRegion":"SOUTH AFRICA",
        "Remarks":""
    },
    {
        "UsNo":"79299",
        "NameEn":"ALL OTHER NAMIBIA PORTS",
        "UnNo":"NALUD",
        "CountryRegion":"NAMIBIA",
        "Remarks":""
    },
    {
        "UsNo":"78717",
        "NameEn":"MAPUTO, MOZAMBIQUE",
        "UnNo":"MZMPM",
        "CountryRegion":"MOZAMBIQUE",
        "Remarks":""
    },
    {
        "UsNo":"79125",
        "NameEn":"EAST LONDON, REP.SO.AFR.",
        "UnNo":"ZAELS",
        "CountryRegion":"SOUTH AFRICA",
        "Remarks":""
    },
    {
        "UsNo":"79051",
        "NameEn":"POINTE DES GALETS, REUNION",
        "UnNo":"REPDG",
        "CountryRegion":"REUNION",
        "Remarks":""
    },
    {
        "UsNo":"79286",
        "NameEn":"WALVIS BAY, NAMIBIA",
        "UnNo":"NAWVB",
        "CountryRegion":"NAMIBIA",
        "Remarks":""
    },
    {
        "UsNo":"79101",
        "NameEn":"CAPE TOWN, REP. OF S.AFR",
        "UnNo":"ZACPT",
        "CountryRegion":"SOUTH AFRICA",
        "Remarks":""
    },
    {
        "UsNo":"78800",
        "NameEn":"ALL OTHER MADAGASCAR PORTS",
        "UnNo":"MGTLE",
        "CountryRegion":"MADAGASCAR",
        "Remarks":""
    },
    {
        "UsNo":"78379",
        "NameEn":"TANGA, TANZANIA",
        "UnNo":"TZTGT",
        "CountryRegion":"TANZANIA, UNITED REPUBLIC OF",
        "Remarks":""
    },
    {
        "UsNo":"78083",
        "NameEn":"VICTORIA, SEYCHELLES",
        "UnNo":"SCPOV",
        "CountryRegion":"SEYCHELLES",
        "Remarks":""
    },
    {
        "UsNo":"78351",
        "NameEn":"DAR ES SALAAM, TANZANIA",
        "UnNo":"TZDAR",
        "CountryRegion":"TANZANIA, UNITED REPUBLIC OF",
        "Remarks":""
    },
    {
        "UsNo":"78501",
        "NameEn":"PORT LOUIS, MAURITIUS",
        "UnNo":"MUPLU",
        "CountryRegion":"MAURITIUS",
        "Remarks":""
    },
    {
        "UsNo":"77999",
        "NameEn":"ALL OTHER KENYA PORTS",
        "UnNo":"KELAU",
        "CountryRegion":"KENYA",
        "Remarks":""
    },
    {
        "UsNo":"77405",
        "NameEn":"ASSAB; ASEB, ERITREA",
        "UnNo":"ERASA",
        "CountryRegion":"ERITREA",
        "Remarks":""
    },
    {
        "UsNo":"78399",
        "NameEn":"ALL OTHER TANZANIA PORTS",
        "UnNo":"TZPMA",
        "CountryRegion":"TANZANIA, UNITED REPUBLIC OF",
        "Remarks":""
    },
    {
        "UsNo":"78387",
        "NameEn":"ZANZIBAR, TANZANIA",
        "UnNo":"TZZNZ",
        "CountryRegion":"TANZANIA, UNITED REPUBLIC OF",
        "Remarks":""
    },
    {
        "UsNo":"77913",
        "NameEn":"MOMBASA; KILINDINI, KENYA",
        "UnNo":"KEMBA",
        "CountryRegion":"KENYA",
        "Remarks":""
    },
    {
        "UsNo":"78700",
        "NameEn":"ALL OTHER MOZAMBIQUE PORTS",
        "UnNo":"MZUEL",
        "CountryRegion":"MOZAMBIQUE",
        "Remarks":""
    },
    {
        "UsNo":"78101",
        "NameEn":"DIEGO GARCIA, BRIT INDN OCEAN",
        "UnNo":"IODGA",
        "CountryRegion":"BRITISH INDIAN OCEAN TERRITORY",
        "Remarks":""
    },
    {
        "UsNo":"77701",
        "NameEn":"DJIBOUTI, DJIBOUTI",
        "UnNo":"DJJIB",
        "CountryRegion":"DJIBOUTI",
        "Remarks":""
    },
    {
        "UsNo":"77409",
        "NameEn":"MASSAWA; MASSAUA, ERITREA",
        "UnNo":"ERMSW",
        "CountryRegion":"ERITREA",
        "Remarks":""
    },
    {
        "UsNo":"76475",
        "NameEn":"PRAIA; PORTO PRAIA, CAPE VERDE",
        "UnNo":"CVRAI",
        "CountryRegion":"CAPE VERDE",
        "Remarks":""
    },
    {
        "UsNo":"76345",
        "NameEn":"DJENO TERMINAL, CONGO",
        "UnNo":"CGDJE",
        "CountryRegion":"CONGO",
        "Remarks":""
    },
    {
        "UsNo":"77001",
        "NameEn":"BERBERA, SOMALIA",
        "UnNo":"SOBBO",
        "CountryRegion":"SOMALIA",
        "Remarks":""
    },
    {
        "UsNo":"76283",
        "NameEn":"PALANCA TERMINAL, ANGOLA",
        "UnNo":"AOPAT",
        "CountryRegion":"ANGOLA",
        "Remarks":""
    },
    {
        "UsNo":"76505",
        "NameEn":"BUCHANAN, LIBERIA",
        "UnNo":"LRUCN",
        "CountryRegion":"LIBERIA",
        "Remarks":""
    },
    {
        "UsNo":"76499",
        "NameEn":"ALL OTHER CAPE VERDE PORTS",
        "UnNo":"CVSAR",
        "CountryRegion":"CAPE VERDE",
        "Remarks":""
    },
    {
        "UsNo":"76350",
        "NameEn":"POINTE NOIRE, CONGO",
        "UnNo":"CGPNR",
        "CountryRegion":"CONGO",
        "Remarks":""
    },
    {
        "UsNo":"76299",
        "NameEn":"ALL OTHER ANGOLA PORTS",
        "UnNo":"AOPLE",
        "CountryRegion":"ANGOLA",
        "Remarks":""
    },
    {
        "UsNo":"76489",
        "NameEn":"SAO TOME, SAO TOME AND PRINCIPE",
        "UnNo":"STTMS",
        "CountryRegion":"SAO TOME AND PRINCIPE",
        "Remarks":""
    },
    {
        "UsNo":"76284",
        "NameEn":"TAKULA TERMINAL, ANGOLA",
        "UnNo":"AOTAK",
        "CountryRegion":"ANGOLA",
        "Remarks":""
    },
    {
        "UsNo":"76500",
        "NameEn":"ALL OTHER LIBERIA PORTS",
        "UnNo":"LRSNI",
        "CountryRegion":"LIBERIA",
        "Remarks":""
    },
    {
        "UsNo":"76489",
        "NameEn":"ALL GUINEA-BISSAU PORTS",
        "UnNo":"GWOXB",
        "CountryRegion":"GUINEA-BISSAU",
        "Remarks":""
    },
    {
        "UsNo":"76529",
        "NameEn":"MONROVIA, LIBERIA",
        "UnNo":"LRMLW",
        "CountryRegion":"LIBERIA",
        "Remarks":""
    },
    {
        "UsNo":"77099",
        "NameEn":"ALL OTH SOMALIA EASTERN REG PT",
        "UnNo":"SOKMU",
        "CountryRegion":"SOMALIA",
        "Remarks":""
    },
    {
        "UsNo":"76279",
        "NameEn":"NAMIBE, ANGOLA",
        "UnNo":"AOMSZ",
        "CountryRegion":"ANGOLA",
        "Remarks":""
    },
    {
        "UsNo":"75899",
        "NameEn":"ALL ST. HELENA PORTS",
        "UnNo":"SHSHN",
        "CountryRegion":"SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA",
        "Remarks":""
    },
    {
        "UsNo":"75501",
        "NameEn":"LIBREVILLE, GABON",
        "UnNo":"GALBV",
        "CountryRegion":"GABON",
        "Remarks":""
    },
    {
        "UsNo":"75521",
        "NameEn":"OWENDO",
        "UnNo":"GAOWE",
        "CountryRegion":"GABON",
        "Remarks":""
    },
    {
        "UsNo":"75525",
        "NameEn":"PORT GENTIL, GABON",
        "UnNo":"GAPOG",
        "CountryRegion":"GABON",
        "Remarks":""
    },
    {
        "UsNo":"76282",
        "NameEn":"MALONGO OIL TERMINAL, ANGOLA",
        "UnNo":"AOMAL",
        "CountryRegion":"ANGOLA",
        "Remarks":""
    },
    {
        "UsNo":"76281",
        "NameEn":"SOYO-OIL/QUINFUGUENA TER,ANGOLA",
        "UnNo":"AOSOQ",
        "CountryRegion":"ANGOLA",
        "Remarks":""
    },
    {
        "UsNo":"76102",
        "NameEn":"SEME TERMINAL, BENIN",
        "UnNo":"BJSEM",
        "CountryRegion":"BENIN",
        "Remarks":""
    },
    {
        "UsNo":"75515",
        "NameEn":"LUCINA, GABON",
        "UnNo":"GALUC",
        "CountryRegion":"GABON",
        "Remarks":""
    },
    {
        "UsNo":"76278",
        "NameEn":"LUANDA, ANGOLA",
        "UnNo":"AOLAD",
        "CountryRegion":"ANGOLA",
        "Remarks":""
    },
    {
        "UsNo":"76101",
        "NameEn":"COTONOU, BENIN",
        "UnNo":"BJCOO",
        "CountryRegion":"BENIN",
        "Remarks":""
    },
    {
        "UsNo":"75898",
        "NameEn":"GEORGETN/ASCENSION/CLARENCE",
        "UnNo":"SHASI",
        "CountryRegion":"SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA",
        "Remarks":""
    },
    {
        "UsNo":"76274",
        "NameEn":"LOBITO, ANGOLA",
        "UnNo":"AOLOB",
        "CountryRegion":"ANGOLA",
        "Remarks":""
    },
    {
        "UsNo":"76231",
        "NameEn":"CABINDA; TAKULA, ANGOLA",
        "UnNo":"AOCAB",
        "CountryRegion":"ANGOLA",
        "Remarks":""
    },
    {
        "UsNo":"75380",
        "NameEn":"PENNINGTON, NIGERIA",
        "UnNo":"NGPEN",
        "CountryRegion":"NIGERIA",
        "Remarks":""
    },
    {
        "UsNo":"75361",
        "NameEn":"KOKO, NIGERIA",
        "UnNo":"NGKOK",
        "CountryRegion":"NIGERIA",
        "Remarks":""
    },
    {
        "UsNo":"75383",
        "NameEn":"SAPELE,NIGERIA",
        "UnNo":"NGSPL",
        "CountryRegion":"NIGERIA",
        "Remarks":""
    },
    {
        "UsNo":"75320",
        "NameEn":"BRASS TERMINAL; BRASS, NIGERIA",
        "UnNo":"NGBRA",
        "CountryRegion":"NIGERIA",
        "Remarks":""
    },
    {
        "UsNo":"75322",
        "NameEn":"BONNY, NIGERIA",
        "UnNo":"NGBON",
        "CountryRegion":"NIGERIA",
        "Remarks":""
    },
    {
        "UsNo":"75387",
        "NameEn":"WARRI, NIGERIA",
        "UnNo":"NGWAR",
        "CountryRegion":"NIGERIA",
        "Remarks":""
    },
    {
        "UsNo":"75330",
        "NameEn":"CALABAR, NIGERIA",
        "UnNo":"NGCBQ",
        "CountryRegion":"NIGERIA",
        "Remarks":""
    },
    {
        "UsNo":"75313",
        "NameEn":"APAPA, NIGERIA",
        "UnNo":"NGAPP",
        "CountryRegion":"NIGERIA",
        "Remarks":""
    },
    {
        "UsNo":"75385",
        "NameEn":"PORT HARCOURT, NIGERIA",
        "UnNo":"NGPHC",
        "CountryRegion":"NIGERIA",
        "Remarks":""
    }
];

const baseAmsPortItems2:BaseAmsPortItemProps[] = [
    {
        "UsNo":"2702",
        "NameEn":"LOS ÁNGELES",
        "UnNo":"LAX",
        "CountryRegion":"美国 ",
        "Remarks":""
    },
];

// 获取账单管理台账列表
export const getBaseAmsPortList = async (): Promise<BaseAmsPortItemProps[]> => {
  return baseAmsPortItems;
}

export const getBaseAmsPortList2 = async (): Promise<BaseAmsPortItemProps[]> => {
    return baseAmsPortItems2;
}

// 保存账单管理
export const saveBaseAmsPort = async (data: BaseAmsPortItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseAmsPortItemProps> => {
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
export const getBaseAmsPortList = async (): Promise<BaseAmsPortItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_ams_port"
  })
  const responseData = response?.data as ApiRes<BaseAmsPortItemProps[]>;
  return responseData.data || [];
}

export const saveBaseAmsPort = (data:BaseAmsPortItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_ams_port/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
