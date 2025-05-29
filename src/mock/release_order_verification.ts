import Mock from "mockjs";
import { ReleaseOrderVerificationItemProps } from "@/types/cost_manage/release_order_verification";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const releaseOrderVerificationItems:ReleaseOrderVerificationItemProps[] = [
    {
      BusinessId: Mock.mock("@id"),
      Consignor: Mock.mock('@ctitle(5)'),
      BookingAgent: Mock.mock('@ctitle(5)'),
      ShippingCompany: Mock.mock('@ctitle(5)'),
      SailingDate: Mock.mock('@datetime()'),
      VesselVoyage: Mock.mock('@ctitle(5)'),
      MblNumber: Mock.mock('@ctitle(5)'),
      MblType: Mock.mock('@ctitle(5)'),
      BusinessStatus: Mock.mock('@ctitle(5)'),
      SalesPerson: Mock.mock('@ctitle(5)'),
      BlStatus: Mock.mock('@ctitle(5)'),
      ReleaseAuditStatus: Mock.mock('@ctitle(5)'),
      AuditTime: Mock.mock('@datetime()'),
      HoldTime: Mock.mock('@datetime()'),
      HoldReason: Mock.mock('@ctitle(5)'),
      ContractValid: Mock.mock('@string("number", 1, 3)'),
      Invoiced: Mock.mock('@string("number", 1, 3)'),
      FullyWrittenOff: Mock.mock('@string("number", 1, 3)'),
      Overdue: Mock.mock('@string("number", 1, 3)'),
      OverLimit: Mock.mock('@string("number", 1, 3)'),
      Remarks: Mock.mock('@ctitle(5)'),
      SysAuditStatus: ""
    },  
    {
        BusinessId:Mock.mock("@id"),
        Consignor:Mock.mock('@ctitle(5)'),
        BookingAgent:Mock.mock('@ctitle(5)'),
        ShippingCompany:Mock.mock('@ctitle(5)'),
        SailingDate:Mock.mock('@datetime()'),
        VesselVoyage:Mock.mock('@ctitle(5)'),
        MblNumber:Mock.mock('@ctitle(5)'),
        MblType:Mock.mock('@ctitle(5)'),
        BusinessStatus:Mock.mock('@ctitle(5)'),
        SalesPerson:Mock.mock('@ctitle(5)'),
        BlStatus:Mock.mock('@ctitle(5)'),
        ReleaseAuditStatus:Mock.mock('@ctitle(5)'),
        AuditTime:Mock.mock('@datetime()'),
        HoldTime:Mock.mock('@datetime()'),
        HoldReason:Mock.mock('@ctitle(5)'),
        ContractValid:Mock.mock('@string("number", 1, 3)'),
        Invoiced:Mock.mock('@string("number", 1, 3)'),
        FullyWrittenOff:Mock.mock('@string("number", 1, 3)'),
        Overdue:Mock.mock('@string("number", 1, 3)'),
        OverLimit:Mock.mock('@string("number", 1, 3)'),
        Remarks:Mock.mock('@ctitle(5)'),
        SysAuditStatus: ""
    },  
    {
        BusinessId:Mock.mock("@id"),
        Consignor:Mock.mock('@ctitle(5)'),
        BookingAgent:Mock.mock('@ctitle(5)'),
        ShippingCompany:Mock.mock('@ctitle(5)'),
        SailingDate:Mock.mock('@datetime()'),
        VesselVoyage:Mock.mock('@ctitle(5)'),
        MblNumber:Mock.mock('@ctitle(5)'),
        MblType:Mock.mock('@ctitle(5)'),
        BusinessStatus:Mock.mock('@ctitle(5)'),
        SalesPerson:Mock.mock('@ctitle(5)'),
        BlStatus:Mock.mock('@ctitle(5)'),
        ReleaseAuditStatus:Mock.mock('@ctitle(5)'),
        AuditTime:Mock.mock('@datetime()'),
        HoldTime:Mock.mock('@datetime()'),
        HoldReason:Mock.mock('@ctitle(5)'),
        ContractValid:Mock.mock('@string("number", 1, 3)'),
        Invoiced:Mock.mock('@string("number", 1, 3)'),
        FullyWrittenOff:Mock.mock('@string("number", 1, 3)'),
        Overdue:Mock.mock('@string("number", 1, 3)'),
        OverLimit:Mock.mock('@string("number", 1, 3)'),
        Remarks:Mock.mock('@ctitle(5)'),
        SysAuditStatus: ""
    },  
    {
        BusinessId:Mock.mock("@id"),
        Consignor:Mock.mock('@ctitle(5)'),
        BookingAgent:Mock.mock('@ctitle(5)'),
        ShippingCompany:Mock.mock('@ctitle(5)'),
        SailingDate:Mock.mock('@datetime()'),
        VesselVoyage:Mock.mock('@ctitle(5)'),
        MblNumber:Mock.mock('@ctitle(5)'),
        MblType:Mock.mock('@ctitle(5)'),
        BusinessStatus:Mock.mock('@ctitle(5)'),
        SalesPerson:Mock.mock('@ctitle(5)'),
        BlStatus:Mock.mock('@ctitle(5)'),
        ReleaseAuditStatus:Mock.mock('@ctitle(5)'),
        AuditTime:Mock.mock('@datetime()'),
        HoldTime:Mock.mock('@datetime()'),
        HoldReason:Mock.mock('@ctitle(5)'),
        ContractValid:Mock.mock('@string("number", 1, 3)'),
        Invoiced:Mock.mock('@string("number", 1, 3)'),
        FullyWrittenOff:Mock.mock('@string("number", 1, 3)'),
        Overdue:Mock.mock('@string("number", 1, 3)'),
        OverLimit:Mock.mock('@string("number", 1, 3)'),
        Remarks:Mock.mock('@ctitle(5)'),
        SysAuditStatus: ""
    },  
    {
        BusinessId:Mock.mock("@id"),
        Consignor:Mock.mock('@ctitle(5)'),
        BookingAgent:Mock.mock('@ctitle(5)'),
        ShippingCompany:Mock.mock('@ctitle(5)'),
        SailingDate:Mock.mock('@datetime()'),
        VesselVoyage:Mock.mock('@ctitle(5)'),
        MblNumber:Mock.mock('@ctitle(5)'),
        MblType:Mock.mock('@ctitle(5)'),
        BusinessStatus:Mock.mock('@ctitle(5)'),
        SalesPerson:Mock.mock('@ctitle(5)'),
        BlStatus:Mock.mock('@ctitle(5)'),
        ReleaseAuditStatus:Mock.mock('@ctitle(5)'),
        AuditTime:Mock.mock('@datetime()'),
        HoldTime:Mock.mock('@datetime()'),
        HoldReason:Mock.mock('@ctitle(5)'),
        ContractValid:Mock.mock('@string("number", 1, 3)'),
        Invoiced:Mock.mock('@string("number", 1, 3)'),
        FullyWrittenOff:Mock.mock('@string("number", 1, 3)'),
        Overdue:Mock.mock('@string("number", 1, 3)'),
        OverLimit:Mock.mock('@string("number", 1, 3)'),
        Remarks:Mock.mock('@ctitle(5)'),
        SysAuditStatus: ""
    },   
];
 
export default [
  // 放单审核台账
  {
    url: "/api/release_order_verification",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: releaseOrderVerificationItems,
      };
    },
  },
  {
    url: "/api/release_order_verification/save",
    method: "POST",
    response: ({ body }: { body: ReleaseOrderVerificationItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/release_order_verification/save/progress",
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