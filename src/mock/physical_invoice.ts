import Mock from "mockjs";
import { PhysicalInvoiceItemProps } from "@/types/cost_manage/physical_invoice";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const physicalInvoiceItems:PhysicalInvoiceItemProps[] = [
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
    {
        InvoiceSerialNumber:Mock.mock('@ctitle(5)'),
        InvoiceType:Mock.mock('@ctitle(5)'),
        PurchaserName:Mock.mock('@ctitle(5)'),
        PurchaserTaxNumber:Mock.mock('@ctitle(5)'),
        InvoiceCode:Mock.mock('@ctitle(5)'),
        InvoiceNumber:Mock.mock('@ctitle(5)'),
        InvoiceDate:Mock.mock('@datetime()'),
        SellerName:Mock.mock('@ctitle(5)'),
        SellerTaxNumber:Mock.mock('@ctitle(5)'),
        TotalAmount:Mock.mock('@float(60, 100, 0, 2)'),
        FileName:Mock.mock('@ctitle(5)'),
        FilePath:Mock.mock('@ctitle(5)'),
        DownloadCount:Mock.mock('@string("number", 1, 3)'),
    },  
];
 
export default [
  // 实体发票台账
  {
    url: "/api/physical_invoice",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: physicalInvoiceItems,
      };
    },
  },
  {
    url: "/api/physical_invoice/save",
    method: "POST",
    response: ({ body }: { body: PhysicalInvoiceItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/physical_invoice/save/progress",
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