import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import VersionSwitcher from "./VersionSwitcher";

const { usePathnameMock } = vi.hoisted(() => ({
  usePathnameMock: vi.fn<() => string>(),
}));

vi.mock("next/navigation", () => ({
  usePathname: usePathnameMock,
}));

describe("VersionSwitcher", () => {
  beforeEach(() => {
    usePathnameMock.mockReset();
  });

  it("renders three version links preserving the current subpath", () => {
    usePathnameMock.mockReturnValue("/v1/who-we-help/anxiety");
    render(<VersionSwitcher />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    expect(screen.getByRole("link", { name: /design version\s?1/i })).toHaveAttribute(
      "href",
      "/v1/who-we-help/anxiety"
    );
    expect(screen.getByRole("link", { name: /design version\s?2/i })).toHaveAttribute(
      "href",
      "/v2/who-we-help/anxiety"
    );
    expect(screen.getByRole("link", { name: /design version\s?3/i })).toHaveAttribute(
      "href",
      "/v3/who-we-help/anxiety"
    );
  });

  it("marks the active version with aria-current", () => {
    usePathnameMock.mockReturnValue("/v2/about");
    render(<VersionSwitcher />);

    expect(screen.getByRole("link", { name: /design version\s?2/i })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(
      screen.getByRole("link", { name: /design version\s?1/i })
    ).not.toHaveAttribute("aria-current");
    expect(
      screen.getByRole("link", { name: /design version\s?3/i })
    ).not.toHaveAttribute("aria-current");
  });

  it("falls back to bare version roots on a non-version pathname", () => {
    usePathnameMock.mockReturnValue("/");
    render(<VersionSwitcher />);

    expect(screen.getByRole("link", { name: /design version\s?1/i })).toHaveAttribute(
      "href",
      "/v1"
    );
    expect(screen.getByRole("link", { name: /design version\s?2/i })).toHaveAttribute(
      "href",
      "/v2"
    );
    expect(screen.getByRole("link", { name: /design version\s?3/i })).toHaveAttribute(
      "href",
      "/v3"
    );
    for (const link of screen.getAllByRole("link")) {
      expect(link).not.toHaveAttribute("aria-current");
    }
  });
});
