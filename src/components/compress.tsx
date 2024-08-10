import { useEffect, useState } from "react";
import { fetchFile } from "@ffmpeg/ffmpeg";
import { useAtomValue, useSetAtom } from "jotai";

import { compressedFileAtom, errorAtom, ffmpegAtom } from "~/lib/atoms";
import { createPreview } from "~/lib/create-preview";
import { Progress } from "./ui/progress";
import { Spinner } from "./ui/spinner";

interface CompressProps {
  file: File;
}

export default function Compress({ file }: CompressProps) {
  const ffmpeg = useAtomValue(ffmpegAtom);
  const setCompressedFile = useSetAtom(compressedFileAtom);
  const setError = useSetAtom(errorAtom);

  const [progress, setProgress] = useState<number | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    async function run() {
      ffmpeg.FS("writeFile", file.name, await fetchFile(file));
      ffmpeg.setProgress(({ ratio }) => {
        setProgress(ratio * 100);
        createPreview(file, ratio).then(setPreview);
      });

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
        outName,
      );

      const data = ffmpeg.FS("readFile", outName);
      const blob = new Blob([data], { type: "video/mp4" });
      setCompressedFile(blob);
    }

    run().catch((error) => {
      console.error(error);
      setError(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <img className="max-h-[50vh] rounded-lg border shadow" src={preview} />
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
