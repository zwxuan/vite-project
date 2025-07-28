
import request, { ApiRes, requestWithProgress } from '../../request'
import { VoucherTypeItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/voucher_type";
import Mock from 'mockjs'

const voucherTypeItems: VoucherTypeItemProps[] = [
  {
    TypeCode: Mock.mock("@id"),
    BookName: '管理账套',
    TypeName: '冲销凭证',
    TypeRemark: '应收与应付冲销时使用',
    TypeShortName: '记',
  },
  {
    TypeCode: Mock.mock("@id"),
    BookName: '管理账套',
    TypeName: '转帐凭证',
    TypeRemark: '转帐凭证',
    TypeShortName: '记',
  },
  {
    TypeCode: Mock.mock("@id"),
    BookName: '管理账套',
    TypeName: '红冲凭证',
    TypeRemark: '红冲蓝色凭证时使用',
    TypeShortName: '记',
  },
  {
    TypeCode: Mock.mock("@id"),
    BookName: '管理账套',
    TypeName: '实收付凭证',
    TypeRemark: '实收付凭证时使用',
    TypeShortName: '记',
  },
  {
    TypeCode: Mock.mock("@id"),
    BookName: '管理账套',
    TypeName: '付款凭证',
    TypeRemark: '涉及付款时使用',
    TypeShortName: '记',
  },
  {
    TypeCode: Mock.mock("@id"),
    BookName: '管理账套',
    TypeName: '收款凭证',
    TypeRemark: '涉及收款时使用',
    TypeShortName: '记',
  },
];
// 获取币制信息
export const getVoucherTypeList = async () : Promise<VoucherTypeItemProps[]> => {
  // const response = await request({
  //   method: "GET",
  //   url: "/voucher_type"
  // });
  // const responseData = response?.data as ApiRes<VoucherTypeItemProps[]>;
  // return responseData.data || [];
  return voucherTypeItems;
}

export const saveVoucherType = (data:VoucherTypeItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/voucher_type/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}

