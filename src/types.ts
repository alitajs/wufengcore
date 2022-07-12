export type JSONValue = any;

export type JSONObject = Record<string, JSONValue>;

export type JSONArray = JSONValue[];

export type InputObject = Record<string, Input>;

export interface Input {
  /**
   * 类型，唯一标识，类型重复无法注册
   */
  type: string;
  /**
   * 是否允许绑定数据源
   */
  istodoBind?: boolean;
  /**
   * 显示给用户的文本
   */
  label?: string;
  /**
   * 分组名称，直接按字符匹配分组，便于直接扩展
   */
  groupsName?: string;
  /**
   * 值校验规则，正则表达式
   */
  rules?: string[];
  /**
   * 直接透传给属性编辑器的属性，用于属性编辑器的复用情况
   */
  props?: JSONObject;
  /**
   * 属性编辑器的默认值
   */
  defaultValue?: JSONValue;
  /**
   * 标记这个设置器最终修改的属性对象，比如可能展示的时候，是在 todoStyle 中，但是修改的是属性的 props 值
   */
  targetType?: string;
  /**
   * 设置器在面板中展示的位置
   */
  /**
   * 属性变化前的hook，可以操作当前节点的字段。
   */
  onBeforeChange?: (options?: any, extraProps?: any) => Promise<any>;
  /**
   * 组件是否自带 Form.Item
   */
  hasFormItem?: boolean;
  /**
   * 设置器在面板中展示的位置
   */
  position?: string;
}

export interface Component {
  /**
   * 组件名称
   */
  label?: string;
  /**
   * 类型，唯一标识，类型重复无法注册
   */
  type: string;
  /**
   * 组件关联平台，这里定义的优先级最高
   */
  platform?: string;
  /**
   *  组件类型  0：容器  1：通用  2：数据录入  3：数据展示 4：反馈  5：导航  6：布局 7:图标  99:订阅组件 88: 可视化仪表盘 66: 低零融合组件
   */
  compType?: number;
  /**
   * 基础组件使用较多，组件所在库标识
   */
  compLib?: string;
  /**
   * 组件允许编辑的所有属性
   */
  todoProps: InputObject;
  /**
   * 组件的所有属性默认值，包括允许编排的属性和其他属性
   */
  props?: JSONValue;
  /**
   * 允许编辑的所有样式
   */
  todoStyles?: InputObject;
  /**
   * 组件的所有样式默认值，包括允许编排的样式和其他样式
   */
  style?: JSONValue;
  /**
   * 是否为容器组件
   */
  isContainer?: boolean;
  /**
   * 标识为 InlineBlock 布局，编辑器需要特殊处理
   * 比如 拖入一个文本，会默认占用一行，需要修改外层容器的样式
   */
  isInlineBlock?: boolean;
  /**
   * 是否可以放置业务对象
   */
  isBusiObjContainer?: boolean;
  /**
   * 是App表单子项
   */
  isAppChildForm?: boolean;
  /**
   * 组件详情，用于 card 显示，或资产商店说明
   */
  description?: string;
  /**
   * 组件大图
   */
  image?: string;
  /**
   * 左侧编辑时，配套显示的 icon
   * 允许直接写 http:// 和 icon type
   */
  icon?: string;
  /**
   * 分组名称，直接按字符匹配分组，便于直接扩展
   */
  groupsName?: string;
  /**
   * 允许编辑的事件
   */
  todoEvents?: JSONArray;
  /**
   * 初始化时默认绑定的事件
   */
  setEvents?: JSONArray;
  /**
   * 组件暴露的所有事件
   */
  todoActionList?: string[];
  /**
   * 需要对标的 api，比如编辑器中配置 button 的 value，真实的 button 值属性是 children
   * transform: {
   * // 需要翻译的字段名称
   * value: 'children',
   * },
   */
  transform?: JSONArray;
  /**
   * 真实的组件文件，再调用注册时会被绑定
   * 删除实例中的 config，通过 getComponentByType 获取
   */
  // class?: string;
  /**
   * 子组件，用于组合组件
   */
  components?: Component[];
  /**
   * 只有一个子组件
   */
  children?: any;
  /**
   * app校验字段
   */
  validator?: any;
  /**
   * 允许用户自定义事件，可能没用，待确认
   */
  customEvent?: boolean;
  /**
   * 标记组件能够存放的父级元素
   * DFormCustom 的父级容器只能是 "DForm", "DGroup"
   * {
   *   type: "DFormCustom",
   *   onlyRoot: ["DForm", "DGroup"]
   * }
   */
  onlyRoot?: string[];
  /**
   * 标记当前容器只能放入的元素
   * DForm 容器只能放入 "DFormCustom"
   * {
   *   type: "DForm",
   *   onlyChildren: ["DFormCustom"]
   * }
   */
   onlyChildren?: string[];
   /**
   * 当前页面只允许放一个这个组件
   */
  onlyOnce?:boolean,
}

export interface FunctionDefine {
  // 函数唯一标识
  type: string;
  // 函数名称
  name: string;
  // 函数描述
  description?: string;
  // 函数文档
  docs?: string;
  // 分组名字
  groupsName?: string | string[];
}
