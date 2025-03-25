import { OrdersLocale } from './orders.ts';
import { OrderFeeLocale } from './order_fee.ts';
import { FeeReconciliationLocale } from './fee_reconciliation.ts';
import { OrderBillLocale } from './order_bill.ts';
import { OrderDocumentLocale } from './order_document.ts';
import { CommonLocale } from './common.ts';
import { PhysicalInvoiceLocale } from './physical_invoice.ts';
import { InvoiceLocale } from './invoice.ts';
import { StatementOfAccountLocale } from './statement_of_account.ts';
import { BillManageLocale } from './bill_manage.ts';
import { SetFeeScheduleLocale } from './set_fee_schedule.ts';
import { ChargingStandardLocale } from './charging_standard.ts';
import { NotOffSettingLocale } from './not_off_setting.ts';
import { HasOffSettingLocale,OffSettingDetailLocale } from './has_off_setting.ts';
import { CashBasisAccountingLocale } from './cash_basis_accounting.ts';
import { AccountingBookLocale } from './accounting_book.ts';  
export {
  OrdersLocale,
  OrderFeeLocale,
  FeeReconciliationLocale,
  OrderBillLocale,
  OrderDocumentLocale,
  CommonLocale,
  PhysicalInvoiceLocale,
  InvoiceLocale,
  StatementOfAccountLocale,
  BillManageLocale,
  SetFeeScheduleLocale,
  ChargingStandardLocale,
  NotOffSettingLocale,
  CashBasisAccountingLocale,
  HasOffSettingLocale,
  OffSettingDetailLocale,
  AccountingBookLocale,
};

export default {
  ...OrdersLocale,
  ...OrderFeeLocale,
  ...FeeReconciliationLocale,
  ...PhysicalInvoiceLocale,
  ...OrderBillLocale,
  ...OrderDocumentLocale,
  ...CommonLocale,
  ...InvoiceLocale,
  ...BillManageLocale,
  ...StatementOfAccountLocale,
  ...SetFeeScheduleLocale,
  ...ChargingStandardLocale,
  ...NotOffSettingLocale,
  ...HasOffSettingLocale,
  ...CashBasisAccountingLocale,
  ...OffSettingDetailLocale,
  ...AccountingBookLocale,
};