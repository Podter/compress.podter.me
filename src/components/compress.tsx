import { Progress } from "./ui/progress";
import { Spinner } from "./ui/spinner";

interface CompressProps {
  file: File;
}

export default function Compress({ file }: CompressProps) {
  return (
    <>
      <video
        src={URL.createObjectURL(file)}
        className="max-h-[50vh] rounded-lg border shadow"
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
        <Progress value={33} className="max-w-lg" />
      </div>
    </>
  );
}
