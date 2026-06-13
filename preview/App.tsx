import { Card, Divider, Input, Select, Space, Switch, Tag, Typography } from "antd";
import React, { useState } from "react";
import { BooleanSelect } from "../src";

const { Title, Text } = Typography;

/* ─── 布局常量 ─── */

const ROW_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};
const LABEL_STYLE: React.CSSProperties = {
  width: 100,
  flexShrink: 0,
  textAlign: "right",
  color: "var(--ant-color-text-secondary)",
  fontSize: 14,
};
const CONTROL_STYLE: React.CSSProperties = { width: 220 };

/* ─── App ─── */

const App: React.FC = () => {
  const [value, setValue] = useState<boolean | undefined | null>(undefined);
  const [trueLabel, setTrueLabel] = useState("是");
  const [falseLabel, setFalseLabel] = useState("否");
  const [placeholder, setPlaceholder] = useState("请选择");
  const [disabled, setDisabled] = useState(false);
  const [allowClear, setAllowClear] = useState(true);
  const [emptyValue, setEmptyValue] = useState<undefined | null>(undefined);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 16px" }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        antd-boolean-select Preview
      </Title>

      {/* 配置面板 */}
      <Card size="small" title="属性配置" style={{ marginBottom: 16 }}>
        <Space direction="vertical" size={0} style={{ width: "100%" }}>
          {/* 标签配置 */}
          <Text
            type="secondary"
            style={{ marginBottom: 12, display: "block", fontSize: 12, letterSpacing: 1 }}
          >
            标签配置
          </Text>
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div style={ROW_STYLE}>
              <span style={LABEL_STYLE}>trueLabel</span>
              <Input
                value={trueLabel}
                onChange={(event) => setTrueLabel(event.target.value)}
                style={CONTROL_STYLE}
              />
            </div>
            <div style={ROW_STYLE}>
              <span style={LABEL_STYLE}>falseLabel</span>
              <Input
                value={falseLabel}
                onChange={(event) => setFalseLabel(event.target.value)}
                style={CONTROL_STYLE}
              />
            </div>
            <div style={ROW_STYLE}>
              <span style={LABEL_STYLE}>placeholder</span>
              <Input
                value={placeholder}
                onChange={(event) => setPlaceholder(event.target.value)}
                style={CONTROL_STYLE}
                allowClear
              />
            </div>
          </Space>

          <Divider style={{ margin: "16px 0" }} />

          {/* 行为控制 */}
          <Text
            type="secondary"
            style={{ marginBottom: 12, display: "block", fontSize: 12, letterSpacing: 1 }}
          >
            行为控制
          </Text>
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div style={ROW_STYLE}>
              <span style={LABEL_STYLE}>disabled</span>
              <Switch checked={disabled} onChange={setDisabled} />
            </div>
            <div style={ROW_STYLE}>
              <span style={LABEL_STYLE}>allowClear</span>
              <Switch checked={allowClear} onChange={setAllowClear} />
            </div>
            <div style={ROW_STYLE}>
              <span style={LABEL_STYLE}>emptyValue</span>
              <Select
                value={emptyValue === undefined ? "undefined" : "null"}
                onChange={(stringValue) =>
                  setEmptyValue(stringValue === "undefined" ? undefined : null)
                }
                style={CONTROL_STYLE}
                options={[
                  { value: "undefined", label: "undefined" },
                  { value: "null", label: "null" },
                ]}
              />
            </div>
          </Space>
        </Space>
      </Card>

      {/* 演示区 */}
      <Card size="small" title="演示" style={{ marginBottom: 16 }}>
        <Space direction="vertical" size="small">
          <BooleanSelect
            trueLabel={trueLabel}
            falseLabel={falseLabel}
            placeholder={placeholder}
            disabled={disabled}
            allowClear={allowClear}
            emptyValue={emptyValue}
            style={{ width: 200 }}
            value={value}
            onChange={(next) => setValue(next)}
          />
          <Text type="secondary">
            当前值:{" "}
            <Tag color="blue">
              {value === null ? "null" : value === undefined ? "undefined" : String(value)}
            </Tag>
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default App;
