import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Card';
import Navbar from '../../components/Navbar';
import { mensagemSucesso } from '../../components/toastr';
import * as service from '../../services/repertorioService';
import './repertorio.css';
function Repertorio() {
  const [repertorios, setRepertorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [repertorioDeletar, setRepertorioDeletar] = useState();
  const [musicas, setMusicas] = useState([]);

  async function listarMusicas() {
    setLoading(true);
    const musicasResult = await service.listarTudo();
    setTimeout(() => {
      setRepertorios(musicasResult);
      setLoading(false);
    }, 1000);
  }

  async function deletar() {
    service.deletarPeloId(repertorioDeletar.id);
    setRepertorios(
      repertorios.filter((musica) => musica.id !== repertorioDeletar.id)
    );
    mensagemSucesso('Musica deletada com sucesso!');
  }

  function renderTable() {
    return (
      <table className="table table-striped table-bordered table-hover content-table">
        <thead>
          <tr key={0}>
            <th scope="col" className="text-center">
              #
            </th>
            <th scope="col">Nome</th>
            <th scope="col">Músicas</th>
            <th scope="col">Data Ministração</th>
            <th scope="col" className="text-center">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {repertorios.map((repertorio) => {
            return (
              <>
                <tr key={repertorio.id}>
                  <th className="text-center" scope="row" name="idColumn">
                    {repertorio.id}
                  </th>
                  <td>{repertorio.nome}</td>
                  <td>
                    {repertorio.musicas.map((musica) => (
                      <Link to={`musicas/cadastro/${musica.id}`}>
                        <button
                          type="button"
                          class="btn btn-outline-primary btn-sm btn-musica"
                        >
                          {musica.nome}
                        </button>
                      </Link>
                    ))}
                  </td>
                  <td>{repertorio.dataExecucao}</td>
                  <td className="action-itens">
                    <Link to={`musicas/cadastro/${repertorio.id}`}>
                      <i className="fas fa-pencil-alt"></i>
                    </Link>

                    <Link>
                      <i
                        id={repertorio.id}
                        onClick={(e) => service.buscarPeloId(e.target.id)}
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

  function tabelaRepertorios() {
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
        title="Repertórios"
        menu={menuContainer()}
        content={tabelaRepertorios()}
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
              {repertorioDeletar &&
                `Realmente deseja excluir a música ${repertorioDeletar.nome}?`}
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
export default Repertorio;
