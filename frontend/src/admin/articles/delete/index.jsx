import axios from "axios";
import { useState } from "react"
import axiosInstance from "../../../axiosInstance/axiosinstance";

export default function DeleteArticle({articleId}) {
    const [id, setId] = useState(articleId);

    function deleteArticle(e) {
        e.preventDefault()
         axios.delete(`http://localhost:3000/article/${id}`, axiosInstance)
         .then(response => {
            if(response.status === 200) {
                console.log('Apagado com sucesso!')
            }
         }).catch(error => {
            console.log(error.message)
         })
      }
    

    return(
        <form onSubmit={deleteArticle}>
            <input type="hidden" name="id" value={id} onChange={e => setId(e.target.value)} />
            <button type="submit" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                apagar
            </button>
        </form>
    )
}