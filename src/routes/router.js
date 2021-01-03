import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../views/home';
import Musica from '../views/musica';
import Repertorio from '../views/repertorio';

// PAGES

function Router() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/musicas" component={Musica} />
      <Route exact path="/repertorios" component={Repertorio} />
    </BrowserRouter>
  );
}
export default Router;