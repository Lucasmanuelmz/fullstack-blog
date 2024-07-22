import axios from "axios";
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";


export default function HomePage() {
    const [categories, setCategories] = useState({});
    const [articles, setArticles] = useState([])
    const [article, setArticle] = useState([])
    const {slug} = useParams()
    console.log('Categoria: ' +Object.keys(categories));
    console.log('Artigos: '+articles)

    useEffect(() => {
        async function articlesIndex() {
            try{
                const response = await axios.get(`http://localhost:3000/categ/${slug}`);
                if(response.status === 200) {
                    const categories = await response;
                    const articles = await response.data;
                    setCategories(categories);
                    setArticles(articles)
                }
            }catch(error) {
                console.log(error.message)
            }

            try{
                const response = await axios.get('http://localhost:3000');
                if(response.status === 200) {
                    setArticle(response.data.articles);
                }
            }catch(error) {
                console.log('Erro: '+error.message)
            }
        }
        articlesIndex()
    },[slug])
    return(
        <div className="container mx-auto max-w-max px-3 py-5">
            {article? (
            <>
            {article.map(art => (
            <div key={art.id} className="mb-2">
                <Link to={`/${art.slug}`}>{art.title}</Link>
            </div>
    
            ))}
            </>
            ) : (
            <p>Artigo nao encontrado</p> 
            )}
            <>
            {articles? (
             <div>
                {articles.map(article => {
                <div key={article.id}>
                    <Link to='#'>{article.title}</Link>
                </div>
                })}
             </div>
            ): (
               <p>artigo nao encontrado</p>
            )}
        </>
    </div>
    )
}