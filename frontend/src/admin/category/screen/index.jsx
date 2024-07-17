import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance/axiosinstance";
import axios from "axios";
import {Link} from 'react-router-dom';

export default function GetCategoriesInScreen() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getCategory() {
        try{
            const response = await axios.get('http://localhost:3000/categories', axiosInstance);
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
        <nav className="container flex justify-between items-center">
            {categories.map((category, key) => (
            <div key={key}>  
            <Link to='#'>{category.category}</Link>
            </div>
            ))
            }
           
        </nav>
    )
}