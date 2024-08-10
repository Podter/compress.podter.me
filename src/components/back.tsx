import { useCallback } from "react";
import { useAtom } from "jotai";
import { ArrowLeft } from "lucide-react";

import { compressedFileAtom, originalFileAtom } from "~/lib/atoms";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function Back() {
  const [originalFile, setOriginalFile] = useAtom(originalFileAtom);
  const [compressedFile, setCompressedFile] = useAtom(compressedFileAtom);

  const back = useCallback(() => {
    setOriginalFile(null);
    setCompressedFile(null);
  }, [setOriginalFile, setCompressedFile]);

  if (originalFile && compressedFile) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost" onClick={back}>
            <ArrowLeft size={18} />
            <span className="sr-only">Back</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Back</span>
        </TooltipContent>
      </Tooltip>
    );
  }

  return <div></div>;
}
