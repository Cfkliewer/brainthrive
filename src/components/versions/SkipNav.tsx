/**
 * Skip-navigation link for keyboard users. The .skip-nav class
 * (visually hidden until focused) already exists in globals.css.
 * Pages must give their main element id="main-content".
 */
export default function SkipNav() {
  return (
    <a href="#main-content" className="skip-nav">
      Skip to main content
    </a>
  );
}
