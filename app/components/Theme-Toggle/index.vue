<script setup lang="ts">
import { computed } from "vue";

// TypeScript type for SwapIcon component props
type SwapIconProps = {
  primaryIcon?: string;
  secondaryIcon?: string;
  iconSize?: string | number;
  ariaLabel?: string;
  class?: string;
};

// Define props with validation and default values
const props = withDefaults(defineProps<SwapIconProps>(), {
  primaryIcon: "tabler:sun",
  secondaryIcon: "tabler:moon-stars",
  iconSize: "30",
  ariaLabel: "Toggle theme",
});

// Compute classes to combine default swap classes with custom classes
const computedClasses = computed(() => {
  const baseClasses = "swap swap-rotate";
  return props.class ? `${baseClasses} ${props.class}` : baseClasses;
});
</script>

<template>
  <label :class="computedClasses" :aria-label="ariaLabel">
    <input type="checkbox" class="sr-only">

    <!-- Primary Icon (On State) -->
    <div class="swap-on">
      <slot name="primaryIcon">
        <Icon :name="primaryIcon" :size="iconSize" />
      </slot>
    </div>

    <!-- Secondary Icon (Off State) -->
    <div class="swap-off">
      <slot name="secondaryIcon">
        <Icon :name="secondaryIcon" :size="iconSize" />
      </slot>
    </div>
  </label>
</template>
