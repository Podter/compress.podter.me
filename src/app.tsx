import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";

import Compress from "./components/compress";
import Error from "./components/error";
import Footer from "./components/footer";
import Header from "./components/header";
import Loading from "./components/loading";
import Save from "./components/save";
import { Toaster } from "./components/ui/sonner";
import Upload from "./components/upload";
import {
  compressedFileAtom,
  errorAtom,
  ffmpegAtom,
  originalFileAtom,
} from "./lib/atoms";
import { usePWA } from "./lib/use-pwa";

export default function App() {
  usePWA();

  const ffmpeg = useAtomValue(ffmpegAtom);
  const [error, setError] = useAtom(errorAtom);

  const originalFile = useAtomValue(originalFileAtom);
  const compressedFile = useAtomValue(compressedFileAtom);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    ffmpeg
      .load()
      .then(() => setLoaded(true))
      .catch((error) => {
        setError(error);
        setError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ffmpeg]);

  return (
    <>
      <Header />
      <main className="container flex h-screen flex-col items-center justify-center">
        {error ? (
          <Error />
        ) : !loaded ? (
          <Loading />
        ) : originalFile && compressedFile ? (
          <Save originalFile={originalFile} compressedFile={compressedFile} />
        ) : originalFile ? (
          <Compress file={originalFile} />
        ) : (
          <Upload />
        )}
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
