import { Modifiers } from "@/types/modifiers";
// import { VNode } from "vue";

interface Binding {
  arg?: string;
  value: Modifiers;
}

export default (el: HTMLElement, binding: Binding) => {
  // if (!vnode.context.originalClass) {
  //   vnode.context.originalClass = el.className;
  // }

  const baseClass = binding.arg || "class";
  const modifierInput = binding.value;

  let modifiers: string[] = [];

  if (modifierInput) {
    if (typeof modifierInput === "string") {
      modifiers.push(modifierInput);
    } else if (typeof modifierInput === "object") {
      if (Array.isArray(modifierInput)) {
        modifiers = modifierInput;
      } else {
        modifiers = Object.keys(modifierInput).reduce(
          (acc: string[], key: string) => {
            let modValue = modifierInput[key];
            if (typeof modValue === "function") {
              modValue = modValue();
            }

            if (modValue === true) {
              acc.push(key);
            } else if (typeof modValue === "string") {
              acc.push(modValue);
            }

            return acc;
          },
          []
        );
      }
    }

    modifiers.map((modifier) => el.classList.add(`${baseClass}--${modifier}`));
  }

  el.className = modifiers.join(" ");
};
