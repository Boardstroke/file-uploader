import { RefObject, useEffect, useState } from "react";

export function useDragInDrop(props: useDragInDropProps) {
    const { ref, onDrop } = props;
    const [isDragIn, setIsDragin] = useState(false);
    useEffect(() => {
        if (!ref?.current) return;

        ref.current.ondragenter = (event) => {
            event.preventDefault();
            setIsDragin(true);
            console.log("dragin");
        };
        ref.current.ondrop = (event) => {
            event.preventDefault();
        };
    }, [onDrop, ref]);
    const dropDiv = isDragIn && (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                border: "1px dashed rgba(0,0,0,0.5)",
            }}
            onDrop={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsDragin(false);
                onDrop(event.dataTransfer);
            }}
            onDragLeave={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsDragin(false);
            }}
            onDragOver={(event) => {
                event.preventDefault();
            }}
        >
            <small style={{ pointerEvents: "none" }}>
                Para fazer upload dos arquivos, arraste aqui
            </small>
        </div>
    );

    return { dropDiv };
}

export interface useDragInDropProps {
    ref: RefObject<HTMLDivElement> | null;
    onDrop: (data: DataTransfer) => void;
}
