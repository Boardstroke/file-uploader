import { useRef } from "react";
import { useRecoilState } from "recoil";
import { useDragInDrop } from "../../hooks/useDragInDrop";
import { filesState, FileState } from "../../states/files";
import "./upload-page.scss";
export function UploadPage() {
    const [files, setFiles] = useRecoilState(filesState);
    const wrapperRef = useRef(null);
    const { dropDiv } = useDragInDrop({
        ref: wrapperRef,
        onDrop: (data) => {
            const filesToUpload: FileState[] = Array.from(data.files).map(
                (file) => ({
                    filename: file.name,
                    size: file.size,
                    blob: file,
                    mimeType: file.type,
                    url: URL.createObjectURL(file),
                })
            );

            setFiles((prevState) => [...prevState, ...filesToUpload]);
        },
    });
    return (
        <section className="upload-page">
            <div className="wrapper" ref={wrapperRef}>
                <header></header>
                {dropDiv || (
                    <div className="files-list">
                        {files.map((file) => (
                            <img src={file.url} alt={file.filename} />
                        ))}
                    </div>
                )}
                <div className="send-files">
                    <button>Upload dos arquivos</button>
                </div>
            </div>
        </section>
    );
}
