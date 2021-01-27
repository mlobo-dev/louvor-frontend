import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../views/home';
import Musica from '../views/musica';
import CadastroMusica from '../views/musica/cadastro';
import Repertorio from '../views/repertorio';
import CadastroRepertorio from '../views/repertorio/cadastro';

// PAGES

function Router() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/musicas" component={Musica} />
      <Route exact path="/musicas/cadastro" component={CadastroMusica} />
      <Route exact path="/musicas/cadastro/:id" component={CadastroMusica} />

      <Route exact path="/repertorios" component={Repertorio} />
      <Route
        exact
        path="/repertorios/cadastro"
        component={CadastroRepertorio}
      />
      <Route
        exact
        path="/repertorios/cadastro/:id"
        component={CadastroRepertorio}
      />
    </BrowserRouter>
  );
}
export default Router;
