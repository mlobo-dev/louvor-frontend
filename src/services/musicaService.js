import api from '../configuration/api';
// import ErroValidacao from '../exceptions/ErroValidacao';
import { mensagemErro } from '../components/toastr';
const BASE_URI = '/musicas';

export async function buscarMusicaPeloId(idMusica) {
  return await api
    .get(`${BASE_URI}/${idMusica}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      mensagemErro(error.message);
    });
}

export async function buscarPeloNomeOuArtista(valorBusca) {
  return await api
    .get(`${BASE_URI}/buscar/${valorBusca}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      mensagemErro(error.message);
    });
}

export async function listarTudo() {
  return await api
    .get(BASE_URI)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      mensagemErro(error.message);
    });
}

export async function deletarPeloId(idMusica) {
  api.delete(`${BASE_URI}/${idMusica}`).catch((error) => {
    mensagemErro(error.message);
  });
}

// function validar(item) {
//   const erros = [];

//   if (!item.nome) {
//     erros.push('O campo nome é obrigatório');
//   }
//   if (!item.artista) {
//     erros.push('O campo Artista é obrigatório');
//   }
//   if (!item.categoria) {
//     erros.push('O campo nome é obrigatório');
//   }
//   if (!item.urlVideo && !item.urlAudio) {
//     erros.push('Informe pelo menos uma referência de Vídeo ou Áudio.');
//   }

//   if (erros && erros.length > 0) {
//     throw new ErroValidacao(erros);
//   }
// }
