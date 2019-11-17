import Vue, { PluginObject } from "vue";

/** ElementUI component common definition */
export class YysUIComponent extends Vue {
  /** Install component into Vue */
  static install(vue: typeof Vue): void;
}

/** Component size definition for button, input, etc */
export type YysUIComponentSize = "large" | "medium" | "small" | "mini";

/** Horizontal alignment */
export type YysUIHorizontalAlignment = "left" | "center" | "right";

declare module "vue/types/vue" {
  // tslint:disable-next-line: interface-name
  interface Vue {
    install(vue: Vue): void;
    // $options: VueConstructor
  }

  // tslint:disable-next-line: interface-name
  interface VueConstructor {
    install(vue: VueConstructor): void;
  }
}
