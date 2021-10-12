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
import PackDetail from "./Views/PackDetail";
import CardDataProvider from "./Context/CardDataProvider";
import JoinDrop from "./Views/JoinDrop";
import OpenPack from "./Views/OpenPack";
import Collection from "./Views/Collection";
import MyPacks from "./Views/MyPacks";
import MyNft from "./Views/MyNft";
import CardAnimation from "./Views/CardAnimation";

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
            <Route exact path="/packs/:id" component={PackDetail} />
            <Route exact path="/join-drop" component={JoinDrop} />
            <Route exact path="/open-pack" component={OpenPack} />
            <Route exact path="/collection" component={Collection} />
            <Route exact path="/collection/packs" component={MyPacks} />
            <Route exact path="/collection/nft" component={MyNft} />
            <Route exact path="/card-animation" component={CardAnimation} />
            <Route path="" component={NotFound} />
          </Switch>
        </CardDataProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
