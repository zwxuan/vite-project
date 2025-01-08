import Mock from "mockjs";
import { CurrencyItemProps } from "@/types/currency/currency";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const currencyItems:CurrencyItemProps[] = [
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "人民币",
    CurrencyShortName: "RMB",
    CurrencyMark: "￥",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "美元",
    CurrencyShortName: "USD",
    CurrencyMark: "$",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:1,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "欧元",
    CurrencyShortName: "EUR",
    CurrencyMark: "€",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:2,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "英镑",
    CurrencyShortName: "GBP",
    CurrencyMark: "£",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "日元",
    CurrencyShortName: "JPY", 
    CurrencyMark: "¥",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "韩元",
    CurrencyShortName: "KRW",
    CurrencyMark: "₩",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "泰铢",
    CurrencyShortName: "THB",
    CurrencyMark: "฿",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "越南盾",
    CurrencyShortName: "VND",
    CurrencyMark: "₫",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "卢布",
    CurrencyShortName: "RUB",
    CurrencyMark: "₽",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "新西兰元",
    CurrencyShortName: "NZD",
    CurrencyMark: "$" ,
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "澳大利亚元",
    CurrencyShortName: "AUD",
    CurrencyMark: "$",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "加拿大元",
    CurrencyShortName: "CAD",
    CurrencyMark: "$",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "瑞士法郎",
    CurrencyShortName: "CHF",
    CurrencyMark: "CHF",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "新加坡元",
    CurrencyShortName: "SGD",
    CurrencyMark: "$",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
];
 
export default [
  // 用户登录
  {
    url: "/api/currency",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: currencyItems,
      };
    },
  },
  {
    url: "/api/currency/save",
    method: "POST",
    response: ({ body }: { body: CurrencyItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/currency/save/progress",
    method: "GET",
    rawResponse: async (req: IncomingMessage, res: ServerResponse) => {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');

      let progress = 0;
      
      const sendProgress = () => {
        const data = {
          code: 200,
          success: true,
          message: progress >= 100 ? "保存成功" : "处理中...",
          data: {
            progress: progress,
            status: progress >= 100 ? 'completed' : 'processing',
            result: progress >= 100 ? null : null
          }
        };

        res.write(`data: ${JSON.stringify(data)}\n\n`);
        console.log('Sending progress:', progress);

        if (progress >= 100) {
          res.end();
          return;
        }

        progress += 10;
        setTimeout(sendProgress, 1000);
      };

      sendProgress();
    }
  }
];