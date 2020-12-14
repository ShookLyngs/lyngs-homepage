import merge from "@lyngs/merge";
export default (context) => {
  return {
    type: 'result',
    usable: true,
    data: merge({}, context),
  };
};