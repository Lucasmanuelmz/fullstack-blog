import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ReadingPage() {
    const [readArticle, setReadArticle] = useState();
    const {slug} = useParams();

    useEffect(() => {
    async function articleReading() {
        try{
            const read = await axios.get(`http://localhost:3000/${slug}`);
            if(read.status === 200) {
                const article = await read.data.article;
                setReadArticle(article);
            }
        }catch(error) {
            console.log(error.message)
        }
    }
    articleReading()
},[slug])
    return(
        <div>
            
            {readArticle? (
                <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8" >
                    <h2 className="mt-2 mb-8 text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4x">{readArticle.title}</h2>
                    <div className="prose" dangerouslySetInnerHTML={{__html: readArticle.body}} />
                </div>
                </div>
            ): (
                <p>Nenhum artigo encontrado</p>
            )}
        </div>
        
    )
}