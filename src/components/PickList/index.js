import React from 'react';
import { Link } from 'react-router-dom';
import './picklist.css';

function PickList({ opcoes, onClickOpcoes, selecionadas }) {
  return (
    <>
      <div className="main-container row mx-auto">
        <div className="list-container col-md-4 col-xs-12 col-sm-12">
          <h3 className="list-title text-center">Disponíveis</h3>
          {opcoes &&
            opcoes.map((musica) => (
              <>
                <div className="list-item">
                  <li
                    id={musica.id}
                    onClick={(e) => onClickOpcoes()}
                    class="list-group-item list-group-item-action "
                  >
                    {musica.nome}
                  </li>
                </div>
              </>
            ))}
        </div>

        <div className="list-container col-md-4 col-xs-12 col-sm-12">
          <h3 className="list-title text-center">Selecionadas</h3>
          {selecionadas &&
            selecionadas.map((musica) => (
              <>
                <ul>
                  <div className="list-item">
                    <li
                      id={musica.id}
                      onClick={(e) => onClickOpcoes()}
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

export default PickList;
