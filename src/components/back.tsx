import { useCallback } from "react";
import { useAtom } from "jotai";
import { ArrowLeft } from "lucide-react";

import { compressedFileAtom, originalFileAtom } from "~/lib/atoms";
import { Button } from "./ui/button";

export default function Back() {
  const [originalFile, setOriginalFile] = useAtom(originalFileAtom);
  const [compressedFile, setCompressedFile] = useAtom(compressedFileAtom);

  const back = useCallback(() => {
    setOriginalFile(null);
    setCompressedFile(null);
  }, [setOriginalFile, setCompressedFile]);

  if (originalFile && compressedFile) {
    return (
      <Button size="icon" variant="ghost" onClick={back}>
        <ArrowLeft size={18} />
        <span className="sr-only">Back</span>
      </Button>
    );
  }

  return <div></div>;
}
