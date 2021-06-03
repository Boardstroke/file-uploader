import { useRef } from "react";
import { useDragInDrop } from "../../hooks/useDragInDrop";
import "./home.scss";
export function Home() {
    const wrapperRef = useRef(null);
    const { dropDiv } = useDragInDrop({
        onDrop: (data: DataTransfer) => {
            console.log(data);
        },
        ref: wrapperRef,
    });
    return (
        <section className="home-page">
            <div className="wrapper" ref={wrapperRef}>
                {dropDiv || <h1>Home</h1>}
            </div>
        </section>
    );
}
