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
      const fileUrl = URL.createObjectURL(file);

      ffmpeg.FS("writeFile", file.name, await fetchFile(file));
      ffmpeg.setProgress(({ ratio }) => {
        setProgress(ratio * 100);
        createPreview(fileUrl, ratio).then(setPreview);
      });

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
        "out.mp4",
      );

      const data = ffmpeg.FS("readFile", "out.mp4");
      const blob = new Blob([data], { type: "video/mp4" });
      ffmpeg.FS("unlink", file.name);
      ffmpeg.FS("unlink", "out.mp4");
      setCompressedFile(blob);
    }

    run().catch((error) => {
      console.error(error);
      setError(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
    }

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  return (
    <>
      <img
        className="max-h-[50vh] rounded-lg border bg-accent shadow"
        src={preview}
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
