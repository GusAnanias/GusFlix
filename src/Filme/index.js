import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import './filme-info.css';
import api from "../services/api";

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: '07b04bd8dfac6115ff6aa7b0654a3321',
                    language: "pt-BR",
                }
            })
            //Se ele encontrar o filme ele cai dentro desse THEN
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            //Do contrario ele cai nesse console.log de filme não encontrado
            .catch(()=>{
                console.log("FILME NÃO ENCONTRADO")
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilme();

        return () => {
            console.log("COMPONENTE FOI DESMONTADO")
        }
    }, [navigate, id])

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />  

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>  
            <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

            <div className="area-buttons">
               <button>Salvar</button>
               <button>
                    <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button> 
            </div>
        </div>
    )
}

export default Filme;