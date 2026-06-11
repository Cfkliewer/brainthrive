import Link from "next/link";

interface WhoWeHelpPanelProps {
  /** From useDisclosure().panelProps */
  id: string;
  hidden: boolean;
  items: { label: string; href: string }[];
}

/**
 * Full-width hairline-ruled dropdown panel for the "Who We Help" nav
 * disclosure: 10 numbered condition links in two columns.
 */
export default function WhoWeHelpPanel({
  id,
  hidden,
  items,
}: WhoWeHelpPanelProps) {
  return (
    <div
      id={id}
      hidden={hidden}
      className="absolute inset-x-0 top-full border-b-2 border-[#00D3D2] bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#5362EF]">
          Who We Help
        </p>
        <ul className="mt-6 grid gap-x-16 sm:grid-cols-2">
          {items.map((item, index) => (
            <li key={item.href} className="border-t border-[#002554]/10">
              <Link
                href={item.href}
                className="group flex items-baseline gap-4 py-3.5"
              >
                <span className="v1-display text-xs text-[#5362EF] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] transition-colors group-hover:text-[#5362EF]">
                  {item.label}
                </span>
                <span
                  aria-hidden
                  className="ml-auto text-[#002554]/30 transition-colors group-hover:text-[#5362EF]"
                >
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
