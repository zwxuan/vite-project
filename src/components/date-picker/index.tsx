import React from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import zh from 'antd/es/date-picker/locale/zh_CN';

// 定义中文本地化配置
const zh_CNLocale: typeof zh = {
  ...zh,
  lang: {
    ...zh.lang,
    locale: 'zh_CN',
    fieldDateFormat: 'YYYY-MM-DD',
    fieldDateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    yearFormat: 'YYYY 年',
    monthFormat: 'MM 月',
    cellYearFormat: 'YYYY',
    "shortWeekDays": ["日", "一", "二", "三", "四", "五", "六"],
  },
};

// 导出DatePicker的子组件
const { RangePicker: AntRangePicker, MonthPicker: AntMonthPicker, WeekPicker: AntWeekPicker, YearPicker: AntYearPicker, TimePicker: AntTimePicker, QuarterPicker: AntQuarterPicker } = AntDatePicker;

// 创建自定义DatePickerZH组件
interface DatePickerProps extends React.ComponentProps<typeof AntDatePicker> {
  RangePicker?: typeof RangePickerZH;
  MonthPicker?: typeof MonthPickerZH;
  WeekPicker?: typeof WeekPickerZH;
  YearPicker?: typeof YearPickerZH;
  QuarterPicker?: typeof QuarterPickerZH;
  TimePicker?: typeof TimePickerZH;
}

export const DatePickerZH: React.FC<DatePickerProps> & {
  RangePicker: typeof RangePickerZH;
  MonthPicker: typeof MonthPickerZH;
  WeekPicker: typeof WeekPickerZH;
  YearPicker: typeof YearPickerZH;
  QuarterPicker: typeof QuarterPickerZH;
  TimePicker: typeof TimePickerZH;
} = Object.assign((props: DatePickerProps) => {
  return <AntDatePicker locale={zh_CNLocale} {...props} />;
}, {
  get RangePicker() {
    return RangePickerZH;
  },
  get MonthPicker() {
    return MonthPickerZH;
  },
  get WeekPicker() {
    return WeekPickerZH;
  },
  get YearPicker() {
    return YearPickerZH;
  },
  get QuarterPicker() {
    return QuarterPickerZH;
  },
  get TimePicker() {
    return TimePickerZH;
  }
});

// 创建自定义RangePicker组件
interface RangePickerProps extends React.ComponentProps<typeof AntRangePicker> {}

export const RangePickerZH: React.FC<RangePickerProps> = (props) => {
  return <AntRangePicker locale={zh_CNLocale} {...props} />;
};

// 创建自定义MonthPicker组件
interface MonthPickerProps extends React.ComponentProps<typeof AntMonthPicker> {}

export const MonthPickerZH: React.FC<MonthPickerProps> = (props) => {
  return <AntMonthPicker locale={zh_CNLocale} {...props} />;
};

// 创建自定义WeekPicker组件
interface WeekPickerProps extends React.ComponentProps<typeof AntWeekPicker> {}

export const WeekPickerZH: React.FC<WeekPickerProps> = (props) => {
  return <AntWeekPicker locale={zh_CNLocale} {...props} />;
};

// 创建自定义YearPicker组件
interface YearPickerProps extends React.ComponentProps<typeof AntYearPicker> {}

export const YearPickerZH: React.FC<YearPickerProps> = (props) => {
  return <AntYearPicker locale={zh_CNLocale} {...props} />;
};

// 创建自定义QuarterPicker组件
interface QuarterPickerProps extends React.ComponentProps<typeof AntQuarterPicker> {}

export const QuarterPickerZH: React.FC<QuarterPickerProps> = (props) => {
  return <AntQuarterPicker locale={zh_CNLocale} {...props} />;
};

// 创建自定义TimePicker组件
interface TimePickerProps extends React.ComponentProps<typeof AntTimePicker> {}

export const TimePickerZH: React.FC<TimePickerProps> = (props) => {
  return <AntTimePicker locale={zh_CNLocale} {...props} />;
};

// 默认导出DatePickerZH组件
export default DatePickerZH;


// 同时导出子组件作为DatePickerZH的属性
(DatePickerZH as any).RangePicker = RangePickerZH;
(DatePickerZH as any).MonthPicker = MonthPickerZH;
(DatePickerZH as any).WeekPicker = WeekPickerZH;
(DatePickerZH as any).YearPicker = YearPickerZH;
(DatePickerZH as any).QuarterPicker = QuarterPickerZH;
(DatePickerZH as any).TimePicker = TimePickerZH;
