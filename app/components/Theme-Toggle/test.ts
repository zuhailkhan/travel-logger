import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import SwapIcon from "./index.vue";

// Mock the Icon component since it's from @nuxt/icon
const IconMock = {
  name: "Icon",
  props: ["name", "size"],
  template: "<span :data-icon=\"name\" :data-size=\"size\">{{ name }}</span>",
};

describe("swapIcon - default rendering", () => {
  it("should render with default sun/moon icons when no props are provided", () => {
    const wrapper = mount(SwapIcon, {
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    // Check default icons are rendered
    const primaryIcon = wrapper.find(".swap-on [data-icon=\"tabler:sun\"]");
    const secondaryIcon = wrapper.find(".swap-off [data-icon=\"tabler:moon-stars\"]");

    expect(primaryIcon.exists()).toBe(true);
    expect(secondaryIcon.exists()).toBe(true);
    expect(primaryIcon.attributes("data-size")).toBe("30");
    expect(secondaryIcon.attributes("data-size")).toBe("30");
  });

  it("should render with proper component structure", () => {
    const wrapper = mount(SwapIcon, {
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    // Check component structure
    const label = wrapper.find("label");
    const checkbox = wrapper.find("input[type=\"checkbox\"]");
    const swapOn = wrapper.find(".swap-on");
    const swapOff = wrapper.find(".swap-off");

    expect(label.exists()).toBe(true);
    expect(checkbox.exists()).toBe(true);
    expect(swapOn.exists()).toBe(true);
    expect(swapOff.exists()).toBe(true);

    // Check default classes
    expect(label.classes()).toContain("swap");
    expect(label.classes()).toContain("swap-rotate");
    expect(checkbox.classes()).toContain("sr-only");
  });

  it("should render with default aria-label", () => {
    const wrapper = mount(SwapIcon, {
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const label = wrapper.find("label");
    expect(label.attributes("aria-label")).toBe("Toggle theme");
  });
});

describe("swapIcon - custom prop configuration", () => {
  it("should use custom primaryIcon prop", () => {
    const wrapper = mount(SwapIcon, {
      props: {
        primaryIcon: "tabler:brightness-up",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const primaryIcon = wrapper.find(".swap-on [data-icon=\"tabler:brightness-up\"]");
    expect(primaryIcon.exists()).toBe(true);

    // Secondary should still use default
    const secondaryIcon = wrapper.find(".swap-off [data-icon=\"tabler:moon-stars\"]");
    expect(secondaryIcon.exists()).toBe(true);
  });

  it("should use custom secondaryIcon prop", () => {
    const wrapper = mount(SwapIcon, {
      props: {
        secondaryIcon: "tabler:moon",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const secondaryIcon = wrapper.find(".swap-off [data-icon=\"tabler:moon\"]");
    expect(secondaryIcon.exists()).toBe(true);

    // Primary should still use default
    const primaryIcon = wrapper.find(".swap-on [data-icon=\"tabler:sun\"]");
    expect(primaryIcon.exists()).toBe(true);
  });

  it("should use custom iconSize prop for both icons", () => {
    const wrapper = mount(SwapIcon, {
      props: {
        iconSize: "24",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const primaryIcon = wrapper.find(".swap-on [data-icon=\"tabler:sun\"]");
    const secondaryIcon = wrapper.find(".swap-off [data-icon=\"tabler:moon-stars\"]");

    expect(primaryIcon.attributes("data-size")).toBe("24");
    expect(secondaryIcon.attributes("data-size")).toBe("24");
  });

  it("should accept numeric iconSize prop", () => {
    const wrapper = mount(SwapIcon, {
      props: {
        iconSize: 32,
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const primaryIcon = wrapper.find(".swap-on [data-icon=\"tabler:sun\"]");
    const secondaryIcon = wrapper.find(".swap-off [data-icon=\"tabler:moon-stars\"]");

    expect(primaryIcon.attributes("data-size")).toBe("32");
    expect(secondaryIcon.attributes("data-size")).toBe("32");
  });

  it("should use custom ariaLabel prop", () => {
    const wrapper = mount(SwapIcon, {
      props: {
        ariaLabel: "Switch display mode",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const label = wrapper.find("label");
    expect(label.attributes("aria-label")).toBe("Switch display mode");
  });

  it("should use all custom props together", () => {
    const wrapper = mount(SwapIcon, {
      props: {
        primaryIcon: "tabler:lightbulb",
        secondaryIcon: "tabler:lightbulb-off",
        iconSize: "28",
        ariaLabel: "Toggle light",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const label = wrapper.find("label");
    const primaryIcon = wrapper.find(".swap-on [data-icon=\"tabler:lightbulb\"]");
    const secondaryIcon = wrapper.find(".swap-off [data-icon=\"tabler:lightbulb-off\"]");

    expect(label.attributes("aria-label")).toBe("Toggle light");
    expect(primaryIcon.exists()).toBe(true);
    expect(secondaryIcon.exists()).toBe(true);
    expect(primaryIcon.attributes("data-size")).toBe("28");
    expect(secondaryIcon.attributes("data-size")).toBe("28");
  });
});

describe("swapIcon - slot override behavior", () => {
  it("should use slot content when primaryIcon slot is provided", () => {
    const wrapper = mount(SwapIcon, {
      props: {
        primaryIcon: "tabler:sun",
        secondaryIcon: "tabler:moon-stars",
      },
      slots: {
        primaryIcon: "<div class=\"custom-primary-icon\">Custom Primary</div>",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    // Check that slot content overrides prop for primary icon
    const customPrimaryIcon = wrapper.find(".swap-on .custom-primary-icon");
    expect(customPrimaryIcon.exists()).toBe(true);
    expect(customPrimaryIcon.text()).toBe("Custom Primary");

    // Check that prop is still used for secondary icon (no slot provided)
    const secondaryIcon = wrapper.find(".swap-off [data-icon=\"tabler:moon-stars\"]");
    expect(secondaryIcon.exists()).toBe(true);
  });

  it("should use slot content when secondaryIcon slot is provided", () => {
    const wrapper = mount(SwapIcon, {
      props: {
        primaryIcon: "tabler:sun",
        secondaryIcon: "tabler:moon-stars",
      },
      slots: {
        secondaryIcon: "<div class=\"custom-secondary-icon\">Custom Secondary</div>",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    // Check that prop is still used for primary icon (no slot provided)
    const primaryIcon = wrapper.find(".swap-on [data-icon=\"tabler:sun\"]");
    expect(primaryIcon.exists()).toBe(true);

    // Check that slot content overrides prop for secondary icon
    const customSecondaryIcon = wrapper.find(".swap-off .custom-secondary-icon");
    expect(customSecondaryIcon.exists()).toBe(true);
    expect(customSecondaryIcon.text()).toBe("Custom Secondary");
  });

  it("should use slot content for both icons when both slots are provided", () => {
    const wrapper = mount(SwapIcon, {
      props: {
        primaryIcon: "tabler:sun",
        secondaryIcon: "tabler:moon-stars",
      },
      slots: {
        primaryIcon: "<div class=\"custom-primary-icon\">Custom Primary</div>",
        secondaryIcon: "<div class=\"custom-secondary-icon\">Custom Secondary</div>",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    // Check that both slot contents override props
    const customPrimaryIcon = wrapper.find(".swap-on .custom-primary-icon");
    const customSecondaryIcon = wrapper.find(".swap-off .custom-secondary-icon");

    expect(customPrimaryIcon.exists()).toBe(true);
    expect(customPrimaryIcon.text()).toBe("Custom Primary");
    expect(customSecondaryIcon.exists()).toBe(true);
    expect(customSecondaryIcon.text()).toBe("Custom Secondary");

    // Ensure prop-based icons are not rendered
    const propPrimaryIcon = wrapper.find(".swap-on [data-icon=\"tabler:sun\"]");
    const propSecondaryIcon = wrapper.find(".swap-off [data-icon=\"tabler:moon-stars\"]");
    expect(propPrimaryIcon.exists()).toBe(false);
    expect(propSecondaryIcon.exists()).toBe(false);
  });

  it("should handle mixed slot/prop usage correctly", () => {
    const wrapper = mount(SwapIcon, {
      props: {
        primaryIcon: "tabler:custom-sun",
        secondaryIcon: "tabler:custom-moon",
        iconSize: "32",
      },
      slots: {
        primaryIcon: "<span class=\"slot-primary\">Slot Primary Icon</span>",
        // No secondaryIcon slot - should use prop
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    // Primary icon should use slot content
    const slotPrimary = wrapper.find(".swap-on .slot-primary");
    expect(slotPrimary.exists()).toBe(true);
    expect(slotPrimary.text()).toBe("Slot Primary Icon");

    // Secondary icon should use prop with correct size
    const propSecondary = wrapper.find(".swap-off [data-icon=\"tabler:custom-moon\"]");
    expect(propSecondary.exists()).toBe(true);
    expect(propSecondary.attributes("data-size")).toBe("32");

    // Ensure prop-based primary icon is not rendered
    const propPrimary = wrapper.find(".swap-on [data-icon=\"tabler:custom-sun\"]");
    expect(propPrimary.exists()).toBe(false);
  });

  it("should prioritize slots over props when both are provided", () => {
    const wrapper = mount(SwapIcon, {
      props: {
        primaryIcon: "tabler:sun",
        secondaryIcon: "tabler:moon-stars",
        iconSize: "30",
      },
      slots: {
        primaryIcon: "<svg class=\"slot-svg-primary\"><title>Slot Primary SVG</title></svg>",
        secondaryIcon: "<svg class=\"slot-svg-secondary\"><title>Slot Secondary SVG</title></svg>",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    // Slots should be used instead of props
    const slotPrimarySvg = wrapper.find(".swap-on .slot-svg-primary");
    const slotSecondarySvg = wrapper.find(".swap-off .slot-svg-secondary");
    expect(slotPrimarySvg.exists()).toBe(true);
    expect(slotSecondarySvg.exists()).toBe(true);

    // Props should not be rendered
    const propPrimary = wrapper.find(".swap-on [data-icon=\"tabler:sun\"]");
    const propSecondary = wrapper.find(".swap-off [data-icon=\"tabler:moon-stars\"]");
    expect(propPrimary.exists()).toBe(false);
    expect(propSecondary.exists()).toBe(false);
  });
});

describe("swapIcon - accessibility attributes", () => {
  it("should have proper ARIA label", () => {
    const wrapper = mount(SwapIcon, {
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const label = wrapper.find("label");
    expect(label.attributes("aria-label")).toBe("Toggle theme");
  });

  it("should use custom ARIA label when provided", () => {
    const wrapper = mount(SwapIcon, {
      props: {
        ariaLabel: "Switch between light and dark mode",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const label = wrapper.find("label");
    expect(label.attributes("aria-label")).toBe("Switch between light and dark mode");
  });

  it("should have hidden checkbox input for screen readers", () => {
    const wrapper = mount(SwapIcon, {
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const checkbox = wrapper.find("input[type=\"checkbox\"]");
    expect(checkbox.exists()).toBe(true);
    expect(checkbox.classes()).toContain("sr-only");
  });

  it("should be keyboard accessible through label-input association", () => {
    const wrapper = mount(SwapIcon, {
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const label = wrapper.find("label");
    const checkbox = wrapper.find("input[type=\"checkbox\"]");

    expect(label.exists()).toBe(true);
    expect(checkbox.exists()).toBe(true);

    // The checkbox should be inside the label for proper association
    expect(label.find("input[type=\"checkbox\"]").exists()).toBe(true);
  });

  it("should maintain accessibility with custom content", () => {
    const wrapper = mount(SwapIcon, {
      props: {
        ariaLabel: "Toggle display mode",
      },
      slots: {
        primaryIcon: "<div role=\"img\" aria-label=\"Light mode\">☀️</div>",
        secondaryIcon: "<div role=\"img\" aria-label=\"Dark mode\">🌙</div>",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const label = wrapper.find("label");
    const checkbox = wrapper.find("input[type=\"checkbox\"]");

    expect(label.attributes("aria-label")).toBe("Toggle display mode");
    expect(checkbox.classes()).toContain("sr-only");

    // Custom slot content should be preserved
    const lightModeIcon = wrapper.find("[aria-label=\"Light mode\"]");
    const darkModeIcon = wrapper.find("[aria-label=\"Dark mode\"]");
    expect(lightModeIcon.exists()).toBe(true);
    expect(darkModeIcon.exists()).toBe(true);
  });

  it("should support keyboard navigation", async () => {
    const wrapper = mount(SwapIcon, {
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const checkbox = wrapper.find("input[type=\"checkbox\"]");

    // Simulate keyboard interaction
    await checkbox.trigger("focus");

    // Simulate space key press (should toggle checkbox)
    await checkbox.trigger("keydown", { key: " " });
    await checkbox.trigger("change");

    // Component should still be functional
    expect(wrapper.find("label").exists()).toBe(true);
    expect(wrapper.find(".swap-on").exists()).toBe(true);
    expect(wrapper.find(".swap-off").exists()).toBe(true);
  });
});

describe("swapIcon - additional CSS class application", () => {
  it("should apply additional CSS classes through class prop", () => {
    const wrapper = mount(SwapIcon, {
      props: {
        class: "custom-class another-class",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const label = wrapper.find("label");
    expect(label.classes()).toContain("swap");
    expect(label.classes()).toContain("swap-rotate");
    expect(label.classes()).toContain("custom-class");
    expect(label.classes()).toContain("another-class");
  });

  it("should maintain default swap classes when no custom class is provided", () => {
    const wrapper = mount(SwapIcon, {
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const label = wrapper.find("label");
    expect(label.classes()).toContain("swap");
    expect(label.classes()).toContain("swap-rotate");
    expect(label.classes()).toHaveLength(2); // Only default classes
  });

  it("should preserve swap animation functionality with custom classes", () => {
    const wrapper = mount(SwapIcon, {
      props: {
        class: "bg-blue-500 rounded-lg p-2",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const label = wrapper.find("label");
    // Verify both default and custom classes are present
    expect(label.classes()).toContain("swap");
    expect(label.classes()).toContain("swap-rotate");
    expect(label.classes()).toContain("bg-blue-500");
    expect(label.classes()).toContain("rounded-lg");
    expect(label.classes()).toContain("p-2");

    // Verify swap structure is maintained
    const swapOn = wrapper.find(".swap-on");
    const swapOff = wrapper.find(".swap-off");
    const checkbox = wrapper.find("input[type=\"checkbox\"]");

    expect(swapOn.exists()).toBe(true);
    expect(swapOff.exists()).toBe(true);
    expect(checkbox.exists()).toBe(true);
    expect(checkbox.classes()).toContain("sr-only");
  });

  it("should maintain visual consistency with different custom class combinations", () => {
    const testCases = [
      "text-lg font-bold",
      "hover:bg-gray-100 transition-colors",
      "border border-gray-300 shadow-sm",
      "flex items-center justify-center",
    ];

    testCases.forEach((customClass) => {
      const wrapper = mount(SwapIcon, {
        props: {
          class: customClass,
        },
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const label = wrapper.find("label");
      // Always maintain core swap functionality
      expect(label.classes()).toContain("swap");
      expect(label.classes()).toContain("swap-rotate");

      // Custom classes should be applied
      customClass.split(" ").forEach((cls) => {
        expect(label.classes()).toContain(cls);
      });

      // Structure should remain intact
      expect(wrapper.find(".swap-on").exists()).toBe(true);
      expect(wrapper.find(".swap-off").exists()).toBe(true);
      expect(wrapper.find("input[type=\"checkbox\"].sr-only").exists()).toBe(true);
    });
  });

  it("should handle empty class prop gracefully", () => {
    const wrapper = mount(SwapIcon, {
      props: {
        class: "",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const label = wrapper.find("label");
    expect(label.classes()).toContain("swap");
    expect(label.classes()).toContain("swap-rotate");
    // Should only have the default classes
    expect(label.classes()).toHaveLength(2);
  });

  it("should handle multiple space-separated classes correctly", () => {
    const wrapper = mount(SwapIcon, {
      props: {
        class: "class1   class2    class3",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const label = wrapper.find("label");
    expect(label.classes()).toContain("swap");
    expect(label.classes()).toContain("swap-rotate");
    expect(label.classes()).toContain("class1");
    expect(label.classes()).toContain("class2");
    expect(label.classes()).toContain("class3");
  });
});
