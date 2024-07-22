import axios from "axios";
import {useEffect, useState } from "react"
import axiosInstance from "../../../axiosInstance/axiosinstance";
import { useParams } from "react-router-dom";

export default function UpdateCategory() {
    const [update, setUpdate] = useState({category: ''});
    const {id} = useParams()

    useEffect(() => {
        async function getCategory() {
            try{
                const response = await axios.get(`http://localhost:3000/category/${id}`, axiosInstance)
                if(response.status === 200) {
                    const category = await response.data.category;
                    setUpdate(category)
                }
            }catch(error) {
                console.log(error.message)
            }
        }
        getCategory()
    },[id])
     
   function handleUpdate(e) {
        e.preventDefault()
        axios.put(`http://localhost:3000/category/${update.id}`, update, axiosInstance)
        .then((update) => {
            if(update.status === 200) {
                 console.log('Categoria atualizada com sucesso!')
            }
        }).catch(error => {
            console.log('Nao foi possivel atualizar a categoria '+error.message)
        })
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setUpdate(prev => ({
         ...prev,
         [name]: value
        }))
    }
    return(
        <>
        <form onSubmit={handleUpdate} className="flex items-center ml-3" >
            <div className=" flex items-center gap-x-6">
            <input
              className="mr-6 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
              type="text"
              name="category"
              value={update.category}
               onChange={handleChange}
                />
                <button
                    type="submit"
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                     >
                            Atualizar
                        </button>
                    </div>
                </form>
        </>
    )
}