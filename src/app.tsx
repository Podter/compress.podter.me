import Footer from "./components/footer";
import Header from "./components/header";
import Upload from "./components/upload";

export default function App() {
  return (
    <>
      <Header />
      <div className="flex h-screen w-full items-center justify-center">
        <Upload />
      </div>
      <Footer />
    </>
  );
}
