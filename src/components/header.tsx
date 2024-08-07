import Back from "./back";
import ThemeSwitch from "./theme-switch";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 flex h-12 w-full items-center justify-between space-x-1 px-2">
      <Back />
      <ThemeSwitch />
    </header>
  );
}
