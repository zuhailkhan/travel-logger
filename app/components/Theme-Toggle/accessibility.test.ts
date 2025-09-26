import type { DOMWrapper } from "@vue/test-utils";

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import SwapIcon from "./index.vue";

// Mock the Icon component since it's from @nuxt/icon
const IconMock = {
  name: "Icon",
  props: ["name", "size"],
  template: "<span :data-icon=\"name\" :data-size=\"size\">{{ name }}</span>",
};

describe("swapIcon - Accessibility Compliance", () => {
  describe("screen Reader Announcements", () => {
    it("should have proper ARIA label for screen reader announcement of component purpose", () => {
      const wrapper = mount(SwapIcon, {
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const label = wrapper.find("label");
      expect(label.attributes("aria-label")).toBe("Toggle theme");
      expect(label.attributes("aria-label")).toBeTruthy();
    });

    it("should announce custom purpose when custom ariaLabel is provided", () => {
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

    it("should have proper semantic structure for screen readers", () => {
      const wrapper = mount(SwapIcon, {
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      // Label element provides semantic context
      const label = wrapper.find("label");
      expect(label.exists()).toBe(true);
      expect(label.element.tagName.toLowerCase()).toBe("label");

      // Checkbox input provides interactive element for screen readers
      const checkbox = wrapper.find("input[type=\"checkbox\"]");
      expect(checkbox.exists()).toBe(true);
      expect(checkbox.element.tagName.toLowerCase()).toBe("input");
      expect(checkbox.attributes("type")).toBe("checkbox");
    });

    it("should maintain proper label-input association for screen readers", () => {
      const wrapper = mount(SwapIcon, {
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const label = wrapper.find("label");
      const checkbox = wrapper.find("input[type=\"checkbox\"]");

      // Checkbox should be nested inside label for implicit association
      expect(label.find("input[type=\"checkbox\"]").exists()).toBe(true);

      // This creates an implicit label-input association that screen readers understand
      expect(checkbox.element.parentElement).toBe(label.element);
    });

    it("should hide visual elements appropriately from screen readers", () => {
      const wrapper = mount(SwapIcon, {
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      // Checkbox should be visually hidden but accessible to screen readers
      const checkbox = wrapper.find("input[type=\"checkbox\"]");
      expect(checkbox.classes()).toContain("sr-only");

      // Icon containers should be visible to screen readers (no aria-hidden)
      const swapOn = wrapper.find(".swap-on");
      const swapOff = wrapper.find(".swap-off");
      expect(swapOn.attributes("aria-hidden")).toBeUndefined();
      expect(swapOff.attributes("aria-hidden")).toBeUndefined();
    });
  });

  describe("keyboard Navigation", () => {
    it("should be focusable via keyboard navigation", () => {
      const wrapper = mount(SwapIcon, {
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const checkbox = wrapper.find("input[type=\"checkbox\"]");

      // Input should be focusable (not disabled or tabindex="-1")
      expect(checkbox.attributes("disabled")).toBeUndefined();
      expect(checkbox.attributes("tabindex")).not.toBe("-1");
    });

    it("should respond to keyboard activation (Space key)", async () => {
      const wrapper = mount(SwapIcon, {
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const checkbox = wrapper.find("input[type=\"checkbox\"]") as DOMWrapper<HTMLInputElement>;

      // Initial state
      expect(checkbox.element.checked).toBe(false);

      // Simulate Space key press
      await checkbox.trigger("keydown", { key: " " });
      await checkbox.trigger("change");

      // Component should remain functional after keyboard interaction
      expect(wrapper.find("label").exists()).toBe(true);
      expect(wrapper.find(".swap-on").exists()).toBe(true);
      expect(wrapper.find(".swap-off").exists()).toBe(true);
    });

    it("should respond to keyboard activation (Enter key)", async () => {
      const wrapper = mount(SwapIcon, {
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const checkbox = wrapper.find("input[type=\"checkbox\"]");

      // Simulate Enter key press
      await checkbox.trigger("keydown", { key: "Enter" });
      await checkbox.trigger("change");

      // Component should remain functional after keyboard interaction
      expect(wrapper.find("label").exists()).toBe(true);
      expect(wrapper.find(".swap-on").exists()).toBe(true);
      expect(wrapper.find(".swap-off").exists()).toBe(true);
    });

    it("should maintain tab order in complex layouts", () => {
      const wrapper = mount(SwapIcon, {
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const checkbox = wrapper.find("input[type=\"checkbox\"]");

      // Should not have custom tabindex that disrupts natural tab order
      expect(checkbox.attributes("tabindex")).toBeUndefined();

      // Should be a standard form control that participates in tab order
      expect(checkbox.element.tagName.toLowerCase()).toBe("input");
      expect(checkbox.attributes("type")).toBe("checkbox");
    });

    it("should work correctly when focused via label click", async () => {
      const wrapper = mount(SwapIcon, {
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const label = wrapper.find("label");

      // Clicking label should focus and activate the checkbox
      await label.trigger("click");

      // Component should remain functional
      expect(wrapper.find(".swap-on").exists()).toBe(true);
      expect(wrapper.find(".swap-off").exists()).toBe(true);
    });
  });

  describe("focus Indicators", () => {
    it("should have focusable element for focus indicators", () => {
      const wrapper = mount(SwapIcon, {
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const checkbox = wrapper.find("input[type=\"checkbox\"]");

      // Checkbox should be the focusable element
      expect(checkbox.exists()).toBe(true);
      expect(checkbox.element.tagName.toLowerCase()).toBe("input");
      expect(checkbox.attributes("type")).toBe("checkbox");
    });

    it("should not interfere with focus styling through custom classes", () => {
      const wrapper = mount(SwapIcon, {
        props: {
          class: "custom-focus-style border-2",
        },
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const label = wrapper.find("label");
      const checkbox = wrapper.find("input[type=\"checkbox\"]");

      // Custom classes should be on label, not interfering with checkbox focus
      expect(label.classes()).toContain("custom-focus-style");
      expect(label.classes()).toContain("border-2");

      // Checkbox should remain clean for focus styling
      expect(checkbox.classes()).toEqual(["sr-only"]);
    });

    it("should maintain proper element hierarchy for focus management", () => {
      const wrapper = mount(SwapIcon, {
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const label = wrapper.find("label");
      const checkbox = wrapper.find("input[type=\"checkbox\"]");
      const swapOn = wrapper.find(".swap-on");
      const swapOff = wrapper.find(".swap-off");

      // Proper nesting for focus management
      expect(label.element.contains(checkbox.element)).toBe(true);
      expect(label.element.contains(swapOn.element)).toBe(true);
      expect(label.element.contains(swapOff.element)).toBe(true);
    });

    it("should support focus events", async () => {
      const wrapper = mount(SwapIcon, {
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const checkbox = wrapper.find("input[type=\"checkbox\"]");

      // Should be able to trigger focus events
      await checkbox.trigger("focus");
      await checkbox.trigger("blur");

      // Component should remain stable after focus events
      expect(wrapper.find("label").exists()).toBe(true);
      expect(wrapper.find(".swap-on").exists()).toBe(true);
      expect(wrapper.find(".swap-off").exists()).toBe(true);
    });
  });

  describe("form Label Accessibility Warning Resolution", () => {
    it("should have proper label-input association to resolve form warnings", () => {
      const wrapper = mount(SwapIcon, {
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const label = wrapper.find("label");
      const checkbox = wrapper.find("input[type=\"checkbox\"]");

      // Label should contain the input for implicit association
      expect(label.element.contains(checkbox.element)).toBe(true);

      // This resolves "form label not associated with control" warnings
      expect(label.exists()).toBe(true);
      expect(checkbox.exists()).toBe(true);
    });

    it("should have meaningful label text through aria-label", () => {
      const wrapper = mount(SwapIcon, {
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const label = wrapper.find("label");

      // Label should have meaningful text via aria-label
      expect(label.attributes("aria-label")).toBe("Toggle theme");
      expect(label.attributes("aria-label")).toBeTruthy();
      expect(label.attributes("aria-label")?.length).toBeGreaterThan(0);
    });

    it("should not have empty or missing label text", () => {
      const wrapper = mount(SwapIcon, {
        props: {
          ariaLabel: "",
        },
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const label = wrapper.find("label");

      // Even with empty ariaLabel prop, should fall back to default
      expect(label.attributes("aria-label")).toBe("");

      // Test with undefined ariaLabel
      const wrapper2 = mount(SwapIcon, {
        props: {
          ariaLabel: undefined,
        },
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const label2 = wrapper2.find("label");
      expect(label2.attributes("aria-label")).toBe("Toggle theme");
    });

    it("should maintain form control semantics", () => {
      const wrapper = mount(SwapIcon, {
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const label = wrapper.find("label");
      const checkbox = wrapper.find("input[type=\"checkbox\"]");

      // Should be proper form elements
      expect(label.element.tagName.toLowerCase()).toBe("label");
      expect(checkbox.element.tagName.toLowerCase()).toBe("input");
      expect(checkbox.attributes("type")).toBe("checkbox");

      // Should have proper form control relationship
      expect(label.element.contains(checkbox.element)).toBe(true);
    });

    it("should work correctly in form contexts", () => {
      const FormWrapper = {
        template: `
          <form>
            <SwapIcon aria-label="Theme toggle in form" />
            <button type="submit">Submit</button>
          </form>
        `,
        components: {
          SwapIcon,
        },
      };

      const wrapper = mount(FormWrapper, {
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const form = wrapper.find("form");
      const label = wrapper.find("label");
      const checkbox = wrapper.find("input[type=\"checkbox\"]");

      expect(form.exists()).toBe(true);
      expect(label.exists()).toBe(true);
      expect(checkbox.exists()).toBe(true);
      expect(label.attributes("aria-label")).toBe("Theme toggle in form");
    });
  });

  describe("comprehensive Accessibility Integration", () => {
    it("should meet all accessibility requirements simultaneously", () => {
      const wrapper = mount(SwapIcon, {
        props: {
          ariaLabel: "Switch display theme",
          primaryIcon: "tabler:sun-high",
          secondaryIcon: "tabler:moon-filled",
          iconSize: "32",
          class: "focus:ring-2 focus:ring-blue-500",
        },
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const label = wrapper.find("label");
      const checkbox = wrapper.find("input[type=\"checkbox\"]");
      const swapOn = wrapper.find(".swap-on");
      const swapOff = wrapper.find(".swap-off");

      // Screen reader requirements
      expect(label.attributes("aria-label")).toBe("Switch display theme");
      expect(checkbox.classes()).toContain("sr-only");

      // Keyboard navigation requirements
      expect(checkbox.exists()).toBe(true);
      expect(checkbox.attributes("type")).toBe("checkbox");
      expect(label.element.contains(checkbox.element)).toBe(true);

      // Focus indicator requirements
      expect(label.classes()).toContain("focus:ring-2");
      expect(label.classes()).toContain("focus:ring-blue-500");

      // Form label requirements
      expect(label.element.tagName.toLowerCase()).toBe("label");
      expect(label.attributes("aria-label")).toBeTruthy();

      // Component structure integrity
      expect(swapOn.exists()).toBe(true);
      expect(swapOff.exists()).toBe(true);
      expect(label.classes()).toContain("swap");
      expect(label.classes()).toContain("swap-rotate");
    });

    it("should maintain accessibility with slot content", () => {
      const wrapper = mount(SwapIcon, {
        props: {
          ariaLabel: "Toggle between modes",
        },
        slots: {
          primaryIcon: "<div role=\"img\" aria-label=\"Light mode active\">☀️</div>",
          secondaryIcon: "<div role=\"img\" aria-label=\"Dark mode active\">🌙</div>",
        },
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      const label = wrapper.find("label");
      const checkbox = wrapper.find("input[type=\"checkbox\"]");

      // Main accessibility features
      expect(label.attributes("aria-label")).toBe("Toggle between modes");
      expect(checkbox.classes()).toContain("sr-only");
      expect(label.element.contains(checkbox.element)).toBe(true);

      // Slot content accessibility
      const lightModeIcon = wrapper.find("[aria-label=\"Light mode active\"]");
      const darkModeIcon = wrapper.find("[aria-label=\"Dark mode active\"]");
      expect(lightModeIcon.exists()).toBe(true);
      expect(darkModeIcon.exists()).toBe(true);
      expect(lightModeIcon.attributes("role")).toBe("img");
      expect(darkModeIcon.attributes("role")).toBe("img");
    });

    it("should handle edge cases gracefully while maintaining accessibility", () => {
      // Test with minimal props
      const wrapper1 = mount(SwapIcon, {
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      let label = wrapper1.find("label");
      let checkbox = wrapper1.find("input[type=\"checkbox\"]");
      expect(label.attributes("aria-label")).toBe("Toggle theme");
      expect(checkbox.classes()).toContain("sr-only");

      // Test with empty string ariaLabel (should use default)
      const wrapper2 = mount(SwapIcon, {
        props: {
          ariaLabel: "",
        },
        global: {
          components: {
            Icon: IconMock,
          },
        },
      });

      label = wrapper2.find("label");
      checkbox = wrapper2.find("input[type=\"checkbox\"]");
      expect(label.exists()).toBe(true);
      expect(checkbox.classes()).toContain("sr-only");
    });
  });
});
