import Mock from "mockjs";
import { FeeReconciliationItemProps } from "@/types/settlement_center/cost_manage/fee_reconciliation";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const feeReconciliationItems: FeeReconciliationItemProps[] = [
  {
    "ShippingCompany": "高丽海运株式会社",
    "PricingNature": "自有约价",
    "ActualPortEntryDate": "2020-07-23 13:11",
    "BusinessModel": "整箱",
    "BusinessNumber": "AFS2007004",
    "WarehouseEntryNumber": "AFS2007004",
    "BookingNumber": "",
    "CutoffDate": "2020-08-03",
    "ProjectNumber": "",
    "Sono": "KMTCSHAF703978,KMTCSHAF703978A",
    "ContainerNumber": ",FFAU1030131",
    "OverseasCustomerService": "",
    "SiteOperation": "",
    "PaymentApplicationNumber": "",
    "Eta": "",
    "Etd": "2020-08-07",
    "Atd": "",
    "Ata": "",
    "ExchangeRate": 1,
    "BillNumber": "SH20080001D",
    "SettlementObject": "上海大洋行有限公司",
    "CargoType": "自揽货",
    "MasterWaybillNumber": "KMTCSHAF703978",
    "HouseWaybillNumber": "AFS2007004",
    "Consignor": "上海大洋行有限公司",
    "BusinessType": "海运出口",
    "BusinessDate": "2020-08-07",
    "IsFba": "否",
    "AmazonWarehouseCode": "",
    "DestinationDeliveryMethod": "",
    "CourierNumber": "",
    "IsRemoteWarehouse": "否",
    "ShipNameAndVoyage": "KMTC QINGDAO V.2008S",
    "PortOfLoading": "SHANGHAI",
    "PortOfDestination": "LOS ANGELES,CA",
    "BookingAgent": "上海麟泽国际物流有限公司",
    "OriginStation": "",
    "DestinationStation": "",
    "TransitStation": "",
    "DestinationAgent": "COMM FORWARDING COMPANY",
    "SalesPerson": "刘风彩",
    "OperationPerson": "刘风彩",
    "CustomerServicePerson": "",
    "DocumentPerson": "",
    "BusinessReferenceNumber": "",
    "AccrualAmount": 0,
    "FinancialDate": "",
    "DomesticOrForeign": "国内",
    "RevenueOrExpenditureType": "应收",
    "FeeStatus": "未提交",
    "Auditor": "",
    "ConfirmationStatus": "1",
    "FeeName": "装箱费",
    "Unit": "普通价",
    "Currency": "RMB",
    "Quantity": 1,
    "UnitPrice": 1200,
    "TaxInclusivePrice": 1200,
    "TaxExclusivePrice": 1200,
    "TaxAmount": 0,
    "TaxRate": 0,
    "WriteOffAmount": 1200,
    "UnwrittenAmount": 0,
    "ContactPerson": "",
    "Creator": "徐伟力",
    "Remark": "",
    "RelatedNumber": "",
    "ConsignmentRelatedNumber": "",
    "Carrier": "高丽海运株式会社",
    "ConfirmationDate": "2020-08-10",
    "FeeConfirmationPerson": "徐伟力",
    "RouteManager": "",
    "InvoiceDate": "2020-09-11",
    "InvoiceNumber": "",
    "InvoiceTitle": "上海大洋行有限公司",
    "IsInvoiceRequired": "是",
    "WriteOffDate": "2020-08-21",
    "BusinessStatus": "正操作",
    "BargeSailingDate": "",
    "BargeName": "",
    "BargeVoyage": "",
    "BargePortOfLoading": "",
    "PaymentDate": "2020-08-21",
    "SalesDepartment": "管理部",
    "DeliveryTime": "",
    "ConfirmationRemark": "",
    "FeeWriteOffStatus": "全部核销",
    "OperationDate": "",
    "EstimatedLoadingDate": "2020/08/05 00:00,2020/08/05 00:00",
    "ActualReturnEmptyTime": "",
    "ContainerQuantityDescription": "1*40HC,1*20GP",
    "FeeCreationDate": "2020-08-05 12:50:44",
    "CustomerLevel": "VIP客户",
    "DeliveryCompletionTime": "",
    "FeeChanger": "",
    "SettlementAgent": "",
    "IsFeeAdjusted": "否",
    "Route": "美西",
    "FeeModificationTime": "2025-02-21",
    "FeeModifier": "周文轩",
    "BillDate": "2020-08-10",
    "InvoiceDueDate": "",
    "CounterpartyInvoiceNumber": "",
    "ReceivableWriteOffStatus": "部分核销",
    "DesignatedForwarder": "",
    "ActualLoadingDate": "",
    "CounterpartyCounterNumber": "",
    "FeeDueDate": "",
    "RelatedFeeId": "",
    "FeeId": "311",
    "DataSource": "操作",
    "FeeContainerNumber": "",
    "PickupDeliveryLocation": "SHANGHAI",
    "ActualPickupTime": "",
    "WriteOffBank": "",
    "ParentCompany": "",
    "SettlementDepartment": "",
    "CargoSales": "",
    "SalesBranch": "",
    "OperationBranch": "",
    "FeeSyncStatus": "CARGOWARE基础版试用",
    "ExchangeAgent": "",
    "ReconciliationAmount": 1200,
    "Difference": "",
    "IsConfirmed": "1",
    "SettlementObjectTerm": "30天",
    "SettlementMethod": "按月结算",
    "AuditDate": "",
    "GpDescription": "",
    "ChargeableWeightActual": 1,
    "ChargeableWeightCommission": 0,
    "NumberOfPiecesActual": 4,
    "NumberOfPiecesCommission": 100,
    "VolumeActual": 0.879,
    "VolumeCommission": 23,
    "GrossWeightCommission": 2000,
    "GrossWeightActual": 518
  },
  {
    "ShippingCompany": "高丽海运株式会社",
    "PricingNature": "自有约价",
    "ActualPortEntryDate": "2020-07-23 13:11",
    "BusinessModel": "整箱",
    "BusinessNumber": "AFS2007004",
    "WarehouseEntryNumber": "AFS2007004",
    "BookingNumber": "",
    "CutoffDate": "2020-08-03",
    "ProjectNumber": "",
    "Sono": "KMTCSHAF703978,KMTCSHAF703978A",
    "ContainerNumber": ",FFAU1030131",
    "OverseasCustomerService": "",
    "SiteOperation": "",
    "PaymentApplicationNumber": "",
    "Eta": "",
    "Etd": "2020-08-07",
    "Atd": "",
    "Ata": "",
    "ExchangeRate": 7.15,
    "BillNumber": "SH20080001D",
    "SettlementObject": "上海大洋行有限公司",
    "CargoType": "自揽货",
    "MasterWaybillNumber": "KMTCSHAF703978",
    "HouseWaybillNumber": "AFS2007004",
    "Consignor": "上海大洋行有限公司",
    "BusinessType": "海运出口",
    "BusinessDate": "2020-08-07",
    "IsFba": "否",
    "AmazonWarehouseCode": "",
    "DestinationDeliveryMethod": "",
    "CourierNumber": "",
    "IsRemoteWarehouse": "否",
    "ShipNameAndVoyage": "KMTC QINGDAO V.2008S",
    "PortOfLoading": "SHANGHAI",
    "PortOfDestination": "LOS ANGELES,CA",
    "BookingAgent": "上海麟泽国际物流有限公司",
    "OriginStation": "",
    "DestinationStation": "",
    "TransitStation": "",
    "DestinationAgent": "COMM FORWARDING COMPANY",
    "SalesPerson": "刘风彩",
    "OperationPerson": "刘风彩",
    "CustomerServicePerson": "",
    "DocumentPerson": "",
    "BusinessReferenceNumber": "",
    "AccrualAmount": 0,
    "FinancialDate": "",
    "DomesticOrForeign": "国内",
    "RevenueOrExpenditureType": "应收",
    "FeeStatus": "未提交",
    "Auditor": "",
    "ConfirmationStatus": "1",
    "FeeName": "拖车费",
    "Unit": "普通价",
    "Currency": "USD",
    "Quantity": 1,
    "UnitPrice": 3000,
    "TaxInclusivePrice": 3000,
    "TaxExclusivePrice": 3000,
    "TaxAmount": 0,
    "TaxRate": 0,
    "WriteOffAmount": 3000,
    "UnwrittenAmount": 0,
    "ContactPerson": "",
    "Creator": "徐伟力",
    "Remark": "",
    "RelatedNumber": "",
    "ConsignmentRelatedNumber": "",
    "Carrier": "高丽海运株式会社",
    "ConfirmationDate": "2020-08-10",
    "FeeConfirmationPerson": "徐伟力",
    "RouteManager": "",
    "InvoiceDate": "2020-09-11",
    "InvoiceNumber": "",
    "InvoiceTitle": "上海大洋行有限公司",
    "IsInvoiceRequired": "是",
    "WriteOffDate": "2020-08-21",
    "BusinessStatus": "正操作",
    "BargeSailingDate": "",
    "BargeName": "",
    "BargeVoyage": "",
    "BargePortOfLoading": "",
    "PaymentDate": "2020-08-21",
    "SalesDepartment": "管理部",
    "DeliveryTime": "",
    "ConfirmationRemark": "",
    "FeeWriteOffStatus": "全部核销",
    "OperationDate": "",
    "EstimatedLoadingDate": "2020/08/05 00:00,2020/08/05 00:00",
    "ActualReturnEmptyTime": "",
    "ContainerQuantityDescription": "1*40HC,1*20GP",
    "FeeCreationDate": "2020-08-05 12:50:44",
    "CustomerLevel": "VIP客户",
    "DeliveryCompletionTime": "",
    "FeeChanger": "",
    "SettlementAgent": "",
    "IsFeeAdjusted": "否",
    "Route": "美西",
    "FeeModificationTime": "2025-02-21",
    "FeeModifier": "周文轩",
    "BillDate": "2020-08-10",
    "InvoiceDueDate": "",
    "CounterpartyInvoiceNumber": "",
    "ReceivableWriteOffStatus": "部分核销",
    "DesignatedForwarder": "",
    "ActualLoadingDate": "",
    "CounterpartyCounterNumber": "",
    "FeeDueDate": "",
    "RelatedFeeId": "",
    "FeeId": "309",
    "DataSource": "操作",
    "FeeContainerNumber": "",
    "PickupDeliveryLocation": "SHANGHAI",
    "ActualPickupTime": "",
    "WriteOffBank": "",
    "ParentCompany": "",
    "SettlementDepartment": "",
    "CargoSales": "",
    "SalesBranch": "",
    "OperationBranch": "",
    "FeeSyncStatus": "CARGOWARE基础版试用",
    "ExchangeAgent": "",
    "ReconciliationAmount": 3000,
    "Difference": "",
    "IsConfirmed": "1",
    "SettlementObjectTerm": "30天",
    "SettlementMethod": "按月结算",
    "AuditDate": "",
    "GpDescription": "",
    "ChargeableWeightActual": 1,
    "ChargeableWeightCommission": 0,
    "NumberOfPiecesActual": 4,
    "NumberOfPiecesCommission": 100,
    "VolumeActual": 0.879,
    "VolumeCommission": 23,
    "GrossWeightCommission": 2000,
    "GrossWeightActual": 518
  },
  {
    "ShippingCompany": "高丽海运株式会社",
    "PricingNature": "自有约价",
    "ActualPortEntryDate": "2020-07-23 13:11",
    "BusinessModel": "整箱",
    "BusinessNumber": "AFS2007004",
    "WarehouseEntryNumber": "AFS2007004",
    "BookingNumber": "",
    "CutoffDate": "2020-08-03",
    "ProjectNumber": "",
    "Sono": "KMTCSHAF703978,KMTCSHAF703978A",
    "ContainerNumber": ",FFAU1030131",
    "OverseasCustomerService": "",
    "SiteOperation": "",
    "PaymentApplicationNumber": "",
    "Eta": "",
    "Etd": "2020-08-07",
    "Atd": "",
    "Ata": "",
    "ExchangeRate": 1,
    "BillNumber": "SH20080001D",
    "SettlementObject": "上海大洋行有限公司",
    "CargoType": "自揽货",
    "MasterWaybillNumber": "KMTCSHAF703978",
    "HouseWaybillNumber": "AFS2007004",
    "Consignor": "上海大洋行有限公司",
    "BusinessType": "海运出口",
    "BusinessDate": "2020-08-07",
    "IsFba": "否",
    "AmazonWarehouseCode": "",
    "DestinationDeliveryMethod": "",
    "CourierNumber": "",
    "IsRemoteWarehouse": "否",
    "ShipNameAndVoyage": "KMTC QINGDAO V.2008S",
    "PortOfLoading": "SHANGHAI",
    "PortOfDestination": "LOS ANGELES,CA",
    "BookingAgent": "上海麟泽国际物流有限公司",
    "OriginStation": "",
    "DestinationStation": "",
    "TransitStation": "",
    "DestinationAgent": "COMM FORWARDING COMPANY",
    "SalesPerson": "刘风彩",
    "OperationPerson": "刘风彩",
    "CustomerServicePerson": "",
    "DocumentPerson": "",
    "BusinessReferenceNumber": "",
    "AccrualAmount": 0,
    "FinancialDate": "",
    "DomesticOrForeign": "国内",
    "RevenueOrExpenditureType": "应收",
    "FeeStatus": "未提交",
    "Auditor": "",
    "ConfirmationStatus": "1",
    "FeeName": "拖车费",
    "Unit": "普通价",
    "Currency": "RMB",
    "Quantity": 1,
    "UnitPrice": 1200,
    "TaxInclusivePrice": 1200,
    "TaxExclusivePrice": 1200,
    "TaxAmount": 0,
    "TaxRate": 0,
    "WriteOffAmount": 1200,
    "UnwrittenAmount": 0,
    "ContactPerson": "",
    "Creator": "徐伟力",
    "Remark": "",
    "RelatedNumber": "",
    "ConsignmentRelatedNumber": "",
    "Carrier": "高丽海运株式会社",
    "ConfirmationDate": "2020-08-10",
    "FeeConfirmationPerson": "徐伟力",
    "RouteManager": "",
    "InvoiceDate": "2020-09-11",
    "InvoiceNumber": "",
    "InvoiceTitle": "上海大洋行有限公司",
    "IsInvoiceRequired": "是",
    "WriteOffDate": "2020-08-21",
    "BusinessStatus": "正操作",
    "BargeSailingDate": "",
    "BargeName": "",
    "BargeVoyage": "",
    "BargePortOfLoading": "",
    "PaymentDate": "2020-08-21",
    "SalesDepartment": "管理部",
    "DeliveryTime": "",
    "ConfirmationRemark": "",
    "FeeWriteOffStatus": "全部核销",
    "OperationDate": "",
    "EstimatedLoadingDate": "2020/08/05 00:00,2020/08/05 00:00",
    "ActualReturnEmptyTime": "",
    "ContainerQuantityDescription": "1*40HC,1*20GP",
    "FeeCreationDate": "2020-08-05 12:50:44",
    "CustomerLevel": "VIP客户",
    "DeliveryCompletionTime": "",
    "FeeChanger": "",
    "SettlementAgent": "",
    "IsFeeAdjusted": "否",
    "Route": "美西",
    "FeeModificationTime": "2025-02-21",
    "FeeModifier": "周文轩",
    "BillDate": "2020-08-10",
    "InvoiceDueDate": "",
    "CounterpartyInvoiceNumber": "",
    "ReceivableWriteOffStatus": "部分核销",
    "DesignatedForwarder": "",
    "ActualLoadingDate": "",
    "CounterpartyCounterNumber": "",
    "FeeDueDate": "",
    "RelatedFeeId": "",
    "FeeId": "310",
    "DataSource": "操作",
    "FeeContainerNumber": "",
    "PickupDeliveryLocation": "SHANGHAI",
    "ActualPickupTime": "",
    "WriteOffBank": "",
    "ParentCompany": "",
    "SettlementDepartment": "",
    "CargoSales": "",
    "SalesBranch": "",
    "OperationBranch": "",
    "FeeSyncStatus": "CARGOWARE基础版试用",
    "ExchangeAgent": "",
    "ReconciliationAmount": 1200,
    "Difference": "",
    "IsConfirmed": "1",
    "SettlementObjectTerm": "30天",
    "SettlementMethod": "按月结算",
    "AuditDate": "",
    "GpDescription": "",
    "ChargeableWeightActual": 1,
    "ChargeableWeightCommission": 0,
    "NumberOfPiecesActual": 4,
    "NumberOfPiecesCommission": 100,
    "VolumeActual": 0.879,
    "VolumeCommission": 23,
    "GrossWeightCommission": 2000,
    "GrossWeightActual": 518
  },
];

export default [
  // 费用对账台账
  {
    url: "/api/fee_reconciliation",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: feeReconciliationItems,
      };
    },
  },
  {
    url: "/api/fee_reconciliation/save",
    method: "POST",
    response: ({ body }: { body: FeeReconciliationItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/fee_reconciliation/save/progress",
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