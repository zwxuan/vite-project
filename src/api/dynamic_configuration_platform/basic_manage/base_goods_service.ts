
import request, {ApiRes,requestWithProgress } from '../../request'
import { BaseGoodsItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_goods";
import Mock from "mockjs";
//
const baseGoodsItems:BaseGoodsItemProps[] = [
    {
        "GoodsCode":"4821101000",
        "GoodsName":"标签 自粘的",
        "MostFavoredNationRate":0,
        "OrdinaryRate":0,
        "ValueAddedTax":0,
        "LegalUnit":"PCS",
        "EnglishGoodsName":"LABEL(PAPER)",
        "SecondUnit":"",
        "RegulatoryMode":""
    },
    {
        "GoodsCode":"8215991000",
        "GoodsName":"烧烤夹",
        "MostFavoredNationRate":0,
        "OrdinaryRate":8.5,
        "ValueAddedTax":0,
        "LegalUnit":"PCS",
        "EnglishGoodsName":"BARBECUE TONGS(STAINLESS STEEL)",
        "SecondUnit":"",
        "RegulatoryMode":""
    },
    {
        "GoodsCode":"5113000000",
        "GoodsName":"动物粗毛或马毛的机织物",
        "MostFavoredNationRate":10.0,
        "OrdinaryRate":130.0,
        "ValueAddedTax":17,
        "LegalUnit":"030",
        "EnglishGoodsName":"WOVEN FABRICS OF COARSE ANIMAL HAIR OR OF HORSEHAIR",
        "SecondUnit":"35.0",
        "RegulatoryMode":""
    },
    {
        "GoodsCode":"9608500000",
        "GoodsName":"含有两种笔及以上的成套货品",
        "MostFavoredNationRate":21.0,
        "OrdinaryRate":80.0,
        "ValueAddedTax":17,
        "LegalUnit":"006",
        "EnglishGoodsName":"STATIONERY SET",
        "SecondUnit":"0.0",
        "RegulatoryMode":""
    },
    {
        "GoodsCode":"9015900010",
        "GoodsName":"机、舰载重力仪和重力梯度仪部件",
        "MostFavoredNationRate":5.0,
        "OrdinaryRate":14.0,
        "ValueAddedTax":17,
        "LegalUnit":"035",
        "EnglishGoodsName":"Surveying (including photogrammetrical surveying), hydrographic, oceanographic, hydrological, meteorological or geophysical instruments and appliances, excluding compasses; rangefinders  - Parts and accessories  - - Parts of meteorological instruments and of rangefinders, for use in certain types of aircraft",
        "SecondUnit":"0.0",
        "RegulatoryMode":"3"
    },
    {
        "GoodsCode":"2922120090",
        "GoodsName":"二乙醇胺盐",
        "MostFavoredNationRate":6.5,
        "OrdinaryRate":30.0,
        "ValueAddedTax":17,
        "LegalUnit":"035",
        "EnglishGoodsName":"Oxygen-function amino-compounds  - - Diethanolamine and its salts  - - - Other",
        "SecondUnit":"0.0",
        "RegulatoryMode":"3"
    },
    {
        "GoodsCode":"5515120022",
        "GoodsName":"其他聚酯短纤平布",
        "MostFavoredNationRate":10.0,
        "OrdinaryRate":130.0,
        "ValueAddedTax":17,
        "LegalUnit":"030",
        "EnglishGoodsName":"92% POLYESTER 8% SPANDEX",
        "SecondUnit":"35.0",
        "RegulatoryMode":"3"
    },
    {
        "GoodsCode":"8462319000",
        "GoodsName":"加工金属的其他数控剪切机床",
        "MostFavoredNationRate":7.0,
        "OrdinaryRate":20.0,
        "ValueAddedTax":17,
        "LegalUnit":"001",
        "EnglishGoodsName":"AIR CONDITIONER",
        "SecondUnit":"0.0",
        "RegulatoryMode":"O"
    },
    {
        "GoodsCode":"6704190000",
        "GoodsName":"合成纺织材料制其他假发、须等",
        "MostFavoredNationRate":25.0,
        "OrdinaryRate":130.0,
        "ValueAddedTax":17,
        "LegalUnit":"035",
        "EnglishGoodsName":"FALSE EYELASHES(FIBER)",
        "SecondUnit":"0.0",
        "RegulatoryMode":"O"
    },
    {
        "GoodsCode":"4420909990",
        "GoodsName":"木盒",
        "MostFavoredNationRate":0.0,
        "OrdinaryRate":0.0,
        "ValueAddedTax":0,
        "LegalUnit":"PCS",
        "EnglishGoodsName":"WOODEN BOX(WOODEN)",
        "SecondUnit":"0.0",
        "RegulatoryMode":"O"
    },
    {
        "GoodsCode":"8516320000",
        "GoodsName":"其他电热理发器具",
        "MostFavoredNationRate":35.0,
        "OrdinaryRate":100.0,
        "ValueAddedTax":17,
        "LegalUnit":"007",
        "EnglishGoodsName":"CURLY STICKS(PLASTIC+METAL)",
        "SecondUnit":"0.0",
        "RegulatoryMode":"A"
    },
    {
        "GoodsCode":"2921430020",
        "GoodsName":"邻甲苯胺",
        "MostFavoredNationRate":6.5,
        "OrdinaryRate":30.0,
        "ValueAddedTax":17,
        "LegalUnit":"035",
        "EnglishGoodsName":"Amine-function compounds  IX. NITROGEN-FUNCTION COMPOUNDS  - - Toluidines and their derivatives; salts thereof  - - - 4-Amino-6-chlorotoluene-3-sulfonic acid",
        "SecondUnit":"0.0",
        "RegulatoryMode":"A"
    },
    {
        "GoodsCode":"6302329090",
        "GoodsName":"化纤制其他床上用织物制品",
        "MostFavoredNationRate":16.0,
        "OrdinaryRate":130.0,
        "ValueAddedTax":17,
        "LegalUnit":"015",
        "EnglishGoodsName":"Bedlinen, table linen, toilet linen and kitchen linen  - - Of man-made fibres  - - - Other  - - - - Other",
        "SecondUnit":"35.0",
        "RegulatoryMode":"A"
    },
    {
        "GoodsCode":"6308000020",
        "GoodsName":"机织物及纱线制零售包装成套物品",
        "MostFavoredNationRate":14.0,
        "OrdinaryRate":130.0,
        "ValueAddedTax":17,
        "LegalUnit":"035",
        "EnglishGoodsName":"Sets consisting of woven fabric and yarn, whether or not with accessories, for making up into rugs, tapestries, embroidered table cloths or serviettes, or similar textile articles, put up in packings for retail sale (excl. sets for making up into articles of clothing)  - Of synthetic fibres (staple or waste)",
        "SecondUnit":"0.0",
        "RegulatoryMode":"A"
    },
    {
        "GoodsCode":"6104430000",
        "GoodsName":"女连衣裙(涤纶)",
        "MostFavoredNationRate":0.0,
        "OrdinaryRate":12.0,
        "ValueAddedTax":0,
        "LegalUnit":"PCS",
        "EnglishGoodsName":"DRESSES(POLYESTER)",
        "SecondUnit":"0.0",
        "RegulatoryMode":"A"
    },
    {
        "GoodsCode":"8473309000",
        "GoodsName":"品目8471所列其他机器零附件",
        "MostFavoredNationRate":0.0,
        "OrdinaryRate":40.0,
        "ValueAddedTax":17,
        "LegalUnit":"035",
        "EnglishGoodsName":"COMPUTER PARTS",
        "SecondUnit":"0.0",
        "RegulatoryMode":"A"
    },
    {
        "GoodsCode":"6001290010",
        "GoodsName":"毛制针织或钩编毛圈绒头织物",
        "MostFavoredNationRate":12.0,
        "OrdinaryRate":130.0,
        "ValueAddedTax":17,
        "LegalUnit":"030",
        "EnglishGoodsName":"Pile fabrics, including 'long pile' fabrics and terry fabrics, knitted or crocheted  - - Of other textile materials  - - - Of wool or fine animal hair",
        "SecondUnit":"35.0",
        "RegulatoryMode":"A"
    },
    {
        "GoodsCode":"2933790010",
        "GoodsName":"氯巴占和甲乙哌酮的盐",
        "MostFavoredNationRate":9.0,
        "OrdinaryRate":20.0,
        "ValueAddedTax":17,
        "LegalUnit":"035",
        "EnglishGoodsName":"Heterocyclic compounds with nitrogen hetero-atom(s) only  - - Other lactams  - - - Ezetimibe (INN)",
        "SecondUnit":"0.0",
        "RegulatoryMode":"I"
    },
    {
        "GoodsCode":"9401619000",
        "GoodsName":"其他装软垫的木框架的坐具",
        "MostFavoredNationRate":0.0,
        "OrdinaryRate":100.0,
        "ValueAddedTax":17,
        "LegalUnit":"007",
        "EnglishGoodsName":"IKEA HOME FURNISHING PRODUCTS",
        "SecondUnit":"35.0",
        "RegulatoryMode":"AB"
    },
    {
        "GoodsCode":"6103390010",
        "GoodsName":"人造纤维制针织或钩编男式上衣",
        "MostFavoredNationRate":16.0,
        "OrdinaryRate":130.0,
        "ValueAddedTax":17,
        "LegalUnit":"011",
        "EnglishGoodsName":"Men's or boys' suits, ensembles, jackets, blazers, trousers, bib and brace overalls, breeches and shorts (other than swimwear), knitted or crocheted  - - Of other textile materials  - - - Of artificial fibres",
        "SecondUnit":"35.0",
        "RegulatoryMode":"AB"
    },
    {
        "GoodsCode":"3917290000",
        "GoodsName":"其他塑料制的硬管",
        "MostFavoredNationRate":10.0,
        "OrdinaryRate":45.0,
        "ValueAddedTax":17,
        "LegalUnit":"035",
        "EnglishGoodsName":"EVA GARDEN HOSE",
        "SecondUnit":"0.0",
        "RegulatoryMode":"AB"
    },
    {
        "GoodsCode":"5810910000",
        "GoodsName":"棉制见底布的刺绣品",
        "MostFavoredNationRate":10.0,
        "OrdinaryRate":130.0,
        "ValueAddedTax":17,
        "LegalUnit":"035",
        "EnglishGoodsName":"TEXTILE PIECE GOODS",
        "SecondUnit":"0.0",
        "RegulatoryMode":"AB"
    },
    {
        "GoodsCode":"8528610090",
        "GoodsName":"其他专用或主要用于品目8471",
        "MostFavoredNationRate":0.0,
        "OrdinaryRate":14.0,
        "ValueAddedTax":17,
        "LegalUnit":"001",
        "EnglishGoodsName":"Monitors and projectors, not incorporating television reception apparatus; reception apparatus for television, whether or not incorporating radio-broadcast receivers or sound or video recording or reproducing apparatus  - Projectors  - - Of a kind solely or principally used in an automatic data-processing system of heading|8471  - - - Other",
        "SecondUnit":"0.0",
        "RegulatoryMode":"A"
    },
    {
        "GoodsCode":"4911990000",
        "GoodsName":"相框",
        "MostFavoredNationRate":0.0,
        "OrdinaryRate":0.0,
        "ValueAddedTax":0,
        "LegalUnit":"PCS",
        "EnglishGoodsName":"FRAME(PAPER)",
        "SecondUnit":"0.0",
        "RegulatoryMode":"A"
    }
];


// 获取账单管理台账列表
export const getBaseGoodsList = async (): Promise<BaseGoodsItemProps[]> => {
  return baseGoodsItems;
}

// 保存账单管理
export const saveBaseGoods = async (data: BaseGoodsItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseGoodsItemProps> => {
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
export const getBaseGoodsList = async (): Promise<BaseGoodsItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_goods"
  })
  const responseData = response?.data as ApiRes<BaseGoodsItemProps[]>;
  return responseData.data || [];
}

export const saveBaseGoods = (data:BaseGoodsItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_goods/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
