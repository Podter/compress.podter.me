import { Spinner } from "./ui/spinner";

export default function Loading() {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <p className="flex items-center justify-center space-x-1.5">
        <Spinner />
        <span>Loading ffmpeg...</span>
      </p>
      <p className="text-sm text-muted-foreground">
        This may take a while. ffmpeg needs to be loaded before you can start
        compressing videos.
      </p>
    </div>
  );
}
