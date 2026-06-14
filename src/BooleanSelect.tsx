import type { SelectProps } from "antd";
import { Select } from "antd";
import React from "react";

// BooleanSelect 组件 props, 将 boolean 值映射为 antd Select 的字符串选项
export interface BooleanSelectProps extends Omit<
  SelectProps,
  "options" | "value" | "onChange" | "defaultValue"
> {
  // boolean 值, 对应 Select 的 value
  value?: boolean | undefined | null;
  // boolean 默认值, 对应 Select 的 defaultValue
  defaultValue?: boolean | undefined | null;
  // 值变化回调, 返回 boolean | undefined | null(取决于 emptyValue)
  onChange?: (value: boolean | undefined | null) => void;
  // true 选项的显示文本
  trueLabel: string;
  // false 选项的显示文本
  falseLabel: string;
  // 清空时返回的值, 查询表单用 undefined(默认), 录入表单用 null
  emptyValue?: undefined | null;
}

// boolean 值转 Select 内部字符串值
const toSelectValue = (value: boolean | undefined | null): string | undefined => {
  if (value === undefined || value === null) return undefined;
  return String(value);
};

const BooleanSelect = React.forwardRef<React.ComponentRef<typeof Select>, BooleanSelectProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      trueLabel,
      falseLabel,
      emptyValue = undefined,
      allowClear,
      style,
      ...restProps
    },
    ref,
  ) => {
    // Select 内部字符串值转 boolean
    const toBoolean = (stringValue: string | undefined): boolean | undefined | null => {
      if (stringValue === undefined) return emptyValue;
      return stringValue === "true";
    };

    return (
      <Select
        ref={ref}
        {...restProps}
        value={toSelectValue(value)}
        defaultValue={toSelectValue(defaultValue)}
        onChange={(stringValue) => onChange?.(toBoolean(stringValue))}
        allowClear={allowClear ?? true}
        style={{ width: "100%", ...style }}
        options={[
          { value: "true", label: trueLabel },
          { value: "false", label: falseLabel },
        ]}
      />
    );
  },
);

export default BooleanSelect;
