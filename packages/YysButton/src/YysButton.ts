// 引入element button作为基础组件
import { Button, Input } from "element-ui";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {
    [Button.name]: Button,
    [Input.name]: Input,
  },
})
export default class YysButton extends Vue {
  text: string = "";
}
