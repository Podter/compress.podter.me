import { useCallback, useEffect, useMemo } from "react";
import { ArrowRight, Check, Download } from "lucide-react";

import { Button } from "./ui/button";

interface SaveProps {
  originalFile: File;
  compressedFile: Blob;
}

export default function Save({ originalFile, compressedFile }: SaveProps) {
  const { filename, url } = useMemo(() => {
    const oldFilename = originalFile.name.replace(/\.[^/.]+$/, "");
    const filename = `${oldFilename} (compressed).mp4`;
    const url = URL.createObjectURL(compressedFile);
    return { filename, url };
  }, [originalFile, compressedFile]);

  const download = useCallback(() => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    a.remove();
  }, [filename, url]);

  const originalSize = useMemo(
    () => (originalFile.size / 1024 / 1024).toFixed(2),
    [originalFile],
  );

  const compressedSize = useMemo(
    () => (compressedFile.size / 1024 / 1024).toFixed(2),
    [compressedFile],
  );

  const savedPercentage = useMemo(
    () => ((1 - compressedFile.size / originalFile.size) * 100).toFixed(2),
    [compressedFile, originalFile],
  );

  useEffect(() => {
    window.umami.track("Video compressed");
    import("js-confetti").then(async ({ default: JSConfetti }) => {
      const confetti = new JSConfetti();

      await confetti.addConfetti({
        confettiColors: [
          "#ffc53d",
          "#0090ff",
          "#e93d82",
          "#00a2c7",
          "#46a758",
          "#30a46c",
          "#3e63dd",
          "#5b5bd6",
          "#29a383",
          "#bdee63",
          "#86ead4",
          "#f76b15",
          "#d6409f",
          "#ab4aba",
          "#8e4ec6",
          "#e5484d",
          "#e54666",
          "#7ce2fe",
          "#12a594",
          "#e54d2e",
          "#6e56cf",
          "#ffe629",
        ],
      });

      confetti.destroyCanvas();
    });
  }, []);

  return (
    <>
      <video
        className="max-h-[50vh] rounded-lg border bg-accent shadow"
        src={url}
        controls
      />
      <div className="mt-6 flex flex-col space-y-3 text-center">
        <p className="flex items-center justify-center space-x-1.5">
          <Check size={16} />
          <span>Video compressed successfully</span>
        </p>
        <div className="flex justify-center">
          <div className="flex flex-col items-center space-y-1 rounded-xl border px-4 py-3 text-center text-sm shadow">
            <div className="flex items-center space-x-2">
              <p>{originalSize} MB</p>
              <ArrowRight size={14} />
              <p>{compressedSize} MB</p>
            </div>
            <p className="text-muted-foreground">Saved {savedPercentage}%</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          You can save the compressed video by clicking the save button below.
        </p>
        <div className="flex justify-center">
          <Button className="gap-2" onClick={download}>
            <span>Save video</span>
            <Download size={16} />
          </Button>
        </div>
      </div>
    </>
  );
}
