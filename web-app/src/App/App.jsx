import '../App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import AR from "../pages/AR/AR"

function App() {
  return (
      <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/home" component={HomePage} />
                    <Route exact path="/ar" component={AR} />
                    <Route exact path="/about" component={HomePage} />
                    <Route path="*" component={() => "404 NOT FOUND"} />
                </Switch>
      </Router>
  );
}

export default App;
