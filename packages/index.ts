import YysButton from "./YysButton";

const components = [YysButton];

const install = (vue: any, opts = {}) => {
  // Apply element
  components.forEach(component => {
    vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export { YysButton, install };

export default {
  YysButton,
  install,
};
