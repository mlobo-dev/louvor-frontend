import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Card';
import Navbar from '../../components/Navbar';
import { mensagemSucesso } from '../../components/toastr';
import * as musicaService from '../../services/musicaService';
import './musica.css';

import './musica.css';
function Musica() {
  const [musicas, setMusicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [musicaDeletar, setMusicaDeletar] = useState();

  async function listarMusicas() {
    setLoading(true);
    const musicasResult = await musicaService.listarTudo();
    setTimeout(() => {
      setMusicas(musicasResult);
      setLoading(false);
    }, 1000);
  }

  async function buscarMusicaPeloId(idMusica) {
    setMusicaDeletar(await musicaService.buscarMusicaPeloId(idMusica));
  }

  async function deletar() {
    musicaService.deletarPeloId(musicaDeletar.id);
    mensagemSucesso('Musica deletada com sucesso!');
    listarMusicas();
    renderTable();
  }

  function renderTable() {
    return (
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr key={0}>
            <th scope="col" className="text-center">
              #
            </th>
            <th scope="col">Nome</th>
            <th scope="col">Artista</th>
            <th scope="col" className="text-center">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {musicas.map((musica) => {
            return (
              <>
                <tr key={musica.id}>
                  <th className="text-center" scope="row" name="idColumn">
                    {musica.id}
                  </th>
                  <td>{musica.nome}</td>
                  <td>{musica.artista}</td>
                  <td className="action-itens">
                    <Link to={`musicas/cadastro/${musica.id}`}>
                      <i className="fas fa-pencil-alt"></i>
                    </Link>

                    <Link>
                      <i className="fas fa-share-square"></i>
                    </Link>

                    <Link>
                      <i
                        id={musica.id}
                        onClick={(e) => buscarMusicaPeloId(e.target.id)}
                        data-toggle="modal"
                        data-target="#exampleModal"
                        className="fas fa-trash"
                      ></i>
                    </Link>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    );
  }

  useEffect(() => {
    listarMusicas();
  }, []);

  function tabelaMusica() {
    return (
      <>
        {loading ? (
          <div className="spinner-border text-danger loading" role="status">
            <span className="sr-only ">Loading...</span>
          </div>
        ) : (
          renderTable()
        )}
      </>
    );
  }

  function menuContainer() {
    return (
      <>
        <button type="button" className="btn btn-secondary mr-2 btn-cadastro">
          <Link className="text-white " to="/musicas/cadastro">
            Adicionar
          </Link>
        </button>
      </>
    );
  }
  return (
    <>
      <Navbar />

      <Container
        title="Músicas"
        menu={menuContainer()}
        content={tabelaMusica()}
      />

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Confirmação de Exclusão
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {musicaDeletar &&
                `Realmente deseja excluir a música ${musicaDeletar.nome}?`}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                data-dismiss="modal"
                className="btn btn-danger"
                onClick={() => deletar()}
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Musica;
