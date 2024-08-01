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
        {file ? <Compress /> : <Upload />}
      <main className="container flex h-screen flex-col items-center justify-center">
      </main>
      <Footer />
    </>
  );
}
