import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import zhCN from "antd/locale/zh_CN";
import { createRoot } from "react-dom/client";
import App from "./App";

/* ─── Entry ─── */

interface RootContainer extends HTMLElement {
  __reactRoot?: ReturnType<typeof createRoot>;
}

const container = document.getElementById("root") as RootContainer;
if (!container) throw new Error("Failed to find the root element");

let root = container.__reactRoot;
if (!root) {
  root = createRoot(container);
  container.__reactRoot = root;
}

root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
);
