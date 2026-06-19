import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BrainNav from "./BrainNav";
import { BRAIN_REGIONS } from "@/lib/brain/regions";

describe("BrainNav", () => {
  it("renders a labelled navigation landmark", () => {
    render(<BrainNav />);
    expect(
      screen.getByRole("navigation", { name: /brain navigation/i })
    ).toBeInTheDocument();
  });

  it("renders one crawlable link per region with the correct href", () => {
    render(<BrainNav />);
    for (const region of BRAIN_REGIONS) {
      const link = screen.getByRole("link", { name: region.label });
      expect(link).toHaveAttribute("href", region.href);
    }
  });
});
