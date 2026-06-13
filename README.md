<p align="center">
  <h1 align="center">antd-boolean-select</h1>
  <p align="center">基于 Ant Design Select 封装的布尔值选择组件，为表单提供开箱即用的 "是/否" 选项。</p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/antd-boolean-select"><img src="https://img.shields.io/npm/v/antd-boolean-select" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/antd-boolean-select"><img src="https://img.shields.io/npm/dm/antd-boolean-select" alt="npm downloads" /></a>
  <a href="https://github.com/Czw96/antd-boolean-select/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/antd-boolean-select" alt="license" /></a>
  <a href="https://github.com/Czw96/antd-boolean-select"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen" alt="PRs Welcome" /></a>
</p>

中文 | [English](https://github.com/Czw96/antd-boolean-select/blob/master/README_EN.md)

---

## 安装

```bash
npm install antd-boolean-select
```

## 依赖要求

| 依赖 | 版本 |
|------|------|
| react | >=18.2.0 |
| react-dom | >=18.2.0 |
| antd | >=6.0.0 |

## 在线演示

[antd-boolean-select demo](https://demo.29dev.cn/antd-boolean-select/)

本地启动预览：

```bash
npm run preview
```

## 使用示例

```tsx
import { BooleanSelect } from "antd-boolean-select";

function Demo() {
  return (
    <BooleanSelect
      trueLabel="启用"
      falseLabel="禁用"
      onChange={(value) => console.log(value)}
    />
  );
}
```

### 表单集成

```tsx
import { BooleanSelect } from "antd-boolean-select";
import { Form, Button } from "antd";

function FormDemo() {
  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={(values) => console.log(values)}>
      <Form.Item name="enabled" label="状态">
        <BooleanSelect trueLabel="启用" falseLabel="禁用" />
      </Form.Item>
      <Form.Item name="verified" label="是否认证">
        <BooleanSelect
          trueLabel="是"
          falseLabel="否"
          emptyValue={null}
        />
      </Form.Item>
      <Button htmlType="submit">提交</Button>
    </Form>
  );
}
```

### 受控 / 非受控

```tsx
// 受控模式
<BooleanSelect
  value={true}
  trueLabel="显示"
  falseLabel="隐藏"
  onChange={(v) => setVisible(v)}
/>

// 非受控模式
<BooleanSelect
  defaultValue={false}
  trueLabel="开启"
  falseLabel="关闭"
  onChange={(v) => console.log(v)}
/>
```

## API

`BooleanSelectProps` 继承 `SelectProps`（排除了 `options`、`value`、`onChange`、`defaultValue`），因此 antd Select 的标准属性（`placeholder`、`disabled`、`size`、`status`、`variant`、`style`、`className` 等）可直接使用。

组件内部默认 `allowClear` 为 `true`、`style.width` 为 `"100%"`。

### BooleanSelectProps

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `trueLabel` | `string` | — | `true` 选项的显示文本（必填） |
| `falseLabel` | `string` | — | `false` 选项的显示文本（必填） |
| `value` | `boolean \| undefined \| null` | — | 当前选中值（受控） |
| `defaultValue` | `boolean \| undefined \| null` | — | 默认选中值（非受控） |
| `onChange` | `(value: boolean \| undefined \| null) => void` | — | 值变更回调，返回 `boolean`、`undefined` 或 `null`（取决于 `emptyValue`） |
| `emptyValue` | `undefined \| null` | `undefined` | 清空时返回的值。查询表单建议用 `undefined`（默认），录入表单建议用 `null` |

### 导出类型

| 导出 | 说明 |
|------|------|
| `BooleanSelect` | 布尔选择组件 |
| `BooleanSelectProps` | 组件 Props 类型 |

## Props 详细说明

### trueLabel / falseLabel

分别控制 `true` 和 `false` 两个选项在下拉列表中的显示文本。两个属性均为必填，确保每个使用场景都有明确可读的语义。

```tsx
// 语义化标签
<BooleanSelect trueLabel="通过" falseLabel="驳回" />

// 是/否
<BooleanSelect trueLabel="是" falseLabel="否" />

// 英文场景
<BooleanSelect trueLabel="Yes" falseLabel="No" />
```

### value / defaultValue

组件在内部将 `boolean` 转为 `Select` 所需的字符串值（`"true"` / `"false"`）。外部始终使用自然的 `boolean` 类型，无需手动转换。

- 值为 `undefined` 或 `null` 时，对应 Select 的未选中状态（placeholder 可见）。
- 可通过设置 `undefined` 或 `null` 来编程清空选择。

```tsx
// 受控模式：外部管理值
const [enabled, setEnabled] = useState<boolean | null>(null);

<BooleanSelect
  value={enabled}
  trueLabel="开启"
  falseLabel="关闭"
  onChange={setEnabled}
/>

// 非受控模式：组件内部管理
<BooleanSelect
  defaultValue={true}
  trueLabel="有效"
  falseLabel="无效"
/>

// 编程清空
setEnabled(null);  // Select 回到 placeholder 状态
```

### onChange

回调参数的类型为 `boolean | undefined | null`，具体取决于当前操作：

| 操作 | 回调参数 | 说明 |
|------|----------|------|
| 选择 "true" 选项 | `true` | |
| 选择 "false" 选项 | `false` | |
| 点击清除按钮 | `undefined` 或 `null` | 由 `emptyValue` 决定 |

```tsx
<BooleanSelect
  trueLabel="显示"
  falseLabel="隐藏"
  onChange={(value) => {
    // value: true | false | undefined | null
    if (value === true) {
      console.log("用户选择了显示");
    } else if (value === false) {
      console.log("用户选择了隐藏");
    } else {
      console.log("用户清空了选择");
    }
  }}
/>
```

### emptyValue

控制清空操作时 `onChange` 回调的参数值。典型场景：

- **查询 / 搜索表单**：使用默认值 `undefined`，清空表示"不筛选"，后端忽略该字段。
- **录入 / 编辑表单**：使用 `null`，清空表示"字段无值"，后端识别为 `NULL`。

```tsx
// 查询表单：清空返回 undefined
<BooleanSelect
  trueLabel="已激活"
  falseLabel="未激活"
  // emptyValue 默认为 undefined
  onChange={(value) => {
    // 清空时 value === undefined
    // 后端可以忽略该筛选条件
  }}
/>

// 录入表单：清空返回 null
<BooleanSelect
  trueLabel="是"
  falseLabel="否"
  emptyValue={null}
  onChange={(value) => {
    // 清空时 value === null
    // 提交时该字段为 null，后端识别为无值
  }}
/>
```

## 功能特性

- **零心智负担**：外部全部使用原生 `boolean` 类型，组件内部自动处理与 Select 字符串值的双向转换。
- **清空值可配**：通过 `emptyValue` 决定清空时回调返回 `undefined` 还是 `null`，适配查询与录入两种场景。
- **即拆即用**：默认 `allowClear` 和 `width: 100%`，放入 Form.Item 即可直接使用。
- **完整透传**：继承 antd Select 所有标准属性，`placeholder`、`disabled`、`size`、`status` 等自由使用。

## 本地开发

```bash
git clone https://github.com/Czw96/antd-boolean-select.git
cd antd-boolean-select
npm install

npm run dev         # 监听构建
npm run build       # 生产构建
npm run preview     # 启动预览页面
```

## 许可证

MIT © Czw96
