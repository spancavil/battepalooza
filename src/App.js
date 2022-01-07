import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomeContainer from './Views/Home';
import NavBar from './Views/Navbar';
import Error404 from './Views/Error404';
import Account from './Views/Account';
import SignUp from './Views/SignUp';
import Login from './Views/Login';
import Verification from './Views/Verification';
import NeedLogin from './Views/NeedLogin';
import Collection from "./Views/Collection";
import ToMarketplace from './Views/ToMarketplace';
import Privacy from './Views/PrivacyAndTerms/Privacy';
import TermsOfUse from './Views/PrivacyAndTerms/TermsOfUse';
import MarketPlace from './Views/MarketPlace';
import MarketplaceDetail from './Views/MarketplaceDetail';
import {useContext} from 'react';
import {UserData} from './Context/UserProvider';
import Drop from './Views/Drop';
import DropDetail from './Views/DropDetail';

import './Styles/Global.scss';

function App () {
  const {userData, error404} = useContext (UserData);

  return (
    <BrowserRouter>
      {!error404 && <NavBar />}
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/verification" component={Verification} />
        <Route exact path="/needlogin" component={NeedLogin} />
        <Route exact path="/account">
          {Object.keys (userData).length === 0 ? <NeedLogin /> : <Account />}
        </Route>
        {/* <Route exact path="/packs" component={Packs} />
        <Route exact path="/packs/:id" component={PackDetail} />
        <Route exact path="/join-drop" component={JoinDrop} />
        <Route exact path="/open-pack" component={OpenPack} /> */}
        {/* <Route exact path="/my-packs" component={MyPacks} />
        <Route exact path="/my-skins" component={MyNfts} /> */}
        {/* <Route exact path="/card-animation" component={CardAnimation} /> */}
        <Route exact path="/drop" component={Drop} />
        <Route exact path="/drop/:id" component={DropDetail} />
        <Route exact path="/collection" component={Collection} />
        <Route exact path="/to-marketplace/:id" component={ToMarketplace} />
        <Route exact path="/privacy-policy" component={Privacy} />
        <Route exact path="/terms-of-use" component={TermsOfUse} />
        <Route exact path="/marketplace" component={MarketPlace} />
        <Route exact path="/marketplace/:nftId" component={MarketplaceDetail} />
        <Route path="" component={Error404} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
