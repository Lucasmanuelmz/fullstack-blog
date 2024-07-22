import axios from "axios"
import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance/axiosinstance";
import DeleteArticle from "../delete";
import { Link } from "react-router-dom";

export default function DisplayArticle() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
    async function displayArticle() {
        try{
            const response = await axios.get('http://localhost:3000/articles', axiosInstance);
            if(response.status === 200) {
                const articles = await response.data.articles;
                setArticles(articles)
            }
        }catch(error) {
            console.log(error.message)
        }
    }
    displayArticle()
    },[])
   
    return(
        <>
        {articles.length > 0?(
            <div>
            {articles.map((article, key)=> (
              <div key={key} className="container mb-2">
                <Link to={`/article/${article.id}`}>{article.title}</Link>
              <DeleteArticle articleId ={article.id} />
              </div>
            ))}
            </div>  
        ): (
            <p>Nenhum artigo foi encontrado</p>
        )
        }
       </>   
    )
}