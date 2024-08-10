import { Heart } from "lucide-react";

import GitHub from "./icons/github";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 z-50 flex w-full justify-center bg-background min-[1400px]:bg-transparent">
      <div className="container flex w-full flex-col items-center justify-between space-y-1 border-t py-[14px] sm:flex-row">
        <a
          className="flex items-center space-x-1.5 text-sm text-muted-foreground transition-opacity hover:opacity-80"
          href="https://podter.me"
        >
          <Heart size={12} />
          <span className="font-medium">Made by Podter</span>
        </a>
        <div className="flex items-center space-x-[1.125rem] text-sm font-medium text-muted-foreground">
          <p>Powered by React and ffmpeg</p>
          <a
            className="flex items-center space-x-1.5 transition-opacity hover:opacity-80"
            href="https://github.com/Podter/compress.podter.me"
          >
            <GitHub className="inline" size={12} />
            <span>Source</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
