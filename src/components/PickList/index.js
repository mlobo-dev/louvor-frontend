import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as musicaService from '../../services/musicaService';
import './picklist.css';

function PickList({
  opcoes,
  opcoesTitle,
  selecionadas,
  selecionadasTitle,
  acaoOpcoes,
  acaoSelecionadas,
}) {
  async function adicionarItemSelecionado(id) {
    if (id) {
      opcoes = opcoes.filter((musica) => musica.id !== id);
      selecionadas.push(await musicaService.buscarMusicaPeloId(id));
      acaoOpcoes(opcoes);
      acaoSelecionadas(selecionadas);
    }
  }

  function renderizarListas() {
    return (
      <>
        <div className="main-container row mx-auto">
          <div className="list-container col-md-4 col-xs-12 col-sm-12">
            <h3 className="list-title text-center">{opcoesTitle}</h3>
            {opcoes &&
              opcoes.map((musica) => (
                <>
                  <div className="list-item">
                    <li
                      id={musica.id}
                      onClick={(e) => adicionarItemSelecionado(e.target.id)}
                      class="list-group-item list-group-item-action "
                    >
                      {musica.nome}
                    </li>
                  </div>
                </>
              ))}
          </div>

          <div className="list-container col-md-4 col-xs-12 col-sm-12">
            <h3 className="list-title text-center">{selecionadasTitle}</h3>
            {selecionadas &&
              selecionadas.map((musica) => (
                <>
                  <ul>
                    <div className="list-item">
                      <li
                        id={musica.id}
                        class="list-group-item list-group-item-action "
                      >
                        {musica.nome}
                      </li>
                    </div>
                  </ul>
                </>
              ))}
          </div>
        </div>
      </>
    );
  }
  return renderizarListas();
}

export default PickList;
