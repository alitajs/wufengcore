import { schemaInput, schemaComponent } from './index';

test('schemaInput error', async () => {
  // @ts-ignore
  const { error } = schemaInput.validate({ type: 1994 });
  expect(error?.message).toBe('"type" must be a string');
});

test('schemaInput success', async () => {
  const { error } = schemaInput.validate({
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

test('schemaComponent success', async () => {
  const { error } = schemaComponent.validate({
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
        defaultValue: '',
      },
    },
    label: '按钮',
    type: 'Button',
    compType: 99,
    description: '',
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
  });
  expect(error?.message).toBe(undefined);
});
