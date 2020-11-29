
const name = 'translator';
const matcher = /^[a-zA-Z\s]+\s+翻译$/;

export default {
  name,
  weight: 10,
  match(context) {
    return matcher.test(context.input);
  },
  prefix: {
    buttons: [
      {
        icon: 'icon-calculator',
        // in this function, we should set current module as default searcher
        onClick(context) {
          context.searcher.setDefault('calculator');
        },
        tooltip(context) {

        },
      },
    ],
  },
  content: {
    template: '{result}',
    fill(template, context) {
      return template.replace('{result}', context.calculator.data.result);
    },
  },
  suffix: {
    buttons: [
      {
        icon: 'icon-switch',
        // in this function, we should copy the result of calculation
        onClick(context) {
          console.log(context);
          context.caller.$notify('已将计算结果复制到剪切板');
        },
      },
    ],
  },
  input: {

  },
  listItem: {

  },
};