import React, { useEffect, useState } from 'react';
import Container from '../../components/Card';
import Navbar from '../../components/Navbar';
import api from '../../configuration/api';
import './musica.css';

import './musica.css';
function Musica() {
  const BASE_URL_SERVICE = 'itens';
  const [musicas, setMusicas] = useState([]);

  function listarMusicas() {
    api
      .get(BASE_URL_SERVICE)
      .then((response) => {
        setMusicas(response.data);
      })
      .catch((error) => {
        console.log('Erro ao tentar recuperar músicas');
      });
  }

  useEffect(() => {
    listarMusicas();
  }, []);

  function tabelaMusica() {
    return (
      <>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Artista</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {musicas.map((musica) => {
              return (
                <>
                  <tr>
                    <th className="text-center" scope="row">
                      {musica.id}
                    </th>
                    <td>{musica.nome}</td>
                    <td>{musica.artista}</td>
                    <td>
                      <ul class="list-group list-group-horizontal">
                        <li className="action-item">
                          <i class="fas fa-pencil-alt"></i>
                        </li>

                        <li className="action-item">
                          <i class="fas fa-share-square"></i>
                        </li>

                        <li className="action-item">
                          <i class="fas fa-trash"></i>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <Container
        title="Músicas"
        content={musicas.length > 0 && tabelaMusica()}
      />
    </>
  );
}
export default Musica;
