declare global {
  interface Window {
    grecaptcha: any;
  }
}

// See https://stackoverflow.com/questions/47130406/extending-global-types-e-g-window-inside-a-typescript-module
export {};
