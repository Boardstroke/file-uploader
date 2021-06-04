import { useEffect, useRef, useState } from "react";
import { makeUploadService } from "../core/services/upload-service";
import "./file-preview.scss";
import { io } from "socket.io-client";
import { Socket } from "dgram";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
export function FilePreview(props: FilePreviewProps) {
    const doUpload = makeUploadService();
    const [socket] = useState(io("http://localhost:8081"));
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        (async function () {
            const binary = await props.file.arrayBuffer();
            await doUpload.execute(props.urlToUpload!, binary, {
                "Content-Type": props.file.type,
                "Content-Length": props.file.size.toString(),
            });
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.urlToUpload]);

    useEffect(() => {
        const handler = (data: any) => setProgress(data);

        socket.on("progress", handler);

        return () => {
            socket.off("progress", handler);
        };
    }, [socket]);
    return (
        <article className="file-preview">
            <div>
                <img src={props.url} alt="" />
            </div>
            <div className="additional-info">
                Progresso: {progress.toFixed(2)}
            </div>
        </article>
    );
}

export interface FilePreviewProps {
    url: string;
    file: Blob;
    urlToUpload?: string;
}
