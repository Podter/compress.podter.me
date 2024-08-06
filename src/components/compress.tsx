import { useEffect, useState } from "react";
import { fetchFile } from "@ffmpeg/ffmpeg";

import { useFFmpeg } from "~/providers/ffmpeg";
import { Progress } from "./ui/progress";
import { Spinner } from "./ui/spinner";

interface CompressProps {
  file: File;
}

export default function Compress({ file }: CompressProps) {
  const { ffmpeg } = useFFmpeg();

  const [overrideSrc, setOverrideSrc] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    async function run() {
      ffmpeg.FS("writeFile", file.name, await fetchFile(file));
      ffmpeg.setProgress(({ ratio }) => setProgress(ratio * 100));

      const outName = "compressed-" + file.name;
      await ffmpeg.run(
        "-i",
        file.name,
        "-c:v",
        "libx264",
        "-tag:v",
        "avc1",
        "-movflags",
        "faststart",
        "-crf",
        "30",
        "-preset",
        "superfast",
        "-progress",
        "-",
        outName,
      );

      const data = ffmpeg.FS("readFile", outName);
      const blob = new Blob([data], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      setOverrideSrc(url);
    }

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <video
        src={overrideSrc ?? URL.createObjectURL(file)}
        className="max-h-[50vh] rounded-lg border shadow"
        controls
      />
      <div className="mt-6 flex w-full flex-col items-center space-y-4">
        <div className="flex flex-col space-y-2 text-center">
          <p className="flex items-center justify-center space-x-1.5">
            <Spinner />
            <span>Compression in progress...</span>
          </p>
          <p className="text-sm text-muted-foreground">
            This may take a while depending on the size of the video.
          </p>
        </div>
        <Progress value={progress} className="max-w-lg" />
      </div>
    </>
  );
}
