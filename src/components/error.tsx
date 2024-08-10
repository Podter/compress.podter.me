import { CircleX, RotateCw } from "lucide-react";

import { Button } from "./ui/button";

export default function Error() {
  return (
    <div className="flex w-full flex-col items-center space-y-2 text-center">
      <CircleX size={64} />
      <p className="!mt-3">An unexpected error occurred.</p>
      <p className="text-sm text-muted-foreground">
        An unhanded error occurred while the app was running. Reload the page to
        try again.
      </p>
      <div className="!mt-3 flex justify-center">
        <Button className="gap-2" onClick={() => location.reload()}>
          <span>Reload</span>
          <RotateCw size={16} />
        </Button>
      </div>
    </div>
  );
}
