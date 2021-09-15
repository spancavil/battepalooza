import {BrowserRouter, Switch, Route} from 'react-router-dom'
import NavBar from './components/NavBar';
import HomeContainer from './Containers/HomeContainer';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Switch>
        <Route exact path ="/" component ={HomeContainer}/>
        <Route path = "" component = {NotFound}/> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
