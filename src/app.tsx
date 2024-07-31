import { Upload } from "lucide-react";

import Footer from "./components/footer";
import Header from "./components/header";
import { Button } from "./components/ui/button";

export default function App() {
  return (
    <>
      <Header />
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex max-w-sm flex-col items-center space-y-6 rounded-lg bg-card p-8 text-card-foreground shadow-sm outline-dashed outline-2 outline-border">
          <Upload size={48} />
          <div className="flex flex-col items-center space-y-2 text-center">
            <p>Drag and drop your video file to compress</p>
            <p className="text-sm text-muted-foreground">
              Everything happens in your browser, nothing is uploaded to the
              server.
            </p>
          </div>
          <Button>Select file</Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
