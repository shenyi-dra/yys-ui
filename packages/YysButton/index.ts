import YysButton from "./src/YysButton.vue";

YysButton.install = (vue: any) => {
  vue.component(YysButton.name || "YysButton", YysButton);
};

export default YysButton;
