
import request, {ApiRes,requestWithProgress } from '../../request'
import { BaseRailwayPortItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_railway_port";
import Mock from "mockjs";
//
const baseRailwayPortItems:BaseRailwayPortItemProps[] = [
    {
      "CountryId": "CN",
      "StationId": "1004",
      "StationNameCn": "乌东站",
      "StationNameEn": "WUDONG",
      "CountryCn": "中国",
      "CountryEn": "China",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "CN",
      "StationId": "1005",
      "StationNameCn": "张家口站",
      "StationNameEn": "ZHANGJIAKOU",
      "CountryCn": "中国",
      "CountryEn": "China",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "CN",
      "StationId": "1008",
      "StationNameCn": "朝阳站",
      "StationNameEn": "CHAOYANG",
      "CountryCn": "中国",
      "CountryEn": "China",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "CN",
      "StationId": "1009",
      "StationNameCn": "集宁站",
      "StationNameEn": "JINING",
      "CountryCn": "中国",
      "CountryEn": "China",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "CN",
      "StationId": "1011",
      "StationNameCn": "乌西站",
      "StationNameEn": "WUXI",
      "CountryCn": "中国",
      "CountryEn": "China",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "CN",
      "StationId": "1012",
      "StationNameCn": "乌北站",
      "StationNameEn": "WUBEI",
      "CountryCn": "中国",
      "CountryEn": "China",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "CN",
      "StationId": "1013",
      "StationNameCn": "八钢站",
      "StationNameEn": "BAGANG",
      "CountryCn": "中国",
      "CountryEn": "China",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "CN",
      "StationId": "1015",
      "StationNameCn": "奎屯西站",
      "StationNameEn": "KUITUNXI",
      "CountryCn": "中国",
      "CountryEn": "China",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "CN",
      "StationId": "1017",
      "StationNameCn": "武威南站",
      "StationNameEn": "WUWEINAN",
      "CountryCn": "中国",
      "CountryEn": "China",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "CN",
      "StationId": "1018",
      "StationNameCn": "兰州站",
      "StationNameEn": "LANZHOU",
      "CountryCn": "中国",
      "CountryEn": "China",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1074",
      "StationNameCn": "阿腾格里(出口)",
      "StationNameEn": "Aten Corey",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1076",
      "StationNameCn": "萨雷阿加奇站",
      "StationNameEn": "Sary-Agach",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1081",
      "StationNameCn": "卢戈瓦亚-出口(哈)",
      "StationNameEn": "Lugovaya",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1087",
      "StationNameCn": "铁米尔站",
      "StationNameEn": "Temir",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1088",
      "StationNameCn": "阿克基斯套站",
      "StationNameEn": "Ak-Kistau",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1093",
      "StationNameCn": "热那乌站",
      "StationNameEn": "Zhana-Aul",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1095",
      "StationNameCn": "泰恩恰站",
      "StationNameEn": "Tayncha",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1099",
      "StationNameCn": "扎纳谢梅站",
      "StationNameEn": "Zhana-Semey",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1100",
      "StationNameCn": "科尔舒诺沃站",
      "StationNameEn": "Korshunovo",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1102",
      "StationNameCn": "阿克扎伊克站",
      "StationNameEn": "Akzhayyk",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1104",
      "StationNameCn": "乌津站",
      "StationNameEn": "Uzen",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1107",
      "StationNameCn": "梅尔扎站",
      "StationNameEn": "Myrza",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1108",
      "StationNameCn": "索克尔站",
      "StationNameEn": "Sokyr",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1110",
      "StationNameCn": "彼得罗巴普罗夫斯克站",
      "StationNameEn": "Petropavlovsk",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1114",
      "StationNameCn": "塔拉斯站",
      "StationNameEn": "Talas",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1115",
      "StationNameCn": "塞米巴拉金斯克站",
      "StationNameEn": "Semipalatinsk",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1120",
      "StationNameCn": "依阿克托别站",
      "StationNameEn": "Aktobe",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1125",
      "StationNameCn": "阿特巴萨尔站",
      "StationNameEn": "Atbasar",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1129",
      "StationNameCn": "别斯科利站",
      "StationNameEn": "Beskol",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1130",
      "StationNameCn": "乌斯季卡面诺戈尔斯克站",
      "StationNameEn": "Ust- kamenogorsk",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1686",
      "StationNameCn": "阿克库尔站",
      "StationNameEn": "Ak-kul",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1687",
      "StationNameCn": "阿克先格尔站",
      "StationNameEn": "Aksenger",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1688",
      "StationNameCn": "阿克套港站",
      "StationNameEn": "Aktau Port",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1689",
      "StationNameCn": "阿克托别2站",
      "StationNameEn": "Aktobe-2",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1690",
      "StationNameCn": "阿克托盖站",
      "StationNameEn": "Aktogai",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1691",
      "StationNameCn": "阿拉木图1站",
      "StationNameEn": "Almaty-1",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1692",
      "StationNameCn": "阿拉木图2站",
      "StationNameEn": "Almaty-2",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1693",
      "StationNameCn": "阿尔滕套站",
      "StationNameEn": "Altyntau",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1694",
      "StationNameCn": "阿斯塔纳-1",
      "StationNameEn": "Astana-1",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1695",
      "StationNameCn": "阿特劳站",
      "StationNameEn": "Atyrau",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1696",
      "StationNameCn": "拜谢尔克站",
      "StationNameEn": "Baiserke",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1697",
      "StationNameCn": "巴尔喀什1站",
      "StationNameEn": "Balkhash 1",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1698",
      "StationNameCn": "别尔库利站",
      "StationNameEn": "Belkul",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1699",
      "StationNameCn": "布伦代站",
      "StationNameEn": "Burundai",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1700",
      "StationNameCn": "恰格林卡站",
      "StationNameEn": "Chaglinka",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1701",
      "StationNameCn": "奇伊利站",
      "StationNameEn": "Chiili",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1702",
      "StationNameCn": "希姆肯特",
      "StationNameEn": "Chimkent",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1703",
      "StationNameCn": "楚站",
      "StationNameEn": "Chu",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1704",
      "StationNameCn": "塔拉兹",
      "StationNameEn": "Taraz",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1705",
      "StationNameCn": "叶基巴斯图兹1站",
      "StationNameEn": "Ekibastuz 1",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1706",
      "StationNameCn": "卡普恰盖站",
      "StationNameEn": "Kapchagai",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1707",
      "StationNameCn": "卡拉干达站",
      "StationNameEn": "Karagandy",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1708",
      "StationNameCn": "哈萨克斯坦站",
      "StationNameEn": "Kazakhstan",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1709",
      "StationNameCn": "科克舍套1站",
      "StationNameEn": "Kokshetau-1",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1710",
      "StationNameCn": "库利萨雷站",
      "StationNameEn": "Kulsary",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1711",
      "StationNameCn": "库斯塔奈站",
      "StationNameEn": "Kustanai",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1712",
      "StationNameCn": "克孜勒奥尔达站",
      "StationNameEn": "Kzyl-Orda",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1713",
      "StationNameCn": "列宁诺戈尔斯克站",
      "StationNameEn": "Leninogorsk",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1714",
      "StationNameCn": "卢戈瓦亚站",
      "StationNameEn": "Lugovaya",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1715",
      "StationNameCn": "曼格什拉克站",
      "StationNameEn": "Mangyshlak",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1716",
      "StationNameCn": "梅杰乌站",
      "StationNameEn": "Medeu",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1717",
      "StationNameCn": "新乌斯季卡缅诺戈尔斯克站",
      "StationNameEn": "Novoustkamenogorsk",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1718",
      "StationNameCn": "巴浦洛达尔南站",
      "StationNameEn": "Pavlodar-uzh",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1719",
      "StationNameCn": "塞米巴拉金斯克货站",
      "StationNameEn": "Semipalatinsk-gr",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1720",
      "StationNameCn": "萨雷阿加齐站",
      "StationNameEn": "Sary-Agach",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1721",
      "StationNameCn": "萨雷阿加奇站",
      "StationNameEn": "Sary-Agach",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1722",
      "StationNameCn": "塞米巴拉金斯克货站",
      "StationNameEn": "Semipalatinsk-gr",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1723",
      "StationNameCn": "索罗科瓦亚站",
      "StationNameEn": "Sorokovaya",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1724",
      "StationNameCn": "塔尔迪库尔干站",
      "StationNameEn": "Taldy-Kurgan",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1725",
      "StationNameCn": "铁米尔套站",
      "StationNameEn": "Temirtau",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1726",
      "StationNameCn": "托博尔站",
      "StationNameEn": "Tobol",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1727",
      "StationNameCn": "秋拉塔姆站",
      "StationNameEn": "Turatam",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1728",
      "StationNameCn": "突厥斯坦站",
      "StationNameEn": "Turkestan",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1729",
      "StationNameCn": "乌拉尔斯克站",
      "StationNameEn": "Uralsk",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1730",
      "StationNameCn": "扎西塔站",
      "StationNameEn": "Zashita",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1731",
      "StationNameCn": "扎那阿乌尔站",
      "StationNameEn": "Zhanaaul",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1732",
      "StationNameCn": "热列佐鲁德纳亚站",
      "StationNameEn": "Zhelezorudnaya",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1733",
      "StationNameCn": "热姆站",
      "StationNameEn": "Zhem",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1734",
      "StationNameCn": "热特苏站",
      "StationNameEn": "Zhety-Su",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1735",
      "StationNameCn": "热孜卡兹甘站",
      "StationNameEn": "Zhezkazgan",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1736",
      "StationNameCn": "日尼什克站",
      "StationNameEn": "Zhinishke",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1737",
      "StationNameCn": "日拉耶沃站",
      "StationNameEn": "Zhilaevo",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1738",
      "StationNameCn": "济良诺夫斯克站",
      "StationNameEn": "Zyryanovsk",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1864",
      "StationNameCn": "叶里买",
      "StationNameEn": "Yerkin",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1865",
      "StationNameCn": "阿克套港-换装",
      "StationNameEn": "Aktau Port",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1889",
      "StationNameCn": "伊列茨克1(出口)",
      "StationNameEn": "Iletsk 1",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1908",
      "StationNameCn": "库里克（轮渡港）",
      "StationNameEn": "Kurik",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1914",
      "StationNameCn": "十月镇",
      "StationNameEn": "Oktyabr'",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1915",
      "StationNameCn": "布鲁尔",
      "StationNameEn": "Buluoer",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1922",
      "StationNameCn": "希波沃",
      "StationNameEn": "Shipovo",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "1932",
      "StationNameCn": "扎纳阿乌尔",
      "StationNameEn": "Zhanaaul",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "2027",
      "StationNameCn": "杰特加拉",
      "StationNameEn": "Dzhetygara",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "2060",
      "StationNameCn": "伊吉利克",
      "StationNameEn": "Igilik",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KZ",
      "StationId": "2095",
      "StationNameCn": "普里列齐纳亚",
      "StationNameEn": "Prirchnaya",
      "CountryCn": "哈萨克斯坦",
      "CountryEn": "Kazakhstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KG",
      "StationId": "1082",
      "StationNameCn": "卢戈瓦亚-出口(吉)",
      "StationNameEn": "Lugovaya",
      "CountryCn": "吉尔吉斯斯坦",
      "CountryEn": "Kyrgyzstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KG",
      "StationId": "1783",
      "StationNameCn": "阿拉梅金站",
      "StationNameEn": "Alamedin",
      "CountryCn": "吉尔吉斯斯坦",
      "CountryEn": "Kyrgyzstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KG",
      "StationId": "1784",
      "StationNameCn": "比什凯克1站",
      "StationNameEn": "Bishkek-1",
      "CountryCn": "吉尔吉斯斯坦",
      "CountryEn": "Kyrgyzstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KG",
      "StationId": "1785",
      "StationNameCn": "贾拉勒阿巴德站",
      "StationNameEn": "Dzhalal-Abad",
      "CountryCn": "吉尔吉斯斯坦",
      "CountryEn": "Kyrgyzstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KG",
      "StationId": "1786",
      "StationNameCn": "坎特站",
      "StationNameEn": "Kant",
      "CountryCn": "吉尔吉斯斯坦",
      "CountryEn": "Kyrgyzstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KG",
      "StationId": "1787",
      "StationNameCn": "奥什站",
      "StationNameEn": "Osh",
      "CountryCn": "吉尔吉斯斯坦",
      "CountryEn": "Kyrgyzstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KG",
      "StationId": "1788",
      "StationNameCn": "累巴奇耶站",
      "StationNameEn": "Ribache",
      "CountryCn": "吉尔吉斯斯坦",
      "CountryEn": "Kyrgyzstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "KG",
      "StationId": "1873",
      "StationNameCn": "卡拉苏-乌兹别克斯基(出口)",
      "StationNameEn": "Karasu",
      "CountryCn": "吉尔吉斯斯坦",
      "CountryEn": "Kyrgyzstan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TJ",
      "StationId": "1046",
      "StationNameCn": "杜尚别1站",
      "StationNameEn": "Dushanbe 1",
      "CountryCn": "塔吉克斯坦",
      "CountryEn": "Tajikistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TJ",
      "StationId": "1078",
      "StationNameCn": "帕赫特阿巴德(出口)",
      "StationNameEn": "Pahatabad",
      "CountryCn": "塔吉克斯坦",
      "CountryEn": "Tajikistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TJ",
      "StationId": "1146",
      "StationNameCn": "扬吉巴扎尔站",
      "StationNameEn": "Yangi-bazar",
      "CountryCn": "塔吉克斯坦",
      "CountryEn": "Tajikistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TJ",
      "StationId": "1148",
      "StationNameCn": "切普图拉站",
      "StationNameEn": "Cheptura",
      "CountryCn": "塔吉克斯坦",
      "CountryEn": "Tajikistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TJ",
      "StationId": "1149",
      "StationNameCn": "伊斯法拉站",
      "StationNameEn": "Isfara",
      "CountryCn": "塔吉克斯坦",
      "CountryEn": "Tajikistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TJ",
      "StationId": "1789",
      "StationNameCn": "杜尚别2站",
      "StationNameEn": "Dushanbe 2",
      "CountryCn": "塔吉克斯坦",
      "CountryEn": "Tajikistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TJ",
      "StationId": "1790",
      "StationNameCn": "苦盏",
      "StationNameEn": "Khudjand",
      "CountryCn": "塔吉克斯坦",
      "CountryEn": "Tajikistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TJ",
      "StationId": "1791",
      "StationNameCn": "库尔干秋别站",
      "StationNameEn": "Kurgan",
      "CountryCn": "塔吉克斯坦",
      "CountryEn": "Tajikistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TJ",
      "StationId": "1878",
      "StationNameCn": "斯比德曼-出口",
      "StationNameEn": "Sbideman",
      "CountryCn": "塔吉克斯坦",
      "CountryEn": "Tajikistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TJ",
      "StationId": "1921",
      "StationNameCn": "普罗列塔尔斯克",
      "StationNameEn": "Proletarsk",
      "CountryCn": "塔吉克斯坦",
      "CountryEn": "Tajikistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TJ",
      "StationId": "1964",
      "StationNameCn": "司匹塔门",
      "StationNameEn": "Spitamen",
      "CountryCn": "塔吉克斯坦",
      "CountryEn": "Tajikistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1075",
      "StationNameCn": "克列斯站",
      "StationNameEn": "Keles",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1077",
      "StationNameCn": "库杜克利(出口)",
      "StationNameEn": "Kudukli",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1079",
      "StationNameCn": "霍贾达夫列特-出口",
      "StationNameEn": "Khodjent",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1134",
      "StationNameCn": "卡拉乌尔巴扎尔站",
      "StationNameEn": "Karaulbazar",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1137",
      "StationNameCn": "安集延-南站",
      "StationNameEn": "Andizhan",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1138",
      "StationNameCn": "纳扎尔别克站",
      "StationNameEn": "Nazarbek",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1139",
      "StationNameCn": "萨马尔罕站",
      "StationNameEn": "Samarkand",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1143",
      "StationNameCn": "加拉巴站",
      "StationNameEn": "Galaba",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1144",
      "StationNameCn": "纳曼干站",
      "StationNameEn": "Namangan",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1739",
      "StationNameCn": "丘库尔赛站",
      "StationNameEn": "Chukursay",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1740",
      "StationNameCn": "塔什干货站",
      "StationNameEn": "Tashkent-Tov",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1741",
      "StationNameCn": "谢尔盖利站",
      "StationNameEn": "Sergeli",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1742",
      "StationNameCn": "阿布雷克站",
      "StationNameEn": "Ablyk",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1743",
      "StationNameCn": "阿卡尔腾站",
      "StationNameEn": "Akalten",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1744",
      "StationNameCn": "阿汉加兰站",
      "StationNameEn": "Ahangaran",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1745",
      "StationNameCn": "安集延北站",
      "StationNameEn": "Andizhan-Severnyy",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1746",
      "StationNameCn": "阿萨克站",
      "StationNameEn": "Assake",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1747",
      "StationNameCn": "布哈拉2站",
      "StationNameEn": "Bukhara-2",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1748",
      "StationNameCn": "吉扎克站",
      "StationNameEn": "Djizzak",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1749",
      "StationNameCn": "费尔干纳2站",
      "StationNameEn": "Fergana-2",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1750",
      "StationNameCn": "卡吉尔站",
      "StationNameEn": "Kakir",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1751",
      "StationNameCn": "卡尔玛纳站",
      "StationNameEn": "Karmana",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1752",
      "StationNameCn": "卡尔西站",
      "StationNameEn": "Karshi",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1753",
      "StationNameCn": "肯格索伊站",
      "StationNameEn": "Kengsoy",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1754",
      "StationNameCn": "哈姆扎站",
      "StationNameEn": "Khamza",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1755",
      "StationNameCn": "基塔布站",
      "StationNameEn": "Kitab",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1756",
      "StationNameCn": "基尔吉利站",
      "StationNameEn": "Kirgili",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1757",
      "StationNameCn": "浩罕1站",
      "StationNameEn": "Kokand-1",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1758",
      "StationNameCn": "昆格勒站",
      "StationNameEn": "Kungrad",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1759",
      "StationNameCn": "马尔吉兰站",
      "StationNameEn": "Margilan",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1760",
      "StationNameCn": "纳沃伊站",
      "StationNameEn": "Navoi",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1761",
      "StationNameCn": "努库斯站",
      "StationNameEn": "Nukus",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1762",
      "StationNameCn": "劳斯坦站",
      "StationNameEn": "Raustan",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1763",
      "StationNameCn": "瑟尔达里因斯卡亚站",
      "StationNameEn": "Syrdarinskaya",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1764",
      "StationNameCn": "铁尔梅兹站",
      "StationNameEn": "Termez",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1765",
      "StationNameCn": "京奇力克站",
      "StationNameEn": "Tinchlik",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1766",
      "StationNameCn": "托伊捷帕站",
      "StationNameEn": "Toytepa",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1767",
      "StationNameCn": "乌卢格别克",
      "StationNameEn": "Ulughbek",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1768",
      "StationNameCn": "乌尔根奇站",
      "StationNameEn": "Urgench",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1769",
      "StationNameCn": "亚兰加奇站",
      "StationNameEn": "Yalangach",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1770",
      "StationNameCn": "扬吉扎拉夫尚站",
      "StationNameEn": "Yangi-Zarafshan",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1860",
      "StationNameCn": "萨瓦伊-出口",
      "StationNameEn": "Savai",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1879",
      "StationNameCn": "别卡巴德-出口",
      "StationNameEn": "Bekabad",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1900",
      "StationNameCn": "尼尚(出口)",
      "StationNameEn": "Nishon",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "UZ",
      "StationId": "1903",
      "StationNameCn": "博尔德尔(出口)",
      "StationNameEn": "Bordel",
      "CountryCn": "乌兹别克斯坦",
      "CountryEn": "Uzbekistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1080",
      "StationNameCn": "法拉普-出口",
      "StationNameEn": "Farap",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1610",
      "StationNameCn": "阿尔廷阿西尔站",
      "StationNameEn": "Altyn Asyr",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1771",
      "StationNameCn": "迈斯卡亚站",
      "StationNameEn": "Altyn Asyr",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1772",
      "StationNameCn": "阿涅夫站",
      "StationNameEn": "Anev",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1773",
      "StationNameCn": "阿什哈巴德站",
      "StationNameEn": "Ashgabat",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1774",
      "StationNameCn": "巴尔卡纳巴特站",
      "StationNameEn": "Balkanabad",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1775",
      "StationNameCn": "达绍古兹站",
      "StationNameEn": "Dashoguz",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1776",
      "StationNameCn": "法拉普站",
      "StationNameEn": "Farap",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1777",
      "StationNameCn": "格普贾克站",
      "StationNameEn": "Gypdzhak",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1778",
      "StationNameCn": "马雷站",
      "StationNameEn": "Mary",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1779",
      "StationNameCn": "土库曼阿巴德2站",
      "StationNameEn": "Turkmenabad-2",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1780",
      "StationNameCn": "土库曼巴希1站",
      "StationNameEn": "Turkmenbashi 1",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1781",
      "StationNameCn": "泽尔格尔站",
      "StationNameEn": "Zerger",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1782",
      "StationNameCn": "迈斯卡亚站",
      "StationNameEn": "Altyn Asyr (via Bolashak)",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1901",
      "StationNameCn": "塔利马尔占(出口)",
      "StationNameEn": "Talimarjan",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1902",
      "StationNameCn": "161号会让站(出口)",
      "StationNameEn": "No.161 Passing Loop",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1904",
      "StationNameCn": "谢尔赫加卡",
      "StationNameEn": "Serkhgate",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1905",
      "StationNameCn": "萨拉赫斯-出口(去伊朗)",
      "StationNameEn": "Sarakh",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "TM",
      "StationId": "1906",
      "StationNameCn": "阿加拉",
      "StationNameEn": "Agala",
      "CountryCn": "土库曼斯坦",
      "CountryEn": "Turkmenistan",
      "ContinentCn": "亚洲",
      "ContinentEn": "Asia"
    },
    {
      "CountryId": "BY",
      "StationId": "1862",
      "StationNameCn": "古多盖-出口",
      "StationNameEn": "Gudogai",
      "CountryCn": "白俄罗斯",
      "CountryEn": "Belarus",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "BY",
      "StationId": "1881",
      "StationNameCn": "扎克佩季耶-出口",
      "StationNameEn": "Zakpeytiye",
      "CountryCn": "白俄罗斯",
      "CountryEn": "Belarus",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "BY",
      "StationId": "1882",
      "StationNameCn": "科利亚季奇-出口",
      "StationNameEn": "Kolyadichi",
      "CountryCn": "白俄罗斯",
      "CountryEn": "Belarus",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "BY",
      "StationId": "1884",
      "StationNameCn": "布鲁兹吉-出口",
      "StationNameEn": "Bryazgi",
      "CountryCn": "白俄罗斯",
      "CountryEn": "Belarus",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "BY",
      "StationId": "1892",
      "StationNameCn": "奥西诺夫卡(出口)",
      "StationNameEn": "Osipovka",
      "CountryCn": "白俄罗斯",
      "CountryEn": "Belarus",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "BY",
      "StationId": "1893",
      "StationNameCn": "布列斯特中心(出口)",
      "StationNameEn": "Brest-Central",
      "CountryCn": "白俄罗斯",
      "CountryEn": "Belarus",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "BY",
      "StationId": "1923",
      "StationNameCn": "明斯克-东",
      "StationNameEn": "Minsk-Vostochnyy",
      "CountryCn": "白俄罗斯",
      "CountryEn": "Belarus",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "BY",
      "StationId": "2034",
      "StationNameCn": "莫斯蒂",
      "StationNameEn": "Mosty",
      "CountryCn": "白俄罗斯",
      "CountryEn": "Belarus",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "BY",
      "StationId": "2045",
      "StationNameCn": "若季诺",
      "StationNameEn": "Zhodino",
      "CountryCn": "白俄罗斯",
      "CountryEn": "Belarus",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "UA",
      "StationId": "1869",
      "StationNameCn": "乔普",
      "StationNameEn": "Chop",
      "CountryCn": "乌克兰",
      "CountryEn": "Ukraine",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "UA",
      "StationId": "1870",
      "StationNameCn": "泽尔诺沃-出口",
      "StationNameEn": "Zel'nov",
      "CountryCn": "乌克兰",
      "CountryEn": "Ukraine",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1050",
      "StationNameCn": "克列斯特站",
      "StationNameEn": "Kresty",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1051",
      "StationNameCn": "斯图皮诺站",
      "StationNameEn": "Stupino",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1053",
      "StationNameCn": "霍夫里诺站",
      "StationNameEn": "Khovrino",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1056",
      "StationNameCn": "布兹佳克站",
      "StationNameEn": "Buzdyk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1057",
      "StationNameCn": "卡尔塔雷站",
      "StationNameEn": "Kartaly",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1059",
      "StationNameCn": "罗斯托夫-西站",
      "StationNameEn": "Rostov-Zapadny",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1060",
      "StationNameCn": "斯摩棱斯克站",
      "StationNameEn": "Smolensk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1061",
      "StationNameCn": "沃尔西诺站",
      "StationNameEn": "Vorsino",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1064",
      "StationNameCn": "穆罗姆站",
      "StationNameEn": "Murom",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1065",
      "StationNameCn": "车尔尼科夫站",
      "StationNameEn": "Chernigov",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1067",
      "StationNameCn": "西利卡特纳亚站",
      "StationNameEn": "Silikatnaya",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1069",
      "StationNameCn": "科利措沃站",
      "StationNameEn": "Kolitsovo",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1154",
      "StationNameCn": "克拉斯诺达尔站",
      "StationNameEn": "Krasnodar",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1158",
      "StationNameCn": "雷利斯克站",
      "StationNameEn": "Ryazhsk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1160",
      "StationNameCn": "沃特金斯克站",
      "StationNameEn": "Votkinsk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1162",
      "StationNameCn": "比克良站",
      "StationNameEn": "Biklyan",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1164",
      "StationNameCn": "阿尔汉格尔斯克站",
      "StationNameEn": "Arkhangelsk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1165",
      "StationNameCn": "布拉茨克站",
      "StationNameEn": "Bratsk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1166",
      "StationNameCn": "格拉佐夫站",
      "StationNameEn": "Glaceov",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1167",
      "StationNameCn": "日古廖夫海站",
      "StationNameEn": "Zhelezny Port",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1170",
      "StationNameCn": "下塔吉尔站",
      "StationNameEn": "Nizhny Tagil",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1172",
      "StationNameCn": "锡利卡特纳亚站",
      "StationNameEn": "Silikatnaya",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1174",
      "StationNameCn": "武尔纳雷站",
      "StationNameEn": "Vurnary",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1175",
      "StationNameCn": "巴尔瑙尔站",
      "StationNameEn": "Barnaul",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1176",
      "StationNameCn": "切列波伟茨站",
      "StationNameEn": "Cherepovets",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1177",
      "StationNameCn": "哈巴罗夫斯克站",
      "StationNameEn": "Khabarovsk-2",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1179",
      "StationNameCn": "利佩兹克站",
      "StationNameEn": "Lipetsk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1180",
      "StationNameCn": "莫斯科站",
      "StationNameEn": "Moscow-Butyrskaya",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1183",
      "StationNameCn": "塔利齐/乌兰乌德站",
      "StationNameEn": "Tal'tsy (Ulan-Ude)",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1184",
      "StationNameCn": "上涅伊温斯克站",
      "StationNameEn": "Verkh-Neivensk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1545",
      "StationNameCn": "后贝加尔站",
      "StationNameEn": "Zabaikalye",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1547",
      "StationNameCn": "格罗杰科沃站",
      "StationNameEn": "Gordeyevka",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1641",
      "StationNameCn": "车里雅宾斯克站",
      "StationNameEn": "Chelyabinsk-gruzovoi",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1792",
      "StationNameCn": "阿巴坎站",
      "StationNameEn": "Abakan",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1793",
      "StationNameCn": "巴尔瑙尔站",
      "StationNameEn": "Barnaul",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1794",
      "StationNameCn": "巴塔列伊纳亚站",
      "StationNameEn": "Batareinaya",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1795",
      "StationNameCn": "巴扎伊哈站",
      "StationNameEn": "Bazaiha",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1796",
      "StationNameCn": "别济米扬卡站",
      "StationNameEn": "Bezymyanka",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1797",
      "StationNameCn": "布洛奇纳亚站",
      "StationNameEn": "Blochnaya",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1798",
      "StationNameCn": "切博克萨雷站",
      "StationNameEn": "Cheboksary",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1799",
      "StationNameCn": "车里雅宾斯克货站",
      "StationNameEn": "Chelyabinsk-gruzovoi",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1800",
      "StationNameCn": "切尔尼科夫卡站",
      "StationNameEn": "Chernikovka",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1801",
      "StationNameCn": "赤塔1站",
      "StationNameEn": "Chita-1",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1802",
      "StationNameCn": "斯维尔德罗夫斯克货站",
      "StationNameEn": "Ekaterinburg-Tovarny",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1803",
      "StationNameCn": "卡卢加1站",
      "StationNameEn": "Kaluga",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1804",
      "StationNameCn": "克麦罗沃编组站",
      "StationNameEn": "Kemerovo-Sortirovochnoe",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1805",
      "StationNameCn": "哈萨夫尤尔特站",
      "StationNameEn": "Khasavyurt",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1806",
      "StationNameCn": "克列希哈站",
      "StationNameEn": "Kleshikha",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1807",
      "StationNameCn": "科斯塔里哈站",
      "StationNameEn": "Kostarikha",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1808",
      "StationNameCn": "克鲁格罗耶波列站",
      "StationNameEn": "Krugloe Pole",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1809",
      "StationNameCn": "昆采沃2站",
      "StationNameEn": "Kuntsevo-2",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1810",
      "StationNameCn": "库尔干秋别站",
      "StationNameEn": "Kurgan",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1811",
      "StationNameCn": "拉格尔纳亚站",
      "StationNameEn": "Lagernaya",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1812",
      "StationNameCn": "列索克站",
      "StationNameEn": "Lesok",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1813",
      "StationNameCn": "马格尼托格尔斯克货站",
      "StationNameEn": "Magnitogorsk-Gruzovoi",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1814",
      "StationNameCn": "马哈奇卡拉站",
      "StationNameEn": "Makhachkala",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1815",
      "StationNameCn": "米阿斯1站",
      "StationNameEn": "Mias",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1816",
      "StationNameCn": "莫斯科-帕韦列茨卡亚货站",
      "StationNameEn": "Moscow-tovarnaya-Paveletskaya",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1817",
      "StationNameCn": "下卡姆斯克站",
      "StationNameEn": "Nizhnekamsk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1818",
      "StationNameCn": "下瓦尔托夫斯克1站",
      "StationNameEn": "Nizhnevartovsk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1819",
      "StationNameCn": "新古比雪夫斯卡亚站",
      "StationNameEn": "Novokuibishevskaya",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1820",
      "StationNameCn": "新库兹涅茨克东站",
      "StationNameEn": "Novokuznetsk-Vostochnyi",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1821",
      "StationNameCn": "新西伯利亚东站",
      "StationNameEn": "Novosibirsk Vostochnyi",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1822",
      "StationNameCn": "新罗西斯克站",
      "StationNameEn": "Novorossisk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1823",
      "StationNameCn": "鄂木斯克东站",
      "StationNameEn": "Omsk-vostochny",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1824",
      "StationNameCn": "奥伦堡站",
      "StationNameEn": "Orenburg",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1825",
      "StationNameCn": "奥尔斯克站",
      "StationNameEn": "Orsk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1826",
      "StationNameCn": "奔萨2站",
      "StationNameEn": "Penza-2",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1827",
      "StationNameCn": "波济米站",
      "StationNameEn": "Pozim",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1828",
      "StationNameCn": "普里沃尔日耶站",
      "StationNameEn": "Privolzh'ye",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1829",
      "StationNameCn": "罗斯托夫货站",
      "StationNameEn": "Rostov-Tovarny",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1830",
      "StationNameCn": "舒沙雷站",
      "StationNameEn": "Shushary",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1831",
      "StationNameCn": "索契站",
      "StationNameEn": "Sochi",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1832",
      "StationNameCn": "斯捷尔利塔马克站",
      "StationNameEn": "Sterlitamak",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1833",
      "StationNameCn": "苏尔古特站",
      "StationNameEn": "Surgut",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1834",
      "StationNameCn": "陶里亚蒂站",
      "StationNameEn": "Tolyatti",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1835",
      "StationNameCn": "托木斯克货站",
      "StationNameEn": "Tomsk-gruzovoi",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1836",
      "StationNameCn": "特罗菲莫夫斯基2站",
      "StationNameEn": "Trofimovsky-2",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1837",
      "StationNameCn": "茨纳站",
      "StationNameEn": "Tsna",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1838",
      "StationNameCn": "特维尔站",
      "StationNameEn": "Tver",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1839",
      "StationNameCn": "图拉-维亚泽姆斯卡亚站",
      "StationNameEn": "Tula-Vyazemskaya",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1840",
      "StationNameCn": "尤里耶韦茨站",
      "StationNameEn": "Uryevets",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1841",
      "StationNameCn": "乌辛斯克站",
      "StationNameEn": "Usinsk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1842",
      "StationNameCn": "沃伊诺卡夫站",
      "StationNameEn": "Voinovka",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1851",
      "StationNameCn": "库图姆/阿斯特拉罕",
      "StationNameEn": "Kutum (Astrakhan)",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1863",
      "StationNameCn": "马莫诺沃－出口",
      "StationNameEn": "Mamonovo",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1871",
      "StationNameCn": "苏泽姆卡-出口",
      "StationNameEn": "Suzemka",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1876",
      "StationNameCn": "车尔尼雪夫斯基",
      "StationNameEn": "Chernyshevsky",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1880",
      "StationNameCn": "兹伦卡-出口",
      "StationNameEn": "Zelenka",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1887",
      "StationNameCn": "卡拉奥巴",
      "StationNameEn": "Kaloob",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1890",
      "StationNameCn": "卡尼赛(出口)",
      "StationNameEn": "Kanisey",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1891",
      "StationNameCn": "克拉斯诺耶(出口)",
      "StationNameEn": "Krasnoye",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1895",
      "StationNameCn": "纳乌什基(出口)",
      "StationNameEn": "Naushki",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1898",
      "StationNameCn": "布斯洛夫斯卡(出口)",
      "StationNameEn": "Buslovskaya",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1909",
      "StationNameCn": "奥津基(出口)",
      "StationNameEn": "Ozinki",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1910",
      "StationNameCn": "圣彼得堡维捷布斯基-货站",
      "StationNameEn": "St. Petersburg-Vitebsky-Tovarny",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1911",
      "StationNameCn": "列宁斯克 - 库兹涅茨基1",
      "StationNameEn": "Leninsk-Kuznetsky-1",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1919",
      "StationNameCn": "达尔马托沃",
      "StationNameEn": "Dalmatovo",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1928",
      "StationNameCn": "伊尼亚东",
      "StationNameEn": "Inya-Vostochnaya",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1939",
      "StationNameCn": "库帕夫纳",
      "StationNameEn": "Kupavna",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1944",
      "StationNameCn": "谢利亚季诺",
      "StationNameEn": "Selyatino",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1947",
      "StationNameCn": "埃列克特罗乌格利",
      "StationNameEn": "Elektrougli",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1967",
      "StationNameCn": "基洛夫-科特拉斯基",
      "StationNameEn": "Kirov-Kotlasskiy",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1961",
      "StationNameCn": "叶卡捷琳堡-货",
      "StationNameEn": "Yekaterinburg-Tovarny",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1963",
      "StationNameCn": "乌斯季伊利姆斯克",
      "StationNameEn": "Ust-Ilimsk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "1995",
      "StationNameCn": "别雷拉斯特",
      "StationNameEn": "Bely Rast",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2001",
      "StationNameCn": "电煤",
      "StationNameEn": "Dianmei",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2020",
      "StationNameCn": "伊尔库茨克",
      "StationNameEn": "Irkutsk-Passazhirskiy",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2021",
      "StationNameCn": "布拉茨克",
      "StationNameEn": "Bratsk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2022",
      "StationNameCn": "尼佐夫卡",
      "StationNameEn": "Nizovka",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2023",
      "StationNameCn": "伊萨科戈尔卡",
      "StationNameEn": "Isakovka",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2024",
      "StationNameCn": "瑟克特夫卡尔",
      "StationNameEn": "Syktyvkar",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2025",
      "StationNameCn": "维霍列夫卡",
      "StationNameEn": "Vikhorevka",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2026",
      "StationNameCn": "锡利卡特纳亚",
      "StationNameEn": "Silikatnaya",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2029",
      "StationNameCn": "科捷利尼奇",
      "StationNameEn": "Kotelnich",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2030",
      "StationNameCn": "大乌斯秋格",
      "StationNameEn": "Veliky Ustyug",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2037",
      "StationNameCn": "卡尔贝舍沃 1",
      "StationNameEn": "Karabashevo-1",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2038",
      "StationNameCn": "奥涅加",
      "StationNameEn": "Onezhsky",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2039",
      "StationNameCn": "沃洛格达2",
      "StationNameEn": "Vologda-2",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2040",
      "StationNameCn": "普列德波尔托瓦亚",
      "StationNameEn": "Predportovaya",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2043",
      "StationNameCn": "沃罗滕斯克",
      "StationNameEn": "Vorotynsk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2048",
      "StationNameCn": "罗斯特克",
      "StationNameEn": "Rostec",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2049",
      "StationNameCn": "布龙卡",
      "StationNameEn": "Bronka",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2054",
      "StationNameCn": "扎涅夫斯基波斯特",
      "StationNameEn": "Zanevsky Post",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2055",
      "StationNameCn": "梅热格",
      "StationNameEn": "Mezhegey",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2056",
      "StationNameCn": "新特罗伊茨克",
      "StationNameEn": "Novotroitsk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2059",
      "StationNameCn": "布龙卡",
      "StationNameEn": "Bronka",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2061",
      "StationNameCn": "伏尔加斯基",
      "StationNameEn": "Volzhsky",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2063",
      "StationNameCn": "科伊特",
      "StationNameEn": "Koity",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2068",
      "StationNameCn": "乌里扬诺夫斯克3",
      "StationNameEn": "Ulyanovsk-3",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2077",
      "StationNameCn": "萨马拉",
      "StationNameEn": "Samara",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2078",
      "StationNameCn": "谢亚捷利",
      "StationNameEn": "Seyatel",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2079",
      "StationNameCn": "梅尔基",
      "StationNameEn": "Merkhi",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2081",
      "StationNameCn": "沙巴内",
      "StationNameEn": "Shabany",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2082",
      "StationNameCn": "阿夫托沃",
      "StationNameEn": "Avtovo",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2086",
      "StationNameCn": "叶弋里耶夫斯克1",
      "StationNameEn": "Egoryevsk-1",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2090",
      "StationNameCn": "吉洪诺沃",
      "StationNameEn": "Gikhonovo",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2092",
      "StationNameCn": "新布拉戈维先卡",
      "StationNameEn": "Novoblagoveshchensk",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2093",
      "StationNameCn": "契诃夫",
      "StationNameEn": "Chekhov",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    },
    {
      "CountryId": "RU",
      "StationId": "2099",
      "StationNameCn": "斯米尔诺沃",
      "StationNameEn": "Smirnovo",
      "CountryCn": "俄罗斯",
      "CountryEn": "Russia",
      "ContinentCn": "欧洲",
      "ContinentEn": "Europe"
    }
  ];


// 获取账单管理台账列表
export const getBaseRailwayPortList = async (): Promise<BaseRailwayPortItemProps[]> => {
  return baseRailwayPortItems;
}

// 保存账单管理
export const saveBaseRailwayPort = async (data: BaseRailwayPortItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseRailwayPortItemProps> => {
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
export const getBaseRailwayPortList = async (): Promise<BaseRailwayPortItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_railway_port"
  })
  const responseData = response?.data as ApiRes<BaseRailwayPortItemProps[]>;
  return responseData.data || [];
}

export const saveBaseRailwayPort = (data:BaseRailwayPortItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_railway_port/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
