import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

interface FileContextType {
  file: File | null;
  setFile: (file: File) => void;
}

const FileContext = createContext<FileContextType | null>(null);

export function useFile() {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFile must be used within a FileProvider");
  }
  return context;
}

export function FileProvider({ children }: PropsWithChildren) {
  const [file, setFile] = useState<File | null>(null);
  return (
    <FileContext.Provider value={{ file, setFile }}>
      {children}
    </FileContext.Provider>
  );
}
