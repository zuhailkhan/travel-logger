import type { DOMWrapper } from "@vue/test-utils";

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import SwapIcon from "../Swap-Icon/index.vue";

// Mock the Icon component since it's from @nuxt/icon
const IconMock = {
  name: "Icon",
  props: ["name", "size"],
  template: "<span :data-icon=\"name\" :data-size=\"size\" class=\"icon-mock\">{{ name }}</span>",
};

describe("navBar Integration with SwapIcon", () => {
  // Test the exact usage pattern from nav-bar.vue
  it("should work with nav-bar.vue slot-based usage pattern", () => {
    const wrapper = mount(SwapIcon, {
      slots: {
        primaryIcon: "<Icon name=\"tabler:sun\" size=\"30\" />",
        secondaryIcon: "<Icon name=\"tabler:moon-stars\" size=\"30\" />",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    // Should render the slot-based icons correctly (exact nav-bar usage)
    const sunIcon = wrapper.find(".swap-on [data-icon=\"tabler:sun\"]");
    const moonIcon = wrapper.find(".swap-off [data-icon=\"tabler:moon-stars\"]");

    expect(sunIcon.exists()).toBe(true);
    expect(moonIcon.exists()).toBe(true);
    expect(sunIcon.attributes("data-size")).toBe("30");
    expect(moonIcon.attributes("data-size")).toBe("30");

    // Should maintain proper swap structure
    expect(wrapper.find("label.swap.swap-rotate").exists()).toBe(true);
    expect(wrapper.find("input[type=\"checkbox\"].sr-only").exists()).toBe(true);
    expect(wrapper.find(".swap-on").exists()).toBe(true);
    expect(wrapper.find(".swap-off").exists()).toBe(true);
  });

  it("should maintain CSS-only swap functionality in navbar context", async () => {
    const wrapper = mount(SwapIcon, {
      slots: {
        primaryIcon: "<Icon name=\"tabler:sun\" size=\"30\" />",
        secondaryIcon: "<Icon name=\"tabler:moon-stars\" size=\"30\" />",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const checkbox = wrapper.find("input[type=\"checkbox\"]") as DOMWrapper<HTMLInputElement>;

    // Initial state
    expect(checkbox.element.checked).toBe(false);

    // Simulate toggle (CSS-only functionality)
    await checkbox.setValue(true);
    expect(checkbox.element.checked).toBe(true);

    // Component should remain functional
    expect(wrapper.find(".swap-on").exists()).toBe(true);
    expect(wrapper.find(".swap-off").exists()).toBe(true);
    expect(wrapper.find("label.swap").exists()).toBe(true);
  });

  it("should preserve existing usage without breaking changes", () => {
    // This test verifies that the existing nav-bar.vue usage pattern continues to work
    const wrapper = mount(SwapIcon, {
      slots: {
        primaryIcon: "<Icon name=\"tabler:sun\" size=\"30\" />",
        secondaryIcon: "<Icon name=\"tabler:moon-stars\" size=\"30\" />",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    // The component should work exactly as before with slots
    const label = wrapper.find("label");
    const swapOn = wrapper.find(".swap-on");
    const swapOff = wrapper.find(".swap-off");
    const checkbox = wrapper.find("input[type=\"checkbox\"]");

    expect(label.exists()).toBe(true);
    expect(swapOn.exists()).toBe(true);
    expect(swapOff.exists()).toBe(true);
    expect(checkbox.exists()).toBe(true);

    // Should have default classes
    expect(label.classes()).toContain("swap");
    expect(label.classes()).toContain("swap-rotate");
    expect(checkbox.classes()).toContain("sr-only");

    // Should have default aria-label
    expect(label.attributes("aria-label")).toBe("Toggle theme");

    // Icons should be rendered from slots
    const sunIcon = swapOn.find("[data-icon=\"tabler:sun\"]");
    const moonIcon = swapOff.find("[data-icon=\"tabler:moon-stars\"]");
    expect(sunIcon.exists()).toBe(true);
    expect(moonIcon.exists()).toBe(true);
  });

  it("should work in navbar-like container structures", () => {
    // Simulate a navbar-like container structure
    const NavbarMock = {
      template: `
        <div class="navbar bg-base-100">
          <div class="navbar-end gap-2">
            <SwapIcon>
              <template #primaryIcon>
                <Icon name="tabler:sun" size="30" />
              </template>
              <template #secondaryIcon>
                <Icon name="tabler:moon-stars" size="30" />
              </template>
            </SwapIcon>
          </div>
        </div>
      `,
      components: {
        SwapIcon,
        Icon: IconMock,
      },
    };

    const wrapper = mount(NavbarMock);

    // Should find the SwapIcon component within the navbar structure
    const swapIcon = wrapper.findComponent(SwapIcon);
    expect(swapIcon.exists()).toBe(true);

    // Should maintain proper structure within navbar context
    const label = swapIcon.find("label.swap");
    expect(label.exists()).toBe(true);

    // Icons should render correctly
    const sunIcon = swapIcon.find(".swap-on [data-icon=\"tabler:sun\"]");
    const moonIcon = swapIcon.find(".swap-off [data-icon=\"tabler:moon-stars\"]");
    expect(sunIcon.exists()).toBe(true);
    expect(moonIcon.exists()).toBe(true);
  });

  it("should handle theme switching functionality in navbar context", async () => {
    const wrapper = mount(SwapIcon, {
      props: {
        ariaLabel: "Toggle dark mode",
      },
      slots: {
        primaryIcon: "<Icon name=\"tabler:sun\" size=\"30\" />",
        secondaryIcon: "<Icon name=\"tabler:moon-stars\" size=\"30\" />",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    const checkbox = wrapper.find("input[type=\"checkbox\"]") as DOMWrapper<HTMLInputElement>;
    const label = wrapper.find("label");

    // Initial state
    expect(checkbox.element.checked).toBe(false);
    expect(label.attributes("aria-label")).toBe("Toggle dark mode");

    // Simulate theme toggle
    await checkbox.setValue(true);
    expect(checkbox.element.checked).toBe(true);

    // Component should remain functional with slot content
    expect(wrapper.find(".swap-on [data-icon=\"tabler:sun\"]").exists()).toBe(true);
    expect(wrapper.find(".swap-off [data-icon=\"tabler:moon-stars\"]").exists()).toBe(true);
  });

  it("should maintain backward compatibility with existing implementations", () => {
    // Test that the component works exactly as it did before the enhancement
    const wrapper = mount(SwapIcon, {
      slots: {
        primaryIcon: "<Icon name=\"tabler:sun\" size=\"30\" />",
        secondaryIcon: "<Icon name=\"tabler:moon-stars\" size=\"30\" />",
      },
      global: {
        components: {
          Icon: IconMock,
        },
      },
    });

    // All existing functionality should work unchanged
    expect(wrapper.find("label.swap.swap-rotate").exists()).toBe(true);
    expect(wrapper.find("input[type=\"checkbox\"].sr-only").exists()).toBe(true);
    expect(wrapper.find(".swap-on").exists()).toBe(true);
    expect(wrapper.find(".swap-off").exists()).toBe(true);

    // Slot content should take precedence (existing behavior)
    const sunIcon = wrapper.find(".swap-on [data-icon=\"tabler:sun\"]");
    const moonIcon = wrapper.find(".swap-off [data-icon=\"tabler:moon-stars\"]");
    expect(sunIcon.exists()).toBe(true);
    expect(moonIcon.exists()).toBe(true);
    expect(sunIcon.attributes("data-size")).toBe("30");
    expect(moonIcon.attributes("data-size")).toBe("30");
  });
});
