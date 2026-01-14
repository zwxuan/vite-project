import Mock from "mockjs";
import { EntryGroupingRuleItemProps } from "@/types/dynamic_configuration_platform/basic_manage/entry_grouping_rule";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const entryGroupingRuleItems: EntryGroupingRuleItemProps[] = [
  {
    EntryId: Mock.mock("@id"),
    BookName: '管理账套',
    RuleName: '应收发票',
    EntryName: '应收账款',
    AccountLevel: 2,
    AccountGroup1By: '发票号',
    AccountGroup2By: '',
    AccountGroup3By: '',
    AccountGroup4By: '',
    AccountGroup5By: '',
    AccountGroup6By: '',
    AuxiliaryGroup1By: '结算单位',
    AuxiliaryGroup2By: '',
    AuxiliaryGroup3By: '',
    AuxiliaryGroup4By: '',
    AuxiliaryGroup5By: '',
    AuxiliaryGroup6By: '',
    CreatedAt: Mock.mock('@datetime()'),
    UpdatedAt: Mock.mock('@datetime()'),
  },
  {
    EntryId: Mock.mock("@id"),
    BookName: '管理账套',
    RuleName: '应收发票',
    EntryName: '营业收入',
    AccountLevel: 1,
    AccountGroup1By: '',
    AccountGroup2By: '',
    AccountGroup3By: '',
    AccountGroup4By: '',
    AccountGroup5By: '',
    AccountGroup6By: '',
    AuxiliaryGroup1By: '',
    AuxiliaryGroup2By: '',
    AuxiliaryGroup3By: '',
    AuxiliaryGroup4By: '',
    AuxiliaryGroup5By: '',
    AuxiliaryGroup6By: '',
    CreatedAt: Mock.mock('@datetime()'),
    UpdatedAt: Mock.mock('@datetime()'),
  },
  {
    EntryId: Mock.mock("@id"),
    BookName: '管理账套',
    RuleName: '实收实付',
    EntryName: '银行存款',
    AccountLevel: 1,
    AccountGroup1By: '银行账号',
    AccountGroup2By: '币制',
    AccountGroup3By: '',
    AccountGroup4By: '',
    AccountGroup5By: '',
    AccountGroup6By: '',
    AuxiliaryGroup1By: '',
    AuxiliaryGroup2By: '',
    AuxiliaryGroup3By: '',
    AuxiliaryGroup4By: '',
    AuxiliaryGroup5By: '',
    AuxiliaryGroup6By: '',
    CreatedAt: Mock.mock('@datetime()'),
    UpdatedAt: Mock.mock('@datetime()'),
  },
  {
    EntryId: Mock.mock("@id"),
    BookName: '管理账套',
    RuleName: '实收实付',
    EntryName: '应收账款',
    AccountLevel: 2,
    AccountGroup1By: '发票号',
    AccountGroup2By: '',
    AccountGroup3By: '',
    AccountGroup4By: '',
    AccountGroup5By: '',
    AccountGroup6By: '',
    AuxiliaryGroup1By: '结算单位',
    AuxiliaryGroup2By: '',
    AuxiliaryGroup3By: '',
    AuxiliaryGroup4By: '',
    AuxiliaryGroup5By: '',
    AuxiliaryGroup6By: '',
    CreatedAt: Mock.mock('@datetime()'),
    UpdatedAt: Mock.mock('@datetime()'),
  },
];

export default [
  // 凭证分录规则台账
  {
    url: "/api/entry_grouping_rule",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: entryGroupingRuleItems,
      };
    },
  },
  {
    url: "/api/entry_grouping_rule/save",
    method: "POST",
    response: ({ body }: { body: EntryGroupingRuleItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/entry_grouping_rule/save/progress",
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