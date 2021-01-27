import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from '../../../configuration/api';
import Container from '../../../components/Card';
import Navbar from '../../../components/Navbar';
import * as messages from '../../../components/toastr';
import * as musicaService from '../../../services/musicaService';
import './cadastro.css';
import { useSelector } from 'react-redux';
import PickList from '../../../components/PickList';

function CadastroRepertorio(props) {
  const [redirecionar, setRedirecionar] = useState(false);
  const [nome, setNome] = useState();
  const [observacoes, setObservacoes] = useState();
  const [musicas, setMusicas] = useState([]);
  const [musicasSelecionadas, setMusicasSelecionadas] = useState([]);
  const [dataExecucao, setDataExecucao] = useState();
  const [idRepertorio, setIdRepertorio] = useState(props.match.params.id);
  const email = useSelector((state) => state.usuarioEmail);

  useEffect(() => {
    atualizarOpcoes();
  }, []);

  async function carregarMusica() {
    if (idRepertorio) {
      const data = await musicaService.buscarMusicaPeloId(idRepertorio);
      setIdRepertorio(data.id);
      setNome(data.nome);
      setObservacoes(data.observacoes);
      setMusicas(data.musicas);
    }
  }

  async function atualizarOpcoes(valorProcurado) {
    if (valorProcurado) {
      const musicas = await musicaService.buscarPeloNomeOuArtista(
        valorProcurado
      );
      console.log(musicas);
      setMusicas(musicas);
    }
  }

  function adicionarMusicaSelecionada(e) {
    debugger;
    alert('assd', e);
    // setMusicas(musicas.filter((musica) => musica.id !== musicaSelecionada.id));
    // setMusicasSelecionadas(musicaSelecionada, ...musicasSelecionadas);
  }
  function salvar() {
    api
      .post('/repertorios', {
        id: idRepertorio ? idRepertorio : null,
        nome: nome,
        observacoes: observacoes,
        emailUsuario: email,
        musicas: musicas,
      })
      .then(() => {
        messages.mensagemSucesso('salvo com sucesso!');
        setRedirecionar(true);
      })
      .catch((error) => {
        messages.mensagemErro(
          'Não foi possível salvar a música: ' + error.message
        );
      });
  }

  function formCadastro() {
    return (
      <>
        {redirecionar && <Redirect to="/musicas" />}
        <form>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputNome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="inputNome"
                value={nome}
                placeholder="informe o nome da música"
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="inputNome">Data Ministração</label>
              <input
                type="date"
                className="form-control"
                id="inputData"
                value={nome}
                placeholder="informe o nome da música"
                onChange={(e) => setDataExecucao(e.target.value)}
              />
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="inputNome">Pesquisar musicas</label>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Começe a digitar o nome de uma música ou cantor/artista/ministério"
                aria-label="Search"
                onChange={(e) => atualizarOpcoes(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="pick-list-area"></div>

            <PickList
              opcoes={musicas}
              onClickOpcoes={adicionarMusicaSelecionada}
              selecionados={musicasSelecionadas}
            />
          </div>

          <div className="buttons-group">
            <button
              type="button"
              className="btn btn-secondary mr-2 btn-cadastro"
              onClick={salvar}
            >
              Salvar
            </button>

            <Link
              className="btn btn-secondary mr-2 btn-cadastro"
              to={'/musicas'}
            >
              Voltar
            </Link>
          </div>
        </form>
      </>
    );
  }

  return (
    <>
      {!useSelector((state) => state.usuarioLogado) && <Redirect to="/" />}
      <Navbar />
      <div>
        <Container title="Cadastro de Repertório" content={formCadastro()} />
      </div>
    </>
  );
}
export default CadastroRepertorio;
