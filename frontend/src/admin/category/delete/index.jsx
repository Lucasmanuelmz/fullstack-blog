import axios from "axios";
import axiosInstance from "../../../axiosInstance/axiosinstance";

export default function DeleteCategory({id}) {

    function removeCategory(e) {
        e.preventDefault()
        axios.delete(`http://localhost:3000/category/${id}`, axiosInstance)
        .then(res => {
            if(res.status === 200) {
                console.log('Apagado com sucesso!')
            }
        }).catch(error => {
            console.log('ERRO: '+error.message)
        })
    }
    
    return(
        <form className="flex justify-center items-center ml-3" onSubmit={removeCategory}>
                <input
                    type='hidden'
                    value={id}
                    className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
                <div className="flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Apagar
                    </button>
                </div>
            </form>
    )
}