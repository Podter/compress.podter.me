import Compress from "./components/compress";
import Footer from "./components/footer";
import Header from "./components/header";
import Upload from "./components/upload";
import { useFile } from "./providers/file";

export default function App() {
  const { file } = useFile();

  return (
    <>
      <Header />
      <main className="container flex h-screen flex-col items-center justify-center">
        {file ? <Compress file={file} /> : <Upload />}
      </main>
      <Footer />
    </>
  );
}
