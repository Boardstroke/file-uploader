import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Home } from "./pages/home/Home";
import { UploadPage } from "./pages/upload-page/UploadPage";
export function App() {
    return (
        <RecoilRoot>
            <Router>
                <Switch>
                    <Route path="/upload" component={UploadPage} />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        </RecoilRoot>
    );
}
