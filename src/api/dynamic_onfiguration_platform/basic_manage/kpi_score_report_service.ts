
import request, { ApiRes, requestWithProgress } from '../../request'
import { KpiScoreReportItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/kpi_score_report";
import Mock from "mockjs";
//
const kpiScoreReportItems: KpiScoreReportItemProps[] = [
  {
    "AssessmentDimension": "财务",
    "IndicatorKpi": "销售额(万元)",
    "Weight": 15.00,
    "TargetValue": 500.00,
    "ActualValue": 480.00,
    "ScoringRule": "",
    "AutoScore": 96.00,
    "ManualCorrection": 0,
    "FinalScore": "=(C1/100)*(G1+H1)"
  },
  {
    "AssessmentDimension": "财务",
    "IndicatorKpi": "毛利率",
    "Weight": 15.00,
    "TargetValue": 25.00,
    "ActualValue": 28.00,
    "ScoringRule": "",
    "AutoScore": 100.00,
    "ManualCorrection": 0,
    "FinalScore": "=(C2/100)*(G2+H2)"
  },
  {
    "AssessmentDimension": "财务",
    "IndicatorKpi": "回款准时率",
    "Weight": 10.00,
    "TargetValue": 90.00,
    "ActualValue": 85.00,
    "ScoringRule": "",
    "AutoScore": 85.00,
    "ManualCorrection": 0,
    "FinalScore": "=(C3/100)*(G3+H3)"
  },
  {
    "AssessmentDimension": "忠诚度",
    "IndicatorKpi": "客户满意度(CSAT)",
    "Weight": 15.00,
    "TargetValue": 8.50,
    "ActualValue": 8.90,
    "ScoringRule": "",
    "AutoScore": 100.00,
    "ManualCorrection": 0,
    "FinalScore": "=(C4/100)*(G4+H4)"
  },
  {
    "AssessmentDimension": "忠诚度",
    "IndicatorKpi": "净推荐值(NPS)",
    "Weight": 10.00,
    "TargetValue": 40.00,
    "ActualValue": 45.00,
    "ScoringRule": "",
    "AutoScore": 100.00,
    "ManualCorrection": 0,
    "FinalScore": "=(C5/100)*(G5+H5)"
  },
  {
    "AssessmentDimension": "忠诚度",
    "IndicatorKpi": "续约意向",
    "Weight": 5.00,
    "TargetValue": 0,
    "ActualValue": 0,
    "ScoringRule": "",
    "AutoScore": 0,
    "ManualCorrection": 70.00,
    "FinalScore": "=(C6/100)*(G6+H6)"
  },
  {
    "AssessmentDimension": "运营",
    "IndicatorKpi": "订单预测准确率",
    "Weight": 10.00,
    "TargetValue": 80.00,
    "ActualValue": 75.00,
    "ScoringRule": "",
    "AutoScore": 75.00,
    "ManualCorrection": 0,
    "FinalScore": "=(C7/100)*(G7+H7)"
  },
  {
    "AssessmentDimension": "运营",
    "IndicatorKpi": "售后问题解决率",
    "Weight": 10.00,
    "TargetValue": 95.00,
    "ActualValue": 98.00,
    "ScoringRule": "",
    "AutoScore": 100.00,
    "ManualCorrection": 0,
    "FinalScore": "=(C8/100)*(G8+H8)"
  },
  {
    "AssessmentDimension": "战略",
    "IndicatorKpi": "战略项目参与度",
    "Weight": 10.00,
    "TargetValue": 0,
    "ActualValue": 0,
    "ScoringRule": "",
    "AutoScore": 0,
    "ManualCorrection": 90.00,
    "FinalScore": "=(C9/100)*(G9+H9)"
  },
  {
    "AssessmentDimension": "风险监控",
    "IndicatorKpi": "流失风险等级",
    "Weight": 0.00,
    "TargetValue": 0,
    "ActualValue": 0,
    "ScoringRule": "",
    "AutoScore": 0,
    "ManualCorrection": 60.00,
    "FinalScore": "=(C10/100)*(G10+H10)"
  },
  {
    "AssessmentDimension": "清关能力",
    "IndicatorKpi": "平均清关时效（小时）",
    "Weight": 15.00,
    "TargetValue": 48.00,
    "ActualValue": 36.00,
    "ScoringRule": "每节省10%加5分",
    "AutoScore": 105.00,
    "ManualCorrection": 0,
    "FinalScore": "=(C11/100)*(G11+H11)"
  },
  {
    "AssessmentDimension": "清关能力",
    "IndicatorKpi": "特殊货物处理成功率",
    "Weight": 10.00,
    "TargetValue": 90.00,
    "ActualValue": 95.00,
    "ScoringRule": "(实际值/目标值)×100",
    "AutoScore": 106.00,
    "ManualCorrection": 0,
    "FinalScore": "=(C12/100)*(G12+H12)"
  },
  {
    "AssessmentDimension": "清关能力",
    "IndicatorKpi": "海关罚金发生率",
    "Weight": 5.00,
    "TargetValue": 0.00,
    "ActualValue": 1.00,
    "ScoringRule": "发生即得0分",
    "AutoScore": 0.00,
    "ManualCorrection": 0,
    "FinalScore": "=(C13/100)*(G13+H13)"
  },
  {
    "AssessmentDimension": "本地服务",
    "IndicatorKpi": "卡车派送准时率",
    "Weight": 10.00,
    "TargetValue": 95.00,
    "ActualValue": 98.00,
    "ScoringRule": "每超目标1%加2分",
    "AutoScore": 106.00,
    "ManualCorrection": 0,
    "FinalScore": "=(C14/100)*(G14+H14)"
  },
  {
    "AssessmentDimension": "本地服务",
    "IndicatorKpi": "仓库应急扩容能力",
    "Weight": 10.00,
    "TargetValue": 50.00,
    "ActualValue": 50.00,
    "ScoringRule": "布尔值（达成100/未达成0）",
    "AutoScore": 100.00,
    "ManualCorrection": 0,
    "FinalScore": "=(C15/100)*(G15+H15)"
  },
  {
    "AssessmentDimension": "本地服务",
    "IndicatorKpi": "7×24小时英语支持",
    "Weight": 5.00,
    "TargetValue": 100.00,
    "ActualValue": 100.00,
    "ScoringRule": "未达标得0分",
    "AutoScore": 100.00,
    "ManualCorrection": 0,
    "FinalScore": "=(C16/100)*(G16+H16)"
  },
  {
    "AssessmentDimension": "合规风控",
    "IndicatorKpi": "文件合规率",
    "Weight": 15.00,
    "TargetValue": 100.00,
    "ActualValue": 98.00,
    "ScoringRule": "每错误1单扣20分",
    "AutoScore": 80.00,
    "ManualCorrection": 0,
    "FinalScore": "=(C17/100)*(G17+H17)"
  },
  {
    "AssessmentDimension": "合规风控",
    "IndicatorKpi": "反洗钱检查记录",
    "Weight": 10.00,
    "TargetValue": 0.00,
    "ActualValue": 0.00,
    "ScoringRule": "违规即终止合作",
    "AutoScore": 100.00,
    "ManualCorrection": 0,
    "FinalScore": "=(C18/100)*(G18+H18)"
  },
  {
    "AssessmentDimension": "成本透明度",
    "IndicatorKpi": "本地费用报价偏差率",
    "Weight": 10.00,
    "TargetValue": 5.00,
    "ActualValue": 8.00,
    "ScoringRule": "每超1%扣10分",
    "AutoScore": 70.00,
    "ManualCorrection": 0,
    "FinalScore": "=(C19/100)*(G19+H19)"
  },
  {
    "AssessmentDimension": "成本透明度",
    "IndicatorKpi": "隐蔽费用投诉次数",
    "Weight": 10.00,
    "TargetValue": 0.00,
    "ActualValue": 2.00,
    "ScoringRule": "每次投诉扣30分",
    "AutoScore": 40.00,
    "ManualCorrection": 0,
    "FinalScore": "=(C20/100)*(G20+H20)"
  },
  {
    "AssessmentDimension": "总计",
    "IndicatorKpi": "",
    "Weight": 0,
    "TargetValue": 0,
    "ActualValue": 0,
    "ScoringRule": "",
    "AutoScore": 0,
    "ManualCorrection": 0,
    "FinalScore": "=SUM(I1:I20)"
  }
];


// 获取账单管理台账列表
export const getKpiScoreReportList = async (): Promise<KpiScoreReportItemProps[]> => {
  return kpiScoreReportItems;
}

// 保存账单管理
export const saveKipScoreReport = async (data: KpiScoreReportItemProps, onUploadProgress?: (progress: number) => void): Promise<KpiScoreReportItemProps> => {
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
export const getKipScoreReportList = async (): Promise<KipScoreReportItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/kip_score_report"
  })
  const responseData = response?.data as ApiRes<KipScoreReportItemProps[]>;
  return responseData.data || [];
}

export const saveKipScoreReport = (data:KipScoreReportItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/kip_score_report/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
