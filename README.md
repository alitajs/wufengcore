# @wufengteam/core

## 组件组册

```ts
import { Button } from 'xxx';

const platform = 'pc'; // or h5 手动指定注册的平台，留空使用默认。

wufengController.registerComponent(
  Button,
  {
    todoProps: {},
    label: '按钮',
    type: 'Button',
    description: '描述',
    image: '展示大图',
    groupsName: '容器',
    todoStyles: {},
    todoEvents: [],
    todoActionList: [],
    props: {},
  },
  platform,
);
```

## 组件使用

### 获取配置

```ts
const platform = 'pc'; // or h5 手动指定注册的平台，留空使用默认。
const config = wufengController.getComponentConfigByType('Button', platform);

// 这里单纯的取到配置数据，用于项目中的数据流传递
pageData.push({ ...config, id: 12312 });
```

### 获取组件

```tsx
const config = findItem(pageData, (i) => i.id === id);
const Button = wufengController.getComponentByType(
  config.type,
  config.platform,
);
// 这里单纯的取到渲染的组件 Dom，用于项目中的组件渲染
return <Button />;
```

## 设置当前注册器平台

组件增加 platform 属性，优先级最高，次一次取调用 api 传入的 platform，最后兜底取默认的 wufengController.platform

```ts
wufengController.setPlatform('h5'); // 切换 pc 和 h5
```
