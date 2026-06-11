import IndexRow from "./IndexRow";
import { CONTAINER, EYEBROW_ACCENT } from "./styles";

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
      className="absolute inset-x-0 top-full border-b-2 border-brand-dark-teal bg-white"
    >
      <div className={`${CONTAINER} py-10`}>
        <p className={EYEBROW_ACCENT}>Who We Help</p>
        <ul className="mt-6 grid gap-x-16 sm:grid-cols-2">
          {items.map((item, index) => (
            <IndexRow
              key={item.href}
              href={item.href}
              index={index}
              label={item.label}
              density="comfortable"
              borderSide="top"
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
