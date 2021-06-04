import { useRef } from "react";
import { useHistory } from "react-router";
import { useRecoilState } from "recoil";
import { makeSetupUploadService } from "../../core/services/setup-upload-service";
import { useDragInDrop } from "../../hooks/useDragInDrop";
import { filesState, FileState } from "../../states/files";
import "./upload-page.scss";
export function UploadPage() {
    const [files, setFiles] = useRecoilState(filesState);
    const wrapperRef = useRef(null);
    const uploadFile = makeSetupUploadService();
    const history = useHistory();
    const uploadFiles = async () => {
        const filesUploadUrls = files.map(async (file, index) => {
            const { headers } = await uploadFile.execute(
                { filename: file.filename },
                {
                    "X-Upload-Content-Type": file.mimeType,
                    "X-Upload-Content-Size": file.size.toString(),
                }
            );
            const uploadUrl = headers.get("Location");
            if (!uploadUrl) {
                throw Error();
            }
            return { ...file, uploadUrl };
        });
        const filesWithURLS = await Promise.all(filesUploadUrls);
        setFiles(filesWithURLS);
        history.push("/");
    };
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
                    <button onClick={uploadFiles}>Upload dos arquivos</button>
                </div>
            </div>
        </section>
    );
}
