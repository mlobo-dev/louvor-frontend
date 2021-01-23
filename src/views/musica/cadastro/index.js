import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from '../../../configuration/api';
import Container from '../../../components/Card';
import Navbar from '../../../components/Navbar';
import * as messages from '../../../components/toastr';
import * as musicaService from '../../../services/musicaService';
import './cadastro-musica.css';
import { useSelector } from 'react-redux';

function CadastroMusica(props) {
  const [redirecionar, setRedirecionar] = useState(false);
  const [nome, setNome] = useState();
  const [artista, setArtista] = useState();
  const [categoria, setCategoria] = useState();
  const [urlVideo, setUrlVideo] = useState();
  const [urlAudio, setUrlAudio] = useState();
  const [urlCifra, setUrlCifra] = useState();
  const [idMusica, setIdMusica] = useState(props.match.params.id);
  const email = useSelector((state) => state.usuarioEmail);

  useEffect(() => {
    carregarMusica();
  }, []);

  async function carregarMusica() {
    if (idMusica) {
      const data = await musicaService.buscarMusicaPeloId(idMusica);
      setIdMusica(data.id);
      setNome(data.nome);
      setCategoria(data.categoria);
      setArtista(data.artista);
      setUrlAudio(data.urlAudio);
      setUrlCifra(data.urlCifra);
      setUrlVideo(data.urlVideo);
    }
  }

  function salvar() {
    api
      .post('/musicas', {
        id: idMusica ? idMusica : null,
        nome: nome,
        artista: artista,
        categoria: categoria,
        urlAudio: urlAudio,
        urlCifra: urlCifra,
        urlVideo: urlVideo,
        emailUsuario: email,
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
            <div className="form-group col-md-12">
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
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputArtista">Artista/Banda</label>
              <input
                type="text"
                className="form-control"
                value={artista}
                id="inputArtista"
                placeholder="nome da banda e/ou artista"
                onChange={(e) => setArtista(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputSelect">Categoria</label>
              <select
                className="custom-select"
                id="inputSelect"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option selected disabled>
                  Escolha a categoria
                </option>
                <option value="TEMA_1">One</option>
                <option value="TEMA_2">Two</option>
                <option value="TEMA_3">Three</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-4">
              <label htmlFor="inputUrlVideo">URL Vídeo</label>
              <input
                type="text"
                className="form-control"
                id="inputUrlVideo"
                value={urlVideo}
                placeholder="URL do video no Youtube"
                onChange={(e) => setUrlVideo(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputUrlMp3">URL Audio Mp3</label>
              <input
                type="text"
                className="form-control"
                id="inputUrlMp3"
                value={urlAudio}
                placeholder="Para download do audio se houver"
                onChange={(e) => setUrlAudio(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputCifra">URL da Cifra</label>
              <input
                type="text"
                className="form-control"
                id="inputCifra"
                value={urlCifra}
                placeholder="URL do Cifra Club"
                onChange={(e) => setUrlCifra(e.target.value)}
              />
            </div>
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
        <Container title="Cadastro de Músicas" content={formCadastro()} />
      </div>
    </>
  );
}
export default CadastroMusica;
