import ApiService from '../apiservice';
import api from '../configuration/api';
import ErroValidacao from '../exceptions/ErroValidacao';

function MusicaService() {
  function obterCategorias() {
    return [
      { label: 'Selecione', value: '' },
      { label: 'Categoria 1', value: 'CATEGORIA_1' },
      { label: 'Categoria 2', value: 'CATEGORIA_2' },
      { label: 'Categoria 3', value: 'CATEGORIA_3' },
    ];
  }

  function salvar(item) {
    return this.post('/', item);
  }

  function buscar(texto) {
    return this.get(`/buscar/${texto}`);
  }

  function buscarPeloNome(nome) {
    return this.get(`/buscar/nome/${nome}`);
  }

  function validar(item) {
    const erros = [];

    if (!item.nome) {
      erros.push('O campo nome é obrigatório');
    }
    if (!item.artista) {
      erros.push('O campo Artista é obrigatório');
    }
    if (!item.categoria) {
      erros.push('O campo nome é obrigatório');
    }
    if (!item.urlVideo && !item.urlAudio) {
      erros.push('Informe pelo menos uma referência de Vídeo ou Áudio.');
    }

    if (erros && erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  }
}

export default MusicaService;
