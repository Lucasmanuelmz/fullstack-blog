import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance/axiosinstance";
import { Link, useNavigate } from "react-router-dom";

export default function UserSettings() {

    const [userData, setUserData] = useState({});
    const navigate = useNavigate()
    
    function getUser() {
        axios.get('http://localhost:3000/user', axiosInstance).then(user => {
            const person = user.data.user;
            if(userData) {
                setUserData(person);
            }
        }).catch(error => {
            return 'Erro ao obter os dados do usuario '+error.message;
        });
    }
    useEffect(() => {
        if(axiosInstance) {
            getUser()
        }  
    },[])


    function handleDelete() {
        axios.delete(`http://localhost:3000/user/${userData.id}`, axiosInstance)
        .then(response => {
            if(response.ok) {
                alert('Conta deletada com sucesso!')
                setTimeout(()=> {
                    navigate('/new-account');
                }, 3000)
            } else{
                alert('Por algum motivo nao conseguimos deletar a sua conta, tente mais tarde')
            }
        }).catch(error => {
            return error.message
        })
    }
    return(
      <main>
        { userData && Object.keys(userData).length > 0? (
          <div className="container mx-auto">
     

           <div>
            <h3  className=" py-2 px-5">{userData.firstname} {userData.lastname}</h3>
            <p  className=" py-2 px-5">{userData.email}</p>
            <p  className=" py-2 px-5">{userData.phoneNumber}</p>
            </div>
             <Link to={`/update/${userData.id}`} className="bg-purple-800 px-5 py-2" type="submit">Editar</Link>
             <form className="inline" onSubmit={handleDelete}>
                <input type="hidden" name="id" value={userData.id} id='id' />
                <button className="bg-red-800 ml-2 px-5 py-2" type="submit">Apagar</button>
             </form>
           </div>
          ): (
             <p>Nenhum usuário encontrado</p>  
        )}
      </main>
    )
}
