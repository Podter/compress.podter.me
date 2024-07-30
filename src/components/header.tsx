import { Moon, Sun } from "lucide-react";

import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 flex h-12 w-full place-items-center justify-end space-x-1 px-2">
      <Button size="icon" variant="ghost">
        <Sun size={18} className="dark:hidden" />
        <Moon size={18} className="hidden dark:block" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </header>
  );
}
