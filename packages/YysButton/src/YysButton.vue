<template>
  <div class="yys-button">
    <el-button>
      <slot></slot>
    </el-button>
    <el-input
      type="text"
      placeholder="Please input text"
      v-model="text"
    ></el-input>
  </div>
</template>

<script lang="ts">
// 按需引入element button作为基础组件
import { Button, Input } from "element-ui";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {
    [Button.name]: Button,
    [Input.name]: Input,
  },
})
/**
 * 类名将会被用于组件名
 */
export default class YysButton extends Vue {
  text: string = "";
}
</script>
