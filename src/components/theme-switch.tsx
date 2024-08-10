import { useEffect } from "react";
import { useAtom } from "jotai";
import { Moon, Sun } from "lucide-react";

import { themeAtom } from "~/lib/atoms";
import { Button } from "./ui/button";

const storageKey = "theme";

export default function ThemeSwitch() {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() =>
        setTheme((prevTheme) => {
          const newTheme = prevTheme === "light" ? "dark" : "light";
          localStorage.setItem(storageKey, newTheme);
          return newTheme;
        })
      }
    >
      <Sun size={18} className="dark:hidden" />
      <Moon size={18} className="hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
