import type { Component, FunctionDefine, Input } from './types';
import type { ObjectCustomSchema } from './schema';
import { schemaComponent, schemaInput, schemaFunction } from './schema';
// @ts-ignore
import { version } from '../package.json';

export const isBrowser = typeof window !== 'undefined';

export function findItem<T = any>(
  target: T[],
  callback: (item: T, index: number, list: T[]) => boolean,
) {
  const list = target;
  // Makes sures is always has an positive integer as length.
  // eslint-disable-next-line
  const length = list.length >>> 0;
  // eslint-disable-next-line
  const thisArg = arguments[1];
  for (let i = 0; i < length; ) {
    const element = list[i];
    if (callback.call(thisArg, element, i, list)) {
      return element;
    }
    i += 1;
  }
  return null;
}

type Subscription<T> = (val: T) => void;

export class WuFeng {
  constructor() {
    if (WuFeng.singletonInstance) {
      return WuFeng.singletonInstance;
    }
  }

  static singletonInstance: WuFeng;
  public subscriptions = {};

  public emit = (type: string, val: any) => {
    console.log(this.subscriptions);
    if (!this.subscriptions[type]) {
      console.log('init subscriptions on emit');

      this.subscriptions[type] = new Set<Subscription<any>>();
    }
    for (const subscription of this.subscriptions[type]) {
      subscription(val);
    }
  };

  public useSubscription = (type: string, callback: Subscription<any>) => {
    function subscription(val: any) {
      if (callback) {
        callback(val);
      }
    }
    if (!this.subscriptions[type]) {
      console.log('init subscriptions on useSubscription');
      this.subscriptions[type] = new Set<Subscription<any>>();
    }
    console.log(this.subscriptions);
    this.subscriptions[type].add(subscription);
  };

  // 组件 options 校验  const { error } = schemaComponent.validate({})
  public schemaComponent: ObjectCustomSchema<Component> = schemaComponent;
  // 属性编辑器 options 校验  const { error } = schemaInput.validate({})
  public schemaInput: ObjectCustomSchema<Input> = schemaInput;
  // 函数计算支持的函数校验
  public schemaFunction: ObjectCustomSchema<FunctionDefine> = schemaFunction;

  public VERSION = version;
  // 展示的所有组件
  public components: Component[] = [];
  public mobileComponents: Component[] = [];
  // public pcComponents: Component[] = [];
  // class 真实的值
  public componentClass: object = {};

  // 右侧编辑的表单类型，有一个组件的属性是一些特定的操作，比如选择云上的图片，就不是简单的 input
  public inputComponents: Input[] = [];

  // 函数计算支持的函数定义和现实
  public functions: Record<
    string,
    { spec: FunctionDefine; implementation: any }
  > = {};

  // 所有需要翻译的标签
  public labels: any = {};

  // 所有需要翻译的标签
  public actions: any = {};

  // 图标
  public icons: any = {};

  // 默认国际化为中文 https://en.wikipedia.org/wiki/IETF_language_tag
  public local: string = 'zh-CN';

  // pc or h5
  public platform: string = 'pc';

  public findLabel(key: string, local?: string) {
    if (
      this.labels[local || this.local] &&
      this.labels[local || this.local][key]
    ) {
      return this.labels[local || this.local][key];
    }
    return key;
  }

  public setLang(local: string) {
    this.local = local;
  }

  public setPlatform(platform: string) {
    this.platform = platform;
  }

  // children: '内容',
  public registerLabels(key: any, value: string, local?: string) {
    this.labels[local || this.local][key] = value;
  }

  public pushLabels(labels: object, local: string = 'zh-CN') {
    this.labels[local] = { ...this.labels[local], ...labels };
  }

  public registerIcons(key: any, value: any) {
    this.icons[key] = value;
  }

  public pushIcons(icons: object) {
    this.icons = { ...this.icons, ...icons };
  }

  public getIconByType(type: string) {
    return this.icons[type];
  }
  /**
   * 运行时注册，可以简化配置，不用理会编辑器配置
   * @param type
   * @param action
   * @returns
   */
  public registerAction(type: string, action?: (params?: any) => Promise<any>) {
    if (this.actions[type]) {
      console.log(`事件 [ ${type} ] 已存在，已被在此覆盖注册，请确认\n`);
    }
    this.actions[type] = action;
    return null;
  }

  /**
   * 获取存在的事件
   * @param type
   * @returns
   */
  public getAction(type: string, params?: any): Promise<any> {
    if (!this.actions[type]) {
      console.warn(`事件 [ ${type} ] 未找到，请检查您的<事件>注册函数\n`);
      return new Promise((resolve) => {
        resolve(null);
      });
    }
    return new Promise((resolve) => {
      this.actions[type](params).then(
        (res: any) => {
          resolve(res);
        },
        (error: any) => {
          console.warn(error);
          // TODO: 底层 reject 数据是否透传到顶层？
          resolve(null);
        },
      );
    });
  }

  /**
   * 运行时注册，可以简化配置，不用理会编辑器配置
   * @param component
   * @param type
   * @param platform
   * @returns
   */
  public registerRuntimeComponent(
    component: any,
    type: string,
    platform?: string,
  ) {
    if (!component) {
      console.warn(`组件 [ ${type} ] 未找到，请检查您的<组件>构建程序\n`);
      return { message: '组件未找到' };
    }
    // 单独存放组件文件
    this.componentClass[`${platform || this.platform}${type}`] = component;
    return null;
  }

  public registerComponent(
    component: any,
    options: Component,
    platform?: string,
  ) {
    if (!component) {
      console.warn(
        `组件 [ ${options.type} ] 未找到，请检查您的<组件>构建程序\n`,
      );
      return { message: '组件未找到' };
    }
    const { error } = schemaComponent.validate(options);
    if (error) {
      console.warn(
        `组件 [ ${options.type} ] 注册信息错误，请检查您的 options:\n`,
      );
      console.error(error);
      return error;
    }
    const plat = options.platform || platform || this.platform;
    // 单独存放组件文件
    this.componentClass[`${plat}${options.type}`] = component;
    const spec = {
      platform: plat,
      ...options,
    };
    this.addComponent(spec, plat);
    return null;
  }

  public registerInput(component: any, options: Input) {
    if (!component) {
      console.warn(
        `属性编辑器 [ ${options.type} ] 未找到，请检查您的<属性编辑器>构建程序\n`,
      );
      return { message: '组件未找到' };
    }
    const { error } = schemaInput.validate(options);
    if (error) {
      console.warn(
        `属性编辑器 [ ${options.type} ] 注册信息错误，请检查您的 options:\n`,
      );
      console.error(error);
      return error;
    }
    // 单独存放组件文件
    this.componentClass[`inputs${options.type}`] = component;
    this.addInputComponent(options);
    return null;
  }

  public registerFunction(implementation: any, spec: FunctionDefine) {
    if (!implementation) {
      console.warn(`函数 [${spec.type}] 实现为空`);
      return { message: `函数 [${spec.type}] 实现为空` };
    }
    const { error } = schemaFunction.validate(spec);
    if (error) {
      console.warn(`函数 [${spec.type}] 注册信息错误, 请检查 spec`);
      console.error(error);
      return error;
    }
    const current = this.functions[spec.type];
    if (current) {
      console.warn(`函数 [${spec.type}] 已注册`);
      return { messge: `函数 [${spec.type}] 已注册` };
    }
    this.functions[spec.type] = { spec, implementation };
    return null;
  }

  private addComponent(component: Component, platform: string) {
    const components =
      platform === 'pc' ? this.components : this.mobileComponents;
    const current = findItem(
      components,
      (item) => item.type === component.type,
    );
    if (current) {
      console.warn(`组件 [ ${component.type} ] 被重复注册，请检查您注册的组件`);
      components.splice(components.indexOf(current), 1, component);
    } else {
      components.push(component);
    }
  }

  private addInputComponent(component: Input) {
    const current = findItem(
      this.inputComponents,
      (item) => item.type === component.type,
    );
    if (current) {
      console.warn(
        `属性编辑器 [ ${component.type} ] 被重复注册，请检查您注册的属性编辑器`,
      );
      this.inputComponents.splice(
        this.inputComponents.indexOf(current),
        1,
        component,
      );
    } else {
      this.inputComponents.push(component);
    }
  }
  public getComponentByType(type: string, platform?: string) {
    return this.componentClass[`${platform || this.platform}${type}`];
  }
  // TODO: 目测是无用接口，确认真实无用可删除
  public getComponentConfigByType(type: string, platform?: string) {
    const nowPlatform = platform ?? this.platform;
    return findItem(
      nowPlatform === 'pc' ? this.components : this.mobileComponents,
      (item) => item.type === type,
    );
  }

  public getInputByType(type: string) {
    return this.componentClass[`inputs${type}`];
  }
  public getInputConfigByType(type: string) {
    return findItem(this.inputComponents, (item) => item.type === type);
  }

  public getFunctionByType(type: string) {
    return this.functions[type].implementation;
  }
  public getFunctionConfigByType(type: string) {
    return this.functions[type].spec;
  }
}

// eslint-disable-next-line
let wufeng: WuFeng;
if ((window as any).wufengController) {
  wufeng = (window as any).wufengController;
} else {
  wufeng = new WuFeng();
}
WuFeng.singletonInstance = wufeng;

// 将注册器挂载在全局，方便多个地方同时注册
(window as any).wufengController = wufeng;
export { wufeng as wufengController };
