// 引入element-ui样式
import "element-ui/lib/theme-chalk/index.css";
export * from "../packages/index";

import * as YysUI from "../packages/index";

// 添加自定义样式
import "./styles/theme/index.css";
// tslint:disable-next-line: ordered-imports
import "./index.scss";

export default YysUI;
