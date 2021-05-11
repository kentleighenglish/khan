import Vue from "vue";
import { Modifiers } from "@/types/modifiers";

Vue.directive("modifiers", (el, binding) => {
  const baseClass = binding.arg || "class";
  const modifierInput: Modifiers = binding.value;

  let modifiers: string[] = [];

  if (modifierInput) {
    if (typeof modifierInput === "string") {
      modifiers.push(modifierInput);
    } else if (typeof modifierInput === "object") {
      modifiers = modifiers.concat(
        Array.isArray(modifierInput)
          ? modifierInput
          : Object.keys(modifierInput).reduce((acc: string[], key: string) => {
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
            }, [])
      );
    }
  }

  el.classList.add(
    baseClass,
    ...modifiers.map((modifier: string) => `${baseClass}--${modifier}`)
  );
});
