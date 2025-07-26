// src/mock/release_order_verification.ts
import Mock from "mockjs";
var releaseOrderVerificationItems = [
  {
    BusinessId: Mock.mock("@id"),
    Consignor: Mock.mock("@ctitle(5)"),
    BookingAgent: Mock.mock("@ctitle(5)"),
    ShippingCompany: Mock.mock("@ctitle(5)"),
    SailingDate: Mock.mock("@datetime()"),
    VesselVoyage: Mock.mock("@ctitle(5)"),
    MblNumber: Mock.mock("@ctitle(5)"),
    MblType: Mock.mock("@ctitle(5)"),
    BusinessStatus: Mock.mock("@ctitle(5)"),
    SalesPerson: Mock.mock("@ctitle(5)"),
    BlStatus: Mock.mock("@ctitle(5)"),
    ReleaseAuditStatus: Mock.mock("@ctitle(5)"),
    AuditTime: Mock.mock("@datetime()"),
    HoldTime: Mock.mock("@datetime()"),
    HoldReason: Mock.mock("@ctitle(5)"),
    ContractValid: Mock.mock('@string("number", 1, 3)'),
    Invoiced: Mock.mock('@string("number", 1, 3)'),
    FullyWrittenOff: Mock.mock('@string("number", 1, 3)'),
    Overdue: Mock.mock('@string("number", 1, 3)'),
    OverLimit: Mock.mock('@string("number", 1, 3)'),
    Remarks: Mock.mock("@ctitle(5)"),
    SysAuditStatus: ""
  },
  {
    BusinessId: Mock.mock("@id"),
    Consignor: Mock.mock("@ctitle(5)"),
    BookingAgent: Mock.mock("@ctitle(5)"),
    ShippingCompany: Mock.mock("@ctitle(5)"),
    SailingDate: Mock.mock("@datetime()"),
    VesselVoyage: Mock.mock("@ctitle(5)"),
    MblNumber: Mock.mock("@ctitle(5)"),
    MblType: Mock.mock("@ctitle(5)"),
    BusinessStatus: Mock.mock("@ctitle(5)"),
    SalesPerson: Mock.mock("@ctitle(5)"),
    BlStatus: Mock.mock("@ctitle(5)"),
    ReleaseAuditStatus: Mock.mock("@ctitle(5)"),
    AuditTime: Mock.mock("@datetime()"),
    HoldTime: Mock.mock("@datetime()"),
    HoldReason: Mock.mock("@ctitle(5)"),
    ContractValid: Mock.mock('@string("number", 1, 3)'),
    Invoiced: Mock.mock('@string("number", 1, 3)'),
    FullyWrittenOff: Mock.mock('@string("number", 1, 3)'),
    Overdue: Mock.mock('@string("number", 1, 3)'),
    OverLimit: Mock.mock('@string("number", 1, 3)'),
    Remarks: Mock.mock("@ctitle(5)"),
    SysAuditStatus: ""
  },
  {
    BusinessId: Mock.mock("@id"),
    Consignor: Mock.mock("@ctitle(5)"),
    BookingAgent: Mock.mock("@ctitle(5)"),
    ShippingCompany: Mock.mock("@ctitle(5)"),
    SailingDate: Mock.mock("@datetime()"),
    VesselVoyage: Mock.mock("@ctitle(5)"),
    MblNumber: Mock.mock("@ctitle(5)"),
    MblType: Mock.mock("@ctitle(5)"),
    BusinessStatus: Mock.mock("@ctitle(5)"),
    SalesPerson: Mock.mock("@ctitle(5)"),
    BlStatus: Mock.mock("@ctitle(5)"),
    ReleaseAuditStatus: Mock.mock("@ctitle(5)"),
    AuditTime: Mock.mock("@datetime()"),
    HoldTime: Mock.mock("@datetime()"),
    HoldReason: Mock.mock("@ctitle(5)"),
    ContractValid: Mock.mock('@string("number", 1, 3)'),
    Invoiced: Mock.mock('@string("number", 1, 3)'),
    FullyWrittenOff: Mock.mock('@string("number", 1, 3)'),
    Overdue: Mock.mock('@string("number", 1, 3)'),
    OverLimit: Mock.mock('@string("number", 1, 3)'),
    Remarks: Mock.mock("@ctitle(5)"),
    SysAuditStatus: ""
  },
  {
    BusinessId: Mock.mock("@id"),
    Consignor: Mock.mock("@ctitle(5)"),
    BookingAgent: Mock.mock("@ctitle(5)"),
    ShippingCompany: Mock.mock("@ctitle(5)"),
    SailingDate: Mock.mock("@datetime()"),
    VesselVoyage: Mock.mock("@ctitle(5)"),
    MblNumber: Mock.mock("@ctitle(5)"),
    MblType: Mock.mock("@ctitle(5)"),
    BusinessStatus: Mock.mock("@ctitle(5)"),
    SalesPerson: Mock.mock("@ctitle(5)"),
    BlStatus: Mock.mock("@ctitle(5)"),
    ReleaseAuditStatus: Mock.mock("@ctitle(5)"),
    AuditTime: Mock.mock("@datetime()"),
    HoldTime: Mock.mock("@datetime()"),
    HoldReason: Mock.mock("@ctitle(5)"),
    ContractValid: Mock.mock('@string("number", 1, 3)'),
    Invoiced: Mock.mock('@string("number", 1, 3)'),
    FullyWrittenOff: Mock.mock('@string("number", 1, 3)'),
    Overdue: Mock.mock('@string("number", 1, 3)'),
    OverLimit: Mock.mock('@string("number", 1, 3)'),
    Remarks: Mock.mock("@ctitle(5)"),
    SysAuditStatus: ""
  },
  {
    BusinessId: Mock.mock("@id"),
    Consignor: Mock.mock("@ctitle(5)"),
    BookingAgent: Mock.mock("@ctitle(5)"),
    ShippingCompany: Mock.mock("@ctitle(5)"),
    SailingDate: Mock.mock("@datetime()"),
    VesselVoyage: Mock.mock("@ctitle(5)"),
    MblNumber: Mock.mock("@ctitle(5)"),
    MblType: Mock.mock("@ctitle(5)"),
    BusinessStatus: Mock.mock("@ctitle(5)"),
    SalesPerson: Mock.mock("@ctitle(5)"),
    BlStatus: Mock.mock("@ctitle(5)"),
    ReleaseAuditStatus: Mock.mock("@ctitle(5)"),
    AuditTime: Mock.mock("@datetime()"),
    HoldTime: Mock.mock("@datetime()"),
    HoldReason: Mock.mock("@ctitle(5)"),
    ContractValid: Mock.mock('@string("number", 1, 3)'),
    Invoiced: Mock.mock('@string("number", 1, 3)'),
    FullyWrittenOff: Mock.mock('@string("number", 1, 3)'),
    Overdue: Mock.mock('@string("number", 1, 3)'),
    OverLimit: Mock.mock('@string("number", 1, 3)'),
    Remarks: Mock.mock("@ctitle(5)"),
    SysAuditStatus: ""
  }
];
var release_order_verification_default = [
  // 放单审核台账
  {
    url: "/api/release_order_verification",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "\u8BF7\u6C42\u6210\u529F\u3002",
        data: releaseOrderVerificationItems
      };
    }
  },
  {
    url: "/api/release_order_verification/save",
    method: "POST",
    response: ({ body }) => {
      return {
        code: 200,
        success: true,
        message: "\u5F00\u59CB\u5904\u7406",
        data: body
      };
    }
  },
  {
    url: "/api/release_order_verification/save/progress",
    method: "GET",
    rawResponse: async (req, res) => {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no");
      let progress = 0;
      const sendProgress = () => {
        const data = {
          code: 200,
          success: true,
          message: progress >= 100 ? "\u4FDD\u5B58\u6210\u529F" : "\u5904\u7406\u4E2D...",
          data: {
            progress,
            status: progress >= 100 ? "completed" : "processing",
            result: progress >= 100 ? null : null
          }
        };
        res.write(`data: ${JSON.stringify(data)}

`);
        console.log("Sending progress:", progress);
        if (progress >= 100) {
          res.end();
          return;
        }
        progress += 10;
        setTimeout(sendProgress, 1e3);
      };
      sendProgress();
    }
  }
];
export {
  release_order_verification_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21vY2svcmVsZWFzZV9vcmRlcl92ZXJpZmljYXRpb24udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiRDpcXFxcV29ya0hvbWVcXFxcdml0ZS1wcm9qZWN0XFxcXHNyY1xcXFxtb2NrXFxcXHJlbGVhc2Vfb3JkZXJfdmVyaWZpY2F0aW9uLnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIkQ6XFxcXFdvcmtIb21lXFxcXHZpdGUtcHJvamVjdFxcXFxzcmNcXFxcbW9ja1wiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vRDovV29ya0hvbWUvdml0ZS1wcm9qZWN0L3NyYy9tb2NrL3JlbGVhc2Vfb3JkZXJfdmVyaWZpY2F0aW9uLnRzXCI7aW1wb3J0IE1vY2sgZnJvbSBcIm1vY2tqc1wiO1xyXG5pbXBvcnQgeyBSZWxlYXNlT3JkZXJWZXJpZmljYXRpb25JdGVtUHJvcHMgfSBmcm9tIFwiQC90eXBlcy9jb3N0X21hbmFnZS9yZWxlYXNlX29yZGVyX3ZlcmlmaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBJbmNvbWluZ01lc3NhZ2UsIFNlcnZlclJlc3BvbnNlIH0gZnJvbSAnaHR0cCc7XHJcblxyXG4vLyBcdTRGRUVcdTZCNjNpY29uXHU3Njg0XHU3QzdCXHU1NzhCXHU5NUVFXHU5ODk4XHVGRjBDXHU1NkUwXHU0RTNBSlNYXHU1MTQzXHU3RDIwXHU0RTBEXHU4MEZEXHU0RjVDXHU0RTNBSlNPTlx1NUJGOVx1OEM2MVx1NzY4NFx1NEUwMFx1OTBFOFx1NTIwNlx1RkYwQ1x1OEZEOVx1OTFDQ1x1NURGMlx1N0VDRlx1NjUzOVx1NEUzQVx1NUI1N1x1N0IyNlx1NEUzMlxyXG5jb25zdCByZWxlYXNlT3JkZXJWZXJpZmljYXRpb25JdGVtczpSZWxlYXNlT3JkZXJWZXJpZmljYXRpb25JdGVtUHJvcHNbXSA9IFtcclxuICAgIHtcclxuICAgICAgQnVzaW5lc3NJZDogTW9jay5tb2NrKFwiQGlkXCIpLFxyXG4gICAgICBDb25zaWdub3I6IE1vY2subW9jaygnQGN0aXRsZSg1KScpLFxyXG4gICAgICBCb29raW5nQWdlbnQ6IE1vY2subW9jaygnQGN0aXRsZSg1KScpLFxyXG4gICAgICBTaGlwcGluZ0NvbXBhbnk6IE1vY2subW9jaygnQGN0aXRsZSg1KScpLFxyXG4gICAgICBTYWlsaW5nRGF0ZTogTW9jay5tb2NrKCdAZGF0ZXRpbWUoKScpLFxyXG4gICAgICBWZXNzZWxWb3lhZ2U6IE1vY2subW9jaygnQGN0aXRsZSg1KScpLFxyXG4gICAgICBNYmxOdW1iZXI6IE1vY2subW9jaygnQGN0aXRsZSg1KScpLFxyXG4gICAgICBNYmxUeXBlOiBNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgQnVzaW5lc3NTdGF0dXM6IE1vY2subW9jaygnQGN0aXRsZSg1KScpLFxyXG4gICAgICBTYWxlc1BlcnNvbjogTW9jay5tb2NrKCdAY3RpdGxlKDUpJyksXHJcbiAgICAgIEJsU3RhdHVzOiBNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgUmVsZWFzZUF1ZGl0U3RhdHVzOiBNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgQXVkaXRUaW1lOiBNb2NrLm1vY2soJ0BkYXRldGltZSgpJyksXHJcbiAgICAgIEhvbGRUaW1lOiBNb2NrLm1vY2soJ0BkYXRldGltZSgpJyksXHJcbiAgICAgIEhvbGRSZWFzb246IE1vY2subW9jaygnQGN0aXRsZSg1KScpLFxyXG4gICAgICBDb250cmFjdFZhbGlkOiBNb2NrLm1vY2soJ0BzdHJpbmcoXCJudW1iZXJcIiwgMSwgMyknKSxcclxuICAgICAgSW52b2ljZWQ6IE1vY2subW9jaygnQHN0cmluZyhcIm51bWJlclwiLCAxLCAzKScpLFxyXG4gICAgICBGdWxseVdyaXR0ZW5PZmY6IE1vY2subW9jaygnQHN0cmluZyhcIm51bWJlclwiLCAxLCAzKScpLFxyXG4gICAgICBPdmVyZHVlOiBNb2NrLm1vY2soJ0BzdHJpbmcoXCJudW1iZXJcIiwgMSwgMyknKSxcclxuICAgICAgT3ZlckxpbWl0OiBNb2NrLm1vY2soJ0BzdHJpbmcoXCJudW1iZXJcIiwgMSwgMyknKSxcclxuICAgICAgUmVtYXJrczogTW9jay5tb2NrKCdAY3RpdGxlKDUpJyksXHJcbiAgICAgIFN5c0F1ZGl0U3RhdHVzOiBcIlwiXHJcbiAgICB9LCAgXHJcbiAgICB7XHJcbiAgICAgICAgQnVzaW5lc3NJZDpNb2NrLm1vY2soXCJAaWRcIiksXHJcbiAgICAgICAgQ29uc2lnbm9yOk1vY2subW9jaygnQGN0aXRsZSg1KScpLFxyXG4gICAgICAgIEJvb2tpbmdBZ2VudDpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBTaGlwcGluZ0NvbXBhbnk6TW9jay5tb2NrKCdAY3RpdGxlKDUpJyksXHJcbiAgICAgICAgU2FpbGluZ0RhdGU6TW9jay5tb2NrKCdAZGF0ZXRpbWUoKScpLFxyXG4gICAgICAgIFZlc3NlbFZveWFnZTpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBNYmxOdW1iZXI6TW9jay5tb2NrKCdAY3RpdGxlKDUpJyksXHJcbiAgICAgICAgTWJsVHlwZTpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBCdXNpbmVzc1N0YXR1czpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBTYWxlc1BlcnNvbjpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBCbFN0YXR1czpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBSZWxlYXNlQXVkaXRTdGF0dXM6TW9jay5tb2NrKCdAY3RpdGxlKDUpJyksXHJcbiAgICAgICAgQXVkaXRUaW1lOk1vY2subW9jaygnQGRhdGV0aW1lKCknKSxcclxuICAgICAgICBIb2xkVGltZTpNb2NrLm1vY2soJ0BkYXRldGltZSgpJyksXHJcbiAgICAgICAgSG9sZFJlYXNvbjpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBDb250cmFjdFZhbGlkOk1vY2subW9jaygnQHN0cmluZyhcIm51bWJlclwiLCAxLCAzKScpLFxyXG4gICAgICAgIEludm9pY2VkOk1vY2subW9jaygnQHN0cmluZyhcIm51bWJlclwiLCAxLCAzKScpLFxyXG4gICAgICAgIEZ1bGx5V3JpdHRlbk9mZjpNb2NrLm1vY2soJ0BzdHJpbmcoXCJudW1iZXJcIiwgMSwgMyknKSxcclxuICAgICAgICBPdmVyZHVlOk1vY2subW9jaygnQHN0cmluZyhcIm51bWJlclwiLCAxLCAzKScpLFxyXG4gICAgICAgIE92ZXJMaW1pdDpNb2NrLm1vY2soJ0BzdHJpbmcoXCJudW1iZXJcIiwgMSwgMyknKSxcclxuICAgICAgICBSZW1hcmtzOk1vY2subW9jaygnQGN0aXRsZSg1KScpLFxyXG4gICAgICAgIFN5c0F1ZGl0U3RhdHVzOiBcIlwiXHJcbiAgICB9LCAgXHJcbiAgICB7XHJcbiAgICAgICAgQnVzaW5lc3NJZDpNb2NrLm1vY2soXCJAaWRcIiksXHJcbiAgICAgICAgQ29uc2lnbm9yOk1vY2subW9jaygnQGN0aXRsZSg1KScpLFxyXG4gICAgICAgIEJvb2tpbmdBZ2VudDpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBTaGlwcGluZ0NvbXBhbnk6TW9jay5tb2NrKCdAY3RpdGxlKDUpJyksXHJcbiAgICAgICAgU2FpbGluZ0RhdGU6TW9jay5tb2NrKCdAZGF0ZXRpbWUoKScpLFxyXG4gICAgICAgIFZlc3NlbFZveWFnZTpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBNYmxOdW1iZXI6TW9jay5tb2NrKCdAY3RpdGxlKDUpJyksXHJcbiAgICAgICAgTWJsVHlwZTpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBCdXNpbmVzc1N0YXR1czpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBTYWxlc1BlcnNvbjpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBCbFN0YXR1czpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBSZWxlYXNlQXVkaXRTdGF0dXM6TW9jay5tb2NrKCdAY3RpdGxlKDUpJyksXHJcbiAgICAgICAgQXVkaXRUaW1lOk1vY2subW9jaygnQGRhdGV0aW1lKCknKSxcclxuICAgICAgICBIb2xkVGltZTpNb2NrLm1vY2soJ0BkYXRldGltZSgpJyksXHJcbiAgICAgICAgSG9sZFJlYXNvbjpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBDb250cmFjdFZhbGlkOk1vY2subW9jaygnQHN0cmluZyhcIm51bWJlclwiLCAxLCAzKScpLFxyXG4gICAgICAgIEludm9pY2VkOk1vY2subW9jaygnQHN0cmluZyhcIm51bWJlclwiLCAxLCAzKScpLFxyXG4gICAgICAgIEZ1bGx5V3JpdHRlbk9mZjpNb2NrLm1vY2soJ0BzdHJpbmcoXCJudW1iZXJcIiwgMSwgMyknKSxcclxuICAgICAgICBPdmVyZHVlOk1vY2subW9jaygnQHN0cmluZyhcIm51bWJlclwiLCAxLCAzKScpLFxyXG4gICAgICAgIE92ZXJMaW1pdDpNb2NrLm1vY2soJ0BzdHJpbmcoXCJudW1iZXJcIiwgMSwgMyknKSxcclxuICAgICAgICBSZW1hcmtzOk1vY2subW9jaygnQGN0aXRsZSg1KScpLFxyXG4gICAgICAgIFN5c0F1ZGl0U3RhdHVzOiBcIlwiXHJcbiAgICB9LCAgXHJcbiAgICB7XHJcbiAgICAgICAgQnVzaW5lc3NJZDpNb2NrLm1vY2soXCJAaWRcIiksXHJcbiAgICAgICAgQ29uc2lnbm9yOk1vY2subW9jaygnQGN0aXRsZSg1KScpLFxyXG4gICAgICAgIEJvb2tpbmdBZ2VudDpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBTaGlwcGluZ0NvbXBhbnk6TW9jay5tb2NrKCdAY3RpdGxlKDUpJyksXHJcbiAgICAgICAgU2FpbGluZ0RhdGU6TW9jay5tb2NrKCdAZGF0ZXRpbWUoKScpLFxyXG4gICAgICAgIFZlc3NlbFZveWFnZTpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBNYmxOdW1iZXI6TW9jay5tb2NrKCdAY3RpdGxlKDUpJyksXHJcbiAgICAgICAgTWJsVHlwZTpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBCdXNpbmVzc1N0YXR1czpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBTYWxlc1BlcnNvbjpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBCbFN0YXR1czpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBSZWxlYXNlQXVkaXRTdGF0dXM6TW9jay5tb2NrKCdAY3RpdGxlKDUpJyksXHJcbiAgICAgICAgQXVkaXRUaW1lOk1vY2subW9jaygnQGRhdGV0aW1lKCknKSxcclxuICAgICAgICBIb2xkVGltZTpNb2NrLm1vY2soJ0BkYXRldGltZSgpJyksXHJcbiAgICAgICAgSG9sZFJlYXNvbjpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBDb250cmFjdFZhbGlkOk1vY2subW9jaygnQHN0cmluZyhcIm51bWJlclwiLCAxLCAzKScpLFxyXG4gICAgICAgIEludm9pY2VkOk1vY2subW9jaygnQHN0cmluZyhcIm51bWJlclwiLCAxLCAzKScpLFxyXG4gICAgICAgIEZ1bGx5V3JpdHRlbk9mZjpNb2NrLm1vY2soJ0BzdHJpbmcoXCJudW1iZXJcIiwgMSwgMyknKSxcclxuICAgICAgICBPdmVyZHVlOk1vY2subW9jaygnQHN0cmluZyhcIm51bWJlclwiLCAxLCAzKScpLFxyXG4gICAgICAgIE92ZXJMaW1pdDpNb2NrLm1vY2soJ0BzdHJpbmcoXCJudW1iZXJcIiwgMSwgMyknKSxcclxuICAgICAgICBSZW1hcmtzOk1vY2subW9jaygnQGN0aXRsZSg1KScpLFxyXG4gICAgICAgIFN5c0F1ZGl0U3RhdHVzOiBcIlwiXHJcbiAgICB9LCAgXHJcbiAgICB7XHJcbiAgICAgICAgQnVzaW5lc3NJZDpNb2NrLm1vY2soXCJAaWRcIiksXHJcbiAgICAgICAgQ29uc2lnbm9yOk1vY2subW9jaygnQGN0aXRsZSg1KScpLFxyXG4gICAgICAgIEJvb2tpbmdBZ2VudDpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBTaGlwcGluZ0NvbXBhbnk6TW9jay5tb2NrKCdAY3RpdGxlKDUpJyksXHJcbiAgICAgICAgU2FpbGluZ0RhdGU6TW9jay5tb2NrKCdAZGF0ZXRpbWUoKScpLFxyXG4gICAgICAgIFZlc3NlbFZveWFnZTpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBNYmxOdW1iZXI6TW9jay5tb2NrKCdAY3RpdGxlKDUpJyksXHJcbiAgICAgICAgTWJsVHlwZTpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBCdXNpbmVzc1N0YXR1czpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBTYWxlc1BlcnNvbjpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBCbFN0YXR1czpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBSZWxlYXNlQXVkaXRTdGF0dXM6TW9jay5tb2NrKCdAY3RpdGxlKDUpJyksXHJcbiAgICAgICAgQXVkaXRUaW1lOk1vY2subW9jaygnQGRhdGV0aW1lKCknKSxcclxuICAgICAgICBIb2xkVGltZTpNb2NrLm1vY2soJ0BkYXRldGltZSgpJyksXHJcbiAgICAgICAgSG9sZFJlYXNvbjpNb2NrLm1vY2soJ0BjdGl0bGUoNSknKSxcclxuICAgICAgICBDb250cmFjdFZhbGlkOk1vY2subW9jaygnQHN0cmluZyhcIm51bWJlclwiLCAxLCAzKScpLFxyXG4gICAgICAgIEludm9pY2VkOk1vY2subW9jaygnQHN0cmluZyhcIm51bWJlclwiLCAxLCAzKScpLFxyXG4gICAgICAgIEZ1bGx5V3JpdHRlbk9mZjpNb2NrLm1vY2soJ0BzdHJpbmcoXCJudW1iZXJcIiwgMSwgMyknKSxcclxuICAgICAgICBPdmVyZHVlOk1vY2subW9jaygnQHN0cmluZyhcIm51bWJlclwiLCAxLCAzKScpLFxyXG4gICAgICAgIE92ZXJMaW1pdDpNb2NrLm1vY2soJ0BzdHJpbmcoXCJudW1iZXJcIiwgMSwgMyknKSxcclxuICAgICAgICBSZW1hcmtzOk1vY2subW9jaygnQGN0aXRsZSg1KScpLFxyXG4gICAgICAgIFN5c0F1ZGl0U3RhdHVzOiBcIlwiXHJcbiAgICB9LCAgIFxyXG5dO1xyXG4gXHJcbmV4cG9ydCBkZWZhdWx0IFtcclxuICAvLyBcdTY1M0VcdTUzNTVcdTVCQTFcdTY4MzhcdTUzRjBcdThEMjZcclxuICB7XHJcbiAgICB1cmw6IFwiL2FwaS9yZWxlYXNlX29yZGVyX3ZlcmlmaWNhdGlvblwiLFxyXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgcmVzcG9uc2U6ICgpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICBtZXNzYWdlOiBcIlx1OEJGN1x1NkM0Mlx1NjIxMFx1NTI5Rlx1MzAwMlwiLFxyXG4gICAgICAgIGRhdGE6IHJlbGVhc2VPcmRlclZlcmlmaWNhdGlvbkl0ZW1zLFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICB9LFxyXG4gIHtcclxuICAgIHVybDogXCIvYXBpL3JlbGVhc2Vfb3JkZXJfdmVyaWZpY2F0aW9uL3NhdmVcIixcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICByZXNwb25zZTogKHsgYm9keSB9OiB7IGJvZHk6IFJlbGVhc2VPcmRlclZlcmlmaWNhdGlvbkl0ZW1Qcm9wcyB9KSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogMjAwLFxyXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgbWVzc2FnZTogXCJcdTVGMDBcdTU5Q0JcdTU5MDRcdTc0MDZcIixcclxuICAgICAgICBkYXRhOiBib2R5XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICB1cmw6IFwiL2FwaS9yZWxlYXNlX29yZGVyX3ZlcmlmaWNhdGlvbi9zYXZlL3Byb2dyZXNzXCIsXHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICByYXdSZXNwb25zZTogYXN5bmMgKHJlcTogSW5jb21pbmdNZXNzYWdlLCByZXM6IFNlcnZlclJlc3BvbnNlKSA9PiB7XHJcbiAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L2V2ZW50LXN0cmVhbScpO1xyXG4gICAgICByZXMuc2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJywgJ25vLWNhY2hlJyk7XHJcbiAgICAgIHJlcy5zZXRIZWFkZXIoJ0Nvbm5lY3Rpb24nLCAna2VlcC1hbGl2ZScpO1xyXG4gICAgICByZXMuc2V0SGVhZGVyKCdYLUFjY2VsLUJ1ZmZlcmluZycsICdubycpO1xyXG5cclxuICAgICAgbGV0IHByb2dyZXNzID0gMDtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHNlbmRQcm9ncmVzcyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgY29kZTogMjAwLFxyXG4gICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgIG1lc3NhZ2U6IHByb2dyZXNzID49IDEwMCA/IFwiXHU0RkREXHU1QjU4XHU2MjEwXHU1MjlGXCIgOiBcIlx1NTkwNFx1NzQwNlx1NEUyRC4uLlwiLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXHJcbiAgICAgICAgICAgIHN0YXR1czogcHJvZ3Jlc3MgPj0gMTAwID8gJ2NvbXBsZXRlZCcgOiAncHJvY2Vzc2luZycsXHJcbiAgICAgICAgICAgIHJlc3VsdDogcHJvZ3Jlc3MgPj0gMTAwID8gbnVsbCA6IG51bGxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXMud3JpdGUoYGRhdGE6ICR7SlNPTi5zdHJpbmdpZnkoZGF0YSl9XFxuXFxuYCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1NlbmRpbmcgcHJvZ3Jlc3M6JywgcHJvZ3Jlc3MpO1xyXG5cclxuICAgICAgICBpZiAocHJvZ3Jlc3MgPj0gMTAwKSB7XHJcbiAgICAgICAgICByZXMuZW5kKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9ncmVzcyArPSAxMDtcclxuICAgICAgICBzZXRUaW1lb3V0KHNlbmRQcm9ncmVzcywgMTAwMCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBzZW5kUHJvZ3Jlc3MoKTtcclxuICAgIH1cclxuICB9XHJcbl07Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5UixPQUFPLFVBQVU7QUFLMVMsSUFBTSxnQ0FBb0U7QUFBQSxFQUN0RTtBQUFBLElBQ0UsWUFBWSxLQUFLLEtBQUssS0FBSztBQUFBLElBQzNCLFdBQVcsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUNqQyxjQUFjLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDcEMsaUJBQWlCLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDdkMsYUFBYSxLQUFLLEtBQUssYUFBYTtBQUFBLElBQ3BDLGNBQWMsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUNwQyxXQUFXLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDakMsU0FBUyxLQUFLLEtBQUssWUFBWTtBQUFBLElBQy9CLGdCQUFnQixLQUFLLEtBQUssWUFBWTtBQUFBLElBQ3RDLGFBQWEsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUNuQyxVQUFVLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDaEMsb0JBQW9CLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDMUMsV0FBVyxLQUFLLEtBQUssYUFBYTtBQUFBLElBQ2xDLFVBQVUsS0FBSyxLQUFLLGFBQWE7QUFBQSxJQUNqQyxZQUFZLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDbEMsZUFBZSxLQUFLLEtBQUsseUJBQXlCO0FBQUEsSUFDbEQsVUFBVSxLQUFLLEtBQUsseUJBQXlCO0FBQUEsSUFDN0MsaUJBQWlCLEtBQUssS0FBSyx5QkFBeUI7QUFBQSxJQUNwRCxTQUFTLEtBQUssS0FBSyx5QkFBeUI7QUFBQSxJQUM1QyxXQUFXLEtBQUssS0FBSyx5QkFBeUI7QUFBQSxJQUM5QyxTQUFTLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDL0IsZ0JBQWdCO0FBQUEsRUFDbEI7QUFBQSxFQUNBO0FBQUEsSUFDSSxZQUFXLEtBQUssS0FBSyxLQUFLO0FBQUEsSUFDMUIsV0FBVSxLQUFLLEtBQUssWUFBWTtBQUFBLElBQ2hDLGNBQWEsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUNuQyxpQkFBZ0IsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUN0QyxhQUFZLEtBQUssS0FBSyxhQUFhO0FBQUEsSUFDbkMsY0FBYSxLQUFLLEtBQUssWUFBWTtBQUFBLElBQ25DLFdBQVUsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUNoQyxTQUFRLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDOUIsZ0JBQWUsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUNyQyxhQUFZLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDbEMsVUFBUyxLQUFLLEtBQUssWUFBWTtBQUFBLElBQy9CLG9CQUFtQixLQUFLLEtBQUssWUFBWTtBQUFBLElBQ3pDLFdBQVUsS0FBSyxLQUFLLGFBQWE7QUFBQSxJQUNqQyxVQUFTLEtBQUssS0FBSyxhQUFhO0FBQUEsSUFDaEMsWUFBVyxLQUFLLEtBQUssWUFBWTtBQUFBLElBQ2pDLGVBQWMsS0FBSyxLQUFLLHlCQUF5QjtBQUFBLElBQ2pELFVBQVMsS0FBSyxLQUFLLHlCQUF5QjtBQUFBLElBQzVDLGlCQUFnQixLQUFLLEtBQUsseUJBQXlCO0FBQUEsSUFDbkQsU0FBUSxLQUFLLEtBQUsseUJBQXlCO0FBQUEsSUFDM0MsV0FBVSxLQUFLLEtBQUsseUJBQXlCO0FBQUEsSUFDN0MsU0FBUSxLQUFLLEtBQUssWUFBWTtBQUFBLElBQzlCLGdCQUFnQjtBQUFBLEVBQ3BCO0FBQUEsRUFDQTtBQUFBLElBQ0ksWUFBVyxLQUFLLEtBQUssS0FBSztBQUFBLElBQzFCLFdBQVUsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUNoQyxjQUFhLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDbkMsaUJBQWdCLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDdEMsYUFBWSxLQUFLLEtBQUssYUFBYTtBQUFBLElBQ25DLGNBQWEsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUNuQyxXQUFVLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDaEMsU0FBUSxLQUFLLEtBQUssWUFBWTtBQUFBLElBQzlCLGdCQUFlLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDckMsYUFBWSxLQUFLLEtBQUssWUFBWTtBQUFBLElBQ2xDLFVBQVMsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUMvQixvQkFBbUIsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUN6QyxXQUFVLEtBQUssS0FBSyxhQUFhO0FBQUEsSUFDakMsVUFBUyxLQUFLLEtBQUssYUFBYTtBQUFBLElBQ2hDLFlBQVcsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUNqQyxlQUFjLEtBQUssS0FBSyx5QkFBeUI7QUFBQSxJQUNqRCxVQUFTLEtBQUssS0FBSyx5QkFBeUI7QUFBQSxJQUM1QyxpQkFBZ0IsS0FBSyxLQUFLLHlCQUF5QjtBQUFBLElBQ25ELFNBQVEsS0FBSyxLQUFLLHlCQUF5QjtBQUFBLElBQzNDLFdBQVUsS0FBSyxLQUFLLHlCQUF5QjtBQUFBLElBQzdDLFNBQVEsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUM5QixnQkFBZ0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0E7QUFBQSxJQUNJLFlBQVcsS0FBSyxLQUFLLEtBQUs7QUFBQSxJQUMxQixXQUFVLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDaEMsY0FBYSxLQUFLLEtBQUssWUFBWTtBQUFBLElBQ25DLGlCQUFnQixLQUFLLEtBQUssWUFBWTtBQUFBLElBQ3RDLGFBQVksS0FBSyxLQUFLLGFBQWE7QUFBQSxJQUNuQyxjQUFhLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDbkMsV0FBVSxLQUFLLEtBQUssWUFBWTtBQUFBLElBQ2hDLFNBQVEsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUM5QixnQkFBZSxLQUFLLEtBQUssWUFBWTtBQUFBLElBQ3JDLGFBQVksS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUNsQyxVQUFTLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDL0Isb0JBQW1CLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDekMsV0FBVSxLQUFLLEtBQUssYUFBYTtBQUFBLElBQ2pDLFVBQVMsS0FBSyxLQUFLLGFBQWE7QUFBQSxJQUNoQyxZQUFXLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDakMsZUFBYyxLQUFLLEtBQUsseUJBQXlCO0FBQUEsSUFDakQsVUFBUyxLQUFLLEtBQUsseUJBQXlCO0FBQUEsSUFDNUMsaUJBQWdCLEtBQUssS0FBSyx5QkFBeUI7QUFBQSxJQUNuRCxTQUFRLEtBQUssS0FBSyx5QkFBeUI7QUFBQSxJQUMzQyxXQUFVLEtBQUssS0FBSyx5QkFBeUI7QUFBQSxJQUM3QyxTQUFRLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDOUIsZ0JBQWdCO0FBQUEsRUFDcEI7QUFBQSxFQUNBO0FBQUEsSUFDSSxZQUFXLEtBQUssS0FBSyxLQUFLO0FBQUEsSUFDMUIsV0FBVSxLQUFLLEtBQUssWUFBWTtBQUFBLElBQ2hDLGNBQWEsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUNuQyxpQkFBZ0IsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUN0QyxhQUFZLEtBQUssS0FBSyxhQUFhO0FBQUEsSUFDbkMsY0FBYSxLQUFLLEtBQUssWUFBWTtBQUFBLElBQ25DLFdBQVUsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUNoQyxTQUFRLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDOUIsZ0JBQWUsS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUNyQyxhQUFZLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDbEMsVUFBUyxLQUFLLEtBQUssWUFBWTtBQUFBLElBQy9CLG9CQUFtQixLQUFLLEtBQUssWUFBWTtBQUFBLElBQ3pDLFdBQVUsS0FBSyxLQUFLLGFBQWE7QUFBQSxJQUNqQyxVQUFTLEtBQUssS0FBSyxhQUFhO0FBQUEsSUFDaEMsWUFBVyxLQUFLLEtBQUssWUFBWTtBQUFBLElBQ2pDLGVBQWMsS0FBSyxLQUFLLHlCQUF5QjtBQUFBLElBQ2pELFVBQVMsS0FBSyxLQUFLLHlCQUF5QjtBQUFBLElBQzVDLGlCQUFnQixLQUFLLEtBQUsseUJBQXlCO0FBQUEsSUFDbkQsU0FBUSxLQUFLLEtBQUsseUJBQXlCO0FBQUEsSUFDM0MsV0FBVSxLQUFLLEtBQUsseUJBQXlCO0FBQUEsSUFDN0MsU0FBUSxLQUFLLEtBQUssWUFBWTtBQUFBLElBQzlCLGdCQUFnQjtBQUFBLEVBQ3BCO0FBQ0o7QUFFQSxJQUFPLHFDQUFRO0FBQUE7QUFBQSxFQUViO0FBQUEsSUFDRSxLQUFLO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixVQUFVLE1BQU07QUFDZCxhQUFPO0FBQUEsUUFDTCxNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUEsUUFDVCxNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsVUFBVSxDQUFDLEVBQUUsS0FBSyxNQUFtRDtBQUNuRSxhQUFPO0FBQUEsUUFDTCxNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUEsUUFDVCxNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsYUFBYSxPQUFPLEtBQXNCLFFBQXdCO0FBQ2hFLFVBQUksVUFBVSxnQkFBZ0IsbUJBQW1CO0FBQ2pELFVBQUksVUFBVSxpQkFBaUIsVUFBVTtBQUN6QyxVQUFJLFVBQVUsY0FBYyxZQUFZO0FBQ3hDLFVBQUksVUFBVSxxQkFBcUIsSUFBSTtBQUV2QyxVQUFJLFdBQVc7QUFFZixZQUFNLGVBQWUsTUFBTTtBQUN6QixjQUFNLE9BQU87QUFBQSxVQUNYLE1BQU07QUFBQSxVQUNOLFNBQVM7QUFBQSxVQUNULFNBQVMsWUFBWSxNQUFNLDZCQUFTO0FBQUEsVUFDcEMsTUFBTTtBQUFBLFlBQ0o7QUFBQSxZQUNBLFFBQVEsWUFBWSxNQUFNLGNBQWM7QUFBQSxZQUN4QyxRQUFRLFlBQVksTUFBTSxPQUFPO0FBQUEsVUFDbkM7QUFBQSxRQUNGO0FBRUEsWUFBSSxNQUFNLFNBQVMsS0FBSyxVQUFVLElBQUksQ0FBQztBQUFBO0FBQUEsQ0FBTTtBQUM3QyxnQkFBUSxJQUFJLHFCQUFxQixRQUFRO0FBRXpDLFlBQUksWUFBWSxLQUFLO0FBQ25CLGNBQUksSUFBSTtBQUNSO0FBQUEsUUFDRjtBQUVBLG9CQUFZO0FBQ1osbUJBQVcsY0FBYyxHQUFJO0FBQUEsTUFDL0I7QUFFQSxtQkFBYTtBQUFBLElBQ2Y7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
