import { wufengController } from './index';

test('inputComponents', () => {
  wufengController.registerInput(
    {},
    {
      type: 'select',
      istodoBind: true,
      label: 'jiaobu',
      groupsName: '基础',
      rules: [],
      props: {
        min: '',
        max: '',
        label: '名称',
        options: [],
        dependProps: {},
        inhibitBtn: 'true',
      },
      defaultValue: '',
    },
  );
  const current = wufengController.getInputConfigByType('select');
  expect(current?.type).toBe('select');
});

test('inputComponents error', () => {
  const a = wufengController.registerInput({}, {
    type: 'abc',
    istodoBind: true,
    label: 'jiaobu',
    abc: '基础',
    rules: [],
    props: {
      min: '',
      max: '',
      label: '名称',
      options: [],
      dependProps: {},
      inhibitBtn: 'true',
    },
    defaultValue: '',
  } as any);
  const current = wufengController.getInputConfigByType('abc');
  expect(current).toBe(null);
  expect(a?.message).toBe('"abc" is not allowed');
});

test('Components', () => {
  wufengController.registerComponent(
    {},
    {
      todoProps: {
        footer: {
          type: 'select',
          istodoBind: true,
          label: 'jiaobu',
          groupsName: '基础',
          rules: [],
          props: {
            min: '',
            max: '',
            label: '名称',
            options: [],
            dependProps: {},
            inhibitBtn: 'true',
          },
        },
      },
      label: '按钮',
      type: 'Button',
      description: '描述',
      image: '展示大图',
      groupsName: '容器',
      todoStyles: {
        themeColor: {
          type: 'ColorPicker',
          label: '颜色选择器',
          defaultValue: {},
          props: { options: [] },
        },
      },
      todoEvents: [
        {
          label: '值改变时回调',
          value: 'onChange',
          params: [{ title: '变化值', value: '$e.target.value$', name: 'vals' }],
        },
      ],
      todoActionList: ['setMobileValue'],
      props: {
        header: 'a123',
      },
    },
  );
  const current = wufengController.getComponentConfigByType('Button');
  expect(current?.description).toBe('描述');
});

test('label setLang', () => {
  const defaultLabels = {
    type: '类型',
  };
  wufengController.pushLabels(defaultLabels, 'zh-CN');
  const text = wufengController.findLabel('type');
  expect(text).toBe('类型');
  wufengController.pushLabels(
    {
      type: 'Type text',
    },
    'en-UK',
  );
  wufengController.setLang('en-UK');
  const current = wufengController.findLabel('type');
  expect(current).toBe('Type text');
});

test('schemaInput success', async () => {
  const { error } = wufengController.schemaInput.validate({
    type: 'select',
    istodoBind: true,
    label: 'jiaobu',
    groupsName: '基础',
    rules: [],
    props: {
      min: '',
      max: '',
      label: '名称',
      options: [],
      dependProps: {},
      inhibitBtn: 'true',
    },
    defaultValue: '',
  });
  expect(error?.message).toBe(undefined);
});
