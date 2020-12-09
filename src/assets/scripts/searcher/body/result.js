import merge from "@lyngs/merge";
export default (context) => {
  return {
    type: 'result',
    usable: true,
    get: () => merge({}, context),
  };
};