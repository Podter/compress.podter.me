import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { atom } from "jotai";

export const ffmpegAtom = atom(() =>
  createFFmpeg({
    log: true,
  }),
);

export const originalFileAtom = atom<File | null>(null);
export const compressedFileAtom = atom<Blob | null>(null);

export const errorAtom = atom(false);
