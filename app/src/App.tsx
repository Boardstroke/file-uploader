import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/home/Home";
export function App() {
    return (
        <Router>
            <Switch>
				<Route path="/" component={Home}/>
            </Switch>
        </Router>
    );
}
