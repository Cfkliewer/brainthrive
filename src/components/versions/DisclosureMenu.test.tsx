import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useDisclosure } from "./DisclosureMenu";

const { usePathnameMock } = vi.hoisted(() => ({
  usePathnameMock: vi.fn<() => string>(),
}));

vi.mock("next/navigation", () => ({
  usePathname: usePathnameMock,
}));

/** Minimal consumer mirroring how version navs will use the hook. */
function TestMenu() {
  const disclosure = useDisclosure<HTMLDivElement>();
  return (
    <div>
      <div ref={disclosure.containerRef}>
        <button {...disclosure.triggerProps}>Who We Help</button>
        <div {...disclosure.panelProps} data-testid="panel">
          <a href="/v1/who-we-help/anxiety">Anxiety</a>
        </div>
      </div>
      <button>Outside</button>
    </div>
  );
}

function getTrigger() {
  return screen.getByRole("button", { name: "Who We Help" });
}

describe("useDisclosure", () => {
  beforeEach(() => {
    usePathnameMock.mockReset();
    usePathnameMock.mockReturnValue("/v1");
  });

  it("opens on trigger click with aria-expanded=true", () => {
    render(<TestMenu />);
    const trigger = getTrigger();

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("panel")).not.toBeVisible();

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("panel")).toBeVisible();
    expect(trigger).toHaveAttribute(
      "aria-controls",
      screen.getByTestId("panel").id
    );
  });

  it("closes on Escape and returns focus to the trigger", () => {
    render(<TestMenu />);
    const trigger = getTrigger();
    fireEvent.click(trigger);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("panel")).not.toBeVisible();
    expect(trigger).toHaveFocus();
  });

  it("closes on pointerdown outside the container", () => {
    render(<TestMenu />);
    const trigger = getTrigger();
    fireEvent.click(trigger);

    fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("panel")).not.toBeVisible();
  });

  it("stays open on pointerdown inside the container", () => {
    render(<TestMenu />);
    const trigger = getTrigger();
    fireEvent.click(trigger);

    fireEvent.pointerDown(screen.getByRole("link", { name: "Anxiety" }));

    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("closes when the pathname changes", () => {
    const { rerender } = render(<TestMenu />);
    const trigger = getTrigger();
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    usePathnameMock.mockReturnValue("/v1/who-we-help/anxiety");
    rerender(<TestMenu />);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("panel")).not.toBeVisible();
  });

  it("does not close on the initial mount pathname", () => {
    render(<TestMenu />);
    const trigger = getTrigger();
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });
});
