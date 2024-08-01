import Compress from "./components/compress";
import Footer from "./components/footer";
import Header from "./components/header";
import Upload from "./components/upload";
import { useFFmpeg } from "./providers/ffmpeg";
import { useFile } from "./providers/file";

export default function App() {
  const { loaded } = useFFmpeg();
  const { file } = useFile();

  return (
    <>
      <Header />
      <main className="container flex h-screen flex-col items-center justify-center">
        {/* TODO: add loading screen */}
        {!loaded ? <></> : file ? <Compress file={file} /> : <Upload />}
      </main>
      <Footer />
    </>
  );
}
