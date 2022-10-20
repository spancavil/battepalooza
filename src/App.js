import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { UserData } from "./Context/UserProvider";

import HomeContainer from "./Views/Home";
import Error404 from "./Views/Error404";
import SignUp2 from "./Views/Signup2";
import Verification from "./Views/Verification";
import NeedLogin from "./Views/NeedLogin";
import Collection from "./Views/Collection";
import CollectionDetail from "./Views/CollectionDetail";
import Privacy from "./Views/PrivacyAndTerms/Privacy";
import TermsOfUse from "./Views/PrivacyAndTerms/TermsOfUse";
import MarketPlace from "./Views/MarketPlace";
/* import MarketplaceDetail from "./Views/MarketplaceDetail"; */
import Drop from "./Views/Drop";
import DropDetail from "./Views/DropDetail";
import Profile from "./Views/Account";
import TradeHistory from "./Views/TradeHistory";
import Packs from "./Views/Packs";
import OpenPack from "./Views/OpenPack";
import Auth from "./Views/Auth";
/* import PackDetailV2 from "./Views/PackDetailV2"; */
import Navbar from "./Global-Components/Navbar";

import "./Styles/Global.scss";
import MarketplaceDetailV2 from "./Views/MarketplaceDetailV2";
import PackDetailV3 from "./Views/PackDetailV3";
import MaintenanceMessage from "./Global-Components/MaintenanceMessage";
import { MaintenanceData } from "./Context/MaintenanceProvider";

function App() {
  const { userData, error404 } = useContext(UserData);
  const { maintenance, setMaintenance } = useContext(MaintenanceData);

  console.log("mant", maintenance);

  return (
    <BrowserRouter>
      {!error404 && <Navbar />}
      {maintenance && <MaintenanceMessage />}
      <button
        style={{
          position: "fixed",
          bottom: 0,
          marginBottom: 10,
          marginLeft: 10,
          padding: "1rem",
          cursor: "pointer",
          zIndex: 10,
          background: "#f9a91f",
          border: "none",
          fontWeight: "bold",
          fontFamily: "Rubik",
          borderRadius: "0.5rem"
        }}
        onClick={() => setMaintenance(!maintenance)}
      >
        Switch maintenance
      </button>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/auth/:type" component={Auth} />
        <Route exact path="/signup" component={SignUp2} />
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
        <Route exact path="/drop" component={Drop} />
        <Route exact path="/drop/:id" component={DropDetail} />
        <Route exact path="/collection" component={Collection} />
        <Route exact path="/collection/:uuid" component={CollectionDetail} />
        <Route exact path="/privacy-policy" component={Privacy} />
        <Route exact path="/terms-of-service" component={TermsOfUse} />
        <Route exact path="/marketplace" component={MarketPlace} />
        <Route
          exact
          path="/marketplace/:nftId"
          component={MarketplaceDetailV2}
        />
        <Route exact path="/packs" component={Packs} />
        <Route exact path="/packs/:id" component={PackDetailV3} />
        <Route exact path="/open-pack" component={OpenPack} />
        <Route path="" component={Error404} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
