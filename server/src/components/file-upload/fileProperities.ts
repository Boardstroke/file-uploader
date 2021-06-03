export const fileProperties = new Map<string, FileProperties>()

export interface FileProperties{
    contentType: string;
    contentLength: string,
    filename: string,
    caption?: string
}