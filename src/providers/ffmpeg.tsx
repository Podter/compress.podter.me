import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

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
  const [ffmpeg] = useState(() => new FFmpeg());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function initFFmpeg() {
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript",
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm",
        ),
        workerURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.worker.js`,
          "text/javascript",
        ),
      });
      setLoaded(true);
    }

    initFFmpeg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FFmpegContext.Provider value={{ ffmpeg, loaded }}>
      {children}
    </FFmpegContext.Provider>
  );
}

const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
