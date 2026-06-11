import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { useDisclosure } from "./DisclosureMenu";

const { usePathnameMock } = vi.hoisted(() => ({
  usePathnameMock: vi.fn<() => string>(),
}));

vi.mock("next/navigation", () => ({
  usePathname: usePathnameMock,
}));

/** Minimal consumer mirroring how the site nav uses the hook. */
function TestMenu({ closeAboveQuery }: { closeAboveQuery?: string }) {
  const disclosure = useDisclosure<HTMLDivElement>({ closeAboveQuery });
  return (
    <div>
      <div ref={disclosure.containerRef}>
        <button {...disclosure.triggerProps}>Who We Help</button>
        <div {...disclosure.panelProps} data-testid="panel">
          <a href="/who-we-help/anxiety">Anxiety</a>
          <button onClick={disclosure.close}>Close</button>
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
    usePathnameMock.mockReturnValue("/");
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

    usePathnameMock.mockReturnValue("/who-we-help/anxiety");
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

  it("close() closes and returns focus to the trigger", () => {
    render(<TestMenu />);
    const trigger = getTrigger();
    fireEvent.click(trigger);

    const closeButton = screen.getByRole("button", { name: "Close" });
    closeButton.focus();
    fireEvent.click(closeButton);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("panel")).not.toBeVisible();
    expect(trigger).toHaveFocus();
  });

  it("closes when closeAboveQuery flips to matching", () => {
    // Controllable matchMedia: capture the change listener so the test can
    // simulate the viewport crossing the breakpoint.
    let changeListener: ((event: { matches: boolean }) => void) | undefined;
    const matchMediaMock = vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: (
        _type: string,
        listener: (event: { matches: boolean }) => void
      ) => {
        changeListener = listener;
      },
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    vi.stubGlobal("matchMedia", matchMediaMock);

    try {
      render(<TestMenu closeAboveQuery="(min-width: 1024px)" />);
      expect(matchMediaMock).toHaveBeenCalledWith("(min-width: 1024px)");

      const trigger = getTrigger();
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      act(() => changeListener?.({ matches: true }));

      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(screen.getByTestId("panel")).not.toBeVisible();
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
