import HelloButton from "./HelloButton";

const install = (vue: any, opts = {}) => {
  vue.use(HelloButton);
};

export { install };
