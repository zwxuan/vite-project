
import request, {ApiRes,requestWithProgress } from '../request'
import { InvoiceRequirementItemProps } from "@/types/basic_manage/invoice_requirement";
import Mock from "mockjs";
//
const invoiceRequirementItems:InvoiceRequirementItemProps[] = [
    {
        CustomerNo:Mock.mock("@id"),
        TaxpayerId:Mock.mock("@id"),
        InvoiceAddress:'白云大道道北1689号岭南新世界小区2D-1栋903',
        Phone:'13800000000',
        IsDefault:'是',
        BankAccount:'6222022202220222222',
        BillingHeadBank:'中国建设银行',
        CustomerEmail:'123@qq.com',
        SystemAutoPush:'是',
        SystemAutoSendTarget:'客户邮箱',
        TaxControlPlatformSend:'是',
        TaxControlPlatformSendTarget:'客户邮箱',
        Operation:'',
        InvoiceType:'电子发票',
        InvoiceKind:'普通发票',
        DomesticOrAbroad:'国内',
        ApplicableWhtTax:'是',
        BillingRequirements:'开票要求',
    },
    {
        CustomerNo:Mock.mock("@id"),
        TaxpayerId:Mock.mock("@id"),
        InvoiceAddress:'白云大道道北1689号岭南新世界小区2D-1栋903',
        Phone:'13800000000',
        IsDefault:'是',
        BankAccount:'6222022202220222222',
        BillingHeadBank:'中国建设银行',
        CustomerEmail:'123@qq.com',
        SystemAutoPush:'是',
        SystemAutoSendTarget:'客户邮箱',
        TaxControlPlatformSend:'是',
        TaxControlPlatformSendTarget:'客户邮箱',
        Operation:'',
        InvoiceType:'电子发票',
        InvoiceKind:'普通发票',
        DomesticOrAbroad:'国内',
        ApplicableWhtTax:'是',
        BillingRequirements:'开票要求',
    },
    {
        CustomerNo:Mock.mock("@id"),
        TaxpayerId:Mock.mock("@id"),
        InvoiceAddress:'白云大道道北1689号岭南新世界小区2D-1栋903',
        Phone:'13800000000',
        IsDefault:'是',
        BankAccount:'6222022202220222222',
        BillingHeadBank:'中国建设银行',
        CustomerEmail:'123@qq.com',
        SystemAutoPush:'是',
        SystemAutoSendTarget:'客户邮箱',
        TaxControlPlatformSend:'是',
        TaxControlPlatformSendTarget:'客户邮箱',
        Operation:'',
        InvoiceType:'电子发票',
        InvoiceKind:'普通发票',
        DomesticOrAbroad:'国内',
        ApplicableWhtTax:'是',
        BillingRequirements:'开票要求',
    },
    {
        CustomerNo:Mock.mock("@id"),
        TaxpayerId:Mock.mock("@id"),
        InvoiceAddress:'白云大道道北1689号岭南新世界小区2D-1栋903',
        Phone:'13800000000',
        IsDefault:'是',
        BankAccount:'6222022202220222222',
        BillingHeadBank:'中国建设银行',
        CustomerEmail:'123@qq.com',
        SystemAutoPush:'是',
        SystemAutoSendTarget:'客户邮箱',
        TaxControlPlatformSend:'是',
        TaxControlPlatformSendTarget:'客户邮箱',
        Operation:'',
        InvoiceType:'电子发票',
        InvoiceKind:'普通发票',
        DomesticOrAbroad:'国内',
        ApplicableWhtTax:'是',
        BillingRequirements:'开票要求',
    }

];


// 获取账单管理台账列表
export const getInvoiceRequirementList = async (): Promise<InvoiceRequirementItemProps[]> => {
  return invoiceRequirementItems;
}

// 保存账单管理
export const saveInvoiceRequirement = async (data: InvoiceRequirementItemProps, onUploadProgress?: (progress: number) => void): Promise<InvoiceRequirementItemProps> => {
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
export const getInvoiceRequirementList = async (): Promise<InvoiceRequirementItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/invoice_requirement"
  })
  const responseData = response?.data as ApiRes<InvoiceRequirementItemProps[]>;
  return responseData.data || [];
}

export const saveInvoiceRequirement = (data:InvoiceRequirementItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/invoice_requirement/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
