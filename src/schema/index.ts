import Joi from '@alita/joi';
import type {
  ObjectSchema,
  ValidationResult,
  ValidationOptions,
  AsyncValidationOptions,
} from '@alita/joi';
import type { Input, Component, FunctionDefine } from '../types';

// 扩展 Joi 的类型定义，校验值的时候，可以有智能提醒，可以在编写代码的时候就提示错误
interface ObjectCustomSchema<TSchema = any> extends ObjectSchema<TSchema> {
  // eslint-disable-next-line
  validate(
    value: TSchema,
    options?: ValidationOptions,
  ): ValidationResult<TSchema>;
  // eslint-disable-next-line
  validateAsync(value: TSchema, options?: AsyncValidationOptions): Promise<any>;
}

const schemaInput = Joi.object({
  /**
   * 类型，唯一标识，类型重复无法注册
   */
  type: Joi.string(),
  /**
   * 是否允许绑定数据源
   */
  istodoBind: Joi.boolean(),
  /**
   * 显示给用户的文本
   */
  label: Joi.string(),
  /**
   * 分组名称，直接按字符匹配分组，便于直接扩展
   */
  groupsName: Joi.string(),
  /**
   * 值校验规则，正则表达式
   */
  rules: Joi.array().items(Joi.string()),
  /**
   * 直接透传给属性编辑器的属性，用于属性编辑器的复用情况
   */
  props: Joi.object(),
  /**
   * 属性编辑器的默认值
   */
  defaultValue: Joi.any(),
  /**
   * 标记这个设置器最终修改的属性对象，比如可能展示的时候，是在 todoStyle 中，但是修改的是属性的 props 值
   */
  targetType: Joi.string().valid('props', 'styles'),
  /**
   * 属性变化前的hook，可以操作当前节点的字段。
   */
  onBeforeChange: Joi.func(),
  /**
   * 组件是否自带 Form.Item
   */
  hasFormItem: Joi.boolean(),
  /*
   * 设置器在面板中展示的位置
   */
  position: Joi.string().valid('normal', 'left', 'right'),
}) as ObjectSchema<Input>;

const schemaComponent = Joi.object({
  /**
   * 类型，唯一标识，类型重复无法注册
   */
  type: Joi.string(),
  /**
   * 组件名称
   */
  label: Joi.string(),
  /**
   * 组件关联平台，这里定义的优先级最高
   */
  platform: Joi.string(),
  /**
   *  组件类型  0：容器  1：通用  2：数据录入  3：数据展示 4：反馈  5：导航  6：布局 7:图标  99:订阅组件
   */
  compType: Joi.number().valid(0, 1, 2, 3, 4, 5, 6, 7, 88, 99),
  /**
   * 基础组件使用较多，组件所在库标识
   */
  compLib: Joi.string(),
  /**
   * 组件允许编辑的所有属性
   */
  todoProps: Joi.object().pattern(Joi.string(), schemaInput),
  /**
   * 组件的所有属性默认值，包括允许编排的属性和其他属性
   */
  props: Joi.object(),
  /**
   * 允许编辑的所有样式
   */
  todoStyles: Joi.object().pattern(Joi.string(), schemaInput),
  /**
   * 组件的所有样式默认值，包括允许编排的样式和其他样式
   */
  style: Joi.object(),
  /**
   * 是否为容器组件
   */
  isContainer: Joi.boolean(),
  /**
   * 标识为 InlineBlock 布局，编辑器需要特殊处理
   * 比如 拖入一个文本，会默认占用一行，需要修改外层容器的样式
   */
  isInlineBlock: Joi.boolean(),
  /**
   * 是否可以放置业务对象
   */
  isBusiObjContainer: Joi.boolean(),
  /**
   * 是App表单子项
   */
  isAppChildForm: Joi.boolean(),
  /**
   * 组件详情，用于 card 显示，或资产商店说明
   */
  description: Joi.string().empty(''),
  /**
   * 组件大图
   */
  image: Joi.string().empty(''),
  /**
   * 左侧编辑时，配套显示的 icon
   * 允许直接写 http:// 和 icon type
   */
  icon: Joi.string().empty(''),
  /**
   * 分组名称，直接按字符匹配分组，便于直接扩展
   */
  groupsName: Joi.string(),
  /**
   * 允许编辑的事件
   */
  todoEvents: Joi.array().items(Joi.any()),
  /**
   * 初始化时默认绑定的事件
   */
  setEvents: Joi.array().items(Joi.any()),
  /**
   * 组件暴露的所有事件
   */
  todoActionList: Joi.array().items(Joi.string()),
  /**
   * 需要对标的 api，比如编辑器中配置 button 的 value，真实的 button 值属性是 children
   * transform: {
   * // 需要翻译的字段名称
   * value: 'children',
   * },
   */
  transform: Joi.object(),
  /**
   * 子组件，用于组合组件
   */
  components: Joi.any(),
  /**
   * 大概率和 components 一样只是取个别名
   */
  children: Joi.any(),
  /**
   * app校验字段
   */
  validator: Joi.any(),
  /**
   * 允许用户自定义事件，可能没用，待确认
   */
  customEvent: Joi.boolean(),
  /**
   * 标记组件能够存放的父级元素
   * DFormCustom 的父级容器只能是 "DForm", "DGroup"
   * {
   *   type: "DFormCustom",
   *   onlyRoot: ["DForm", "DGroup"]
   * }
   */
  onlyRoot: Joi.array().items(Joi.string()),
}) as ObjectCustomSchema<Component>;

const schemaFunction = Joi.object({
  /**
   * 函数名称，唯一标识
   */
  type: Joi.string(),
  /**
   * 暂时跟 type 一样
   */
  name: Joi.string(),
  /**
   * 函数简单描述
   */
  description: Joi.string(),
  /**
   * 函数文档
   */
  docs: Joi.string().empty(''),
  /**
   * 函数分组名字，如果属于多个分组可以用数组
   */
  groupsName: [Joi.string(), Joi.array().items(Joi.string())],
}) as ObjectCustomSchema<FunctionDefine>;

export { schemaComponent, schemaInput, schemaFunction, ObjectCustomSchema };
