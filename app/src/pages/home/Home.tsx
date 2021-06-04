import { useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useRecoilState } from "recoil";
import { FilePreview } from "../../components/FilePreview";
import { useDragInDrop } from "../../hooks/useDragInDrop";
import { filesState, FileState } from "../../states/files";
import "./home.scss";
export function Home() {
    const [files, setFiles] = useRecoilState(filesState);
    const wrapperRef = useRef(null);
    const history = useHistory();
    const { dropDiv } = useDragInDrop({
        onDrop: (data: DataTransfer) => {
            const filesToUpload: FileState[] = Array.from(data.files).map(
                (file) => ({
                    filename: file.name,
                    size: file.size,
                    blob: file,
                    mimeType: file.type,
                    url: URL.createObjectURL(file),
                })
            );

            setFiles(filesToUpload);
            history.push("/upload");
        },
        ref: wrapperRef,
    });

    useEffect(() => {
        console.log(files);
    }, [files]);

    return (
        <section className="home-page">
            <div className="wrapper" ref={wrapperRef}>
                {dropDiv || (
                    <section className="file-preview-list">
                        {files.map((file, i) => (
                            <FilePreview
                                file={file.blob}
                                key={i}
                                url={file.url}
                                urlToUpload={file.uploadUrl}
                            />
                        ))}
                    </section>
                )}
            </div>
        </section>
    );
}
