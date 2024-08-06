import type { FFmpeg } from "@ffmpeg/ffmpeg";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { createFFmpeg } from "@ffmpeg/ffmpeg";

interface FFmpegContextType {
  ffmpeg: FFmpeg;
  loaded: boolean;
}

const FFmpegContext = createContext<FFmpegContextType | null>(null);

export function useFFmpeg() {
  const context = useContext(FFmpegContext);
  if (!context) {
    throw new Error("useFFmpeg must be used within a FFmpegProvider");
  }
  return context;
}

export function FFmpegProvider({ children }: PropsWithChildren) {
  const [ffmpeg] = useState(() =>
    createFFmpeg({
      log: true,
    }),
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    ffmpeg.load().then(() => setLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FFmpegContext.Provider value={{ ffmpeg, loaded }}>
      {children}
    </FFmpegContext.Provider>
  );
}
