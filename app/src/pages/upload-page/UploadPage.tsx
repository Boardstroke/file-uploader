import { useRecoilState } from "recoil";
import { filesState } from "../../states/files";

export function UploadPage() {
    const [files, setFiles] = useRecoilState(filesState);
    return <section className="upload-page">{JSON.stringify(files)}</section>;
}
