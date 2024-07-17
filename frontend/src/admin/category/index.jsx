import { useState } from "react";
import axiosInstance from "../../axiosInstance/axiosinstance";
import axios from "axios";

export default function CreateNewCategory() {
  const [newCategory, setCategory] = useState({category: ''});

  function handleChange(e) {
    const {name, value} = e.target;
    setCategory(prevCat => ({
      ...prevCat,
      [name]: value
    }))
  }

  async function createCategory(e) {
    e.preventDefault()
    try {
      const response = await axios.post(`http://localhost:3000/category`, newCategory, axiosInstance);
      if(response.status === 200) {
        console.log('Categoria foi adicionada com sucesso!')
      } else ('Por algum motivo, nao conseguimos adicionar a nova categoria')
    }catch(error) {
      console.log(error.message)
    }
  }
 
    return (
      <form className="container mx-auto max-w-7xl py-5" onSubmit={createCategory}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Nova categoria:</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
            Utilize este campo para criar categorias para seus artigos. A categoria deve capturar a essência e o tema central do que você deseja compartilhar no seu blog.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                  Titulo da categoria
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="category"
                      value={newCategory.category || ''}
                      onChange={handleChange}
                      name="category"
                      type="text"
                      placeholder="Digite o titulo da sua categoria"
                      autoComplete="category"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
  
             </div>
             </div>
             </div>
  
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            guardar categoria
          </button>
        </div>
       
      </form>
    )
  }
  