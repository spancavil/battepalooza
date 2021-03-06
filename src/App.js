import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { UserData } from "./Context/UserProvider";

import HomeContainer from "./Views/Home";
import NavBar from "./Views/Navbar";
import Error404 from "./Views/Error404";
import SignUp from "./Views/SignUp";
import Login from "./Views/Login";
import Verification from "./Views/Verification";
import NeedLogin from "./Views/NeedLogin";
import Collection from "./Views/Collection";
import CollectionDetail from "./Views/CollectionDetail";
import Privacy from "./Views/PrivacyAndTerms/Privacy";
import TermsOfUse from "./Views/PrivacyAndTerms/TermsOfUse";
import MarketPlace from "./Views/MarketPlace";
import MarketplaceDetail from "./Views/MarketplaceDetail";
/* import Drop from "./Views/Drop";
import DropDetail from "./Views/DropDetail"; */
import Profile from "./Views/Account";
import TradeHistory from "./Views/TradeHistory";

import "./Styles/Global.scss";
import Packs from "./Views/Packs";
import PackDetail from "./Views/PackDetail";
import OpenPack from "./Views/OpenPack";
/* import JoinDrop from "./Views/JoinDrop";
import OpenPack from "./Views/OpenPack"; */

function App() {
  const { userData, error404 } = useContext(UserData);

  return (
    <BrowserRouter>
      {!error404 && <NavBar />}
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/verification" component={Verification} />
        <Route exact path="/needlogin" component={NeedLogin} />
        <Route exact path="/account/profile">
          {Object.keys(userData).length === 0 ? <NeedLogin /> : <Profile />}
        </Route>
        <Route exact path="/account/trade-history">
          {Object.keys(userData).length === 0 ? (
            <NeedLogin />
          ) : (
            <TradeHistory />
          )}
        </Route>
        {/* <Route exact path="/drop" component={Drop} />
        <Route exact path="/drop/:id" component={DropDetail} /> */}
        <Route exact path="/collection" component={Collection} />
        <Route exact path="/collection/:uuid" component={CollectionDetail} />
        <Route exact path="/privacy-policy" component={Privacy} />
        <Route exact path="/terms-of-service" component={TermsOfUse} />
        <Route exact path="/marketplace" component={MarketPlace} />
        <Route exact path="/marketplace/:nftId" component={MarketplaceDetail} />
        <Route exact path="/packs" component={Packs} />
        <Route exact path="/packs/:id" component={PackDetail} />
        {/* <Route exact path="/join-drop" component={JoinDrop} /> */}
        <Route exact path="/open-pack" component={OpenPack} />
        <Route path="" component={Error404} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
