import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance/axiosinstance";
import axios from "axios";
import CategoryUpdate from "../update";
import DeleteCategory from "../delete";

export default function DisplayCategories() {
    const [categories, setCategories] = useState([]);
    const [displayed, setDisplayed] = useState(false);

    function verifyEdition() {
        if(displayed) {
            setDisplayed(false)
        } else {
            setDisplayed(true)
        }
    }

    useEffect(() => {
      async function getCategory() {
        try{
          const response = await axios.get(`http://localhost:3000/categories`, axiosInstance);
          if(response.status === 200) {
           const allCategories =response.data.categories;
           setCategories(allCategories);
          }
        }catch(error) {
            console.log({Erro: 'Nao foi possivel obter categorias '+error.message})
        }
       
    }
    
    getCategory()
    },[])

    return(
        <nav className="container block">
    {categories.map((oneCategory, key) => (
        <div className="flex justify-start border py-4 mb-3 rounded-md px-4 max-w-max items-center " key={key}>
            {displayed === false ? (
                <div className="grid gap-x-2 min-w-80 grid-cols-3 justify-between w-full">
                    <p className="mr-6 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none">{oneCategory.category}</p>
                    <button className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600" onClick={verifyEdition}>
                        Editar
                    </button>
                </div>
            ) : (
            <CategoryUpdate updateCategory = {oneCategory.category} categoryId={oneCategory.id}/>
            )}
            <DeleteCategory id ={oneCategory.id}/>
        </div>
    ))}            

</nav>
)}
