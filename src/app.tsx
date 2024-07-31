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
      <div className="flex h-screen w-full items-center justify-center">
        {file ? <Compress /> : <Upload />}
      </div>
      <Footer />
    </>
  );
}
