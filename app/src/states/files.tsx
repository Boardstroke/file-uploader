import { atom } from "recoil";

export const filesState = atom<FileState[]>({
    default: [],
    key: "filesState",
});

export interface FileState {
    filename: string;
    size: number;
    mimeType: string;
    blob: Blob;
    url: string;
}
