import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeContainer from "./Views/Home";
import NavBar from "./Views/Navbar";
import NotFound from "./Views/NotFound";

import "./Styles/Global.scss";
import Account from "./Views/Account";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/account" component={Account} />
        <Route path="" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
