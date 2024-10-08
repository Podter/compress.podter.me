import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const ffmpegAtom = atom(() =>
  createFFmpeg({
    log: true,
  }),
);

export const originalFileAtom = atom<File | null>(null);
export const compressedFileAtom = atom<Blob | null>(null);

export const errorAtom = atom(false);

export const themeAtom = atomWithStorage<"dark" | "light" | "system">(
  "theme",
  "system",
  undefined,
  {
    getOnInit: true,
  },
);
