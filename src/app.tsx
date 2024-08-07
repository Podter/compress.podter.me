import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";

import Compress from "./components/compress";
import Footer from "./components/footer";
import Header from "./components/header";
import Upload from "./components/upload";
import { compressedFileAtom, ffmpegAtom, originalFileAtom } from "./lib/atoms";

export default function App() {
  const ffmpeg = useAtomValue(ffmpegAtom);

  const originalFile = useAtomValue(originalFileAtom);
  const compressedFile = useAtomValue(compressedFileAtom);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    ffmpeg.load().then(() => setLoaded(true));
  }, [ffmpeg]);

  return (
    <>
      <Header />
      <main className="container flex h-screen flex-col items-center justify-center">
        {/* TODO: add loading screen */}
        {!loaded ? (
          <></>
        ) : compressedFile ? (
          // TODO: add download button
          <></>
        ) : originalFile ? (
          <Compress file={originalFile} />
        ) : (
          <Upload />
        )}
      </main>
      <Footer />
    </>
  );
}
