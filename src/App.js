import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeContainer from "./Views/Home";
import NavBar from "./Views/Navbar";
import NotFound from "./Views/NotFound";
import Account from "./Views/Account";
import SignUp from "./Views/SignUp";
import Login from "./Views/Login";
import Verification from "./Views/Verification";
import NeedLogin from "./Views/NeedLogin";
import "./Styles/Global.scss";
import UserProvider from "./Context/UserProvider";
import Packs from "./Views/Packs";
import CardDataProvider from "./Context/CardDataProvider";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CardDataProvider>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/verification" component={Verification} />
            <Route exact path="/needlogin" component={NeedLogin} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/packs" component={Packs} />
            <Route path="" component={NotFound} />
          </Switch>
        </CardDataProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
