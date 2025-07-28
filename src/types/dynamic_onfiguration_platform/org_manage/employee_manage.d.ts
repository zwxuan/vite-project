// 员工属性
export interface EmployeeManageItemProps {
    // 员工编码
    EmployeeCode:string;
    // 员工姓名
    EmployeeName:string;
    // 所属组织
    Organization:string;
    // 所属部门
    Department:string;
    // 邮箱
    Email:string;
    // 手机号
    Mobile:string;
    // 状态
    Status:string;
    // 员工类别
    EmployeeCategory:string;
    // 备注
    Remarks:string;
    // 最后修改人
    LastUpdatedBy:string;
    // 最后修改时间
    LastUpdatedTime:string;
}

// 员工主职属性
export interface PrimaryJobItemProps {
    // 序号
    SeqNo:string;
    // 所属组织
    Organization:string;
    // 所属部门
    Department:string;
    // 员工类别
    EmployeeCategory:string;
    // 岗位
    Position:string;
    // 上级主管
    Supervisor:string;
    // 任职开始日期
    StartDate:string;
    // 任职结束日期
    EndDate:string;
    // 工作职责
    JobDuty:string;
}

// 员工兼职属性
export interface PartTimeJobItemProps {
    // 序号
    SeqNo:string;
    // 所属组织
    Organization:string;
    // 所属部门
    Department:string;
    // 员工类别
    EmployeeCategory:string;
    // 岗位
    Position:string;
    // 上级主管
    Supervisor:string;
    // 任职开始日期
    StartDate:string;
    // 任职结束日期
    EndDate:string;
    // 工作职责
    JobDuty:string;
}

// 员工银行账号属性
export interface EmployeeBankAccountItemProps {
    // 序号
    SeqNo:string;
    // 银行账号
    BankAccount:string;
    // 银行类别
    BankType:string;
    // 银行网点
    BankBranch:string;
    // 账号类型
    AccountType:string;
    // 币种
    Currency:string;
    // 是否默认
    IsDefault:string;
    // 备注
    Remarks:string;
    // 账户名
    AccountName:string;
}