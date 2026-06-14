<p align="center">
  <h1 align="center">antd-boolean-select</h1>
  <p align="center">A boolean selection component built on Ant Design Select, providing ready-to-use "true/false" options for forms.</p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/antd-boolean-select"><img src="https://img.shields.io/npm/v/antd-boolean-select" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/antd-boolean-select"><img src="https://img.shields.io/npm/dm/antd-boolean-select" alt="npm downloads" /></a>
  <a href="https://github.com/Czw96/antd-boolean-select/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/antd-boolean-select" alt="license" /></a>
  <a href="https://github.com/Czw96/antd-boolean-select"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen" alt="PRs Welcome" /></a>
</p>

English | [中文](https://github.com/Czw96/antd-boolean-select/blob/master/README.md)

---

## Installation

```bash
npm install antd-boolean-select
```

## Peer Dependencies

| Package | Version |
|---------|---------|
| react | >=18.2.0 |
| react-dom | >=18.2.0 |
| antd | >=6.0.0 |

## Online Demo

[antd-boolean-select demo](https://demo.29dev.cn/antd-boolean-select/)

Start the preview locally:

```bash
npm run preview
```

## Usage

```tsx
import { BooleanSelect } from "antd-boolean-select";

function Demo() {
  return (
    <BooleanSelect
      trueLabel="Enable"
      falseLabel="Disable"
      onChange={(value) => console.log(value)}
    />
  );
}
```

### Form Integration

```tsx
import { BooleanSelect } from "antd-boolean-select";
import { Form, Button } from "antd";

function FormDemo() {
  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={(values) => console.log(values)}>
      <Form.Item name="enabled" label="Status">
        <BooleanSelect trueLabel="Enable" falseLabel="Disable" />
      </Form.Item>
      <Form.Item name="verified" label="Verified">
        <BooleanSelect
          trueLabel="Yes"
          falseLabel="No"
          emptyValue={null}
        />
      </Form.Item>
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
}
```

### Controlled / Uncontrolled

```tsx
// Controlled mode
<BooleanSelect
  value={true}
  trueLabel="Show"
  falseLabel="Hide"
  onChange={(v) => setVisible(v)}
/>

// Uncontrolled mode
<BooleanSelect
  defaultValue={false}
  trueLabel="On"
  falseLabel="Off"
  onChange={(v) => console.log(v)}
/>
```

## API

`BooleanSelectProps` extends `SelectProps` (with `options`, `value`, `onChange`, and `defaultValue` omitted), so all standard antd Select props (`placeholder`, `disabled`, `size`, `status`, `variant`, `style`, `className`, etc.) work as usual.

The component defaults `allowClear` to `true` and `style.width` to `"100%"`.

### BooleanSelectProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trueLabel` | `string` | — | Display text for the `true` option (required) |
| `falseLabel` | `string` | — | Display text for the `false` option (required) |
| `value` | `boolean \| undefined \| null` | — | Current selected value (controlled) |
| `defaultValue` | `boolean \| undefined \| null` | — | Default selected value (uncontrolled) |
| `onChange` | `(value: boolean \| undefined \| null) => void` | — | Value change callback. Returns `boolean`, `undefined`, or `null` (depending on `emptyValue`) |
| `emptyValue` | `undefined \| null` | `undefined` | Value returned on clear. Use `undefined` (default) for search forms, `null` for data entry forms |

### Exported Types

| Export | Description |
|--------|-------------|
| `BooleanSelect` | The boolean select component |
| `BooleanSelectProps` | Component props type |

## Props Details

### trueLabel / falseLabel

Control the display text for the `true` and `false` options in the dropdown. Both props are required to ensure clear semantics in every use case.

```tsx
// Semantic labels
<BooleanSelect trueLabel="Approved" falseLabel="Rejected" />

// Yes/No
<BooleanSelect trueLabel="Yes" falseLabel="No" />

// English
<BooleanSelect trueLabel="Yes" falseLabel="No" />
```

### value / defaultValue

The component internally maps `boolean` to the string values expected by `Select` (`"true"` / `"false"`). External code always uses native `boolean` types — no manual conversion needed.

- When the value is `undefined` or `null`, it corresponds to the unselected state (placeholder visible).
- You can programmatically clear the selection by setting `undefined` or `null`.

```tsx
// Controlled mode: external state
const [enabled, setEnabled] = useState<boolean | null>(null);

<BooleanSelect
  value={enabled}
  trueLabel="On"
  falseLabel="Off"
  onChange={setEnabled}
/>

// Uncontrolled mode: internal state
<BooleanSelect
  defaultValue={true}
  trueLabel="Active"
  falseLabel="Inactive"
/>

// Programmatic clear
setEnabled(null);  // Select returns to placeholder state
```

### onChange

The callback parameter type is `boolean | undefined | null`, depending on the operation:

| Action | Callback Argument | Note |
|--------|-------------------|------|
| Select "true" option | `true` | |
| Select "false" option | `false` | |
| Click clear button | `undefined` or `null` | Determined by `emptyValue` |

```tsx
<BooleanSelect
  trueLabel="Show"
  falseLabel="Hide"
  onChange={(value) => {
    // value: true | false | undefined | null
    if (value === true) {
      console.log("User selected Show");
    } else if (value === false) {
      console.log("User selected Hide");
    } else {
      console.log("User cleared the selection");
    }
  }}
/>
```

### emptyValue

Controls the value passed to `onChange` when the selection is cleared. Typical scenarios:

- **Search / filter forms**: Use the default `undefined` — clearing means "no filter", and the backend ignores the field.
- **Data entry / edit forms**: Use `null` — clearing means "field has no value", and the backend recognizes it as `NULL`.

```tsx
// Search form: clear returns undefined
<BooleanSelect
  trueLabel="Activated"
  falseLabel="Not Activated"
  // emptyValue defaults to undefined
  onChange={(value) => {
    // On clear: value === undefined
    // Backend can ignore this filter criterion
  }}
/>

// Entry form: clear returns null
<BooleanSelect
  trueLabel="Yes"
  falseLabel="No"
  emptyValue={null}
  onChange={(value) => {
    // On clear: value === null
    // On submit, this field is null — backend recognizes it as no value
  }}
/>
```

## Features

- **Zero overhead**: Native `boolean` types everywhere; the component handles bidirectional conversion to/from Select's string values internally.
- **Configurable clear value**: Use `emptyValue` to control whether clearing returns `undefined` or `null`, adapting to both search and data entry scenarios.
- **Plug and play**: Defaults `allowClear` and `width: 100%` — drop it directly into a `Form.Item` and you're ready to go.
- **Full prop forwarding**: Inherits all standard antd Select props — `placeholder`, `disabled`, `size`, `status`, and more work freely.

## Development

```bash
git clone https://github.com/Czw96/antd-boolean-select.git
cd antd-boolean-select
npm install

npm run dev         # watch build
npm run build       # production build
npm run preview     # start preview page
```

## License

MIT © Czw96
