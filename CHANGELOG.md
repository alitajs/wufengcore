# Change Log
## 2.7.14

增加订阅服务

## 2.7.13

### Patch Changes

- chore: vp

## 2.7.12

### Patch Changes

- 9177d994: 低零融合接口路径调整
- c7c6d5ae: 目录切换新接口

## 2.7.11

### Patch Changes

- fix: register again warn

## 2.7.10

### Patch Changes

- feat: add setting position

## 2.7.9

### Patch Changes

- chore: vp

## 2.7.8

### Patch Changes

- chore: vp

## 2.7.7

### Patch Changes

- chore: vp

## 2.7.6

### Patch Changes

- 9ef873b3: feat: 增加 compType 组件类型为仪表组件的定义

## 2.7.5

### Patch Changes

- feat: input add hasFormItem

## 2.7.4

### Patch Changes

- chore: vp

## 2.7.3

### Patch Changes

- chore: vp

## 2.7.2

### Patch Changes

- chore: vp

## 2.7.1

### Patch Changes

- chore: vp

## 2.7.0

### Minor Changes

- chore: vp

## 2.6.5

### Patch Changes

- chore: vp

## 2.6.2

### Patch Changes

- f4b86ce2: chore: vp

## 2.6.1

### Patch Changes

- chore: vp

## 2.6.0

### Minor Changes

- feat: support ie

## 2.5.9

### Patch Changes

- feat: support ie

## 2.5.8

### Patch Changes

- chore: vp

## 2.5.7

### Patch Changes

- 2ec03b4: feat: support browser
- 623fb6d: 添加函数计算

## 2.5.6

### Patch Changes

- chore: vp

## 2.5.5

### Patch Changes

- chore: vp

## 2.5.4

### Patch Changes

- chore: vp

## 2.5.3

### Patch Changes

- chore: vp

## 2.5.2

### Patch Changes

- chore: vp
- chore: vp

## 2.5.1

### Patch Changes

- chore: vp

## 2.5.0

### Minor Changes

- chore: vp

## 2.4.8

### Patch Changes

- feat: add children

## 2.4.7

### Patch Changes

- chore: vp

## 2.4.6

### Patch Changes

- chore: code types

## 2.4.5

### Patch Changes

- feat: add targetType

## 2.4.4

### Patch Changes

- 9b5fbbe: feat: version

## 2.4.3

### Patch Changes

- fix: moment

## 2.4.2

### Patch Changes

- 6a78e44: chore: compType add 7

## 2.4.1

### Patch Changes

- 2ef3f45: feat: cloud components

## 2.4.0

### Minor Changes

- 8219b5a: fix: core working in browser

## 2.3.0

### Minor Changes

- 2d39381: feat: add register actions

### Patch Changes

- 8bda813: feat: add loadable component

## 2.2.0

### Minor Changes

- 478600f: feat: register icons

### Patch Changes

- 4364c77: fix: core setEvents schema
- chore: add isInlineBlock

## 2.1.2

### Patch Changes

- feat: core 增加 platform

## 2.1.1

### Patch Changes

- 7760c32: feat: 组件规则修改

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 2.1.0 (2022-02-22)

### Features

- changeset ([d0c5c94](https://git-nj.iwhalecloud.com/zerocodeplatformtest/nocode/commits/d0c5c944cbf4deec1e3ccb7e2833f862e3ee6cca))
- core schema ([513db23](https://git-nj.iwhalecloud.com/zerocodeplatformtest/nocode/commits/513db23b92623631964990187b67369140edfaf9))
- init wufeng core ([acd14b0](https://git-nj.iwhalecloud.com/zerocodeplatformtest/nocode/commits/acd14b029810ae163209770440bcd3a9a180a632))
- version packages ([6c5a951](https://git-nj.iwhalecloud.com/zerocodeplatformtest/nocode/commits/6c5a9518e47f199faf5ec75595589a3096439205))
- wufeng core ([515296d](https://git-nj.iwhalecloud.com/zerocodeplatformtest/nocode/commits/515296df05d6e9b8c7d22d727b2bc3a43d4532ba))

# @wufengteam/core

## 2.0.0

### Major Changes

- 8c058f1: feat: 增加统一注册中心的校验规则，不仅仅是 types 层面的校验，加入 joi 校验，在 js 环境中也保持校验有效。

  1、注册时自动校验 2、手动使用 schemaComponent 和 schemaInput

  ```
  const { error } = wufengController.schemaComponent.validate(options);
  ```

- acd14b0: feat: 根据低代码的规则修改中心注册器的定义

## 1.1.1

### Patch Changes

- init changeset
