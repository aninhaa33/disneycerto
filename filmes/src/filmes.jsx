import  './filme.css'

// App.js
import React, { useState, useEffect } from 'react';
import { fetchFilmes } from './services/api';
import Animacao from './Componentes/animacao';
import LiveAction from './Componentes/liveaction';
import Premiados from './Componentes/premiados';
import CardFilme from './Componentes/cardfilmes';
import CardPremiados from './Componentes/cardPremiados';

const App = () => {
  const [animacoes, setAnimacoes] = useState([]);
  const [liveAction, setLiveAction] = useState([]);
  const [premiados, setPremiados] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('premiados');

  useEffect(() => {
    const carregaFilmes = async () => {
      try {
        const dadosFilmes = await fetchFilmes();
        setAnimacoes(dadosFilmes.Animacoes);
        setLiveAction(dadosFilmes.LiveAction);
        setPremiados(dadosFilmes.GanhadoresdoOscar);
      } catch (error) {
        console.error("Erro ao buscar filmes: ", error);
      }
    };

    carregaFilmes();
  }, []);

  const selecionaCategoria = (categoria) => {
    setCategoriaAtiva(categoria);
  };

  let conteudoFilmes;
  if (categoriaAtiva === 'premiados') {
    conteudoFilmes = <Premiados premiados={premiados} />;
  } else if (categoriaAtiva === 'liveAction') {
    conteudoFilmes = <LiveAction liveAction={liveAction} />;
  } else if (categoriaAtiva === 'animacoes') {
    conteudoFilmes = <Animacao animacoes={animacoes} />;
  }

  return (
    <div className="app-container">
      <h1>Lista de Filmes</h1>
      <div className="menu">
        <a 
          onClick={() => selecionaCategoria('premiados')} 
          className={categoriaAtiva === 'premiados' ? 'active' : ''}
        >
          Premiados
        </a>
        <a 
          onClick={() => selecionaCategoria('liveAction')} 
          className={categoriaAtiva === 'liveAction' ? 'active' : ''}
        >
          Live Action
        </a>
        <a 
          onClick={() => selecionaCategoria('animacoes')} 
          className={categoriaAtiva === 'animacoes' ? 'active' : ''}
        >
          Animações
        </a>
      </div>
      <img 
        src="logo.png" 
        alt="Descrição da imagem" 
        className="background-image" 
      />
      {conteudoFilmes}
    </div>
  );
};

export default App;