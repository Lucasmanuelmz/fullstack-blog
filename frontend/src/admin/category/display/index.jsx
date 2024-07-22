import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance/axiosinstance";
import axios from "axios";
import DeleteCategory from "../delete";
import {Link} from 'react-router-dom';

export default function DisplayCategories() {
    const [categories, setCategories] = useState([]);

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
    {categories.map((category, key) => (
        <div className="flex justify-start border py-4 mb-3 rounded-md px-4 max-w-max items-center " key={key}>
            <div className="grid gap-x-2 min-w-80 grid-cols-3 justify-between w-full">
                <Link to={`/category/${category.id}`}>{category.category}</Link>
        </div>
        <DeleteCategory id={category.id} />
        </div>
    ))}            

</nav>
)}
