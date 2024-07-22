import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import {useEffect, useRef, useState } from "react";
import axiosInstance from "../../../axiosInstance/axiosinstance";
import { useParams } from "react-router-dom";

 export default function UpdateArticle() {
  const editorRef = useRef(null);
const [article, setArticle] = useState({
  title: '',
  body: '',
  categoryId: ''
});
const [categories, setCategories] = useState([]);
const {id} = useParams()



useEffect(() => {
async function myCategories() {
  try{
    const response = await axios.get('http://localhost:3000/categories', axiosInstance);
    if(response.status === 200) {
      const categories = await response.data.categories;
      setCategories(categories);
    }
  }catch(error) {
    console.log(error.message)
  }
}
myCategories()

async function getArticleToUpdate() {

    try{
        const response = await axios.get(`http://localhost:3000/article/${id}`, axiosInstance)
        if(response.status === 200) {
            const article = await response.data.article;
            setArticle(article)
        }
    }catch(error) {
        console.log(error.message)
    }
   
}
getArticleToUpdate()
},[id])

function handleChange(e) {
  const {name, value} = e.target;
  setArticle(prev => ({
    ...prev,
    [name]: value
  }))
}

function handleSubmit(e) {
  e.preventDefault()
  const content = editorRef.current.getContent()
  setArticle(prev => ({
    ...prev,
    body: content
  }))
  axios.put(`http://localhost:3000/article/${article.id}`, article, axiosInstance)
  .then(response => {
    if(response.status === 200) {
      console.log('Artigo cadastrado com sucesso')
    }
  })
  .catch(error => {
    console.log(error.message)
  })
}

return (
    <form onSubmit={handleSubmit} className="container mx-auto max-w-7xl py-5">
      {article?(
        <>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Título do Artigo:</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
          Utilize este campo para definir o título principal do seu artigo. O título deve capturar a essência e o tema central do que você deseja compartilhar.
          </p>

          <h2 className="text-base font-semibold leading-7 text-gray-900">Corpo do Artigo:</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
          Este é o espaço onde você desenvolve o conteúdo do seu artigo. Você pode escrever parágrafos, adicionar listas, inserir imagens, e qualquer outro elemento que enriqueça o seu texto.
          </p>
         
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Titulo do artigo
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="title"
                    name="title"
                    value={article.title}
                    onChange={handleChange}
                    type="text"
                    placeholder="Digite o titulo do seu artigo"
                    autoComplete="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Corpo do artigo
              </label>
              <div className="mt-2">
              <Editor
          apiKey='8d1v1qdgpz4dpvymqmk87cec15ji2wiho2yme8ue8qg2432o'
          onInit={(_evt, editor) => editorRef.current = editor}
          initialValue={article.body || "<p>Digite o seu artigo neste espaco.</p>"}
          init={{
            height: 500,
            menubar: false,

            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        /> 
        
              </div>
            </div>
           </div>
           </div>
          
           </div>
       
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Categorias
              </label>
              <div className="mt-2">
                {categories.length > 0? (
                <select
                  id="category"
                  name="categoryId"
                  autoComplete="category-name"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                > 
                {categories.map((category) => ( 
                  <option key={category.id} value={category.id}>{category.category || ''}</option>
                ))}  
                </select> 
                ): (<p>Nemhuma categoria foi encontrada</p>)}
              </div>
            </div>
           

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          guardar artigo
        </button>
      </div>
      </>
     ): (
        <p>Nenhum artigo encontrado</p>
     )}
    </form>
  )
}
