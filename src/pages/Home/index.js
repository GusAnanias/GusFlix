import { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
    //Estamos passando dois parametros, utilizaremos o useState para guardar os valores nesses parametros
    const [filmes, setFilmes] = useState([]);
    //Estamos criando um loading aqui em baixo, passando um valor booleano (true)
    const [loading, setLoading] = useState(true);
    // Utilizaremos o useEffect para realizar uma ação com a função assincrona
    useEffect(() => {
    //Função assincrona, sendo chamada de loadFilmes
        async function loadFilmes() {
            //constante responde, que aguarda o valor (get) da API, em baixo passamos alguns parametros a mais
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: '07b04bd8dfac6115ff6aa7b0654a3321',
                    language: "pt-BR",
                    page: 1,
                }
            })

            //Pegamos o parametro do useState e armazenamos o resultado da API no setFilmes, pegando pelo campo results e filtrando de 0 a 10
            setFilmes(response.data.results.slice(0, 10))
            //Apos ele carregar os filmes ele muda o loading para false e exibe o catalogo
            setLoading(false);
        }
        //chamamos a função
        //quando formos usar essas informações iremos chamar pelo primeiro parametro do useState que é filme
        loadFilmes();
    }, [])

    //Se o loading for verdadeiro, ele mostra a div abaixo, caso contrario os filmes
    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        //é necessario passar um parametro key, aqui estamos passando com o id
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;