import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeContainer from "./Views/Home";
import NavBar from "./Views/Navbar";
import NotFound from "./Views/NotFound";

import "./Styles/Global.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route path="" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
