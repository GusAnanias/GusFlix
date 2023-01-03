
import axios from "axios";

// Base da URL : https://api.themoviedb.org/3/
// URL da API : https://api.themoviedb.org/3/movie/now_playing?api_key=07b04bd8dfac6115ff6aa7b0654a3321&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;