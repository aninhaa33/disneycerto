// services/api.js
export const fetchFilmes = async () => {
  try {
    const response = await fetch('./filmes.json'); // Ajuste o caminho conforme necessário
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar filmes: ", error);
    throw error; // Lança o erro para que ele possa ser tratado no componente que chama fetchFilmes
  }
};
