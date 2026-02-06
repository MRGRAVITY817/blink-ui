import "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "bl-button": any;
      "bl-card": any;
      "bl-input": any;
      "bl-badge": any;
      "bl-alert": any;
    }
  }
}
