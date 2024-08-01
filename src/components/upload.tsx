import { UploadIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useFile } from "~/providers/file";

export default function Upload() {
  const { setFile } = useFile();

  const { isDragAccept, getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: {
      "video/*": [],
    },
    maxFiles: 1,
    onDropAccepted: (files) => {
      const file = files[0];
      if (file) {
        setFile(file);
      }
    },
  });

  return (
    <div
      {...getRootProps({
        className: cn(
          "flex max-w-sm flex-col items-center space-y-6 rounded-lg bg-card p-8 text-card-foreground shadow-sm outline-dashed outline-2 outline-border",
          isDragAccept && "bg-accent transition-colors dark:bg-accent/50",
        ),
      })}
    >
      <UploadIcon size={48} />
      <div className="flex flex-col items-center space-y-2 text-center">
        <p>Drag and drop your video file to compress</p>
        <p className="text-sm text-muted-foreground">
          Everything happens in your browser, nothing is uploaded to the server.
        </p>
      </div>
      <Button onClick={open}>Select file</Button>
      <input {...getInputProps()} />
    </div>
  );
}
