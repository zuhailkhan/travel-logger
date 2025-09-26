<script setup lang="ts">
import { computed } from "vue";

import type { SwapIconProps } from "~/types/types";

const props = withDefaults(defineProps<SwapIconProps>(), {
  primaryIcon: "tabler:sun",
  secondaryIcon: "tabler:moon-stars",
  iconSize: "30",
  ariaLabel: "Toggle theme",
});

const colorMode = useColorMode();

const computedClasses = computed(() => {
  const baseClasses = "swap swap-rotate";
  return props.class ? `${baseClasses} ${props.class}` : baseClasses;
});

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(value) {
    colorMode.preference = value ? "dark" : "light";
  },
});
</script>

<template>
  <label :class="computedClasses" :aria-label="ariaLabel">
    <input
      v-model="isDark"
      type="checkbox"
      class="sr-only"
    >

    <div class="swap-on">
      <slot name="primaryIcon">
        <Icon :name="primaryIcon" :size="iconSize" />
      </slot>
    </div>

    <div class="swap-off">
      <slot name="secondaryIcon">
        <Icon :name="secondaryIcon" :size="iconSize" />
      </slot>
    </div>
  </label>
</template>
